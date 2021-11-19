import * as echarts from "../../ec-canvas/echarts";
let chart = null;
let xData = [
  "2015年",
  "2016年",
  "2017年",
  "2018年",
  "2019年",
  "2020年",
  "2021年",
];
let seriesData = [
  "131.15",
  "170.73",
  "217.69",
  "296.36",
  "440.69",
  "457.12",
  "559.11",
];
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
  });
  canvas.setChart(chart);
  var option = {
    title: {
      text: "电影票房收入",
      left: "center",
      textStyle: {
        color: "#000",
        fontSize: 12,
        fontWeight: "normal",
      },
    },
    grid: {
      left: 0,
      right: 0,
      bottom: 10,
      top: 40,
      containLabel: true,
    },
    tootip:{
        trigger:'axis',
        formatter:function(params){
            console.log(params)
        }
    },
    xAxis: {
      type: "category",
      data: xData,
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: seriesData,
        type: "bar",
        barWidth: 20,
        itemStyle: {
          normal: {
            label: {
              show: true, //开启柱子顶部文本显示
              position: "top",
              textStyle: {
                color: "#000",
                fontSzie: 12,
              },
            },
            color: "#518698",
          },
        },
      },
    ]
  };
  chart.setOption(option);
  return chart;
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
