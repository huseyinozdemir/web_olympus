"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var ContactSchema = new Schema({
    name: {
        type: String,
        required: [true, "Required name field!"],
    },
    surname: {
        type: String,
        required: [true, "Required surname field!"],
    },
    email: {
        type: String,
        required: [true, "Required email field!"],
    },
    phone: {
        type: String,
    },
    message: {
        type: String,
        default: "",
    },
});
exports.default = mongoose_1.default.model('Contact', ContactSchema);
