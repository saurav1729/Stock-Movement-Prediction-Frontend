import React, { useState, useCallback } from "react"
import CandleChart from "../components/CandleChart"
import WatchList from "./WatchList"

const Dashboard = () => {
  const [selectedStockSymbol, setSelectedStockSymbol] = useState("INFY.NS")

  const handleSelectStock = useCallback((symbol) => {
    setSelectedStockSymbol(symbol)
  }, [])

  return (
    <div className="flex flex-col">
      <div className="flex w-screen">
        <WatchList className="" onSelectStock={handleSelectStock} />
        <div className="mt-3 ml-3">
          <CandleChart symbol={selectedStockSymbol} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

