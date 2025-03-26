import React, { useEffect, useState, useCallback, useMemo } from "react"
import { FaSearch, FaChartBar, FaTrashAlt, FaArrowDown, FaArrowUp, FaList, FaEllipsisH, FaCog } from "react-icons/fa"

const fetchData = async (companies) => {
  try {
    const response = await fetch("http://localhost:5500/api/companiesData")
    const data = await response.json()

    const currentDate = new Date().toISOString().split("T")[0]
    localStorage.setItem("watchlistData", JSON.stringify(data))
    localStorage.setItem("lastFetchDate", currentDate)

    return companies.map((company, index) => ({
      name: company.name,
      symbol: company.symbol,
      currentMarketPrice: Number.parseFloat(data.currentMarketPrices[index]) || 0,
      percentChange: Number.parseFloat(data.percentChanges[index]) || 0,
    }))
  } catch (error) {
    console.error("Error fetching watchlist data:", error)
    return companies.map((company) => ({
      name: company.name,
      symbol: company.symbol,
      currentMarketPrice: 0,
      percentChange: 0,
    }))
  }
}

const WatchList = ({ onSelectStock }) => {
  const companies = useMemo(
    () => [
      { name: "HDFCBANK BSE", symbol: "HDFCBANK.NS" },
      { name: "INFY", symbol: "INFY.NS" },
      { name: "TCS BSE", symbol: "TCS.NS" },
      { name: "ONGC", symbol: "ONGC.NS" },
      { name: "GOLDBEES", symbol: "GOLDBEES.NS" },
    ],
    [],
  )

  const [watchlist, setWatchlist] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedStock, setSelectedStock] = useState(null)

  const formatNumber = (value) => {
    if (typeof value === "string") {
      value = Number.parseFloat(value)
    }
    return typeof value === "number" && !isNaN(value) ? value.toFixed(2) : "0.00"
  }

  useEffect(() => {
    const storedData = localStorage.getItem("watchlistData")
    const lastFetchDate = localStorage.getItem("lastFetchDate")
    const currentDate = new Date().toISOString().split("T")[0]

    const loadData = async () => {
      setLoading(true)
      let mappedData

      if (storedData && lastFetchDate === currentDate) {
        try {
          const parsedData = JSON.parse(storedData)
          mappedData = companies.map((company, index) => ({
            name: company.name,
            symbol: company.symbol,
            currentMarketPrice: Number.parseFloat(parsedData.currentMarketPrices[index]) || 0,
            percentChange: Number.parseFloat(parsedData.percentChanges[index]) || 0,
          }))
        } catch (error) {
          console.error("Error parsing stored data:", error)
          mappedData = await fetchData(companies)
        }
      } else {
        mappedData = await fetchData(companies)
      }

      setWatchlist(mappedData)
      setFilteredList(mappedData)

      if (!selectedStock) {
        setSelectedStock(mappedData[0])
        onSelectStock(mappedData[0].symbol)
      }

      setLoading(false)
    }

    loadData()
  }, [companies, onSelectStock])

  useEffect(() => {
    const filtered = watchlist.filter(
      (stock) =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredList(filtered)
  }, [searchTerm, watchlist])

  const handleStockSelect = (stock) => {
    setSelectedStock(stock)
    onSelectStock(stock.symbol)
  }

  return (
    <div className="p-6 space-y-4 w-2/6 border-r border-gray-200 h-full shadow-[2px_0_4px_rgba(0,0,0,0.1)]">
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search eg: infy, bse, nifty fut weekly, gold mcx"
          className="w-full pl-10 pr-4 py-2 border rounded-md text-sm border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
          {filteredList.length} / {watchlist.length}
        </span>
      </div>

      {loading ? (
        <div role="status" className="flex justify-center items-center">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {filteredList.map((stock) => (
            <WatchListItem
              key={stock.symbol}
              stock={stock}
              isSelected={selectedStock?.symbol === stock.symbol}
              onSelect={handleStockSelect}
              formatNumber={formatNumber}
            />
          ))}
        </div>
      )}

      <WatchlistFooter watchlistsCount={5} />
    </div>
  )
}

const WatchListItem = ({ stock, isSelected, onSelect, formatNumber }) => {
  const [showActions, setShowActions] = useState(false)

  return (
    <div
      className={`flex justify-between items-center py-3 text-sm cursor-pointer m-1 p-2 rounded-md ${
        isSelected ? "bg-[#ff572289]" : ""
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onClick={() => onSelect(stock)}
    >
      <div className="flex-grow">
        <p className="font-medium text-gray-800">{stock.name}</p>
        <p className="text-gray-600">{stock.symbol}</p>
      </div>
      <div className="text-right">
        <p className="font-medium text-gray-800">₹{formatNumber(stock.currentMarketPrice)}</p>
        <p className={stock.percentChange >= 0 ? "text-green-600" : "text-red-600"}>
          {formatNumber(stock.percentChange)}%
          {stock.percentChange >= 0 ? <FaArrowUp className="inline ml-1" /> : <FaArrowDown className="inline ml-1" />}
        </p>
      </div>
      {showActions && <WatchListActions />}
    </div>
  )
}

const WatchListActions = () => {
  return (
    <div className="flex space-x-2 ml-2">
      <button className="p-1 hover:bg-gray-200 rounded" title="Buy">
        B
      </button>
      <button className="p-1 hover:bg-gray-200 rounded" title="Sell">
        S
      </button>
      <button className="p-1 hover:bg-gray-200 rounded" title="Market depth">
        <FaList />
      </button>
      <button className="p-1 hover:bg-gray-200 rounded" title="Chart">
        <FaChartBar />
      </button>
      <button className="p-1 hover:bg-gray-200 rounded" title="Delete">
        <FaTrashAlt />
      </button>
      <button className="p-1 hover:bg-gray-200 rounded" title="More">
        <FaEllipsisH />
      </button>
    </div>
  )
}

const WatchlistFooter = ({ watchlistsCount }) => {
  return (
    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
      <ul className="flex space-x-2">
        {Array.from({ length: watchlistsCount }, (_, index) => (
          <li
            key={index}
            className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
            title={`Watchlist ${index + 1}`}
          >
            {index + 1}
          </li>
        ))}
      </ul>
      <FaCog className="text-gray-600 cursor-pointer hover:text-gray-800" title="Marketwatch settings" />
    </div>
  )
}

export default WatchList

