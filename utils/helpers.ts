const addZeroToNumber = (value: string | number): string =>
  String(value).padStart(2, '0');

const formateDate = (ms: number): string => {
  const diferent: number = (Date.now() - ms) / 1000;
  if (diferent < 60) return 'a few seconds ago'; // 60 - seconds
  if (diferent > 60 && diferent < 3600)
    return `${Math.ceil(diferent / 3600)} minuts ago`; // 3600 - seconds in hour
  if (diferent > 3600 && diferent < 86400)
    return `${Math.ceil(diferent / 86400)} hours ago`; // 86400 - seconds in a day
  if (diferent < 86400) {
    const date: Date = new Date(ms);
    return `${addZeroToNumber(date.getDate())}.${addZeroToNumber(
      date.getMonth()
    )}.${date.getFullYear()}  ${addZeroToNumber(
      date.getHours()
    )}:${addZeroToNumber(date.getMinutes())}`;
  }
};

export default formateDate;
