"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
async function authMiddleware(req, reply) {
    const apiEmail = req.headers["email"];
    if (!apiEmail) {
        reply.status(401).send({
            message: "Email is required",
        });
    }
}
exports.authMiddleware = authMiddleware;
