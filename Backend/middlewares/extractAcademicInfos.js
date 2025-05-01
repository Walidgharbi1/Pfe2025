function extractEducationInfo(cvText) {
  const lines = cvText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const educations = [];
  const seenEntries = new Set();

  const dateRegex = /\b(?:\d{4})\b/g;
  const degreeRegex =
    /(master|bachelor|licence|ph\.?d|engineer|ing[ée]nieur|doctorat|dipl[oô]me|baccalaureat)/i;
  const institutionRegex = /(université|university|school|institut|école|lycee|lycée|faculté|faculty)/i;

  for (let i = 0; i < lines.length; i++) {
    const current = lines[i];

    const containsDate = dateRegex.test(current);
    const containsEduKeyword =
      degreeRegex.test(current) || institutionRegex.test(current);

    if (containsDate || containsEduKeyword) {
      // Scan ±2 lines to find degree and institution
      const windowLines = [
        lines[i - 2],
        lines[i - 1],
        lines[i],
        lines[i + 1],
        lines[i + 2],
      ].filter(Boolean);

      const degree = windowLines.find((line) => degreeRegex.test(line)) || "";
      const institution =
        windowLines.find((line) => institutionRegex.test(line)) || "";
      const dateLine = windowLines.find((line) => dateRegex.test(line)) || "";
      const dates = dateLine.match(dateRegex) || [];

      const startDate = dates.length >= 2 ? dates[0] : "";
      const endDate = dates.length >= 2 ? dates[1] : dates[0] || "";

      const uniqueKey = `${degree}|${institution}|${startDate}|${endDate}`;
      if (!seenEntries.has(uniqueKey) && (degree || institution || startDate)) {
        educations.push({
          degree,
          institution,
          startDate,
          endDate,
        });
        seenEntries.add(uniqueKey);
      }
    }
  }

  return educations;
}

module.exports = extractEducationInfo;
