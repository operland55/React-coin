import { useQuery } from 'react-query'
import { fetchCoinHisTory } from '../api'
import ApexChart from 'react-apexcharts'
import Price from './Price'
import { useRecoilValue } from 'recoil'
import { isDarkAtom } from '../atom'
import { useEffect } from 'react'

interface ChartProps {
  coinId: string
}

interface IHistorical {
  time_open: string
  time_close: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  market_cap: number
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom)
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
    fetchCoinHisTory(coinId)
  )

  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <div>
      {isLoading ? (
        'Loading Chart...'
      ) : (
        <>
          <ApexChart
            type="candlestick"
            series={[
              {
                data:
                  data?.map?.(h => ({
                    x: new Date(h.time_close),
                    y: [h.open, h.high, h.low, h.close],
                  })) ?? [],
              },
            ]}
            options={{
              theme: {
                mode: isDark ? 'dark' : 'light',
              },
              chart: {
                height: 100,
                width: 500,
                //  background: 'transparent',
              },
              title: {
                text: 'CandleStick Chart',
                align: 'left',
              },
              xaxis: {
                type: 'datetime',
              },
              yaxis: {
                tooltip: {
                  enabled: true,
                },
              },
            }}
          />
        </>
      )}
    </div>
  )
}

export default Chart
