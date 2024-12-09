import { StaticDecode, Type as T } from "@sinclair/typebox";
import { StandardValidator } from "typebox-validators";

export const personalAgentConfigSchema = T.Object(
  {
    GITHUB_PAT_ENCRYPTED: T.String(),
  },
  { default: {} }
);

export const configSchemaValidator = new StandardValidator(personalAgentConfigSchema);

export type PluginSettings = StaticDecode<typeof personalAgentConfigSchema>;
