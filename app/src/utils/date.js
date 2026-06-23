export function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export function getTodayIndex() {
  const day = new Date().getDay();

  return day === 0 ? 6 : day - 1;
}
