import { config } from 'dotenv';

config();

const { env } = process;

/** sets application variables into prod or dev */
export const prod = env.NODE_ENV === 'prod' ? true : false;

/** configures certain features to work in testing or not  */
export const env_test = env.NODE_ENV === 'test';

export const cfg = {
  rootdir: __dirname + '/..',
  server: {
    port: +env.PORT!,
    path: env.SERVER_URL!,
    keyPath: env.KEY_PATH!,
    certPath: env.CERT_PATH!,
  },
  session: {
    secret: env.SESSION_SECRET!,
    age: Number(env.SESSION_AGE!),
    timeout: Number(env.SESSION_TIMEOUT!),
  },
  jwt: {
    secret: env.JWT_SECRET!,
    expiresIn: env.JWT_EXPIRES_IN!,
    cookieExpiresIn: +env.JWT_COOKIE_EXPIRES_IN!,
  },
  cors: {
    whitelist: [env.CLIENT_URL!],
  },
  mongoose: {
    uri: env.MONGO_URI!,
  },
  email: {
    service: env.EMAIL_SERVICE!,
    user: env.EMAIL_USER!,
    clientId: env.EMAIL_CLIENT_ID!,
    clientSecret: env.EMAIL_CLIENT_SECRET!,
    refreshToken: env.EMAIL_REFRESH_TOKEN!,
    accessToken: env.EMAIL_ACCESS_TOKEN!,
    expiresIn: +env.EMAIL_EXPIRES_IN!,
    tokenExpiry: +env.EMAIL_TOKEN_EXPIRY!,
  },
  jest: {
    sleep: 2000,
  },
  bcrypt: {
    salt: 12,
  },
};

export const db_co = {
  uri: env.MONGO_URI!,
};
