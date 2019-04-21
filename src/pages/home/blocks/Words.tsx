import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import ReactEcharts from "echarts-for-react";
import withRoot from '../../../withRoot';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
    },
  });

type State = {};

function colorData(value: any) {
  if (value > 450)
    return ["white", "bold", '幼圆'];
  if (value > 400)
    return ["peachpuff", "bold", '幼圆'];
  if (value > 300)
    return ["sandybrown", "normal", "黑体"];
  if (value > 150)
    return ["chocolate", "normal", "黑体"];
  return ["saddlebrown", "normal", "黑体"];
}

const geoCoordMap: any = {
  "2019": [118.38, 30.86],
  "1995": [110.38, 35.86],
  "林州": [102.89, 37.34],
  "Wiolem": [121.9, 41.05],
  "河南大学": [106.65, 40.06],
  "JavaScript": [118.34, 37.73],
  "佛系少女": [105.44, 28.89],
  "网易云音乐": [100.44, 34.89],
  "房东的猫": [105.3, 31.97],
  "周杰伦": [108.61, 44.57],
  "杭州": [97.76, 37.56],
  "西溪园区": [117.34, 33.63],
  "盒马": [150.76, 37.56],
};

const data = [
  { name: "2019", value: 448 },
  { name: "1995", value: 448 },
  { name: "林州", value: 412 },
  { name: "Wiolem", value: 475 },
  { name: "河南大学", value: 444 },
  { name: "JavaScript", value: 458 },
  { name: "佛系少女", value: 490 },
  { name: "网易云音乐", value: 490 },
  { name: "房东的猫", value: 460 },
  { name: "周杰伦", value: 477 },
  { name: "杭州", value: 449 },
  { name: "西溪园区", value: 368 },
  { name: "盒马", value: 449 },
];

const convertData = function (data: any) {
  const res = [];
  for (let i = 0; i < data.length; i++) {
    const geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        label: {
          normal: {
            color: colorData(data[i].value)[0],
            fontSize: data[i].value / 40 + 6,
            fontWeight: colorData(data[i].value)[1],
            fontFamily: colorData(data[i].value)[2],
          },
        },
        name: data[i].name,
        value: geoCoord.concat(data[i].value),
      });
    }
  }
  return res;
};

class Words extends React.Component<WithStyles<typeof styles>, State> {

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <ReactEcharts
          style={{ height: '100%' }}
          option={{
            visualMap: {
              type: "continuous",
              show: false,
              calculable: true,
              min: 0,
              max: 500,
              inRange: {
                color: ['blue', 'red', 'green'],
              }
            },
            backgroundColor: 'black',
            geo: {
              center: [106, 36],
              zoom: 1.5,
              silent: true,
              map: 'china',
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: 'black',
                  borderColor: 'black'
                },
              }
            },
            series: [{
              name: '散点',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: convertData(data),
              symbolSize: 0.1,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'inside',
                  show: true,
                },
                emphasis: {
                  show: true,
                }
              },
            }, {
              name: 'AQI',
              type: 'heatmap',
              coordinateSystem: 'geo',
              data: convertData(data),
              blurSize: 100,
              minOpacity: 0.03,
              maxOpacity: 0.9,
            },

            ]
          }}
          notMerge={true}
          lazyUpdate={true}
          theme='dark'
          onChartReady={() => {}}
          onEvents={{}}
          opts={{}}
        />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Words));
