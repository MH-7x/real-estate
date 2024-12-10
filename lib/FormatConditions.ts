import { Condition } from "@/types/property";

export const FormatConditions = (condition: Condition): string => {
  let text = "";

  switch (condition) {
    case "Brand New":
      text =
        "The property is brand new, never lived in, and in pristine condition. All fixtures, fittings, and appliances are modern and in perfect working order.";
      break;
    case "Excellent":
      text =
        "The property is in excellent condition, with no significant issues. It has been well-maintained, with minimal wear and tear. Everything is in good working order.";
      break;
    case "Good":
      text =
        "The property is in good condition, but it may show some signs of wear such as minor repairs needed or slight aging of certain features. However, it remains fully functional and livable.";
      break;
    case "Need Minor Work":
      text =
        "The property requires minor work, such as cosmetic repairs or updates (e.g., painting, fixing small plumbing issues, or replacing outdated fixtures). It is still habitable and functional, but could use some improvements.";
      break;
    case "Need Major Work":
      text =
        "The property requires major work, including significant repairs or renovations. Structural issues, major plumbing or electrical problems, or extensive updates may be needed. It may not be livable without significant investment in repairs.";
      break;
    default:
      text = "Condition not specified.";
      break;
  }

  return text;
};
