import process from "process";

import { config } from "dotenv";
config();

import http from "http";
import app from "./app";
import connectDatabase from "./util/database-connector";

(
    async () => {
        try {
            await connectDatabase(process.env.MONGODB_SRV, process.env.MONGO_DB);
        } catch (e) {
            console.error(e);
        }

        const server = http.createServer(app.callback()).listen(process.env.PORT);
    }
)();

process.on("unhandledRejection", (e) => {
    console.log(e);
    process.exit(1);
});

