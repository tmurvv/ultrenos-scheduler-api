import mongoose, { ConnectOptions } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const connect = async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  const mongooseOpts: ConnectOptions = {};

  await mongoose.disconnect();
  await mongoose.connect(uri, mongooseOpts);

  return {
    closeDatabase: async () => {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await mongod.stop();
    },
    clearDatabase: async () => {
      const collections = mongoose.connection.collections;
      for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
      }
    },
  };
};

export default connect;
export type MongodHelper = {
  closeDatabase: () => Promise<void>;
  clearDatabase: () => Promise<void>;
};

//
//
// import mongoose from "mongoose";
// import {MongoMemoryServer} from "mongodb-memory-server";
//
//
// let mongo;
//
// const connectDB = async () => {
//     mongo = await MongoMemoryServer.create();
//     const uri = mongo.getUri();
//
//     await mongoose.connect(uri, {});
// };
//
// const dropDB = async () => {
//     if (mongo) {
//         await mongoose.connection.dropDatabase();
//         await mongoose.connection.close();
//         await mongo.stop();
//     }
// };
//
// const dropCollections = async () => {
//     if (mongo) {
//         const collections = await mongoose.connection.db.collections();
//         for (let collection of collections) {
//             await collection.drop();
//         }
//     }
// };
//
// module.exports = { connectDB, dropDB, dropCollections}
