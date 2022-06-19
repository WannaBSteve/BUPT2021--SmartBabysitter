const date = new Date()
const years = []
const months = []
const days = []
const hours=[]
const SUBSCRIBE_ID = 'l7G27DHV1NKP1ZBHY1zauJwFhEIY6o9Z7jhFJmeY5pY'  // 下发的模板ID
var OPENID=""
const db=wx.cloud.database();
for (let i = 1990; i <= date.getFullYear(); i++) {
    years.push(i)
  }
  
  for (let i = 1; i <= 12; i++) {
    months.push(i)
  }
  
  for (let i = 1; i <= 31; i++) {
    days.push(i)
  }
  for (let i = 0; i <= 23; i++) {
    hours.push(i)
  }
  
Page({
    data: {
        things: '未命名',
        time:'',
        years,
        year: date.getFullYear(),
        months,
        month: 2,
        days,
        day: 2,
        value: [9999, 1, 1,0],
        hours,
        hour:0,
        switchChecked: false,
    },
    onLoad(){
        wx.cloud.callFunction({
            name: 'getOpenId',
            data: {},
            success: res => {
                console.log(res)
              OPENID = res.result.openid
              console.log(OPENID)
            },
            fail: err => {
              console.error('[云函数] [login] 调用失败', err)
            }
          })
    },
    bindKeyInput(e){
        this.setData({
            things: e.detail.value
        })
    },
    bindChange(e) {
        const val = e.detail.value
        console.log(val)
        this.setData({
          year: this.data.years[val[0]],
          month: this.data.months[val[1]],
          day: this.data.days[val[2]],
          hour: this.data.hours[val[3]],
        })
        if(this.data.days[val[2]]<10){
            this.setData({
                day: "0"+this.data.days[val[2]]
            })
        }
        if(this.data.months[val[1]]<10){
            this.setData({
                month:"0"+this.data.months[val[1]]
            })
        }
        if(this.data.hours[val[3]]<10){
            this.setData({
                hour:"0"+this.data.hours[val[3]]
            })
        }
        this.setData({
            time:this.data.year+"-"+this.data.month+"-"+this.data.day+" "+this.data.hour+":00"
        })
      },
    switchChange(e){
        console.log(e.detail)
        this.setData({
            switchChecked:e.detail.value
        })
    },
    buttontap(){
        var that=this
        if(this.data.switchChecked){
            this.sendMes()
        }
        db.collection('todolist').add({
            data:{
                things:that.data.things,
                time:that.data.time,
            }
        })
        .then(res=>{
            console.log(res)
        })
        wx.showToast({
          title: '备忘录添加成功！',
        })
    },
    sendMes: function(e) {
        var that =this
        console.log(OPENID)
        wx.requestSubscribeMessage({
          tmplIds: [SUBSCRIBE_ID],
          success(res) {
            if (res[SUBSCRIBE_ID] === 'accept') {
                console.log(OPENID)
                var openid=OPENID
              wx.cloud.callFunction({
                  name: 'remind',
                  data: {
                    things:that.data.things,
                    openid:openid,
                    time:that.data.time,
                    templateId: SUBSCRIBE_ID,
                  },
                })
                .then(() => {
                  wx.showToast({
                    title: '设定通知成功！',
                    icon: 'success'
                  });
                })
                .catch(() => {
                });
            }
          },
        });
      }
})







