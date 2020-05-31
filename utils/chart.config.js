const width = "100%";
const height = "400px";

export const teamCompetencyChart = {
  title: "ColumnChart",
  key: "ColumnChart",
  chartType: "ColumnChart",
  width,
  height,
  options: {
    bar: {
      groupWidth: "95%",
    },
    legend: {
      position: "none",
    },
    animation: {
      duration: 1000,
      easing: "in",
      startup: true,
    },
    hAxis: {
      textStyle: {
        color: "#788195",
      },
    },
    vAxis: {
      textStyle: {
        color: "#788195",
      },
    },
    tooltip: {
      textStyle: {
        color: "#788195",
      },
    },
  }
};
