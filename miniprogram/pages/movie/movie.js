// pages/movie/movie.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        movieList:[],
        pageIndex:0,
        pageSize:10,
        total:0
    },
    /**
     * 获取列表
     */
    getMovieList:function(){
        wx.showLoading({
          title: '加载中',
        })
        wx.cloud.callFunction({
            name:'movielist',
            data:{
                pageIndex:this.data.pageIndex,
                pageSize:this.data.pageSize
            }
        }).then(res=>{
            console.log(res)
            this.setData({
                movieList:this.data.movieList.concat(res.result.data),
                total:res.result.total
            });
            wx.hideLoading()
        }).catch(err=>{
            console.log(err)
            wx.hideLoading()
        })
    },
    gotoComment:function(event){
        const name = event.target.dataset.name;
        wx.navigateTo({
          url: '../comment/comment?name=' + name,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //获取电影列表数据
        this.getMovieList();
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
        this.data.movieList = []
        this.onLoad();
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
       this.data.pageIndex++;
       if(this.data.movieList.length>=this.data.total) return;
       this.getMovieList();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})