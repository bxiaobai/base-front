import { defineStore } from 'pinia'
import { ref } from 'vue'

const useLoginUserStore = defineStore('loginUser', () => {
  //默认值
  const loginUser = ref<any>({
    userName: '未登录',
  })

  //登录用户
  async function fetchLoginUser() {
    // todo 后端没有接口，暂时设置
    // const res = await doLoginUsingGET()
    // loginUser.value = res.data
    //测试设置三秒后设置admin
    setTimeout(() => {
      loginUser.value = {
        id : 1,
        userName: 'admin',
      }
    }, 3000)
  }

  //放入loginUser
  function setLoginUser(newUser: any) {
    loginUser.value = newUser
  }

  return {
    loginUser,
    fetchLoginUser,
  }
})

export default useLoginUserStore
