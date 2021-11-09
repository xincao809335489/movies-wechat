const db = wx.cloud.database(); // 引入数据库
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content:'',
        detail:'',
        fileList:[],
        curImgLen:0,
        _id:0
    },
    
    getMoviesDetail(name){
        const _this = this;
        wx.cloud.callFunction({
            name:'moviedetail',
            data:{
                name
            }
        }).then(res=>{
            const {content} = res.result.obj
            this.setData({
                detail:res.result.obj,
                content:content?content:''
            })
            //获取数据库中缩略图
            this.getImages(name)
        }).catch(err=>{
            console.log(err)
        })
    },
    getImages:function(name){
        db.collection('comment').where({
            name
        }).get().then(res=>{
            this.setData({
                fileList:res.data[0].fileList
            });
            
        }).catch(err=>{
            console.log(err)
        })
    },
    submit:function(){
        const {content,fileList,detail,curImgLen} = this.data
        const _this = this
        if(!fileList.length) return wx.showToast({
          title: '请选择至少一张照片',
          icon:'none'
        })
        if(fileList.length===curImgLen){
            return;
        }
        wx.showLoading({
          title: '提交中',
        })
        let promiseArr = [],files = [];
        fileList.forEach(item=>{
            const suffix = item.url.split('.')[1];
            promiseArr.push(new Promise((resolve,reject) => {
                wx.cloud.uploadFile({
                    cloudPath: `${new Date().getTime()}.${suffix}`,
                    filePath: item.thumb, // 文件路径
                    success: res => {
                      const fileIds = files.concat(res.fileID)
                      resolve(fileIds);
                    },
                    fail: err => {
                      console.log(err)
                    }
                  })
            }))
        });
        Promise.all(promiseArr).then(res => {
            wx.cloud.callFunction({
                name:'updateMemory',
                data:{
                    name:detail.name
                }
            }).then(ret=>{
                wx.hideLoading();
                if(ret.result.data && ret.result.data.length){
                    //更新对应数据库
                    db.collection('comment').where({
                        name:detail.name
                    }).update({
                        data:{
                            content,
                            score:detail.score,
                            fileList,
                            fileIds:res
                        }
                    })
                    wx.showToast({
                        title: '提交成功',
                    });
                }else{
                    //添加到数据库
                    _this.addComment(res)
                }
                //更新数据库
                _this.updateLists()
            }).catch(err=>{
                console.log(err)
            })
        })

    },
    addComment(data){
        const {content,fileList,detail} = this.data
        db.collection('comment').add({
            data:{
                name:detail.name,
                content:content,
                score:detail.score,
                fileList:fileList,
                fileIds:data
            }
        }).then(()=>{
            wx.showToast({
              title: '提交成功',
            });
        }).catch(err=>{
            wx.hideLoading();
            wx.showToast({
              title:err,
            })
        })
    },
    updateLists:function(){
        const {name,score} = this.data.detail
        const {content} = this.data
        wx.cloud.callFunction({
            name:'updateData',
            data:{
                name,
                score,
                content
            }
        }).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    },
    upload:function(event){
        const {fileList} = this.data;
        const {file} = event.detail;
        this.setData({
            curImgLen:fileList.length
        })
        let imgs = file.map(item=>{
            return {
                thumb:item.thumb,
                url:item.url
            }
        })
        this.setData({
            fileList:fileList.concat(imgs)
        })
    },
    onChangeScore:function(event){
        this.setData({
            ['detail.score']:event.detail
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const {name} = options
        this.getMoviesDetail(name)
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