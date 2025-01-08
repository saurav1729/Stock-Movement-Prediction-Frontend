import React, { useEffect } from "react";
// import { Route } from "react-router-dom";
import { GeneralContextProvider } from "../../store/GenralContext";

import classes from "../css/Dashboard.module.css";
// import Apps from "./Apps";
// import Funds from "./Funds";
// import Holdings from "./Holdings";

import Orders from "./Orders";
// import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard / Persuit";
  }, []);

  return (
    <div className={classes.container}>
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>
    <div className={classes.content}> 
     <Summary/>
      
        {/* <Route path="/holdings" component={Holdings} /> */}
        {/* <Route path="/positions" component={Positions} /> */}
        {/* <Route path="/funds" component={Funds} /> */}
        {/* <Route path="/apps" component={Apps} />  */}
     </div>
    </div>
  );
};

export default React.memo(Dashboard);
