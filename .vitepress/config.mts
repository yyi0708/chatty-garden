import { defineConfig, type DefaultTheme } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Chatty garden",
  description: "I hope I can grow in here",
  // @ts-ignore
  head: [['link', { rel: 'icon', href: process.env.NODE_ENV === 'production' ? '/chatty-garden/favicon.ico' : '/favicon.ico' }]],
  // @ts-ignore
  base: process.env.NODE_ENV === 'production' ? '/chatty-garden/' : '/',
  lastUpdated: true,
  cleanUrls: true,
  outDir: 'dist',

  themeConfig: {
    logo: '/heart.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '前端技术', link: '/docs/font-end/', activeMatch: 'font-end/' },
      { text: '后端技术', link: '/docs/back-end/', activeMatch: '/back-end/' },
      { text: '山茶随记', link: '/docs/life/', activeMatch: '/life/' },
      { text: '关于我', link: '/docs/about-me/', activeMatch: '/about-me/' }
    ],

    sidebar: {
      '/docs/font-end/': {
        base: '/docs/font-end/',
        items: sidebarFontEnd()
      },
      '/docs/back-end/': {
        base: '/docs/back-end/',
        items: sidebarBackEnd()
      },
      '/docs/life/': {
        base: '/docs/life/',
        items: sidebarLife()
      },
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
      copyright: '<span style="color:red;">人永远没有准备充分的时候，只有准备差不多了，敢想敢做，然后上场，去收获此阶段的成果。</span>'
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
          text: 'Js基础知识-进阶',
          link: 'basic/js'
        },
        {
          text: '前端模块化',
          link: 'basic/moudle'
        },
        {
          text: 'Ts-类型从浅入深',
          link: 'basic/ts'
        },{
          text: 'JS多线程的了解',
          link: 'basic/multithreading'
        },{
          text: '编程风格AOP/OOP/POP',
          link: 'basic/program'
        }
      ]
    },
    {
      text: '工程化',
      items: [
        {
          text: '包管理器',
          link: 'project/pkgManage'
        },{
          text: '单元-组件-e2e测试',
          link: 'project/test'
        },
        {
          text: '开发工作流选择',
          link: 'project/workflow'
        },
        {
          text: '脚手架',
          link: 'project/cli'
        },
        {
          text: '构建工具',
          link: 'project/build'
        },{
          text: '组件化',
          link: 'project/compents'
        },{
          text: '微前端',
          link: 'project/mico-font-end'
        },{
          text: '部署方式',
          link: 'project/deploy'
        }
      ]
    },
    {
      text: '小片段技巧',
      items: [
        {
          text: '获取文件路径',
          link: 'skill/getCurrentPath'
        },{
          text: '自动切换node环境',
          link: 'skill/autoSwitchEnv'
        },
      ]
    },
    {
      text: '实战项目',
      items: [
        {
          text: 'sample-cli',
          link: 'flight/sample-cli'
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
          link: 'node/nest'
        },
        {
          text: 'Express',
          link: 'node/express'
        },
        {
          text: 'ORM框架',
          link: 'node/orm'
        },
        {
          text: '通过PostgreSQL了解数据库',
          link: 'node/sql'
        },
      ]
    },
    {
      text: 'Python技术',
      items: [
        {
          text: 'python基础-进阶',
          link: 'python/basic'
        },
        {
          text: 'Django基础-进阶',
          link: 'python/django'
        },{
          text: 'FastAPI基础-进阶',
          link: 'python/fastapi'
        },{
          text: '爬虫',
          link: 'python/crawel'
        },{
          text: 'Redis',
          link: 'python/redis'
        },{
          text: 'SQLAlchemy的使用',
          link: 'python/sqlalchemy'
        }
      ]
    },
    {
      text: '设计模式',
      items: [
        {
          text: '工厂模式',
          link: 'mode/factory'
        }
      ]
    },
    {
      text: 'Docker技术',
      items: [
        {
          text: 'Docker基础使用',
          link: 'docker/basic'
        }
      ]
    },
    {
      text: '实战项目',
      items: [
        {
          text: 'lottery',
          link: 'fight/lottery'
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
          link: 'old-philosophy/yijin'
        }
      ]
    },
    {
      text: '生活随记',
      items: [
        {
          text: 'Demo',
          link: 'acticle/demo.md'
        }
      ]
    }
  ]
}