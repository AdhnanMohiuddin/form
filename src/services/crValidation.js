// Mock CR numbers for testing — replace with API call in production
const validCrNumbers = [
  "1234567890",
  "0987654321",
  "1111111111",
  "2222222222",
  "1231231231",
];

export function validateCrNumber(crNumber) {
  const trimmed = crNumber?.trim() || "";

  if (!trimmed) {
    alert("validation number is 1231231231 or 1111111111");
    return { valid: false, error: "CR Number is required" };
  }
  if (!/^[0-9]+$/.test(trimmed)) {
     alert("validation number is 1231231231 or 1111111111");
    return { valid: false, error: "CR must be numeric" };
  }
  if (trimmed.length !== 10) {
     alert("validation number is 1231231231 or 1111111111");
    return { valid: false, error: "Invalid CR number" };
  }
  if (!validCrNumbers.includes(trimmed)) {
     alert("validation number is 1231231231 or 1111111111");
    return { valid: false, error: "Invalid CR number" };
  }

  return { valid: true, error: "" };
}
