import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Chatty garden",
  description: "I hope I can grow in here",
  themeConfig: {
    logo: '../public/heart.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/docs/home/', activeMatch: '/docs/home/' },
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
      '/docs/font-end/': [
        {
          text: '前端技术',
          items: [
            {
              text: 'Demo',
              link: '/docs/font-end/'
            },
            {
              text: 'examples',
              link: '/docs/font-end/markdown-examples'
            }
          ]
        }
      ],
      '/docs/back-end/': [
        {
          text: 'NodeJs技术',
          items: [
            {
              text: 'Ts',
              link: '/docs/back-end/'
            }
          ]
        },
        {
          text: 'Python技术',
          items: [
            {
              text: 'python',
              link: '/docs/back-end/demo'
            }
          ]
        },
      ],
      '/docs/life/': [
        {
          text: '生活随记',
          items: [
            {
              text: 'Demo',
              link: '/docs/life/'
            }
          ]
        },
        {
          text: '古代哲学',
          items: [
            {
              text: '易经',
              link: '/docs/life/yijin'
            }
          ]
        }
      ],
      '/docs/about-me/': [
        {
          text: '关于我',
          items: [
            {
              text: 'Demo',
              link: '/docs/about-me/'
            }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
