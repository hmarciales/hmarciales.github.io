declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// this allows import of raw text files using raw-loader
// e.g: import myTxt from 'raw-loader!./mytextfile.txt'
declare module 'raw-loader!*' {
  const content: string
  export default content
}

declare module 'yaml-loader!*' {
  const content: any
  export default content
}

declare module '@statnett/vue-plotly'
declare module 'colormap'
declare module 'convert-seconds'
declare module 'd3-sankey-diagram'
declare module 'read-blob'
declare module 'vue-slide-bar'
declare module 'vue-table-component'
declare module 'vue-video-player'
declare module 'zip-loader'
// temp i hope
declare module '@turf/point-to-line-distance'
declare module '@turf/nearest-point-to-line'
declare module '@aftersim/pako'
