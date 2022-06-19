
const mapMedicine1=new Map()
const mapMedicine2=new Map()
const mapMedicine3=new Map()

const devicesId = "561894778" // 填写在OneNet上获得的devicesId 形式就是一串数字 例子:9939133
const api_key = "FuM9eOjE5VZo=LTPjsqtHI7Osvk=" // 填写在OneNet上的 api-key 例子: VeFI0HZ44Qn5dZO14AuLbWSlSlI=
var maps=[mapMedicine1,mapMedicine2,mapMedicine3]
var three=['早晨','中午','晚上']
var i=0
for(i=0;i<3;i++){
maps[i].set("维生素C片",0),
maps[i].set("板蓝根冲剂（包）",0),
maps[i].set("肠炎宁",0)
}


Page({
    
  data: {
    temperature:"0",
    water:"0"
  },

getPills:function(){
wx.showToast({
    icon:'none',
  title: '鸡哥智能保姆提醒您多喝热水捏!!!',

  duration:3000
})
var pillthis=this;
wx.showActionSheet({
    title:'请选择当前服药时间点',
    itemList: ['早','中','晚'],
    success:function(res){
        if(!res.cancel){
            console.log(res.tapIndex),
            maps[res.tapIndex].forEach((elem,value)=>{
                wx.showModal({
                    cancelColor: 'cancelColor',
                    title:'药物提示：',
                    content:three[res.tapIndex]+'的服药计划是: '+value+' '+elem,
                    success:function(res){
                        if(res.confirm){
                           
                        }
                    }
                  })
            })
        }
    }
  })
  
},
  getdata:function () {
    wx.showLoading({
      title: "正在获取"
    })
    console.log(`your deviceId: ${devicesId}, apiKey: ${api_key}`)
    var _this = this;
    wx.request({
      url: `https://api.heclouds.com/devices/${devicesId}/datapoints?datastream_id=Temperature,Water&limit=1`,/**设置API地址 */
      header: {
        'content-type': 'application/json',
        'api-key': api_key
      },
      success: function (res) {
        console.log(res.data);
        _this.setData({
          temperature: res.data.data.datastreams[1].datapoints[0].value,
          water: res.data.data.datastreams[0].datapoints[0].value
        });
        wx.hideLoading();
      },
      fail: function () {
        wx.showToast({
          title: '与服务器通信失败',
          icon: 'fail',
          duration: 1000
        })
        wx.hideLoading();
      }
    })
  },

 

onLoad: function () {
  console.log(`your deviceId: ${devicesId}, apiKey: ${api_key}`)
  var _this = this;
  wx.request({
    url: `https://api.heclouds.com/devices/${devicesId}/datapoints?datastream_id=Temperature,Water&limit=1`,/**设置API地址 */
    header: {
      'content-type': 'application/json',
      'api-key': api_key
    },
    success: function (res) {
      console.log(res.data);
      _this.setData({
        temperature: res.data.data.datastreams[1].datapoints[0].value,
        water: res.data.data.datastreams[0].datapoints[0].value
      });
    },
    fail: function () {
      wx.showToast({
        title: '与服务器通信失败',
        icon: 'fail',
        duration: 1000
      })
    }
  })
}
})