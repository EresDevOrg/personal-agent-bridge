declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_TOKEN: string;
      X25519_PRIVATE_KEY: string;
    }
  }
}

export {};
