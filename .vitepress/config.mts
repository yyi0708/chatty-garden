import { defineConfig, type DefaultTheme } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Chatty garden",
  description: "I hope I can grow in here",
  head: [['link', { rel: 'icon', href: '/public/heart.svg' }]],
  themeConfig: {
    logo: '/public/heart.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '前端技术', link: '/docs/font-end/', activeMatch: '/docs/font-end/' },
      { text: '后端技术', link: '/docs/back-end/', activeMatch: '/docs/back-end/' },
      { text: '山茶随记', link: '/docs/life/', activeMatch: '/docs/life/' },
      { text: '关于我', link: '/docs/about-me/', activeMatch: '/docs/about-me/' }
    ],

    sidebar: {
      '/docs/home/': [
        {
          text: '首页',
          link: '/docs/home/'
        }
      ],
      '/docs/font-end/': sidebarFontEnd(),
      '/docs/back-end/': sidebarBackEnd(),
      '/docs/life/': sidebarLife(),
      '/docs/about-me/': [
        {
          text: 'resume',
          link: '/docs/about-me/'
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yyi0708/chatty-garden' }
    ],

    footer: {
      message: '你如果追求完美，将永远无法感到满足（完美主义陷阱）。 援引文章：<a href="https://www.163.com/dy/article/G7HM1IUS0541HJGS.html" style="color:blue;">有一种优秀，叫做“不追求完美”</a>',
      copyright: '<span style="color:red;">悟：人永远没有准备充分的时候，只有准备差不多了，敢想敢做，然后上场，去收获此阶段的成果。</span>'
    }
  }
})

// 前端
function sidebarFontEnd(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '基础-进阶',
      items: [
        {
          text: '从这里开始',
          link: '/docs/font-end/'
        },
        {
          text: 'Js基础知识-进阶',
          link: '/docs/font-end/basic/js'
        },
        {
          text: '前端模块化',
          link: '/docs/font-end/basic/moudle'
        },
        {
          text: 'Ts-类型从浅入深',
          link: '/docs/font-end/basic/ts'
        },{
          text: 'JS多线程的了解',
          link: '/docs/font-end/basic/js'
        },{
          text: '编程风格AOP/OOP/POP',
          link: '/docs/font-end/basic/program'
        }
      ]
    },
    {
      text: '工程化',
      items: [
        {
          text: '包管理器',
          link: '/docs/font-end/project/pkgManage'
        },{
          text: '单元-组件-e2e测试',
          link: '/docs/font-end/project/test'
        },
        {
          text: '开发工作流选择',
          link: '/docs/font-end/project/workflow'
        },
        {
          text: '脚手架',
          link: '/docs/font-end/project/cli'
        },
        {
          text: '构建工具',
          link: '/docs/font-end/project/build'
        },{
          text: '组件化',
          link: '/docs/font-end/project/compents'
        },{
          text: '微前端',
          link: '/docs/font-end/project/mico-font-end'
        },{
          text: '部署方式',
          link: '/docs/font-end/project/deploy'
        }
      ]
    },
    {
      text: '小片段技巧',
      items: [
        {
          text: '获取当前文件路径',
          link: '/docs/font-end/skill/getCurrentPath'
        }
      ]
    },
    {
      text: '实战项目',
      items: [
        {
          text: 'sample-cli',
          link: '/docs/font-end/flight/sample-cli'
        }
      ]
    }
  ]
}

// 后端
function sidebarBackEnd(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'NodeJs技术',
      items: [
        {
          text: 'NestJs',
          link: '/docs/back-end/node/nest'
        },
        {
          text: 'Express',
          link: '/docs/back-end/node/express'
        },
        {
          text: 'ORM框架',
          link: '/docs/back-end/node/orm'
        },
        {
          text: '通过PostgreSQL了解数据库',
          link: '/docs/back-end/node/sql'
        },
      ]
    },
    {
      text: 'Python技术',
      items: [
        {
          text: 'python基础-进阶',
          link: '/docs/back-end/python/basic'
        },
        {
          text: 'Django基础-进阶',
          link: '/docs/back-end/python/django'
        },{
          text: 'FastAPI基础-进阶',
          link: '/docs/back-end/python/fastapi'
        },{
          text: '爬虫',
          link: '/docs/back-end/python/crawel'
        }
      ]
    },
    {
      text: '设计模式',
      items: [
        {
          text: '工厂模式',
          link: '/docs/back-end/mode/factory'
        }
      ]
    },
    {
      text: 'Docker技术',
      items: [
        {
          text: 'Docker基础使用',
          link: '/docs/back-end/docker/basic'
        }
      ]
    },
    {
      text: '实战项目',
      items: [
        {
          text: 'lottery',
          link: '/docs/back-end/fight/lottery'
        }
      ]
    }
  ]
}

// 生活
function sidebarLife(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '古代哲学',
      items: [
        {
          text: '易经',
          link: '/docs/life/old-philosophy/yijin'
        }
      ]
    },
    {
      text: '生活随记',
      items: [
        {
          text: 'Demo',
          link: '/docs/life/acticle/demo.md'
        }
      ]
    }
  ]
}