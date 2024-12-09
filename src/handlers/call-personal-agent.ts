import { Octokit } from "@octokit/rest";
import { Context } from "../types";
import { getPersonalAgentConfig } from "../helpers/config";
import { decryptKeys } from "../helpers/keys";

/**
 * NOTICE: run the personal-agent repository workflow of mentioned user
 *
 * Given below is the accepted format of comment to command the personal agent of @exampleGithubUser
 *
 * /@exampleGithubUser fork ubiquity-os/plugin-template
 *
 */
export async function callPersonalAgent(context: Context) {
  const { logger, payload } = context;

  const owner = payload.repository.owner.login;
  const body = payload.comment.body;
  const repo = payload.repository.name;

  if (!body.match(/^\/\B@([a-z0-9](?:-(?=[a-z0-9])|[a-z0-9]){0,38}(?<=[a-z0-9]))\s.*/i)) {
    logger.info(`Ignoring irrelevant comment: ${body}`);
    return;
  }

  const targetUser = body.match(/^\/\B@([a-z0-9](?:-(?=[a-z0-9])|[a-z0-9]){0,38}(?<=[a-z0-9]))/i);
  if (!targetUser) {
    logger.error(`Missing target username from comment: ${body}`);
    return;
  }

  const errComment = ["```diff", `! There was a problem calling the personal agent of ${personalAgentOwner}`, "```"].join("\n");

  console.log(
    `commenting 
    ${JSON.stringify({
      body: errComment,
      repo,
      owner,
      issue_number: payload.issue.number,
    })}`
  );

  await context.octokit.rest.issues.createComment({
    body: errComment,
    repo,
    owner,
    issue_number: payload.issue.number,
  });
  // } catch (err) {
  //   logger.error(`Error commenting:`, { err, error: new Error() });
  // }

  const personalAgentOwner = targetUser[0].replace("/@", "");
  logger.info(`Comment received:`, { owner, personalAgentOwner, comment: body });

  const personalAgentConfig = await getPersonalAgentConfig(context, personalAgentOwner);

  if (!personalAgentConfig.config) {
    throw new Error(`No personal agent config found on ${personalAgentOwner}/personal-agent`);
  }

  if (!process.env.PA_BRIDGE_X25519_PRIVATE_KEY) {
    throw new Error(`Missing PA_BRIDGE_X25519_PRIVATE_KEY in bridge repository secrets.`);
  }

  const patDecrypted = await decryptKeys(personalAgentConfig.config.GITHUB_PAT_ENCRYPTED, process.env.PA_BRIDGE_X25519_PRIVATE_KEY, logger);
  try {
    const paOctokit = new Octokit({
      auth: patDecrypted.decryptedText,
    });

    await paOctokit.rest.actions.createWorkflowDispatch({
      owner: personalAgentOwner,
      repo: "personal-agent",
      workflow_id: "compute.yml",
      ref: "development",
    });
  } catch (error) {
    logger.error(`Error dispatching workflow:`, { err: error, error: new Error() });

    throw error;
  }

  logger.ok(`Successfully sent the command to personal agent of @${personalAgentOwner}!`);
  logger.verbose(`Exiting callPersonalAgent`);
}
