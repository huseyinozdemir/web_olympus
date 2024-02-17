"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var contact_1 = require("./contact");
router.use("/contact", contact_1.default);
exports.default = router;
