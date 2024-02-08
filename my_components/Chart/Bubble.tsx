'use client'

import React, { useEffect, useState } from 'react';
import { Bubble } from 'react-chartjs-2';

import {
  Colors,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  Colors,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

type BubbleChartProps = {
  type?: string,
  title?: string,
  xMin?: number,
  xMax?: number,
  xLabel?: string,
  primaryYLabel?: string,
  primaryYMin?: number,
  primaryYMax?: number,
  primaryYPrefix?: string,
  primaryYSuffix?: string,
  secondaryYLabel?: string,
  secondaryYMin?: number,
  secondaryYMax?: number,
  secondaryYPrefix?: string,
  secondaryYSuffix?: string,
  data?: Record<any, any>,
  baseOptions?: Record<any, any>,
  userOptions?: Record<any, any>,
  colors?: string[],
}


const BubbleChart = ({type, xMin, xMax, xLabel, primaryYLabel, primaryYMin, primaryYMax, primaryYPrefix, primaryYSuffix, secondaryYLabel, secondaryYMin, secondaryYMax, secondaryYPrefix, secondaryYSuffix, data, baseOptions, userOptions, colors}: BubbleChartProps) => {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    if (typeof window !== undefined) {
      setWindowWidth(window.innerWidth)
    }
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if ( baseOptions ) {
    baseOptions.plugins.tooltip = {
      enabled: true,
      usePointStyle: true,
      callbacks: {
        label: (tooltipItem: any, data: any) => {
          console.log(tooltipItem)
          const labels = [
            `${fields[1]}: ${parseFloat(tooltipItem.raw.x).toLocaleString()}`,
            `${fields[2]}: ${parseFloat(tooltipItem.raw.y).toLocaleString()}`,
            `${fields[3]}: ${parseFloat(tooltipItem.raw.rOriginal).toLocaleString()}`,
          ]
          return labels
        }
      }
    }
  }

  const options = {
    ...baseOptions,
    scales: {
      x: {
        min: xMin,
        max: xMax,
        title: {
          display: xLabel ? true : false,
          text: xLabel
        }
      },
      y: {
        min: primaryYMin || 0,
        max: primaryYMax,
        display: true,
        title: {
          display: primaryYLabel ? true : false,
          text: primaryYLabel
        },
        ticks: {
          callback: (value: number) => {
            return `${primaryYPrefix || ''}${value.toLocaleString()}${primaryYSuffix || ''}`
          }
        },
      },
    }
  };

  if ( !data ) {
    return <></>
  }

  const normalizeRadius = (val: number, minRadius: number, maxRadius: number) => {
    const normalizedMin = 1
    const normalizedMax = 20
    return (Math.log(val - minRadius) / Math.log(maxRadius - minRadius)) * (normalizedMax - normalizedMin)
    
  }
  
  const fields = Object.keys(data[0])

  const labels = data.map((x: any) => x[fields[0]]);

  const radii = data.map((x: any) => {try {return parseInt(x[fields[3]])} catch {}})
  const minRadius = Math.min(...radii)
  const maxRadius = Math.max(...radii)

  const parsedData = {
    labels,
    datasets: [{
      label: fields[3],
      data: data.map((x: any) => { return {'x': x[fields[1]], 'y': x[fields[2]], 'r': normalizeRadius(x[fields[3]], minRadius, maxRadius), 'rOriginal': x[fields[3]] }}),
      pointRadius: 2,
      yAxisID: 'y',
      backgroundColor: colors ? `${colors[0]}aa` : undefined,
      borderColor: colors ? `${colors[1]}aa` : undefined,
    }]
  };

  return <div style={{minHeight: `${(userOptions?.height || 360) * (windowWidth > 640 ? 1 : 0.8)}px`}}>
    {windowWidth > 0 &&
      <Bubble options={options as any} data={parsedData as any} />
    }
  </div>
}

export default BubbleChart
