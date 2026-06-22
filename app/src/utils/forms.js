export function sanitizeTextInput(value) {
  return value.trim().replace(/\s+/g, " ");
}

export function sanitizeEmailInput(value) {
  return value.trim().toLowerCase();
}
