export function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = `${today.getMonth() + 1}`.padStart(2, "0");
  const day = `${today.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getPastDateString(daysAgo: number) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function isFutureDate(value: string) {
  if (!value) {
    return false;
  }

  return value > getTodayDateString();
}
