import { Context } from "../types";

/**
 * NOTICE: Remove this file or use it as a template for your own plugins.
 *
 * This encapsulates the logic for a plugin if the only thing it does is say "Hello, world!".
 *
 * Try it out by running your local kernel worker and running the `yarn worker` command.
 * Comment on an issue in a repository where your GitHub App is installed and see the magic happen!
 *
 * Logger examples are provided to show how to log different types of data.
 */
export async function callPersonalAgent(context: Context) {
  const { logger, payload, octokit } = context;

  const owner = payload.repository.owner.login;
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

  const paOwner = targetUser[0].replace("/@", "");

  logger.info(`Comment received: ${JSON.stringify({ username: owner, comment: body })}`);

  const paWorkflowParams = {
    owner: paOwner,
    repo: "personal-agent",
    workflow_id: "compute.yml",
    ref: "development",
  };

  logger.debug(`Calling personal agent:`, paWorkflowParams);

  try {
    await octokit.rest.actions.createWorkflowDispatch(paWorkflowParams);
  } catch (error) {
    logger.error(`Error dispatching workflow:`, { err: error, error: new Error() });
    throw error;
  }

  logger.ok(`Successfully sent the command to personal agent!`);
  logger.verbose(`Exiting callPersonalAgent`);
}
