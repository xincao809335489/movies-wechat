/*
 * @Author: your name
 * @Date: 2021-11-10 17:05:48
 * @LastEditTime: 2021-11-11 19:51:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \miniprogram-movie\miniprogram\pages\index\index.js
 */
// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        movies:[
            {url:'/images/01.JPG'},  
            {url:'/images/02.JPG'},
            {url:'/images/03.JPG'},  
            {url:'/images/04.JPG'},
            {url:'/images/05.JPG'}
        ],
        movieGroup:[
            {
                title:'历史记录',
                data:['']
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})