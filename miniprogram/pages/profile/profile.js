// pages/profile/profile.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
    },
    onItemClick:function(e){
        var target = '/pages/pay/pay?code=' + e.currentTarget.dataset.pay;
        wx.navigateTo({
          url: target
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },
    submit:function(){
        const {isLogin} = this.data
        this.setData({
            isLogin:!isLogin
        })
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
        setTimeout(()=>{
            wx.stopPullDownRefresh();
        },1000)
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