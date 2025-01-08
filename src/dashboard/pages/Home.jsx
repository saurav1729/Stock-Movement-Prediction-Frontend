import React, { Fragment, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import TopBar from "../components/TopBar";

const Home = () => {
  useEffect(() => {
    const handleDragOver = (event) => {
      event.preventDefault();
    };

    const handleDrop = (event) => {
      event.preventDefault();
      const offset = event.dataTransfer.getData("text/plain").split(",");
      const buyWindow = document.getElementById("buy-window");

      if (buyWindow) {
        buyWindow.style.left = `${event.clientX + parseInt(offset[0], 10)}px`;
        buyWindow.style.top = `${event.clientY + parseInt(offset[1], 10)}px`;
      }
    };

    // Attach event listeners to the document body
    document.body.addEventListener("dragover", handleDragOver);
    document.body.addEventListener("drop", handleDrop);

    // Cleanup event listeners on unmount
    return () => {
      document.body.removeEventListener("dragover", handleDragOver);
      document.body.removeEventListener("drop", handleDrop);
    };
  }, []);

  return (
    <Fragment>
      <TopBar />
      <Dashboard />
    </Fragment>
  );
};

export default React.memo(Home);
