"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ClubSchema = new mongoose_1.default.Schema({
    clubName: {
        type: 'String',
        required: true,
    },
    clubLocation: {
        type: 'String',
        required: true,
    },
    president: {
        type: 'String',
        required: true,
    },
    clubCreator: {
        type: 'String',
        required: true,
    },
    clubMembers: ['String'],
});
ClubSchema.statics = {
    valueExists(query) {
        return this.findOne(query).then((result) => result);
    },
};
module.exports = mongoose_1.default.model('Club', ClubSchema);
