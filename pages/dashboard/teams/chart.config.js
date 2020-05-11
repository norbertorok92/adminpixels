const width = "100%";
const height = "400px";

export const BarChart = {
  title: "BarChart",
  key: "BarChart",
  chartType: "BarChart",
  width,
  height,
  data: [
    [
      "Element",
      "Density",
      {
        role: "style",
      },
    ],
    ["Copper", 8.94, "#b87333"], // RGB value
    ["Silver", 10.49, "silver"], // English color name
    ["Gold", 19.3, "gold"],
    ["Platinum", 21.45, "color: #e5e4e2"],
  ],
  options: {
    title: "Visitor statistics from 2010 to 2016",
    titleTextStyle: {
      color: "#788195",
    },
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
