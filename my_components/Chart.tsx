// react-chartjs-2, chart.js, csvtojson

import ComboBarLine from './Chart/ComboBarLine'
import Bubble from './Chart/Bubble'
import Pie from './Chart/Pie'
import { getUserDataRecursively } from '@/app/utils'

const csv = require('csvtojson')

type ChartProps = {
  type?: string,
  title?: string,
  filename?: string,
  xTitle?: string,
  xMin?: number,
  xMax?: number,
  xPrefix?: string,
  xSuffix?: string,
  primaryYTitle?: string,
  primaryYMin?: number,
  primaryYMax?: number,
  primaryYPrefix?: string,
  primaryYSuffix?: string,
  secondaryYTitle?: string,
  secondaryYMin?: number,
  secondaryYMax?: number,
  secondaryYPrefix?: string,
  secondaryYSuffix?: string,
  data?: Record<any, any>,
  columns?: number[],
  rowStart?: number,
  rowEnd?: number,
  baseOptions?: Record<any, any>,
  userOptions?: Record<any, any>,
  colors?: string[],
  palette?: PaletteColorKeys,
  height?: number,
  orientation?: string,
  pointRadius?: number,
  children?: React.ReactNode
}

const palettes: any = {
  YlGn9: {isSequential: true, colorSet: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529']},
  YlGnBu9: {isSequential: true, colorSet: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58']},
  GnBu9: {isSequential: true, colorSet: ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081']},
  BuGn9: {isSequential: true, colorSet: ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b']},
  PuBuGn9: {isSequential: true, colorSet: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636']},
  PuBu9: {isSequential: true, colorSet: ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858']},
  BuPu9: {isSequential: true, colorSet: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b']},
  RdPu9: {isSequential: true, colorSet: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a']},
  PuRd9: {isSequential: true, colorSet: ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f']},
  OrRd9: {isSequential: true, colorSet: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000']},
  YlOrRd9: {isSequential: true, colorSet: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026']},
  YlOrBr9: {isSequential: true, colorSet: ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506']},
  Purples9: {isSequential: true, colorSet: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d']},
  Blues9: {isSequential: true, colorSet: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b']},
  Greens9: {isSequential: true, colorSet: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b']},
  Oranges9: {isSequential: true, colorSet: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704']},
  Reds9: {isSequential: true, colorSet: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d']},
  Greys9: {isSequential: false, colorSet: ['#969696', '#737373', '#525252', '#252525', '#000000', '#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd']},
  PuOr11: {isSequential: false, colorSet: ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b']},
  BrBG11: {isSequential: false, colorSet: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30']},
  PRGn11: {isSequential: false, colorSet: ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b']},
  PiYG11: {isSequential: false, colorSet: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419']},
  RdBu11: {isSequential: false, colorSet: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061']},
  RdGy11: {isSequential: false, colorSet: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a']},
  RdYlBu11: {isSequential: false, colorSet: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695']},
  Spectral11: {isSequential: false, colorSet: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2']},
  RdYlGn11: {isSequential: false, colorSet: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837']},
  Accent8: {isSequential: false, colorSet: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666']},
  DarkTwo8: {isSequential: false, colorSet: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666']},
  Paired12: {isSequential: false, colorSet: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928']},
  PastelOne9: {isSequential: false, colorSet: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2']},
  PastelTwo8: {isSequential: false, colorSet: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc']},
  SetOne9: {isSequential: false, colorSet: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999']},
  SetTwo8: {isSequential: false, colorSet: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3']},
  SetThree12: {isSequential: false, colorSet: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f']}
}


type PaletteColorKeys = keyof typeof palettes


const renderComponent = ({type, xTitle, xMin, xMax, xPrefix, xSuffix, primaryYTitle, primaryYMin, primaryYMax, primaryYPrefix, primaryYSuffix, secondaryYTitle, secondaryYMin, secondaryYMax, secondaryYPrefix, secondaryYSuffix, data, userOptions, baseOptions, colors}: ChartProps) => {
  switch (type) {
    case undefined:
    case '':
    case 'bar':
    case 'line':
    case 'combo':
      return <ComboBarLine type={type} xTitle={xTitle} xMin={xMin} xMax={xMax} xPrefix={xPrefix} xSuffix={xSuffix} primaryYTitle={primaryYTitle} primaryYMin={primaryYMin} primaryYMax={primaryYMax} primaryYPrefix={primaryYPrefix} primaryYSuffix={primaryYSuffix} secondaryYTitle={secondaryYTitle} secondaryYMin={secondaryYMin} secondaryYMax={secondaryYMax} secondaryYPrefix={secondaryYPrefix} secondaryYSuffix={secondaryYSuffix} data={data} userOptions={userOptions} baseOptions={baseOptions} colors={colors} />
    case 'scatter':
      return <Bubble type={type} xTitle={xTitle} xMin={xMin} xMax={xMax} xPrefix={xPrefix} xSuffix={xSuffix} primaryYTitle={primaryYTitle} primaryYMin={primaryYMin} primaryYMax={primaryYMax} primaryYPrefix={primaryYPrefix} primaryYSuffix={primaryYSuffix} secondaryYTitle={secondaryYTitle} secondaryYMin={secondaryYMin} secondaryYMax={secondaryYMax} secondaryYPrefix={secondaryYPrefix} secondaryYSuffix={secondaryYSuffix} data={data} userOptions={userOptions} baseOptions={baseOptions} colors={colors} />
    case 'bubble':
      return <Bubble type={type} xTitle={xTitle} xMin={xMin} xMax={xMax} xPrefix={xPrefix} xSuffix={xSuffix} primaryYTitle={primaryYTitle} primaryYMin={primaryYMin} primaryYMax={primaryYMax} primaryYPrefix={primaryYPrefix} primaryYSuffix={primaryYSuffix} secondaryYTitle={secondaryYTitle} secondaryYMin={secondaryYMin} secondaryYMax={secondaryYMax} secondaryYPrefix={secondaryYPrefix} secondaryYSuffix={secondaryYSuffix} data={data} userOptions={userOptions} baseOptions={baseOptions} colors={colors} />
    case 'doughnut':
    case 'pie':
      return <Pie type={type} data={data} userOptions={userOptions} baseOptions={baseOptions} colors={colors} />
  }
}

const buildPalette = (palette: PaletteColorKeys, n: number, loop: boolean) => {
  const colorSet = palettes[palette].colorSet
  const isSequential = palettes[palette].isSequential
  const colors: string[] = []

  if (n >= colorSet.length || loop || !isSequential) {
    for (let i = 0; i < colorSet.length; i ++) {
      colors.push(colorSet[i % colorSet.length])
    }
  } else {
    for (let i = Math.floor((colorSet.length - 1) / n); i < colorSet.length; i += Math.floor((colorSet.length - 1) / n)) {
      colors.push(colorSet[i])
    }
  }
  
  return colors
}

const Chart = async ({type, title, filename, columns, rowStart, rowEnd, xTitle, xMin, xMax, xPrefix, xSuffix, primaryYTitle, primaryYMin, primaryYMax, primaryYPrefix, primaryYSuffix, secondaryYTitle, secondaryYMin, secondaryYMax, secondaryYPrefix, secondaryYSuffix, palette, height, orientation, pointRadius, children}: ChartProps) => {
  if (!filename) {
    return <></>
  }

  const data = await csv().fromFile(await getUserDataRecursively(filename))
  const colors = palette ? buildPalette(palette, columns ? columns.length - 1 : Object.keys(data[0]).length - 1, type === 'pie' || type === 'doughnut') : palettes['Paired12']

  let filteredData = data

  if ( columns ) {
    try {
      const fields = Object.keys(data[0])
      filteredData = data.slice(rowStart === undefined ? 1 : rowStart, rowEnd).map((row: any) => {
        const filteredRow: { [key: string]: any } = {}
        columns.forEach((colNumber: number) => {
          filteredRow[fields[colNumber]] = row[fields[colNumber]]
        })
        return filteredRow
      })
    } catch {}
  }

  const baseOptions = {
    indexAxis: orientation === 'horizontal' ? 'y' : 'x',
    maintainAspectRatio: false,
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        display: type === 'bubble' || type === 'scatter' ? false : true,
      },
      title: {
        display: true,
        text: title,
        padding: {
          bottom: 30,
        }
      },
    },
    stacked: false,
  }

  const userOptions = {
    pointRadius: pointRadius,
    height: height,
  }

  const dataToPass = {data: filteredData}

  return <div className={children ? 'mb-12' : 'mb-3'}>
    <div className={`${children ? 'mb-6' : ''} 'duration-100 rounded bg-white bg-opacity-90 dark:bg-gray-200 dark:bg-opacity-90'`}>
      <div className="px-1 py-2 md:px-3 md:py-6">
        {renderComponent({...dataToPass, type, title, xTitle, xMin, xMax, xPrefix, xSuffix, primaryYTitle, primaryYMin, primaryYMax, primaryYPrefix, primaryYSuffix, secondaryYTitle, secondaryYMin, secondaryYMax, secondaryYPrefix, secondaryYSuffix, baseOptions, userOptions, colors})}
      </div>
    </div>
    <div className="text-sm leading-6">{children}</div>
  </div>

}


export default Chart