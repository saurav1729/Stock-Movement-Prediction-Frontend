import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getMarketOverview } from '../helpers';
import Menu from './Menu';
import styles from '../css/TopBar.module.css';
import AuthContext from '../../auth/context/AuthContext';

const initialIndexState = [
  { index_name: 'Nifty 50', index_value: 0.0, change: 0.0, is_up_direction: true },
  { index_name: 'Sensex', index_value: 0.0, change: 0.0, is_up_direction: true },
];

const TopBar = () => {
  const authCtx = useContext(AuthContext); 
  const [indexData, setIndexData] = useState(initialIndexState);

  useEffect(() => {
    const token = authCtx.token; 
    let intervalId;

    if (token) {
      const fetchMarketOverview = () => {
        getMarketOverview(token)
          .then((data) => {
            // Calculate the percentage change for each index
            setIndexData((prevData) =>
              data.map((item, index) => {
                const prevValue = prevData[index].index_value || 0;
                const change = item.index_value - prevValue;
                const percentageChange = prevValue !== 0 ? (change / prevValue) * 100 : 0;

                return {
                  ...item,
                  change: percentageChange.toFixed(2), // Store percentage change
                  is_up_direction: change >= 0, // Determine if it's up or down
                };
              })
            );
          })
          .catch((err) => {
            console.error('Error occurred while fetching market overview', err);
          });
      };

      // Fetch immediately and set interval for repeated fetching
      fetchMarketOverview();
      intervalId = setInterval(fetchMarketOverview, 1000); // Calls every 1000 ms (1 second)
    }

    // Cleanup function to clear the interval when the component unmounts or token changes
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [authCtx.token]); // Dependency array ensures it updates when `authCtx.token` changes

  const [nifty, sensex] = indexData;

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="https://www.eklavvya.com/blog/wp-content/uploads/2022/03/Zerodha-Logo-300x200.png" alt="Logo" className={styles.logoImage} />
        </Link>
      </div>
      <div className={styles.indicesContainer}>
        <div className={styles.indexItem}>
          <p className={styles.indexName}>{nifty.index_name}</p>
          <p className={styles.indexValue}>{nifty.index_value.toFixed(2)}</p>
          <p className={`${styles.indexChange} ${nifty.is_up_direction ? styles.up : styles.down}`}>
            {nifty.change > 0 ? '+' : ''}{nifty.change}%
          </p>
        </div>
        <div className={styles.indexItem}>
          <p className={styles.indexName}>{sensex.index_name}</p>
          <p className={styles.indexValue}>{sensex.index_value.toFixed(2)}</p>
          <p className={`${styles.indexChange} ${sensex.is_up_direction ? styles.up : styles.down}`}>
            {sensex.change > 0 ? '+' : ''}{sensex.change}%
          </p>
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default React.memo(TopBar);
