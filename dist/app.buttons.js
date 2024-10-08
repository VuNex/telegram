"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMenu = exports.regButtons = void 0;
const telegraf_1 = require("telegraf");
function regButtons() {
    return telegraf_1.Markup.keyboard([telegraf_1.Markup.button.callback('Регистрация', 'registration')], {
        columns: 4,
    });
}
exports.regButtons = regButtons;
function userMenu() {
    return telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('📔  Мои доверенности', 'list'),
        telegraf_1.Markup.button.callback('⚠️ Уведомления', 'notify'),
    ], {
        columns: 3,
    });
}
exports.userMenu = userMenu;
//# sourceMappingURL=app.buttons.js.map