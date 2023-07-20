import { AuthClient } from "../../models/AuthClient";
import { AuthClientToken } from "../../models/AuthClientToken";

export function createAuthClient(userAgent: string, host: string, token: AuthClientToken): AuthClient {
    return {
        userAgent,
        host,
        token
    };
};
