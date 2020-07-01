declare module "express-brute-sequelize";
declare global {
  namespace Express {
    interface Request {
      idInfo?: any;
    }
  }
}

declare module "fxa-common-password-list";