import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const Doughnut2d = ({ data }) => {
  const chartConfigs = {
    type: "doughnut2d", // The chart type (column2d, bar3d, pie3d, 도 있다.)
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      chart: {
        caption: "Stars Per Language",
        decimals: 0,
        doughnutRadius: "45%", // 파이의 크기
        showPercentValues: 0,
        theme: "candy",

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

export default Doughnut2d;
