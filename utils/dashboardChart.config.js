const width = '100%';
const height = '400px';

const BarChart = {
  key: 'BarChart',
  chartType: 'BarChart',
  width,
  height,
  options: {
    titleTextStyle: {
      color: '#788195',
    },
    bar: {
      groupWidth: '95%',
    },
    legend: {
      position: 'none',
    },
    animation: {
      duration: 1000,
      easing: 'in',
      startup: true,
    },
    hAxis: {
      textStyle: {
        color: '#788195',
      },
    },
    vAxis: {
      textStyle: {
        color: '#788195',
      },
    },
    tooltip: {
      textStyle: {
        color: '#788195',
      },
    },
  },
  chartEvents: [
    {
      eventName: 'onmouseover',
    },
  ],
};

const DonutChart = {
  key: 'DonutChart',
  chartType: 'PieChart',
  width,
  height,
  options: {
    titleTextStyle: {
      color: '#788195',
    },
    legend: {
      textStyle: {
        color: '#788195',
      },
    },
    pieSliceTextStyle: {
      color: '#ffffff',
    },
    tooltip: {
      textStyle: {
        color: '#788195',
      },
    },
  },
};

const TreeMap = {
  key: 'TreeMap',
  chartType: 'TreeMap',
  chartPackages: ['treemap'],
  width,
  height,
  options: {
    highlightOnMouseOver: true,
    minColor: '#009688',
    midColor: '#f7f7f7',
    maxColor: '#ee8100',
    headerHeight: 15,
    showScale: true,
    useWeightedAverageForAggregation: true
  },
};

export {
  BarChart,
  DonutChart,
  TreeMap
};
