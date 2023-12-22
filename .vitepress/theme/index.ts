// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    router.onAfterRouteChanged = (to: string) => {
      if (Object.prototype.hasOwnProperty.call(window, '_hmt') && typeof window['_hmt'] !== "undefined"){
        window['_hmt'].push(["_trackPageview", to]);
      }
     }
  }
}
