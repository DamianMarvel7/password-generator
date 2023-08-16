export function generateRandomPassword(
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols
) {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "~`!@#$%^&*()_.?/";

  let allChars = lowercaseChars;
  if (includeUppercase) allChars += uppercaseChars.repeat(2); // Repeated twice
  if (includeLowercase) allChars += lowercaseChars.repeat(2); // Repeated twice
  if (includeNumbers) allChars += numberChars;
  if (includeSymbols) allChars += symbolChars;

  let generatedPassword = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    generatedPassword += allChars[randomIndex];
  }

  return generatedPassword;
}

export function getPasswordStrength(
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols
) {
  let criteriaCount = 0;
  if (length >= 12) criteriaCount += 2;
  if (includeUppercase) criteriaCount++;
  if (includeLowercase) criteriaCount++;
  if (includeNumbers) criteriaCount++;
  if (includeSymbols) criteriaCount++;

  if (criteriaCount >= 5 && length >= 10) {
    return { label: "STRONG", color: "hsl(127, 100%, 82%)" };
  } else if (criteriaCount >= 3 && length >= 7) {
    return { label: "MEDIUM", color: "hsl(42, 91%, 68%)" };
  } else if (criteriaCount >= 2 && length >= 5) {
    return { label: "WEAK", color: "hsl(13, 95%, 66%)" };
  } else {
    return { label: "TOO WEAK", color: "hsl(0, 91%, 63%)" };
  }
}

export function PasswordStrengthIndicator(passStrength) {
  switch (passStrength) {
    case "TOO WEAK":
      return 1;
    case "WEAK":
      return 2;
    case "MEDIUM":
      return 3;
    case "STRONG":
      return 4;
    default:
      return 0;
  }
}
