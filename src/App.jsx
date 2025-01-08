import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./dashboard/pages/Home";
import Login from "./auth/pages/Login";
import PrivateRoute from "./auth/helpers/PrivateRoute";
import { Outlet } from "react-router-dom";
import Orders from "./dashboard/components/Orders";
import Signup from "./auth/pages/signup";

const Layout = () => (
  <div>
    {/* Add your Header here if needed */}
    <div style={{"width":"100vw"}} className="bg-gradient-to-t from-[#cfd9df] to-[#e2ebf0]">
      <Outlet />
    </div>
    {/* Add your Footer here if needed */}
  </div>
);

const AuthLayout = () => (
  <div className="">
    <Outlet />
  </div>
);

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Private Routes */}
          <Route element={<Layout />}>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/orders" element={<Orders/>} />
            </Route>
          </Route>

          {/* Public Routes */}
        \
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
