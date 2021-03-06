import Vue from 'vue'
import Vuex from 'vuex'

import { BreadCrumb, ColorScheme, VisualizationPlugin } from '@/Globals'
import svnConfig from '@/svnConfig'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    debug: true,
    authAttempts: 0,
    breadcrumbs: [] as BreadCrumb[],
    credentials: { fake: 'fake' } as { [url: string]: string },
    isFullScreen: false,
    needLoginForUrl: '',
    statusMessage: 'loading',
    svnProjects: svnConfig.projects,
    colorScheme: ColorScheme.LightMode,
    visualizationTypes: new Map() as Map<string, VisualizationPlugin>,
    locale: 'en',
  },
  getters: {},
  mutations: {
    requestLogin(state, value: string) {
      state.needLoginForUrl = value
    },
    registerPlugin(state, value: VisualizationPlugin) {
      console.log('PLUGIN:', value.kebabName)
      state.visualizationTypes.set(value.kebabName, value)
    },
    setBreadCrumbs(state, value: BreadCrumb[]) {
      state.breadcrumbs = value
    },
    setCredentials(state, value: { url: string; username: string; pw: string }) {
      const creds = btoa(`${value.username}:${value.pw}`)
      state.credentials[value.url] = creds
      state.authAttempts++
    },
    setFullScreen(state, value: boolean) {
      state.isFullScreen = value
    },
    setStatus(state, value: string) {
      state.statusMessage = value
    },
    setLocale(state, value: string) {
      state.locale = value.toLocaleLowerCase()
      localStorage.setItem('locale', state.locale)
      console.log('NEW LOCALE:', state.locale)
    },
    rotateColors(state) {
      state.colorScheme =
        state.colorScheme === ColorScheme.DarkMode ? ColorScheme.LightMode : ColorScheme.DarkMode

      console.log('NEW COLORS:', state.colorScheme)

      localStorage.setItem('colorscheme', state.colorScheme)

      document.body.style.backgroundColor =
        state.colorScheme === ColorScheme.LightMode ? '#edebe4' : '#2d3133'
    },
  },
  actions: {},
  modules: {},
})
