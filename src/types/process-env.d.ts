declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_TOKEN: string;
      PA_BRIDGE_X25519_PRIVATE_KEY: string;
    }
  }
}

export {};
