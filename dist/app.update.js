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
exports.AppUpdate = void 0;
const app_service_1 = require("./app.service");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const telegraf_1 = require("telegraf");
const app_buttons_1 = require("./app.buttons");
const app_utils_1 = require("./app.utils");
const user_entity_1 = require("./User/user.entity");
const user_service_1 = require("./User/user.service");
const listAttorney = [
    {
        id: 1,
        registration_name: '15efa215-acd4-5212-a003-f769a689390f',
        uin: '861005350331',
        reg_date: '05.10.2023',
        start_date: '05.10.2023',
        end_date: '05.10.2024',
        status: 'ACTIVE',
    },
    {
        id: 2,
        registration_name: '02462a96-5020-5885-8bf8-132c565b5da5',
        uin: '861005350331',
        reg_date: '05.10.2023',
        start_date: '05.10.2023',
        end_date: '05.10.2024',
        status: 'CREATED',
    },
    {
        id: 3,
        registration_name: '7406c707-06db-5af5-b02d-4b7f93242285',
        uin: '861005350331',
        reg_date: '05.10.2023',
        start_date: '05.10.2023',
        end_date: '05.10.2024',
        status: 'REVOKED',
    },
    {
        id: 4,
        registration_name: '4a9e9fb2-afeb-54e4-b993-80781045d141',
        uin: '861005350331',
        reg_date: '05.10.2023',
        start_date: '05.10.2023',
        end_date: '05.10.2024',
        status: 'DEFAULT',
    },
];
let AppUpdate = class AppUpdate {
    constructor(bot, appService, userService) {
        this.bot = bot;
        this.appService = appService;
        this.userService = userService;
    }
    async StartCommand(ctx) {
        const tgId = ctx.message.from.id;
        const findId = await this.userService.getByTgId(Number(tgId));
        if (!findId) {
            await ctx.reply(`Здравствуйте! \n\nДля дальнейшей работы с ботом eSenim необходимо зарегестрироваться.`, (0, app_buttons_1.regButtons)());
        }
        if (findId) {
            console.log(findId);
            ctx.session.user = [ctx.message.from];
            ctx.session.type = 'registered';
            await ctx.reply('Здравствуйте ' + findId.name + '!', (0, app_buttons_1.userMenu)());
        }
    }
    async attorneyList(ctx) {
        await ctx.reply((0, app_utils_1.attorneyList)(listAttorney));
        ctx.session.type = 'list';
    }
    async registration(message, ctx) {
        await ctx.reply('Введите ИИН: ');
        ctx.session.type = 'registration';
    }
    async getMessage(message, ctx) {
        const tgId = ctx.message.from.id;
        const findId = await this.userService.getByTgId(Number(tgId));
        const { id, first_name } = ctx.message.from;
        function isNumeric(value) {
            return typeof value === 'number' && !isNaN(value);
        }
        console.log(message);
        if (!ctx.session.type)
            return;
        if (ctx.session.type === 'registration') {
            if (findId)
                return;
            if (!findId) {
                if (!isNumeric(message) && message.length !== 12) {
                    await ctx.reply('Введите ИИН (12 чисел)');
                }
                else {
                    const user = new user_entity_1.UserEntity();
                    user.tg_id = id;
                    user.name = first_name;
                    user.uin = message;
                    await this.userService.create(user);
                    await ctx.reply(`Здравствуйте ${first_name}! \n\nДля дальнейшей работы с ботом eSenim воспользуйтесь меню.`, (0, app_buttons_1.userMenu)());
                    console.log(`Новый пользователь в боте ${tgId}`);
                }
            }
        }
        if (ctx.session.type === 'list') {
        }
    }
};
exports.AppUpdate = AppUpdate;
__decorate([
    (0, nestjs_telegraf_1.Start)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "StartCommand", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)('📔  Мои доверенности'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "attorneyList", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)('Регистрация'),
    __param(0, (0, nestjs_telegraf_1.Message)('text')),
    __param(1, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "registration", null);
__decorate([
    (0, nestjs_telegraf_1.On)('text'),
    __param(0, (0, nestjs_telegraf_1.Message)('text')),
    __param(1, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "getMessage", null);
exports.AppUpdate = AppUpdate = __decorate([
    (0, nestjs_telegraf_1.Update)(),
    __param(0, (0, nestjs_telegraf_1.InjectBot)()),
    __metadata("design:paramtypes", [telegraf_1.Telegraf,
        app_service_1.AppService,
        user_service_1.UserService])
], AppUpdate);
//# sourceMappingURL=app.update.js.map