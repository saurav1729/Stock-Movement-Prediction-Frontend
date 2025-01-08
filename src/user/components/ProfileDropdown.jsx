import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MdAdjust,
  MdExitToApp,
  MdGamepad,
  MdHelpOutline,
  MdPermIdentity,
  MdPersonAdd,
  MdThumbsUpDown,
} from "react-icons/md";
import { signout } from "../../auth/helpers";
import styles from "../css/ProfileDropdown.module.css";


const ProfileDropdown = () => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    signout()
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>Saurav Jha</h4>
        <p>saurav@gmail.com</p>
      </div>
      <hr />
      <div className={styles.settings}>
        <MdPermIdentity className={styles.icon} />
        <h6>
          My profile <span>/ Settings</span>
        </h6>
      </div>
      <hr />
      <div className={styles.menus}>
        <div className={styles.menu}>
          <MdAdjust className={styles.icon} />
          <h6>Console</h6>
        </div>
        <div className={styles.menu}>
          <MdAdjust className={styles.icon} />
          <h6>Coin</h6>
        </div>
        <div className={styles.menu}>
          <MdThumbsUpDown className={styles.icon} />
          <h6>Support</h6>
        </div>
        <div className={styles.menu}>
          <MdPersonAdd className={styles.icon} />
          <h6>Invite friends</h6>
        </div>
      </div>
      <hr />
      <div className={styles.menus}>
        <div className={styles.menu}>
          <MdPersonAdd className={styles.icon} />
          <h6>Tour Kite</h6>
        </div>
        <div className={styles.menu}>
          <MdGamepad className={styles.icon} />
          <h6>Keyboard shortcuts</h6>
        </div>
        <div className={styles.menu}>
          <MdHelpOutline className={styles.icon} />
          <h6>Help</h6>
        </div>
        <div className={`${styles.menu} ${styles.logoutButton}`} onClick={handleLogoutClick}>
          <MdExitToApp className={styles.icon} />
          <h6>Logout</h6>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;

