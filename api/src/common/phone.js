export function normalizePhone(phone) {
  return String(phone ?? "").replace(/[^\d+]/g, "");
}

export function assertPhone(phone) {
  if (!/^\+?[0-9]{9,15}$/.test(phone)) {
    throw new Error("phone must be a valid phone number with 10 digits");
  }
}
  