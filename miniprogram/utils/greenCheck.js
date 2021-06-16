

const app = getApp()
function wxTextCheck(content) {
  return new Promise((resolve, reject) => {
    // 逻辑：发送请求到服务器
    wx.cloud.callFunction({
      name: "contentSec",
      data: {
        action:"text_sec_check",
        text: content
      },
      success(e) {
        wx.hideLoading();
        wx.showToast({
          title: '内容安全'
        })
        resolve(e);
      },
      fail(e) {
        wx.hideLoading();
        wx.showModal({
          title: '风险提示',
          content: '这是不安全的内容',
          showCancel: false
        })
        reject(e)
      }
    })
  });
}
function wxGreenImgCheck(fileID) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: "contentSec",
      data: {
        action:"img_sec_check",
        img: res.fileID
      }, success(e) {
        resolve(e);
      }, fail(e) {

        wx.hideLoading();
        wx.showModal({
          title: '风险提示',
          content: '这是不安全的内容',
          showCancel: false
        })
        wx.cloud.deleteFile({
          fileList: [fileID]
        })
        reject(e);
      }
    })
  })
}

module.exports = {
  wxTextCheck: wxTextCheck,
  wxGreenImgCheck:wxGreenImgCheck
}