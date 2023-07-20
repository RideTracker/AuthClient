export type Fetcher = (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
