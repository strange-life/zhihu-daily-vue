const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
const date = String(tomorrow.getDate()).padStart(2, '0');
const tomorrowText = `${tomorrow.getFullYear()}${month}${date}`;

export function currentDate({ dailies }) {
  return dailies.length ? dailies[dailies.length - 1].date : tomorrowText;
}
