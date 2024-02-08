'use client'

import React, { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';

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

type ScatterChartProps = {
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


const ScatterChart = ({type, xMin, xMax, xLabel, primaryYLabel, primaryYMin, primaryYMax, primaryYPrefix, primaryYSuffix, secondaryYLabel, secondaryYMin, secondaryYMax, secondaryYPrefix, secondaryYSuffix, data, baseOptions, userOptions, colors}: ScatterChartProps) => {
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

  if ( !data ) {
    return <></>
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
      y1: {
        display: false,
        min: secondaryYMin || 0,
        position: 'right',
        beginAtZero: true,
        title: {
          display: secondaryYLabel ? true : false,
          text: secondaryYLabel
        },
        ticks: {
          callback: (value: number) => {
            return `${secondaryYPrefix || ''}${value.toLocaleString()}${secondaryYSuffix || ''}`
          }
        },
      }
    }
  };

  const fields = Object.keys(data[0])

  const hasSecondary = fields.filter(x => x.includes('(secondary)')).length > 0

  if (hasSecondary) {
    options.scales.y1.display = true
  }


  const labels = data.map((x: any) => x[fields[0]]);

  const parsedData = {
    labels,
    datasets: fields.slice(1).map((field: string, index: number) => {
      return {
        label: field.replace('(secondary)', ''),
        data: data.map((x: any) => x[field]),
        yAxisID: field.toLowerCase().includes('(secondary)') ? 'y1' : 'y',
        backgroundColor: colors ? `${colors[index]}aa` : undefined,
        borderColor: colors ? `${colors[index + 1]}aa` : undefined,
        pointRadius: userOptions?.pointRadius || 2,
        order: field.toLowerCase().includes('(secondary)') ? 0 : 1
      }
    })
  };

  return <div style={{minHeight: `${(userOptions?.height || 360) * (windowWidth > 640 ? 1 : 0.8)}px`}}>
    {windowWidth > 0 &&
      <Scatter options={options as any} data={parsedData as any} />
    }
  </div>
}

export default ScatterChart
