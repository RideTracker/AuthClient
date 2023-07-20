import { AuthClientToken } from "./AuthClientToken";
import { Fetcher } from "./Fetcher";
import { RequestMethod } from "./RequestMethod";

export class AuthClient {
    userAgent: string;

    host: string;
    token?: AuthClientToken;

    fetcher?: Fetcher;

    constructor(userAgent: string, host: string, token?: AuthClientToken, fetcher?: Fetcher) {
        this.userAgent = userAgent;

        this.host = host;
        this.token = token;

        if(fetcher)
            this.fetcher = fetcher;
    };

    static async request(client: AuthClient, method: RequestMethod, url: URL, initialHeaders?: Record<string, string>, body?: BodyInit | undefined): Promise<any> {
        const headers: Record<string, string> = {
            ...initialHeaders
        };

        headers["User-Agent"] = client.userAgent;

        if(client.token) {
            if(client.token.type === "Basic")
                headers["Authorization"] = `Basic ${client.token.identity}:${client.token.key}`;
        }

        if(body)
            headers["Content-Type"] = "application/json";

        return (client.fetcher ?? fetch)(url.toString(), {
            method,
            headers,
            body
        });
    };
};
