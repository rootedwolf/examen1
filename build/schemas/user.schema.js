"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    fullName: { type: String, required: true },
    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false }
});
UserSchema.pre('save', function (next) {
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
