import { Model } from "mongoose";

export const upsert = async (
  model: Model<any>,
  filter: object,
  doc: object
) => {
  try {
    await model.create(doc);
  } catch (error: any) {
    if (typeof error === "object") {
      if (error.name === "MongoError" && error.code === 11000) {
        // Duplicate key error
        await model.updateOne(filter, doc, { upsert: true });
      } else {
        throw error;
      }
    }
  }
};
