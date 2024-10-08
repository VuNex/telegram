"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_update_1 = require("./app.update");
const app_service_1 = require("./app.service");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const typeorm_1 = require("@nestjs/typeorm");
const LocalSession = require("telegraf-session-local");
const settings_1 = require("./settings");
const user_entity_1 = require("./User/user.entity");
const user_controller_1 = require("./User/user.controller");
const user_service_1 = require("./User/user.service");
const session = new LocalSession({ database: 'session-db.json' });
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_telegraf_1.TelegrafModule.forRoot({
                middlewares: [session.middleware()],
                token: settings_1.TG_TOKEN,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'nestjsu',
                password: 'Gfhjkm1307@',
                database: 'nestjsdb',
                synchronize: true,
                logging: true,
                entities: ['dist/**/*.entity{.ts,.js}'],
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]),
        ],
        controllers: [user_controller_1.UserController],
        providers: [app_service_1.AppService, app_update_1.AppUpdate, user_service_1.UserService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map