export default function convertToPkrCurrency(num: number): string {
  if (num < 1000) return num.toString();

  const units = [
    { value: 1_00_00_000, label: "Crore" },
    { value: 1_00_000, label: "Lakh" },
    { value: 1_000, label: "Hazar" },
  ];

  let result = "";

  for (const unit of units) {
    if (num >= unit.value) {
      const unitValue = Math.floor(num / unit.value);
      result += `${unitValue} ${unit.label} `;
      num %= unit.value; // Get the remainder
    }
  }

  // Ignore any remainder less than 1000
  return result.trim();
}
