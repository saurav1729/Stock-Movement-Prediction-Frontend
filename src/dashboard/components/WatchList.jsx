import React, { useState, useEffect, useContext } from 'react';
import { Tooltip } from "@mui/material";
import { FaChartBar, FaTrashAlt, FaArrowDown, FaArrowUp, FaList, FaEllipsisH, FaCog, FaSearch } from 'react-icons/fa';
import GeneralContext from "../../store/GenralContext";
import styles from '../css/WatchList.module.css';
import { mockWatchlistData } from "../../util/mockData";

const WatchList = () => {
  const [watchlists, setWatchlists] = useState(mockWatchlistData);
  const [activeWatchlistIndex, setActiveWatchlistIndex] = useState(0);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulating API call to fetch watchlist data
    fetchWatchlistData();
  }, []);

  useEffect(() => {
    const activeWatchlist = watchlists[activeWatchlistIndex];
    const filtered = activeWatchlist.filter(stock => 
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(filtered);
  }, [searchTerm, watchlists, activeWatchlistIndex]);

  const fetchWatchlistData = async () => {
    // This would be replaced with an actual API call
    setWatchlists(mockWatchlistData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg: infy, bse, nifty fut weekly, gold mcx"
          className={styles.search}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className={styles.counts}>
          {filteredList.length} / {watchlists[activeWatchlistIndex].length}
        </span>
      </div>

      <ul className={styles.list}>
        {filteredList.map((stock) => (
          <WatchListItem stock={stock} key={stock.id} />
        ))}
      </ul>

      <WatchlistFooter 
        activeIndex={activeWatchlistIndex}
        setActiveIndex={setActiveWatchlistIndex}
        watchlistsCount={watchlists.length}
      />
    </div>
  );
};

const WatchListItem = ({ stock }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      className={styles.listItem}
    >
      <div className={styles.item}>
        <div className={styles.stockInfo}>
          <p className={styles.stockName}>{stock.name}</p>
          <p className={styles.stockSymbol}>{stock.symbol}</p>
        </div>
        <div className={styles.priceInfo}>
          <span className={styles.price}>{stock.price.toFixed(2)}</span>
          <span className={stock.isDown ? styles.down : styles.up}>
            {stock.change.toFixed(2)} ({stock.percentChange.toFixed(2)}%)
            {stock.isDown ? <FaArrowDown /> : <FaArrowUp />}
          </span>
        </div>
      </div>
      {showActions && <WatchListActions stock={stock} />}
    </li>
  );
};

const WatchListActions = ({ stock }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(stock.symbol);
  };

  return (
    <div className={styles.actions}>
      <Tooltip title="Buy (B)" placement="top" arrow>
        <button className={styles.buy} onClick={handleBuyClick}>B</button>
      </Tooltip>
      <Tooltip title="Sell (S)" placement="top" arrow>
        <button className={styles.sell}>S</button>
      </Tooltip>
      <Tooltip title="Market depth (D)" placement="top" arrow>
        <button className={styles.action}><FaList /></button>
      </Tooltip>
      <Tooltip title="Chart (C)" placement="top" arrow>
        <button className={styles.action}><FaChartBar /></button>
      </Tooltip>
      <Tooltip title="Delete (del)" placement="top" arrow>
        <button className={styles.action}><FaTrashAlt /></button>
      </Tooltip>
      <Tooltip title="More" placement="top" arrow>
        <button className={styles.action}><FaEllipsisH /></button>
      </Tooltip>
    </div>
  );
};

const WatchlistFooter = ({ activeIndex, setActiveIndex, watchlistsCount }) => {
  return (
    <div className={styles.watchlistFooter}>
      <ul>
        {Array.from({ length: watchlistsCount }, (_, index) => (
          <Tooltip key={index} title={`Watchlist ${index + 1}`} placement="top" arrow>
            <li
              className={activeIndex === index ? styles.active : ''}
              onClick={() => setActiveIndex(index)}
            >
              {index + 1}
            </li>
          </Tooltip>
        ))}
      </ul>
      <Tooltip title="Marketwatch settings" placement="left" arrow>
        <FaCog className={styles.settings} />
      </Tooltip>
    </div>
  );
};

export default WatchList;
