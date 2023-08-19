import { AuthClientOptions } from "./AuthClientOptions";
import { AuthClientToken } from "./AuthClientToken";
import { Fetcher } from "./Fetcher";
import { RequestMethod } from "./RequestMethod";

export class AuthClient {
    userAgent: string;

    host: string;
    token?: AuthClientToken;

    options: AuthClientOptions;

    constructor(userAgent: string, host: string, token?: AuthClientToken, options: AuthClientOptions = {}) {
        this.userAgent = userAgent;

        this.host = host;
        this.token = token;

        this.options = options;
    };

    static async request(client: AuthClient, method: RequestMethod, url: URL, initialHeaders?: Record<string, string>, body?: BodyInit | undefined): Promise<any> {
        const headers: Record<string, string> = {
            ...initialHeaders
        };

        if(client.options.useCustomUserAgentHeader)
           headers["X-User-Agent"] = client.userAgent;
        else
            headers["User-Agent"] = client.userAgent;

        if(client.token) {
            if(client.token.type === "Basic")
                headers["Authorization"] = `Basic ${client.token.identity}:${client.token.key}`;
        }

        if(body)
            headers["Content-Type"] = "application/json";

        return fetch(url.toString(), {
            method,
            headers,
            body
        });
    };
};
