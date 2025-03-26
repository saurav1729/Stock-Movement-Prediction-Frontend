import React, { useEffect, useState, useCallback, useMemo } from "react"
import Plot from "react-plotly.js"

const CandleChart = React.memo(({ symbol }) => {
  const [chartData, setChartData] = useState(null)
  const [loading , setLoading]=useState(false); 

  const fetchChartData = useCallback(async () => {
    try {
      setLoading(true); 
      const response = await fetch(
        `http://localhost:5500/api/chartData?region=IN&symbol=${symbol}&interval=5m&range=5Y&comparisons=%5EGDAXI,%5EFCHI`,
      )
      const data = await response.json()
      console.log("chart data ", data)

      const result = data.chart.result[0]
      const timestamps = result.timestamp.map((ts) =>
        new Date(ts * 1000).toLocaleString("en-GB", { timeZone: result.meta.timezone }),
      )
      const quotes = result.indicators.quote[0]
      const { open, high, low, close } = quotes

      setChartData({ timestamps, open, high, low, close })
      setLoading(false);
    } catch (error) {
      setLoading(false); 
      console.error("Error fetching chart data:", error)
    }
  }, [symbol])

  useEffect(() => {
    fetchChartData()
  }, [fetchChartData])

  const memoizedLayout = useMemo(
    () => ({
      title: `Candlestick Chart for ${symbol}`,
      xaxis: { title: "Time", rangeslider: { visible: false } },
      yaxis: { title: "Price" },
      autosize: true,
      responsive: true,
    }),
    [symbol],
  )

  if (!chartData || !chartData.timestamps?.length || !chartData.open?.length) {
    return <div>Loading...</div>
  }

  return (
   !loading && <Plot
      data={[
        {
          x: chartData.timestamps,
          open: chartData.open,
          high: chartData.high,
          low: chartData.low,
          close: chartData.close,
          type: "candlestick",
          increasing: { line: { color: "green" } },
          decreasing: { line: { color: "red" } },
        },
      ]}
      layout={memoizedLayout}
      useResizeHandler={true}
      style={{ width: "100%", height: "480px" }}
      className="w-full"
    />
  )
})

export default CandleChart

