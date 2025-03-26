import { useState, useEffect } from "react"
import { getMarketOverview } from "../helpers"

export const useMarketOverview = (token) => {
  const [indexData, setIndexData] = useState([
    { index_name: "Nifty 50", index_value: 0.0, change: 0.0, is_up_direction: true },
    { index_name: "Sensex", index_value: 0.0, change: 0.0, is_up_direction: true },
  ])

  useEffect(() => {
    if (token) {
      const fetchMarketOverview = async () => {
        try {
          const data = await getMarketOverview(token)
          console.log("Raw Data from API:", data)
          const newData = data.body
          if (data && data.body && Array.isArray(newData)) {
            setIndexData(
              newData.map((item) => ({
                index_name: item.longName,
                index_value: item.regularMarketPrice,
                change: item.regularMarketChangePercent,
                is_up_direction: item.regularMarketChangePercent >= 0,
              })),
            )
          } else {
            console.error("Unexpected API response format:", data)
          }
        } catch (err) {
          console.error("Error occurred while fetching market overview:", err)
        }
      }

      fetchMarketOverview()
    }
  }, [token])

  return indexData
}

