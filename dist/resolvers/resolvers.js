"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsResolvers = void 0;
const type_graphql_1 = require("type-graphql");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let newsResolvers = class newsResolvers {
    async getAuthorById(id) {
        try {
            await prisma.author.findUnique({
                where: { id }
            });
            return true;
        }
        catch (error) {
            return false;
        }
    }
};
exports.newsResolvers = newsResolvers;
__decorate([
    (0, type_graphql_1.Query)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], newsResolvers.prototype, "getAuthorById", null);
exports.newsResolvers = newsResolvers = __decorate([
    (0, type_graphql_1.Resolver)()
], newsResolvers);
//# sourceMappingURL=resolvers.js.map