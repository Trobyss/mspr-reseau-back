import dotenv from "dotenv";

dotenv.config({
  path: `./src/config/.prod.env`,
});

export interface Config {
  ENV: string;
  FRONT_URL: string;
  API_PORT: string;
  API_HOST: string;
  SECRETJWT: string;
  auth: {
    REFRESH: string;
    AUTH: string;
    ACTIVE_DIRECTORY: string;
    JWT: string;
  };
  ad: {
    clientID: string;
    clientSecret: string;
    cookieEncryptionKeys: string[];
    identityMetadata: string;
    loggingLevel: string;
    redirectUrl: string;
    tenantId: string;
  };
  db: {
    host: string;
    name: string;
    user: string;
    password: string;
  };
  mail: {
    user: string;
    host: string;
    port: number;
    password: string;
  };
  error: Record<string, any>;
}

export const CONFIG: Config = {
  db: {
    host: process.env.DB_HOST!,
    name: process.env.DB_NAME!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
  },
  ad: {
    clientID: "",
    clientSecret: "",
    cookieEncryptionKeys: [""],
    identityMetadata: "",
    loggingLevel: "",
    redirectUrl: "",
    tenantId: process.env.TENANT!,
  },
  mail: {
    user: "",
    password: "",
    port: 123,
    host: "",
  },
  auth: {
    JWT: "JWT",
    REFRESH: "refresh",
    AUTH: "auth",
    ACTIVE_DIRECTORY: "ACTIVE_DIRECTORY",
  },
  ENV: process.env.ENV!,
  FRONT_URL: process.env.FRONT_URL!,
  API_PORT: process.env.API_PORT!,
  API_HOST: process.env.API_HOST!,
  SECRETJWT: process.env.SECRETJWT!,
  error: {
    NOT_FOUND: "NOT_FOUND",
    BAD_REQUEST: "BAD_REQUEST",
    AD_404: "AD_404",
    AD_500: "AD_500",
  },
};
