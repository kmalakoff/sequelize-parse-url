/// <reference types="node" />
export default function parseUrl(sourceUrl: any): {
    dialect: string;
    host: string;
    storage: any;
    database: string;
    port: string;
    username: string;
    password: string;
    dialectOptions: import("querystring").ParsedUrlQuery;
};
