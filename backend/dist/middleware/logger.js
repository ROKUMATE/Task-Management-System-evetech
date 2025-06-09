"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, _res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};
