import { useQuery } from 'react-query'
import { fetchCoinHisTory, fetchPrice } from '../api'
import ApexChart from 'react-apexcharts'
import { useEffect } from 'react'
import styled from 'styled-components'

const Main = styled.main`
  height: 50px;
  border-radius: 30px;
  background-color: white;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  padding: 20px;
  font-size: 14px;
  font-weight: 700;
`
const H3 = styled.h3`
  width: 60%;
`
const H2 = styled.h2`
  width: 40%;
  font-size: 20px;
  color: green;
`
interface PriceProps {
  beta_value: number
  circulating_supply: number
  first_data_at: string
  id: string
  last_updated: string
  max_supply: number
  name: string
  quotes: {
    USD: {
      ath_date: string
      ath_price: number
      market_cap: number
      market_cap_change_24h: number
      percent_change_1h: number
      percent_change_1y: number
      percent_change_6h: number
      percent_change_7d: number
      percent_change_12h: number
      percent_change_15m: number
      percent_change_24h: number
      percent_change_30d: number
      percent_change_30m: number
      percent_from_price_ath: number
      price: number
      volume_24h: number
      volume_24h_change_24h: number
    }
  }
  rank: number
  symbol: string
  total_supply: number
}
interface MoneyProps {
  coinId: string
}

function Price({ coinId }: MoneyProps) {
  const { isLoading, data } = useQuery(['money', coinId], () =>
    fetchPrice(coinId)
  )

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div>
      <Main>
        <H3>Price:</H3>
        <H2>${data?.quotes.USD.price.toFixed(2)}</H2>
      </Main>
      <Main>
        <H3>Max Change rate in last 24h:</H3>
        <H2>{data?.quotes.USD.market_cap_change_24h} %</H2> 
      </Main>
      <Main>
        <H3>Change rate (last 30 Minutes):</H3>
        <H2>{data?.quotes.USD.price.toFixed(3)} %</H2>
      </Main>
      <Main>
        <H3>Change rate (last 1 hours):</H3>
        <H2>{data?.quotes.USD.percent_change_1h} %</H2>
      </Main>
      <Main>
        <H3>Change rate (last 12 hours):</H3>
        <H2>{data?.quotes.USD.percent_change_12h} %</H2>
      </Main>
      <Main>
        <H3>Change rate (last 24 hours):</H3>
        <H2>{data?.quotes.USD.percent_change_24h}%</H2>
      </Main>
    </div>
  )
}

export default Price
