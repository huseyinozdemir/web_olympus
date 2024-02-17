"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.appServer = exports.app = void 0;
var express = require("express");
var path = require("path");
var mongoose_1 = require("mongoose");
var cors = require("cors");
var index_1 = require("./src/routers/index");
var dotenv = require("dotenv");
dotenv.config();
var PORT = parseInt(process.env.PORT || "5001", 10);
var database = (_a = process.env.MONGO_DB_CONNECT) !== null && _a !== void 0 ? _a : '';
if (!database) {
    throw new Error('MONGO_DB_CONNECT environment variable is not set');
}
mongoose_1.default.connect(database, {}).then(function () {
    console.log("[MongoDB] Connection Succeeded.");
}).catch(function (err) {
    console.error('Error in DB connection:', err);
});
var app = express();
exports.app = app;
app.use(cors());
app.use(express.json({
    limit: "50mb",
}));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use("/api", index_1.default);
var appServer = app.listen(PORT, function () {
    console.log("[SERVER] Running on port ".concat(PORT, "."));
});
exports.appServer = appServer;
