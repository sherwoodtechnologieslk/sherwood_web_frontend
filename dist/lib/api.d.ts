/** Base URL candidates for API requests (no trailing slash). */
export declare function getApiBaseCandidates(): string[];
/** POST/GET etc. against the backend; tries each base candidate until one connects. */
export declare function apiFetch(apiPath: string, init?: RequestInit): Promise<Response>;
//# sourceMappingURL=api.d.ts.map