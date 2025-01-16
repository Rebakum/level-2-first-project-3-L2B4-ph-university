import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import { ServerConfig } from './app/config';
let server: Server;

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);

    server = app.listen(ServerConfig.port, () => {
      console.log(`Example app listening on port ${ServerConfig.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();

process.on(' unhandledRejection', () => {
  console.log(`unhandledRejection is detected, shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on('uncaughtException', () => {
  console.log(`uncaughtException is detected, shutting down ...`);
  process.exit(1);
});
