import { FastifyInstance } from "fastify";
import { UsersController } from "../controller/usersController.js";

export async function usersRoute(fastify: FastifyInstance) {
    const usersController = new UsersController();
    
    fastify.post("/create", usersController.createUser)
}