import { AuthClient } from "../../models/AuthClient";
import { AuthClientOptions } from "../../models/AuthClientOptions";
import { AuthClientToken } from "../../models/AuthClientToken";

export function createAuthClient(userAgent: string, host: string, token: AuthClientToken, options: AuthClientOptions = {}): AuthClient {
    return {
        userAgent,
        host,
        token,
        options
    };
};
