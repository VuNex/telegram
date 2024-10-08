export const attorneyList = (listAttorney) =>
  `Ваш список доверенностей: \n\n${listAttorney
    .map((item) => {
      let statusIndicator = '';

      if (item.status === 'ACTIVE') {
        statusIndicator = '🟢';
      } else if (item.status === 'CREATED') {
        statusIndicator = '🔵';
      } else if (item.status === 'REVOKED') {
        statusIndicator = '🔴';
      } else {
        statusIndicator = '⚪';
      }

      return `${statusIndicator} ${item.registration_name} \n Дата регистрации: ${item.reg_date} \n\n`;
    })
    .join('')}`;
