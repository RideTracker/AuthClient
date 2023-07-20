import { ClientToken } from "./ClientToken";
import { RequestMethod } from "./RequestMethod";

export default class Client {
    userAgent: string;

    host: string;
    token?: ClientToken;

    constructor(userAgent: string, host: string, token?: ClientToken) {
        this.userAgent = userAgent;

        this.host = host;
        this.token = token;
    };

    static async request(client: Client, method: RequestMethod, url: URL, initialHeaders?: Record<string, string>, body?: BodyInit | undefined): Promise<any> {
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

        return fetch(url.toString(), {
            method,
            headers,
            body
        });
    };
};
