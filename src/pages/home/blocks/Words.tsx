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

type State = {
  open: boolean;
};

function randomData() {
  var a = Math.random();
  if (a > 0 && a <= 0.333)
    return 0;
  if (a > 0.333 && a <= 0.666)
    return 90;
  return -90;
}

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

//110  35  14/18
var geoCoordMap: any = {
  "中共中央政治局": [104.99, 36.04],
  "常务委员会": [95.08, 44.3],
  "会议": [123.53, 43.24],
  "听取": [106.21, 27.35],
  "吉林长春": [108.61, 44.57],
  "长生": [103.58, 38.69],
  "公司": [101.39, 47.5],
  "疫苗": [97.53, 32.89],
  "案件": [112.46, 31.65],
  "调查": [95.65, 36.0],
  "问责": [100.15, 45.99],
  "情况": [102.89, 37.34],
  "汇报": [98.69, 38.77],
  "中共中央": [105.82, 35.02],
  "总书记": [121.9, 41.05],
  "习近平": [113.57, 41.37],
  "主持会议": [126.32, 30.97],
  "发表": [94.76, 47.18],
  "重要讲话": [117.52, 46.9],
  "这起": [100.95, 34.62],
  "发生": [90.33, 37.6],
  "高度重视": [108.29, 37.91],
  "作出": [124.89, 35.73],
  "指示": [108.42, 47.71],
  "查清": [101.92, 28.49],
  "事实真相": [112.78, 47.68],
  "严肃": [108.35, 36.48],
  "依法": [110.25, 39.51],
  "从严处理": [118.38, 30.86],
  "守住": [113.1, 38.09],
  "底线": [113.0, 34.17],
  "保障": [97.19, 34.41],
  "群众": [90.58, 26.0],
  "切身利益": [116.88, 32.39],
  "社会": [98.17, 23.91],
  "稳定": [104.51, 43.17],
  "大局": [100.77, 32.43],
  "党": [84.31, 39.14],
  "十八": [104.78, 30.31],
  "健康": [106.42, 28.41],
  "场合": [104.57, 41.79],
  "食品安全": [88.72, 38.85],
  "药品": [88.55, 43.72],
  "重要性": [105.3, 31.97],
  "一系列": [106.65, 40.06],
  "论述": [110.7, 32.79],
  "点击": [116.02, 27.91],
  "一页": [109.5, 42.9],
  "猛药": [91.26, 34.25],
  "刮骨": [114.8, 29.88],
  "疗毒": [96.39, 42.43],
  "决心": [99.32, 40.33],
  "完善": [93.11, 30.84],
  "我国": [117.27, 36.07],
  "管理体制": [100.79, 41.93],
  "确保": [107.9, 25.47],
  "各级党委": [101.26, 44.75],
  "政府": [113.42, 43.33],
  "义不容辞": [109.56, 34.71],
  "之责": [114.0, 25.86],
  "始终": [94.57, 37.56],
  "身体健康": [94.81, 40.81],
  "放在首位": [117.34, 33.63],
  "生物": [126.78, 37.85],
  "2018": [125.32, 29.18],
  "国民": [120.43, 25.46],
  "政策": [116.81, 37.32],
  "提供": [125.11, 33.55],
  "全方位": [112.1, 28.46],
  "全": [120.02, 45.17],
  "周期": [90.69, 27.94],
  "服务": [88.07, 35.42],
  "民族": [101.26, 24.91],
  "昌盛": [118.34, 39.73],
  "国家": [86.51, 41.1],
  "富强": [92.12, 36.14],
  "标志": [83.82, 35.38],
  "深化": [120.23, 43.85],
  "医药卫生": [120.98, 27.9],
  "体制改革": [105.44, 23.89],
  "建立": [121.92, 37.69],
  "中国": [87.08, 29.89],
  "特色": [90.33, 32.27],
  "医疗卫生": [96.57, 28.24],
  "制度": [87.68, 30.9],
  "医疗保障": [95.81, 26.73],
  "优质": [89.72, 44.8],
  "高效": [114.34, 26.88],
  "服务体系": [120.43, 42.39],
  "健全": [107.91, 30.26],
  "医院": [92.65, 39.07],
  "管理制度": [96.6, 29.34],
  "基层": [94.05, 25.15],
  "全科": [122.97, 38.86],
  "医生": [97.76, 37.56],
  "队伍": [109.54, 24.0],
  "建设": [115.23, 45.31],
  "取消": [89.74, 42.52],
  "以药": [104.41, 25.27],
  "养医": [87.17, 32.98],
};

