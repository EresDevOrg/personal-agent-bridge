import { Context } from "../types";

/**
 * NOTICE: run the personal-agent repository workflow of mentioned user
 *
 * Given below is the accepted format of comment to command the personal agent of @exampleGithubUser
 *
 * /@exampleGithubUser fork ubiquity-os/plugin-template
 *
 */
export async function callPersonalAgent(context: Context) {
  const { logger, payload, octokit } = context;

  //const owner = payload.repository.owner.login;
  const body = payload.comment.body;

  if (!body.match(/^\/\B@([a-z0-9](?:-(?=[a-z0-9])|[a-z0-9]){0,38}(?<=[a-z0-9]))\s.*/i)) {
    logger.info(`Ignoring irrelevant comment: ${body}`);
    return;
  }

  const targetUser = body.match(/^\/\B@([a-z0-9](?:-(?=[a-z0-9])|[a-z0-9]){0,38}(?<=[a-z0-9]))/i);
  if (!targetUser) {
    logger.error(`Missing target username from comment: ${body}`);
    return;
  }

  const personalAgentOwner = targetUser[0].replace("/@", "");

  logger.info(`Comment received: ${JSON.stringify({ username: personalAgentOwner, comment: body })}`);

  const paWorkflowParams = {
    owner: personalAgentOwner,
    repo: "personal-agent",
    workflow_id: "compute.yml",
    ref: "development",
  };

  logger.info(`Calling personal agent:`, paWorkflowParams);

  try {
    await octokit.rest.actions.createWorkflowDispatch({
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
