import Client from "../../models/Client";
import { ClientToken } from "../../models/ClientToken";

export function createClient(userAgent: string, host: string, token: ClientToken): Client {
    return {
        userAgent,
        host,
        token
    };
};
