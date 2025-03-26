import React, { useContext } from "react"
import { Link } from "react-router-dom"
import Menu from "./Menu"
import styles from "../css/TopBar.module.css"
import AuthContext from "../../auth/context/AuthContext"
import { useMarketOverview } from "../hooks/useMarketOverview"

const TopBar = () => {
  const authCtx = useContext(AuthContext)
  const indexData = useMarketOverview(authCtx.token)

  const [nifty, sensex] = indexData

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link to="/">
          <img
            src="https://www.eklavvya.com/blog/wp-content/uploads/2022/03/Zerodha-Logo-300x200.png"
            alt="Logo"
            className={styles.logoImage}
          />
        </Link>
      </div>
      <div className={styles.indicesContainer}>
        <div className={styles.indexItem}>
          <p className={styles.indexName}>{nifty.index_name}</p>
          <p className={styles.indexValue}>{nifty.index_value.toFixed(2)}</p>
          <p className={`${styles.indexChange} ${nifty.is_up_direction ? styles.up : styles.down}`}>
            {nifty.change > 0 ? "+" : ""}
            {nifty.change.toFixed(2)}%
          </p>
        </div>
        <div className={styles.indexItem}>
          <p className={styles.indexName}>{sensex.index_name}</p>
          <p className={styles.indexValue}>{sensex.index_value.toFixed(2)}</p>
          <p className={`${styles.indexChange} ${sensex.is_up_direction ? styles.up : styles.down}`}>
            {sensex.change > 0 ? "+" : ""}
            {sensex.change.toFixed(2)}%
          </p>
        </div>
      </div>
      <Menu />
    </div>
  )
}

export default React.memo(TopBar)

