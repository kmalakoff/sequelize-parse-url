"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return parseUrl;
    }
});
var _url = /*#__PURE__*/ _interop_require_default(require("url"));
var _path = /*#__PURE__*/ _interop_require_default(require("path"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function parseUrl(sourceUrl) {
    var options = {};
    var urlParts = _url.default.parse(sourceUrl, true);
    options.dialect = urlParts.protocol.replace(/:$/, "");
    options.host = urlParts.hostname;
    if (options.dialect === "sqlite" && urlParts.pathname && !urlParts.pathname.startsWith("/:memory")) {
        var storagePath = _path.default.join(options.host, urlParts.pathname);
        options.storage = _path.default.resolve(options.storage || storagePath);
    }
    if (urlParts.pathname) {
        options.database = urlParts.pathname.replace(/^\//, "");
    }
    if (urlParts.port) {
        options.port = urlParts.port;
    }
    if (urlParts.auth) {
        var authParts = urlParts.auth.split(":");
        options.username = authParts[0];
        if (authParts.length > 1) options.password = authParts.slice(1).join(":");
    }
    if (urlParts.query) {
        if (options.dialectOptions) Object.assign(options.dialectOptions, urlParts.query);
        else options.dialectOptions = urlParts.query;
    }
    return options;
}
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }