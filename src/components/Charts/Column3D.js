import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

// 차트 컴포넌트
const Column3D = ({ data }) => {
  const chartConfigs = {
    type: "column3d", // The chart type (column2d 도 있고, bar3d 도 있다.)
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      chart: {
        caption: "Most Popular",
        yAxisName: "Stars",
        xAxisName: "Repos",
        yAxisNameFontSize: "16px",
        xAxisNameFontSize: "16px",
      },
      data: data,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default Column3D;

// 아래 Render the Chart에서 가져옴
// https://www.fusioncharts.com/dev/getting-started/react/your-first-chart-using-react
