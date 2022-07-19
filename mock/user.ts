import { MockMethod } from 'vite-plugin-mock'

interface reqType {
  query: Record<string, any>
  body: Record<string, any>
}
export default [
  {
    url: '/dev/getUserMenu',
    method: 'get',
    response: ({ query }: reqType) => {
      return {
        code: 0,
        data: {
          children: menuArr,
        },
      }
    },
  },
] as MockMethod[]

const menuArr = [
  {
    "id": "1523910303543336960",
    "pid": "-1",
    "name": "首页",
    "sort": "1652163503906",
    "children": [
      {
        "id": "1523915583639396352",
        "pid": "1523910303543336960",
        "name": "主控台",
        "sort": "1652164762771",
        "data": {
          "id": "1523915583639396352",
          "pid": "1523910303543336960",
          "platformId": "1523562161681600512",
          "level": 3,
          "permission": "",
          "isHidden": 0,
          "menuName": "主控台",
          "sortNo": "1652164762771",
          "path": "console",
          "component": "/dashboard/console/index",
          "icon": "mdi:airplane-edit",
          "ext": null,
          "utime": "2022-06-14T11:30:15",
          "ctime": "2022-05-10T14:39:23"
        }
      }
    ],
    "data": {
      "id": "1523910303543336960",
      "pid": "-1",
      "platformId": "1523562161681600512",
      "level": 1,
      "permission": "",
      "isHidden": 0,
      "menuName": "首页",
      "sortNo": "1652163503906",
      "path": "dashboard",
      "component": "LAYOUT",
      "icon": "uil:basketball",
      "ext": null,
      "utime": "2022-05-12T14:15:18",
      "ctime": "2022-05-10T14:18:24"
    }
  },
  {
    "id": "1523915789118349312",
    "pid": "-1",
    "name": "系统管理",
    "sort": "1652164811769",
    "children": [
      {
        "id": "1523915945494585344",
        "pid": "1523915789118349312",
        "name": "角色管理",
        "sort": "1652164849052",
        "data": {
          "id": "1523915945494585344",
          "pid": "1523915789118349312",
          "platformId": "1523562161681600512",
          "level": 3,
          "permission": "",
          "isHidden": 0,
          "menuName": "角色管理",
          "sortNo": "1652164849052",
          "path": "role",
          "component": "/system/role/index",
          "icon": "ph:android-logo",
          "ext": null,
          "utime": "2022-05-12T14:32:58",
          "ctime": "2022-05-10T14:40:49"
        }
      },
      {
        "id": "1523916057214066688",
        "pid": "1523915789118349312",
        "name": "部门管理",
        "sort": "1652164875688",
        "data": {
          "id": "1523916057214066688",
          "pid": "1523915789118349312",
          "platformId": "1523562161681600512",
          "level": 3,
          "permission": "",
          "isHidden": 0,
          "menuName": "部门管理",
          "sortNo": "1652164875688",
          "path": "department",
          "component": "/system/department/index",
          "icon": "ic:baseline-inventory",
          "ext": null,
          "utime": "2022-05-12T14:33:06",
          "ctime": "2022-05-10T14:41:16"
        }
      },
      {
        "id": "1524635034596810752",
        "pid": "1523915789118349312",
        "name": "用户管理",
        "sort": "1652336293254",
        "data": {
          "id": "1524635034596810752",
          "pid": "1523915789118349312",
          "platformId": "1523562161681600512",
          "level": 3,
          "permission": "",
          "isHidden": 0,
          "menuName": "用户管理",
          "sortNo": "1652336293254",
          "path": "user",
          "component": "/system/user/index",
          "icon": "ri:user-star-line",
          "ext": null,
          "utime": "2022-05-12T14:33:14",
          "ctime": "2022-05-12T14:18:13"
        }
      },
      {
        "id": "1527108011586363392",
        "pid": "1523915789118349312",
        "name": "操作日志",
        "sort": "1652925896897",
        "data": {
          "id": "1527108011586363392",
          "pid": "1523915789118349312",
          "platformId": "1523562161681600512",
          "level": 2,
          "permission": "",
          "isHidden": 0,
          "menuName": "操作日志",
          "sortNo": "1652925896897",
          "path": "log",
          "component": "/system/log/index",
          "icon": "iconoir:database-backup",
          "ext": null,
          "utime": null,
          "ctime": "2022-05-19T10:04:57"
        }
      },
      {
        "id": "1528579917619535872",
        "pid": "1523915789118349312",
        "name": "客服管理",
        "sort": "1653276826654",
        "data": {
          "id": "1528579917619535872",
          "pid": "1523915789118349312",
          "platformId": "1523562161681600512",
          "level": 3,
          "permission": "",
          "isHidden": 0,
          "menuName": "客服管理",
          "sortNo": "1653276826654",
          "path": "customerServiceManager",
          "component": "/system/customerServiceManager/index",
          "icon": "ri:user-star-line",
          "ext": null,
          "utime": "2022-06-21T09:58:29",
          "ctime": "2022-05-23T11:33:47"
        }
      }
    ],
    "data": {
      "id": "1523915789118349312",
      "pid": "-1",
      "platformId": "1523562161681600512",
      "level": 1,
      "permission": "",
      "isHidden": 1,
      "menuName": "系统管理",
      "sortNo": "1652164811769",
      "path": "system",
      "component": "LAYOUT",
      "icon": "ic:baseline-call-to-action",
      "ext": null,
      "utime": "2022-06-21T09:43:20",
      "ctime": "2022-05-10T14:40:12"
    }
  },
  {
    "id": "1523917849742155776",
    "pid": "-1",
    "name": "个人中心",
    "sort": "1652165303060",
    "children": [
      {
        "id": "1524639987499409408",
        "pid": "1523917849742155776",
        "name": "账户中心",
        "sort": "1652337474118",
        "children": [
          {
            "id": "1523918064599572480",
            "pid": "1524639987499409408",
            "name": "基础资料",
            "sort": "1652165354286",
            "data": {
              "id": "1523918064599572480",
              "pid": "1524639987499409408",
              "platformId": "1523562161681600512",
              "level": 3,
              "permission": "",
              "isHidden": 0,
              "menuName": "基础资料",
              "sortNo": "1652165354286",
              "path": "basic",
              "component": "/personal/account/basic/index",
              "icon": "mi:copy",
              "ext": null,
              "utime": "2022-05-12T14:38:49",
              "ctime": "2022-05-10T14:49:14"
            }
          }
        ],
        "data": {
          "id": "1524639987499409408",
          "pid": "1523917849742155776",
          "platformId": "1523562161681600512",
          "level": 2,
          "permission": "",
          "isHidden": 0,
          "menuName": "账户中心",
          "sortNo": "1652337474118",
          "path": "account",
          "component": "BLANK",
          "icon": "ic:baseline-lock",
          "ext": null,
          "utime": null,
          "ctime": "2022-05-12T14:37:54"
        }
      },
      {
        "id": "1525355474944401408",
        "pid": "1523917849742155776",
        "name": "消息中心",
        "sort": "1652508059618",
        "children": [
          {
            "id": "1525356012612231168",
            "pid": "1525355474944401408",
            "name": "我的消息",
            "sort": "1652508187807",
            "data": {
              "id": "1525356012612231168",
              "pid": "1525355474944401408",
              "platformId": "1523562161681600512",
              "level": 3,
              "permission": "",
              "isHidden": 0,
              "menuName": "我的消息",
              "sortNo": "1652508187807",
              "path": "selfMsg",
              "component": "/personal/message/selfMsg/index",
              "icon": "iconoir:chat-bubble",
              "ext": null,
              "utime": "2022-05-14T15:18:14",
              "ctime": "2022-05-14T14:03:08"
            }
          }
        ],
        "data": {
          "id": "1525355474944401408",
          "pid": "1523917849742155776",
          "platformId": "1523562161681600512",
          "level": 2,
          "permission": "",
          "isHidden": 0,
          "menuName": "消息中心",
          "sortNo": "1652508059618",
          "path": "message",
          "component": "BLANK",
          "icon": "iconoir:chat-bubble",
          "ext": null,
          "utime": null,
          "ctime": "2022-05-14T14:01:00"
        }
      },
      {
        "id": "1525356203083964416",
        "pid": "1523917849742155776",
        "name": "任务中心",
        "sort": "1652508233220",
        "children": [
          {
            "id": "1525356405551407104",
            "pid": "1525356203083964416",
            "name": "我的任务",
            "sort": "1652508281492",
            "data": {
              "id": "1525356405551407104",
              "pid": "1525356203083964416",
              "platformId": "1523562161681600512",
              "level": 3,
              "permission": "",
              "isHidden": 0,
              "menuName": "我的任务",
              "sortNo": "1652508281492",
              "path": "selfTask",
              "component": "/personal/task/selfTask/index",
              "icon": "iconoir:cloud-download",
              "ext": null,
              "utime": "2022-05-14T15:18:24",
              "ctime": "2022-05-14T14:04:41"
            }
          }
        ],
        "data": {
          "id": "1525356203083964416",
          "pid": "1523917849742155776",
          "platformId": "1523562161681600512",
          "level": 2,
          "permission": "",
          "isHidden": 0,
          "menuName": "任务中心",
          "sortNo": "1652508233220",
          "path": "task",
          "component": "BLANK",
          "icon": "iconoir:menu",
          "ext": null,
          "utime": null,
          "ctime": "2022-05-14T14:03:53"
        }
      }
    ],
    "data": {
      "id": "1523917849742155776",
      "pid": "-1",
      "platformId": "1523562161681600512",
      "level": 1,
      "permission": "",
      "isHidden": 0,
      "menuName": "个人中心",
      "sortNo": "1652165303060",
      "path": "personal",
      "component": "LAYOUT",
      "icon": "ic:baseline-folder-shared",
      "ext": null,
      "utime": "2022-06-14T11:30:20",
      "ctime": "2022-05-10T14:48:23"
    }
  },
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
              "component": "/business/product/ticketBase/index",
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
              "component": "/business/product/ticket/index",
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
      {
        "id": "1533622285683007488",
        "pid": "1531535251229253632",
        "name": "商家中心",
        "sort": "1654479020888",
        "children": [
          {
            "id": "1533624059298979840",
            "pid": "1533622285683007488",
            "name": "商家管理",
            "sort": "1654479443751",
            "data": {
              "id": "1533624059298979840",
              "pid": "1533622285683007488",
              "platformId": "1523562161681600512",
              "level": 3,
              "permission": "",
              "isHidden": 0,
              "menuName": "商家管理",
              "sortNo": "1654479443751",
              "path": "merchants",
              "component": "/business/merchant/merchantJoin/index",
              "icon": "ic:baseline-people-alt",
              "ext": null,
              "utime": "2022-06-06T10:22:25",
              "ctime": "2022-06-06T09:37:24"
            }
          },
          {
            "id": "1533624353852366848",
            "pid": "1533622285683007488",
            "name": "店铺管理",
            "sort": "1654479513977",
            "data": {
              "id": "1533624353852366848",
              "pid": "1533622285683007488",
              "platformId": "1523562161681600512",
              "level": 3,
              "permission": "",
              "isHidden": 0,
              "menuName": "店铺管理",
              "sortNo": "1654479513977",
              "path": "store",
              "component": "/business/merchant/store/index",
              "icon": "ic:baseline-inventory",
              "ext": null,
              "utime": null,
              "ctime": "2022-06-06T09:38:34"
            }
          }
        ],
        "data": {
          "id": "1533622285683007488",
          "pid": "1531535251229253632",
          "platformId": "1523562161681600512",
          "level": 2,
          "permission": "",
          "isHidden": 0,
          "menuName": "商家中心",
          "sortNo": "1654479020888",
          "path": "merchant",
          "component": "BLANK",
          "icon": "ri:user-star-line",
          "ext": null,
          "utime": "2022-06-14T11:30:27",
          "ctime": "2022-06-06T09:30:21"
        }
      },
      {
        "id": "1538051843458998272",
        "pid": "1531535251229253632",
        "name": "酒店管理",
        "sort": "1655535109759",
        "children": [
          {
            "id": "1538052537406595072",
            "pid": "1538051843458998272",
            "name": "酒店资源",
            "sort": "1655535275209",
            "data": {
              "id": "1538052537406595072",
              "pid": "1538051843458998272",
              "platformId": "1523562161681600512",
              "level": 3,
              "permission": "",
              "isHidden": 0,
              "menuName": "酒店资源",
              "sortNo": "1655535275209",
              "path": "hotel_resource",
              "component": "/business/hotel/hotelResource/index",
              "icon": "iconoir:3d-select-face",
              "ext": null,
              "utime": null,
              "ctime": "2022-06-18T14:54:35"
            }
          },
          {
            "id": "1538053031210393600",
            "pid": "1538051843458998272",
            "name": "房型房态",
            "sort": "1655535392941",
            "data": {
              "id": "1538053031210393600",
              "pid": "1538051843458998272",
              "platformId": "1523562161681600512",
              "level": 3,
              "permission": "",
              "isHidden": 1,
              "menuName": "房型房态",
              "sortNo": "1655535392941",
              "path": "room",
              "component": "/business/hotel/room/index",
              "icon": "ri:home-7-line",
              "ext": null,
              "utime": "2022-06-23T23:50:26",
              "ctime": "2022-06-18T14:56:33"
            }
          }
        ],
        "data": {
          "id": "1538051843458998272",
          "pid": "1531535251229253632",
          "platformId": "1523562161681600512",
          "level": 2,
          "permission": "",
          "isHidden": 0,
          "menuName": "酒店管理",
          "sortNo": "1655535109759",
          "path": "hotel",
          "component": "BLANK",
          "icon": "ri:government-line",
          "ext": null,
          "utime": null,
          "ctime": "2022-06-18T14:51:50"
        }
      }
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
