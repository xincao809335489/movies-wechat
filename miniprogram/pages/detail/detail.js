// pages/detail/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    images: [
      "/images/01.JPG",
      "/images/02.JPG",
      "/images/03.JPG",
      "/images/04.JPG",
      "/images/05.JPG",
    ],
    descriptions: [
      {
        description:
          "该片讲述一个家庭因小儿子即将被送去少年观护所而分崩离析，而曾经被视为家中希望的大儿子则因此做出让父母震惊的举动的故事",
        name: "阳光普照",
      },
      {
        description:
          "该片讲述了张九声为看女儿影像不惜冒重罚穿越千里黄沙，途中偶遇寻找废旧胶片做灯罩的刘闺女和从不失误的电影放映员范电影，三人结下不解之缘的故事",
        name: "一秒钟",
      },
      {
        description:
          "该片讲述了达杰一家原本过着普通而日常的生活，却因一只普通的避孕套卷入了一系列尴尬而又难以抉择的事件当中。突然有一天，父亲也意外去世，因此，家庭原有的和谐给彻底打破，从而引发了一系列棘手而又不得不面对的问题。",
        name: "气球",
      },
      {
        description:
          "该片取材于1937年淞沪会战，讲述了被称作“八百壮士”的中国国民革命军第三战区88师524团的一个加强营，固守苏州河畔的四行仓库、阻击日军的故事 [2]  。该片于2020年8月21日在中国内地上映。",
        name: "八佰",
      },
      {
        description:
          "该片讲述了迫切想要孩子的老师林淑玲在不尽如人意的生活中与学生郭伟伦之间逐渐产生暧昧的故事。",
        name: "热带雨",
      },
    ],
    detail: {
      currentImg: "",
      currentDescribe: "",
      name: ""
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { index } = options;
    const { images, descriptions } = this.data;
    const obj = {
        currentImg: images[index],
        currentDescribe: descriptions[index]["description"],
        name: descriptions[index]["name"]
    }
    this.setData({
        detail:Object.assign({},obj)
    });
    this.getComments(index)
    console.log(this.data);
  },
  getComments:function(idx){
    wx.cloud.callFunction({
        name:'comment',
        data:{
            index:idx
        }
    }).then(res=>{
        console.log(res)
        const data = res.result.data;
        this.setData({
          ['detail.comments']:data
        })
    })
  },

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
