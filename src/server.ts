import { app } from "./app.js";

async function start() {
    try {
        await app.listen({ port: 3000 });
        console.log("Server running on port 3000");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

start().then();