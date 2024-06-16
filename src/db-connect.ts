import "dotenv/config";
import mongoose from "mongoose";

const createDbString = (environment: String) =>
  process.env[`DATABASE_${environment.toUpperCase()}`]!.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD!
  );

export const dbConnect = async () => {
  const env = process.env.NODE_ENV;
  const DB = createDbString(env!);

  console.log("from dbConnect", DB);

  await mongoose
    .connect(DB, {})
    .then(() => console.log(`DB connection successful. Environment: ${env}`))
    .catch(() =>
      console.log(
        `DB NOT CONNECTING. PLEASE CHECK NETWORK. Environment: ${env} `
      )
    );
};