//0-500
var data = [
  { name: "中共中央政治局", value: 51 },
  { name: "常务委员会", value: 269 },
  { name: "会议", value: 385 },
  { name: "听取", value: 342 },
  { name: "吉林长春", value: 477 },
  { name: "长生", value: 368 },
  { name: "公司", value: 421 },
  { name: "疫苗", value: 43 },
  { name: "案件", value: 368 },
  { name: "调查", value: 411 },
  { name: "问责", value: 219 },
  { name: "情况", value: 412 },
  { name: "汇报", value: 174 },
  { name: "中共中央", value: 371 },
  { name: "总书记", value: 475 },
  { name: "习近平", value: 372 },
  { name: "主持会议", value: 489 },
  { name: "发表", value: 259 },
  { name: "重要讲话", value: 388 },
  { name: "这起", value: 422 },
  { name: "发生", value: 195 },
  { name: "高度重视", value: 102 },
  { name: "作出", value: 75 },
  { name: "指示", value: 116 },
  { name: "查清", value: 273 },
  { name: "事实真相", value: 299 },
  { name: "严肃", value: 349 },
  { name: "依法", value: 219 },
  { name: "从严处理", value: 448 },
  { name: "守住", value: 276 },
  { name: "底线", value: 270 },
  { name: "保障", value: 404 },
  { name: "群众", value: 246 },
  { name: "切身利益", value: 94 },
  { name: "社会", value: 440 },
  { name: "稳定", value: 230 },
  { name: "大局", value: 352 },
  { name: "党", value: 11 },
  { name: "十八", value: 11 },
  { name: "健康", value: 39 },
  { name: "场合", value: 163 },
  { name: "食品安全", value: 382 },
  { name: "药品", value: 329 },
  { name: "重要性", value: 460 },
  { name: "一系列", value: 444 },
  { name: "论述", value: 302 },
  { name: "点击", value: 331 },
  { name: "一页", value: 55 },
  { name: "猛药", value: 225 },
  { name: "刮骨", value: 19 },
  { name: "疗毒", value: 317 },
  { name: "决心", value: 357 },
  { name: "完善", value: 430 },
  { name: "我国", value: 312 },
  { name: "管理体制", value: 50 },
  { name: "确保", value: 91 },
  { name: "各级党委", value: 266 },
  { name: "政府", value: 141 },
  { name: "义不容辞", value: 119 },
  { name: "之责", value: 192 },
  { name: "始终", value: 143 },
  { name: "身体健康", value: 289 },
  { name: "放在首位", value: 368 },
  { name: "生物", value: 144 },
  { name: "2018", value: 256 },
  { name: "国民", value: 103 },
  { name: "政策", value: 164 },
  { name: "提供", value: 197 },
  { name: "全方位", value: 88 },
  { name: "全", value: 342 },
  { name: "周期", value: 293 },
  { name: "服务", value: 62 },
  { name: "民族", value: 52 },
  { name: "昌盛", value: 458 },
  { name: "国家", value: 313 },
  { name: "富强", value: 118 },
  { name: "标志", value: 106 },
  { name: "深化", value: 289 },
  { name: "医药卫生", value: 61 },
  { name: "体制改革", value: 490 },
  { name: "建立", value: 260 },
  { name: "中国", value: 335 },
  { name: "特色", value: 119 },
  { name: "医疗卫生", value: 100 },
  { name: "制度", value: 4 },
  { name: "医疗保障", value: 34 },
  { name: "优质", value: 201 },
  { name: "高效", value: 345 },
  { name: "服务体系", value: 411 },
  { name: "健全", value: 314 },
  { name: "医院", value: 341 },
  { name: "管理制度", value: 183 },
  { name: "基层", value: 421 },
  { name: "全科", value: 123 },
  { name: "医生", value: 449 },
  { name: "队伍", value: 116 },
  { name: "建设", value: 181 },
  { name: "取消", value: 135 },
  { name: "以药", value: 370 },
  { name: "养医", value: 81 },
];



var convertData = function (data: any) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        label: {
          normal: {
            color: colorData(data[i].value)[0],
            fontSize: data[i].value / 40 + 6,
            fontWeight: colorData(data[i].value)[1],
            fontFamily: colorData(data[i].value)[2],
            //rotate: randomData(),
          },
        },
        name: data[i].name,
        value: geoCoord.concat(data[i].value),
      });
    }
  }
  return res;
};

class Word extends React.Component<WithStyles<typeof styles>, State> {
  state = {
    open: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

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

export default withRoot(withStyles(styles)(Word));
