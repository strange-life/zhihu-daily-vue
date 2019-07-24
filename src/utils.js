const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
const dateReg = /^(\d{4})(\d{2})(\d{2})$/;

export const proxyImage = url => `${window.location.origin}/.netlify/functions/image?url=${url}`;

export function parseDate(dateString) {
  const [, year, month, day] = dateReg.exec(dateString);
  const date = new Date(year, Number(month) - 1, day);
  const weekDay = weekDays[date.getDay()];

  return `${month}月${day}日 ${weekDay}`;
}
