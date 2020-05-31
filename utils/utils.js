export function stringToSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function mergeCompetencies(listOfCompetencies) {
  let mergedCompetencies = [];

  listOfCompetencies.reduce((result, current, index) => {
    if (result && current && result.slug === current.slug) {
      mergedCompetencies.push({
        competencySlug: current.slug,
        competencyTitle: current.title,
        competencyCategory: current.category,
        teamCompetencyScore: result.competencyScore + current.competencyScore,
        numberOfCompetencies: index + 2,
      });
    } else {
      mergedCompetencies.push({
        competencySlug: current.slug,
        competencyTitle: current.title,
        competencyCategory: current.category,
        teamCompetencyScore: current.competencyScore,
        numberOfCompetencies: 1,
      });
    }
  });

  return mergedCompetencies;
}
