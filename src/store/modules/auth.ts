import { defineStore } from 'pinia'
import { ElMessageBox, ElNotification } from 'element-plus/es'
import { clearLocal, getLocal, setLocal } from '@/utils'
import { EnumStorageKey } from '@/enum'
import { fetchLogin } from '@/api'

export const authStore = defineStore('auth-store', {
  state: (): Auth.User => {
    return {
      userInfo: {
        id: '',
        tenantId: '',
        userCode: '',
        platformId: '',
        platformName: '',
        userName: '',
        userPhone: '',
        userType: 0,
        deleteFlag: false,
        ctime: '',
      },
      token: '',
    }
  },
  getters: {
    getToken: (state): string => {
      return (state.token || getLocal<string>(EnumStorageKey.TOKEN)) ?? ''
    },
    isLogin: (state): boolean => {
      return Boolean(state.token)
    },
    getUserInfo: (state) => {
      if (state.userInfo.id) return state.userInfo
      return (
        getLocal<Auth.UserInfo>(EnumStorageKey.USERINFO) ?? {
          id: '',
          userName: '',
          avatar: '',
        }
      )
    },
  },
  actions: {
    saveToken(token: string) {
      if (token) {
        setLocal(EnumStorageKey.TOKEN, token)
        this.token = token
      }
    },
    saveLoginUser(user: Auth.UserInfo) {
      setLocal(EnumStorageKey.USERINFO, user)
      this.userInfo = user
    },
    async login(params: Api.LoginReq) {
      const { data } = await fetchLogin(params)

      this.saveToken(data.tokenValue)
      this.saveLoginUser(data.user)
      return data.user.userName
    },
    tokenExpire() {
      ElNotification({
        title: '温馨提示',
        message: `会话过期，即将进入登录页面！`,
        type: 'error',
        showClose: false,
        duration: 2000,
        onClose: () => {
          this.loginOut()
        },
      })
    },
    manualLoginOut() {
      ElMessageBox.confirm('您确定要退出系统吗？', '温馨提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
      })
        .then(() => {
          this.loginOut()
        })
        .catch(() => console.log('用户取消了退出系统'))
    },
    loginOut() {
      clearLocal()
      window.location.reload()
    },
  },
})
