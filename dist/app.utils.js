"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attorneyList = void 0;
const attorneyList = (listAttorney) => `Ваш список доверенностей: \n\n${listAttorney
    .map((item) => {
    let statusIndicator = '';
    if (item.status === 'ACTIVE') {
        statusIndicator = '🟢';
    }
    else if (item.status === 'CREATED') {
        statusIndicator = '🔵';
    }
    else if (item.status === 'REVOKED') {
        statusIndicator = '🔴';
    }
    else {
        statusIndicator = '⚪';
    }
    return `${statusIndicator} ${item.registration_name} \n Дата регистрации: ${item.reg_date} \n\n`;
})
    .join('')}`;
exports.attorneyList = attorneyList;
//# sourceMappingURL=app.utils.js.map