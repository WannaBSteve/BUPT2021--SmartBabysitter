const db=wx.cloud.database();
Page({
  data: {
    databack:''//用来存储显示的表格
  },

addtodolist(){
    wx.navigateTo({
        url: '/pages/addtodolist/addtodolist'
    })
},
  onLoad: function() {//将预设的数据信息存入数据库
    db.collection('todolist').where({}).count({
      success:res=>{
        if(res.total==0){
            wx.showToast({
                title: '备忘录空啦^_^',
              })
          }
        else{
          this.refreshTable()
        }
      },
      fail:err=>{
        console.error(err)
      }
    })
  },
  refreshTable:function(){
    db.collection('todolist').where({}).get({//利用空条件获取数据库内全部信息
      success:res=>{
        this.setData({
          databack:res.data
        })
        console.log(res.data)
      },
      fail: err=>{
        console.error(err)
      }
    })
  },
  delete:function(e){
      console.log(e)
      var things=e.currentTarget.id
    db.collection('todolist').where({
      things:things
    }).get({
      success:res=>{
        console.log(res.data)
        var _id=res.data[0]._id
        db.collection('todolist').doc(_id).remove({
          success:res=>{
            console.log(res)
            this.refreshTable();
          },
          fail:err=>{
            console.error(err)
          }
        })
      },
      fail:err=>{
        console.error(err)
      }
    })
  },
})