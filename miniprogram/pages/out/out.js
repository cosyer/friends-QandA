// const arr = require('../../utils/data.js');//模拟数据
const app = getApp().globalData;
const { request } = require("../../utils/request.js");
const { sendQuestionsBank } = require("../../utils/address.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 后台题目集合
    arr: [],
    // 显示题目
    curTopic: {},
    // 存储用户当前指针
    curIndex: 0,
    // 存储用户已经回答完成的题目
    userTopic: [],
    // 当前显示题目数
    curUserIndex: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
  },
  // 请求题目
  init() {
    // 请求参数
    const url = sendQuestionsBank;
    const data = {
      sessionId: app.session_key,
    };
    const method = "GET";
    let arr = [
      {
        question: "黏人吗？",
        answer: [
          {
            id: "1",
            value: "我是个很黏人的人。",
          },
          {
            id: "2",
            value: "我不黏人。",
          },
        ],
      },
      {
        question: "你的思想？",
        answer: [
          {
            id: "3",
            value: "我生活中是一个很污的人，经常讲黄段子。",
          },
          {
            id: "4",
            value: "我是小纯洁，生活中一点都不污。",
          },
        ],
      },
      {
        question: "关于你的脾气？",
        answer: [
          {
            id: "5",
            value: "我很少发脾气，讲究以理服人。",
          },
          {
            id: "6",
            value: "我虽然爱发脾气，但是我内心是善良的。",
          },
        ],
      },
      {
        question: "可以接受对象偷看手机吗？",
        answer: [
          {
            id: "7",
            value: "可以接受。",
          },
          {
            id: "8",
            value: "无法接受。",
          },
        ],
      },
      {
        question: "关于荤段子",
        answer: [
          {
            id: "9",
            value: "不喜欢，没意思。",
          },
          {
            id: "10",
            value: "荤段子让生活变得更有趣。",
          },
        ],
      },
      {
        question: "玩游戏充钱么？",
        answer: [
          {
            id: "11",
            value: "充",
          },
          {
            id: "12",
            value: "不充",
          },
        ],
      },
      {
        question: "喜欢吃肥肉吗？",
        answer: [
          {
            id: "13",
            value: "喜欢",
          },
          {
            id: "14",
            value: "不喜欢",
          },
        ],
      },
      {
        question: "说说你的性格？",
        answer: [
          {
            id: "15",
            value: "内向",
          },
          {
            id: "16",
            value: "活泼",
          },
        ],
      },
      {
        question: "面对朋友的请求？",
        answer: [
          {
            id: "17",
            value: "有求必应",
          },
          {
            id: "18",
            value: "婉拒",
          },
        ],
      },
      {
        question: "女朋友和游戏哪个重要？",
        answer: [
          {
            id: "19",
            value: "女朋友",
          },
          {
            id: "20",
            value: "游戏",
          },
        ],
      },
    ];
    this.setData({
      arr: arr, //所有题
      curTopic: arr[0], //当前题
    });
    // request(url, data, method, (res) => {
    //   const arr = res.data.data;
    //   this.setData({
    //     arr: arr, //所有题
    //     curTopic: arr[0], //当前题
    //   });
    // });
  },
  // 用户回答问题
  userAnswer(event) {
    const dataset = event.currentTarget.dataset;
    const question = dataset.question;
    const answer = question.answer;
    const answerId = dataset.answer;
    // 获取当前指针
    const curIndex = this.data.curIndex;
    // 保存用户回答完成的题目并改变状态
    answer.forEach((item) => {
      if (item.id == answerId) {
        item.is_right = 1;
      } else {
        item.is_right = 0;
      }
      return item;
    });
    // 这块需要把已经完成的题目删除掉，防止循环出用户已经打完的题目，注意：指针的不变
    this.data.arr.splice(curIndex, 1);
    // 保存已经完成的题目
    this.data.userTopic.push(question);
    // 判断是否结束
    if (this.data.userTopic.length < 10) {
      this.setData({
        curUserIndex: this.data.userTopic.length + 1,
      });
      // 进行换题,string类型表示指针不变
      this.changeTopic("string");
    } else {
      // 完成提交数据并跳转页面
      this.userOver();
    }
    // console.log(this.data.userTopic, this.data.arr.length);
  },
  // 用户完成出题并把题目情况，带到下一层
  userOver() {
    wx.redirectTo({
      url: "/pages/outover/outover?list=" + JSON.stringify(this.data.userTopic),
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    });
  },
  // 换一题
  changeTopic(item) {
    // 获取题目集合
    const arr = this.data.arr;
    // 题目长度
    const len = arr.length;
    // 获取指针并循环处理
    let curIndex = (this.data.curIndex + 1) % len;
    if (typeof item == "string") {
      // 不增长
      curIndex = this.data.curIndex % len;
    } else {
      // 增长
      curIndex = (this.data.curIndex + 1) % len;
    }
    // 改变当前题目
    this.setData({
      curTopic: arr[curIndex],
      curIndex: curIndex,
    });
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
