import { MockMethod } from 'vite-plugin-mock'
import { successResult } from './tool'

export default [
  {
    url: '/dev/user/login',
    method: 'post',
    response: ({ body }: reqType) => {
      console.log('body', body.password)
      return successResult({
        "user": {
          "platformId": "1523562161681600512",
          "platformName": "SALS",
          "id": "1524641113795862528",
          "tenantId": "1524641113795862528",
          "userCode": null,
          "userName": "上山纳凉",
          "userPhone": "18092164251",
          "avatar": "https://dhzl-test.oss-cn-beijing.aliyuncs.com/image.jpg",
          "password": "",
          "ext": null,
          "deleteFlag": 1,
          "utime": "2022-05-26 18:08:50",
          "ctime": null,
          "userType": 0
        },
        "tokenName": null,
        "tokenValue": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbk5hbWUiOiIxODA5MjE2NDI1MSIsImV4cCI6MTY1ODIzMTQ0MywidXNlcklkIjoiMTUyNDY0MTExMzc5NTg2MjUyOCJ9.1b-oSk0xuIwAk7stGGstnHnRcUvBS7y35272NBVPnqw"
      })
    },
  },
  {
    url: '/dev/user/getUserMenu',
    method: 'get',
    response: ({ query }: reqType) => {
      return successResult({children: menuArr})
    },
  },
] as MockMethod[]

interface reqType {
  query: Record<string, any>
  body: Record<string, any>
}

const menuArr = [
  {
    "id": "1531535251229253632",
    "pid": "-1",
    "name": "业务中心",
    "sort": "1653981433099",
    "children": [
      {
        "id": "1533621881226272768",
        "pid": "1531535251229253632",
        "name": "产品管理",
        "sort": "1654478924458",
        "children": [
          {
            "id": "1533623125395251200",
            "pid": "1533621881226272768",
            "name": "门票基础产品",
            "sort": "1654479221091",
            "data": {
              "id": "1533623125395251200",
              "pid": "1533621881226272768",
              "platformId": "1523562161681600512",
              "level": 3,
              "permission": "",
              "isHidden": 0,
              "menuName": "门票基础产品",
              "sortNo": "1654479221091",
              "path": "ticket_base",
              "component": "/business/product/ticketBase",
              "icon": "iconoir:3d-select-face",
              "ext": null,
              "utime": "2022-06-06T10:32:14",
              "ctime": "2022-06-06T09:33:41"
            }
          },
          {
            "id": "1533623391574171648",
            "pid": "1533621881226272768",
            "name": "门票产品",
            "sort": "1654479284553",
            "data": {
              "id": "1533623391574171648",
              "pid": "1533621881226272768",
              "platformId": "1523562161681600512",
              "level": 3,
              "permission": "",
              "isHidden": 0,
              "menuName": "门票产品",
              "sortNo": "1654479284553",
              "path": "ticket",
              "component": "/business/product/ticket",
              "icon": "ic:baseline-grid-view",
              "ext": null,
              "utime": "2022-06-06T10:32:19",
              "ctime": "2022-06-06T09:34:45"
            }
          }
        ],
        "data": {
          "id": "1533621881226272768",
          "pid": "1531535251229253632",
          "platformId": "1523562161681600512",
          "level": 2,
          "permission": "",
          "isHidden": 0,
          "menuName": "产品管理",
          "sortNo": "1654478924458",
          "path": "product",
          "component": "BLANK",
          "icon": "ic:baseline-call-to-action",
          "ext": null,
          "utime": null,
          "ctime": "2022-06-06T09:28:44"
        }
      },
    ],
    "data": {
      "id": "1531535251229253632",
      "pid": "-1",
      "platformId": "1523562161681600512",
      "level": 1,
      "permission": "",
      "isHidden": 0,
      "menuName": "业务中心",
      "sortNo": "1653981433099",
      "path": "business",
      "component": "LAYOUT",
      "icon": "ic:baseline-touch-app",
      "ext": null,
      "utime": null,
      "ctime": "2022-05-31T15:17:13"
    }
  }
]