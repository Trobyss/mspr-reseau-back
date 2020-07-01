// TODO
// import { QueryInterface } from "sequelize";
// import bcrypt from "bcryptjs";
// import { UserInterface, UserType } from "@models/User";
// import { Models } from "@services/Models";
// import { UuidManager } from "../helpers/UuidManager";

// const uuidManager = new UuidManager();

// /**
//  * @returns {Promise<Object>}
//  */
// const userImport = async function(sequelize: QueryInterface) {
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash("azerty", salt);

//   const users: UserInterface[] = [
//     {
//       id_user: uuidManager.getUuid(Models.User, 1)!,
//       firstName: "Adrien",
//       lastName: "Famille",
//       phoneNumber: "+33678903456",
//       societyName: "Fourchon",
//       type: UserType.SUPERADMIN,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       password: hash,
//       email: "figueiredo.adrien@hotmail.fr",
//       job: "Courtier",
//       visiteCard: "public/51584f07-8717-43dd-9a7b-026fb8caaa0b.png"
//     },
//     {
//       id_user: uuidManager.getUuid(Models.User, 2)!,
//       firstName: "Gabriel",
//       lastName: "Famille",
//       phoneNumber: "+33678903456",
//       societyName: "Fourchon",
//       type: UserType.SUPERADMIN,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       password: hash,
//       email: "seed2@seed.fr",
//       job: "Courtier"
//     },
//     {
//       id_user: uuidManager.getUuid(Models.User, 3)!,
//       firstName: "Vincent",
//       lastName: "Famille",
//       phoneNumber: "+33678903456",
//       societyName: "Fourchon",
//       type: UserType.USER,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       password: hash,
//       email: "seed3@seed.fr",
//       job: "Courtier"
//     },
//     {
//       id_user: uuidManager.getUuid(Models.User, 4)!,
//       firstName: "Pierre",
//       lastName: "Famille",
//       phoneNumber: "+33678903456",
//       societyName: "Fourchon",
//       type: UserType.USER,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       password: hash,
//       email: "seed4@seed.fr",
//       job: "Courtier"
//     },
//     {
//       id_user: uuidManager.getUuid(Models.User, 5)!,
//       firstName: "Paul",
//       lastName: "Famille",
//       phoneNumber: "+33678903456",
//       societyName: "Fourchon",
//       type: UserType.USER,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       password: hash,
//       email: "seed5@seed.fr",
//       job: "Courtier"
//     },
//     {
//       id_user: uuidManager.getUuid(Models.User, 6)!,
//       firstName: "Jacques",
//       lastName: "Famille",
//       phoneNumber: "+33678903456",
//       societyName: "Fourchon",
//       type: UserType.USER,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       password: hash,
//       email: "seed6@seed.fr",
//       job: "Courtier"
//     }
//   ];

//   uuidManager.persist();

//   return sequelize.bulkInsert(Models.User, users);
// };

// export const up = async (sequelize: QueryInterface) => {
//   await userImport(sequelize);
// };
// export const down = async (sequelize: QueryInterface) => {
//   await sequelize.bulkDelete(Models.User, {});
// };
