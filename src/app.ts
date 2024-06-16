import "dotenv/config";

import { createServer } from "./create-server";
import { dbConnect } from "./db-connect";

const startServer = async () => {
  const app = await createServer();
  const port: number = parseInt(<string>process.env.PORT, 10) || 4000;

  await dbConnect();

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

startServer();
