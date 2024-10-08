import { Markup } from 'telegraf';

export function regButtons() {
  return Markup.keyboard(
    [Markup.button.callback('Регистрация', 'registration')],
    {
      columns: 4,
    },
  );
}

export function userMenu() {
  return Markup.inlineKeyboard(
    [
      Markup.button.callback('📔  Мои доверенности', 'list'),
      Markup.button.callback('⚠️ Уведомления', 'notify'),
    ],
    {
      columns: 3,
    },
  );
}
