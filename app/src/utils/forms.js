export function sanitizeTextInput(value) {
  return value.trim().replace(/\s+/g, " ");
}

export function sanitizeEmailInput(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9@._-]/g, "");
}

export function sanitizeNumberInput(value, fallback = 0) {
  const number = Number(value);

  return Number.isNaN(number) ? fallback : number;
}
