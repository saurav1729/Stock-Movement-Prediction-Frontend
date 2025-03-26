import React, { useContext, useState, useEffect, useRef } from "react";
import classes from "../css/Menu.module.css";
import { Link } from "react-router-dom";
import ProfileDropdown from "../../user/components/ProfileDropdown";
import AuthContext from "../../auth/context/AuthContext";

const Menu = (props) => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const authCtx = useContext(AuthContext);
  const profileRef = useRef(null);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen((prevState) => !prevState);
  };

  const closeProfileDropdown = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsProfileDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeProfileDropdown);
    return () => {
      document.removeEventListener("mousedown", closeProfileDropdown);
    };
  }, []);

  const menuClass = `${classes.menu}`;
  const menuClassWithActive = `${classes.menu} ${classes.selected}`;

  return (
    <div className={classes["menu-container"]}>
      <img src={""} alt="Kite" className={classes.logo} />
      <div className={classes.menus}>
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p
                className={
                  selectedMenu === 0 ? menuClassWithActive : menuClass
                }
              >
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p
                className={
                  selectedMenu === 1 ? menuClassWithActive : menuClass
                }
              >
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p
                className={
                  selectedMenu === 2 ? menuClassWithActive : menuClass
                }
              >
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p
                className={
                  selectedMenu === 3 ? menuClassWithActive : menuClass
                }
              >
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p
                className={
                  selectedMenu === 4 ? menuClassWithActive : menuClass
                }
              >
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(5)}
            >
              <p
                className={
                  selectedMenu === 5 ? menuClassWithActive : menuClass
                }
              >
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div
          className={classes.profile}
          onClick={handleProfileClick}
          ref={profileRef}
        >
          <div className={classes.avatar}>{authCtx.user.full_name}</div>
          <p className={classes.username}>{authCtx.user.email}</p>
          {isProfileDropdownOpen && <ProfileDropdown history={props.history} />}
        </div>
      </div>
    </div>
  );
};

export default Menu;
