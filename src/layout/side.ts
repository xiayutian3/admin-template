/**
 * 左侧菜单配置项
 * 此文件先保存 后期可用于菜单优化使用
 * (注：因为路由前期未设计 children类型的子路由，所有重新写这个文件)
*/
export default [
  // 数据洞察
  [
    {
      title: '仪表盘',
      icon: 'icon-sharp',
      path: '/dashboard',
      children: []
    },
    {
      title: 'Amazon',
      icon: 'icon-amazon',
      path: '',
      children: [
        {
          title: '数据总览',
          icon: '',
          path: '/amDataOverview',
          children: []
        }
      ]
    }
  ],
  // 广告管理
  [
    {
      title: 'Google',
      icon: 'icon-a-Companygoogle',
      path: '',
      children: [
        {
          title: '广告列表',
          icon: '',
          path: '/gglistad',
          children: []
        },
        {
          title: '广告任务',
          icon: '',
          path: '/ggtaskad',
          children: []
        },
        {
          title: '广告发布',
          icon: '',
          path: '',
          children: [
            {
              title: '搜索广告',
              icon: '',
              path: '/ggsearchad'
            },
            {
              title: '购物广告',
              icon: '',
              path: '/ggshopad'
            }
          ]
        }
      ]
    },
    {
      title: 'Facebook',
      icon: 'icon-a-Facebook-Original',
      path: '',
      children: [
        {
          title: '广告列表',
          icon: '',
          path: '/fblistad',
          children: []
        },
        {
          title: '广告任务',
          icon: '',
          path: '/fbtaskad',
          children: []
        },
        {
          title: '广告发布',
          icon: '',
          path: '/fbpublic',
          children: []
        }
      ]
    },
    {
      title: 'Amazon',
      icon: 'iconfont icon-amazon',
      path: '',
      children: [
        {
          title: '广告列表',
          icon: '',
          path: '/amznlistad',
          children: []
        },
        {
          title: '广告任务',
          icon: '',
          path: '/amzntaskad',
          children: []
        },
        {
          title: '广告发布',
          icon: '',
          path: '',
          children: [
            {
              title: 'sp广告',
              icon: '',
              path: '/amznspad'
            },
            {
              title: 'sb广告',
              icon: '',
              path: '/amznsbad'
            },
            {
              title: 'sd广告',
              icon: '',
              path: '/amznsdad'
            },
            {
              title: 'sd广告',
              icon: '',
              path: '/amznadcomposition'
            }
          ]
        }
      ]
    }
  ],
  // 工具中心
  [
    {
      title: '素材库',
      icon: 'icon-Multimedia',
      path: '',
      children: [
        {
          title: '素材管理',
          icon: '',
          path: '/materialManage',
          children: []
        }
      ]
    }
  ],
  // 系统管理
  [
    {
      title: '权限管理',
      icon: 'icon-Management',
      path: '',
      children: [
        {
          title: '用户管理',
          icon: '',
          path: '/usermg',
          children: []
        },
        {
          title: '角色管理',
          icon: '',
          path: '/rolemg',
          children: []
        },
        {
          title: '用户组管理',
          icon: '',
          path: '/groupmg',
          children: []
        }
      ]
    },
    {
      title: '广告账户管理',
      icon: 'icon-Club',
      path: '',
      children: [
        {
          title: '广告账号列表',
          icon: '',
          path: '/adAccountManage',
          children: []
        }
      ]
    }
  ]
]
