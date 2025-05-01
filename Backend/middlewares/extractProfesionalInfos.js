function extractExperienceFlexible(cvText) {
  const lines = cvText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const experiences = [];
  const seenEntries = new Set();

  const dateRangeRegex =
    /(\b(?:janv(?:ier)?|févr(?:ier)?|mars|avr(?:il)?|mai|juin|juil(?:let)?|août|sept(?:embre)?|oct(?:obre)?|nov(?:embre)?|déc(?:embre)?|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)?\.?\s*\d{4}|\d{4})\s*(?:[-–toà]{1,3})\s*(\b(?:present|présent|janv(?:ier)?|févr(?:ier)?|mars|avr(?:il)?|mai|juin|juil(?:let)?|août|sept(?:embre)?|oct(?:obre)?|nov(?:embre)?|déc(?:embre)?|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)?\.?\s*\d{4}|\d{4}|present|présent)\b/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(dateRangeRegex);

    if (match) {
      const startDate = match[1];
      const endDateRaw = match[2];
      const endDate = /présent|present/i.test(endDateRaw)
        ? "Present"
        : endDateRaw;

      // Context window: check ±2 lines for position and company
      const context = [
        lines[i - 2],
        lines[i - 1],
        lines[i],
        lines[i + 1],
        lines[i + 2],
      ].filter(Boolean);

      // Try to infer position (job title often has known keywords)
      const positionLine =
        context.find((l) =>
          /\b(manager|engineer|developer|consultant|lead|designer|directeur|chef|ingénieur|analyste|stagiaire)\b/i.test(
            l
          )
        ) ||
        lines[i - 1] ||
        "";

      // Try to infer company name (line not containing dates or keywords)
      const companyLine =
        context.find(
          (l) =>
            !dateRangeRegex.test(l) &&
            !/\b(manager|engineer|developer|consultant|lead|designer|directeur|chef|ingénieur|analyste|stagiaire)\b/i.test(
              l
            )
        ) ||
        lines[i + 1] ||
        "";

      const uniqueKey = `${startDate}|${endDate}|${positionLine}|${companyLine}`;
      if (!seenEntries.has(uniqueKey)) {
        experiences.push({
          startDate,
          endDate,
          position: positionLine,
          company: companyLine,
        });
        seenEntries.add(uniqueKey);
      }
    }
  }

  return experiences;
}

module.exports = extractExperienceFlexible;
