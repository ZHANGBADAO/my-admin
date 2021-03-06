import { MockMethod } from 'vite-plugin-mock'
import { successResult, reqType } from './_tool'

export default [
  {
    url: '/dev/tenant/department/findAll',
    method: 'post',
    response: ({ body }: reqType) => {
      return successResult([
        {
          id: 'root',
          pid: '-1',
          name: null,
          ctime: null,
          departmentNums: null,
          sort: null,
          children: [
            {
              id: '1542342371189071872',
              pid: '-1',
              name: '11',
              ctime: '2022-06-30T03:00:51.000+00:00',
              departmentNums: 0,
              sort: '0',
              children: [
                {
                  id: '1528619207116333056',
                  pid: '1542342371189071872',
                  name: '测试部1',
                  ctime: '2022-05-23T06:09:54.000+00:00',
                  departmentNums: 0,
                  sort: '0',
                  children: [],
                  data: {
                    id: '1528619207116333056',
                    pid: '1542342371189071872',
                    name: '测试部1',
                    sortNo: '0',
                    isHidden: 0,
                    state: 0,
                    ext: null,
                    deleteFlag: 0,
                    utime: '2022-06-30T03:01:04.000+00:00',
                    ctime: '2022-05-23T06:09:54.000+00:00',
                    departmentNums: 0,
                    pname: '11',
                  },
                  pname: '11',
                },
                {
                  id: '1543801877894930432',
                  pid: '1542342371189071872',
                  name: '士大夫',
                  ctime: '2022-07-04T03:40:25.000+00:00',
                  departmentNums: 0,
                  sort: '0',
                  children: [],
                  data: {
                    id: '1543801877894930432',
                    pid: '1542342371189071872',
                    name: '士大夫',
                    sortNo: '0',
                    isHidden: 0,
                    state: 0,
                    ext: null,
                    deleteFlag: 0,
                    utime: null,
                    ctime: '2022-07-04T03:40:25.000+00:00',
                    departmentNums: 0,
                    pname: '11',
                  },
                  pname: '11',
                },
              ],
              data: {
                id: '1542342371189071872',
                pid: '-1',
                name: '11',
                sortNo: '0',
                isHidden: 0,
                state: 0,
                ext: null,
                deleteFlag: 0,
                utime: null,
                ctime: '2022-06-30T03:00:51.000+00:00',
                departmentNums: 0,
                pname: null,
              },
              pname: null,
            },
            {
              id: '1528618738117648384',
              pid: '-1',
              name: '测试部',
              ctime: '2022-05-23T06:08:02.000+00:00',
              departmentNums: 0,
              sort: '0',
              children: [
                {
                  id: '1538772711222943744',
                  pid: '1528618738117648384',
                  name: '测试部02',
                  ctime: '2022-06-20T06:36:18.000+00:00',
                  departmentNums: 0,
                  sort: '0',
                  children: [],
                  data: {
                    id: '1538772711222943744',
                    pid: '1528618738117648384',
                    name: '测试部02',
                    sortNo: '0',
                    isHidden: 0,
                    state: 0,
                    ext: null,
                    deleteFlag: 0,
                    utime: null,
                    ctime: '2022-06-20T06:36:18.000+00:00',
                    departmentNums: 0,
                    pname: '测试部',
                  },
                  pname: '测试部',
                },
              ],
              data: {
                id: '1528618738117648384',
                pid: '-1',
                name: '测试部',
                sortNo: '0',
                isHidden: 0,
                state: 0,
                ext: null,
                deleteFlag: 0,
                utime: null,
                ctime: '2022-05-23T06:08:02.000+00:00',
                departmentNums: 0,
                pname: null,
              },
              pname: null,
            },
          ],
          data: null,
          pname: null,
        },
      ])
    },
  },
  {
    url: '/dev/tenant/department/findByDepartmentName',
    method: 'post',
    response: ({ body }: reqType) => {
      return successResult([
        {
          id: '1528619207116333056',
          pid: '1542342371189071872',
          name: '测试部1',
          sortNo: '0',
          isHidden: 0,
          state: 0,
          ext: null,
          deleteFlag: 0,
          utime: '2022-06-30T11:01:04',
          ctime: '2022-05-23T14:09:54',
          pname: null,
        },
      ])
    },
  },
  {
    url: '/dev/tenant/department/findUserByDepartmentId',
    method: 'post',
    response: ({ body }: reqType) => {
      return successResult({
        total: 10,
        list: [
          {
            id: '1529009153165631488',
            dingId: null,
            userCode: null,
            userName: '吴桂卷',
            loginName: null,
            email: null,
            userPhone: '18022222222',
            department: null,
            avatar: null,
            password:
              'iUZglJD4wGa4/gWgPUol3Uraa/kuJpfTSeKhNdQkVQRG4f7TYz2aCEBkyn0MQyHU',
            status: null,
            ext: null,
            ctime: '2022-05-24T15:59:24',
          },
          {
            id: '1538830784767598592',
            dingId: null,
            userCode: null,
            userName: '订单',
            loginName: null,
            email: null,
            userPhone: '18552248851',
            department: null,
            avatar: null,
            password:
              'BhTjlC8Gfx2DLtAJoLdBFP1IR87yFlvwbTlnh9ZkBQLnyulbyS87j8UoE0oPfrA/',
            status: null,
            ext: null,
            ctime: '2022-06-20T18:27:04',
          },
          {
            id: '1538838464840212480',
            dingId: null,
            userCode: null,
            userName: '订单1',
            loginName: null,
            email: null,
            userPhone: '18542425555',
            department: null,
            avatar: null,
            password:
              'x+6krnidLkx3fWFmsK5S49lJJfKPvb15+FiaNxkV2RThV5TP/Du4TR0sF9PxZ5qG',
            status: null,
            ext: null,
            ctime: '2022-06-20T18:57:35',
          },
          {
            id: '1538838942814707712',
            dingId: null,
            userCode: null,
            userName: '订单1',
            loginName: null,
            email: null,
            userPhone: '1854242555',
            department: null,
            avatar: null,
            password:
              'GRgEff5nndN3/8kk1B4PC8Q4wpKnUJRF4A8OyAO75tsh4hBwESrXgvFgYzjuzXT9',
            status: null,
            ext: null,
            ctime: '2022-06-20T18:59:29',
          },
          {
            id: '1539197562043637760',
            dingId: null,
            userCode: null,
            userName: '1515',
            loginName: null,
            email: null,
            userPhone: '187878787878',
            department: null,
            avatar: null,
            password:
              'Ob/fcgI8/QzxGVlRllYZxSmIjmd+WJkmRoFLvqCvPkyOXxY+PI4Xta/pdf14go5w',
            status: null,
            ext: null,
            ctime: '2022-06-21T18:44:30',
          },
          {
            id: '1539205035601305600',
            dingId: null,
            userCode: null,
            userName: '订单1',
            loginName: null,
            email: null,
            userPhone: '18305255250',
            department: null,
            avatar: null,
            password:
              'O2BoMRW5rYx2ZPg47IsD/N6ZFGbg0SRYov92BtSVr31B1N9Boo1/OskBZ58uglN/',
            status: null,
            ext: null,
            ctime: '2022-06-21T19:14:12',
          },
          {
            id: '1542404323026280448',
            dingId: null,
            userCode: null,
            userName: '嘻嘻',
            loginName: null,
            email: null,
            userPhone: '18712313131331',
            department: null,
            avatar: null,
            password:
              'EdKb6YD0EdzAwLqUbt+MyUTZrYmmOpx74dWYYoPq+dhc9UhkHbOu4Wg5f8EVkYN4',
            status: null,
            ext: null,
            ctime: '2022-06-30T15:07:02',
          },
          {
            id: '1543769181961461760',
            dingId: null,
            userCode: null,
            userName: '阳仔',
            loginName: null,
            email: null,
            userPhone: '18090902233',
            department: null,
            avatar: null,
            password:
              'MzUvbsDBZJTSkPNugGJBopJVrr1MCCAVn3SMmTu7o8nIRgUhKNRGGIOahO4VomSl',
            status: null,
            ext: null,
            ctime: '2022-07-04T09:30:29',
          },
          {
            id: '1543848443154407424',
            dingId: null,
            userCode: null,
            userName: '哈哈哈12',
            loginName: null,
            email: null,
            userPhone: '18711313131',
            department: null,
            avatar: null,
            password:
              'KjYjCzO+Nd998aqg05779foDA9jX+3vwQL0V6l29D+fvRx7IzqKtgrN/wS0vHC90',
            status: null,
            ext: null,
            ctime: '2022-07-04T14:45:27',
          },
          {
            id: '1543861578561101824',
            dingId: null,
            userCode: null,
            userName: '01',
            loginName: null,
            email: null,
            userPhone: '13521311222',
            department: null,
            avatar: null,
            password:
              'ftwFJRLAu4xpVgYpPwIoAmuwNvF7O7G4H4fHRWQZ6jhdv6BdZqkNVtgZZNxyhwkQ',
            status: null,
            ext: null,
            ctime: '2022-07-04T15:37:39',
          },
        ],
        pageNum: 1,
        pageSize: 10,
        size: 10,
        startRow: 0,
        endRow: 9,
        pages: 1,
        prePage: 0,
        nextPage: 0,
        isFirstPage: true,
        isLastPage: true,
        hasPreviousPage: false,
        hasNextPage: false,
        navigatePages: 8,
        navigatepageNums: [1],
        navigateFirstPage: 1,
        navigateLastPage: 1,
      })
    },
  },
] as MockMethod[]
