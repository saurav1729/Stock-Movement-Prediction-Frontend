import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa"; // Imported from react-icons

import classes from "../css/Orders.module.css";

const Orders = () => {
  useEffect(() => {
    document.title = "Orders / Persuit";
  }, []);

  return (
    <div className={classes.orders}>
      <div className={classes["no-orders"]}>
        <FaBookOpen className={classes.icon} /> {/* Replaced MenuBookOutlined with FaBookOpen */}
        <p>You haven't placed any orders today</p>

        <Link to={"/"} className={classes.btn}>
          Get started
        </Link>
      </div>
    </div>
  );
};

export default Orders;
