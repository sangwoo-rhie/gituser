import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// ChartComponent : 차트 컴포넌트

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const chartData = [
  {
    label: "HTML",
    value: "13",
  },
  {
    label: "CSS",
    value: "23",
  },
  {
    label: "JavaScript",
    value: "80",
  },
];

// 차트 컴포넌트
const ExampleChart = ({ data }) => {
  const chartConfigs = {
    type: "pie3d", // The chart type (column2d 도 있고, bar3d 도 있다.)
    width: "400", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      chart: {
        caption: "Languages",
        theme: "fusion",
        decimals: 0,
        pieRadius: "65%", // 파이의 크기

        // caption: "Countries With Most Oil Reserves [2017-18]",
        // subCaption: "In MMbbl = One Million barrels",
        // xAxisName: "Country",
        // yAxisName: "Reserves (MMbbl)",
        // numberSuffix: "K",
        // theme: "fusion",
      },
      data, // 여기의 data는 위의 chartData를 넣지 않고 그냥 data라고 써도,
      // ExampleChart.js에서  <ExampleChart data={chartData} /> 형태로 리턴되기때문에 동적으로 불러와짐
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default ExampleChart;

// 아래 Render the Chart에서 가져옴
// https://www.fusioncharts.com/dev/getting-started/react/your-first-chart-using-react
