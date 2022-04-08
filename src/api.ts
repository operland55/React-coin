const Base_URL = `https://api.coinpaprika.com/v1`

export function fetchCoins() {
  return fetch(`${Base_URL}/coins`).then(res => res.json())
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${Base_URL}/coins/${coinId}`).then(res => res.json())
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${Base_URL}/tickers/${coinId}`).then(res => res.json())
}

export function fetchCoinHisTory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000)
  const startDate = endDate - 60 * 60 * 24 * 7 * 10 // 일주일전 계산
  return fetch(
    `${Base_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then(res => res.json())
}

export function fetchPrice(coinId: string) {
  return fetch(`${Base_URL}/tickers/${coinId}`).then(res => res.json())
}
