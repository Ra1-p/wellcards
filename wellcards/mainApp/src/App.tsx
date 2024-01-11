import { Route, Routes } from "react-router";
import { BrowserRouter, Navigate, Outlet } from "react-router-dom";
import "./App.scss";
import Dashboard from "./pages/Dashboard/index";

import Wallet from "./pages/Wallet";
import Layout from "./components/Layout";
import Transactions from "./pages/Transactions";
import Returns from "./pages/Returns";
import TopUp from "./pages/TopUp";
import TeamTransfer from "./pages/TeamTransfer";
import BalanceActivity from "./pages/BalanceActivity";
import NotFoundPage from "./pages/NotFoundPage";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./redux/store";
import { checkAuth } from "./redux/slices/userSlice";
import { lazy, Suspense, useEffect } from "react";
import Loader from "./components/Loader";

const Cards = lazy(() => import("./pages/Cards"));
const IssueCard = lazy(() => import("./pages/IssueCard"));
const CardDetails = lazy(() => import("./pages/CardDetails"));


function App() {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.appReducer.isLoading);

  useEffect(() => {
    const token = localStorage.getItem("refresh");
    if (token) {
      dispatch(checkAuth(token));
    }
  }, [])

  if (isLoading) {
    return <Loader/>
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path='/' element={<ProtectedRoute/>}>
            <Route path='/' element={<Layout />}>
              <Route index element={<Dashboard />}></Route>
              <Route path='cards' element={<Cards />}></Route>
              <Route path='cards/:id' element={<CardDetails />}></Route>
              <Route path='cards/issue' element={<IssueCard />}></Route>
              <Route path='cards/transactions' element={<Transactions />}></Route>
              <Route path='cards/returns' element={<Returns />}></Route>
              <Route path='wallet' element={<Wallet />}></Route>
              <Route path='wallet/top-up' element={<TopUp />}></Route>
              <Route path='wallet/team-transfer' element={<TeamTransfer />}></Route>
              <Route path='wallet/activity' element={<BalanceActivity />}></Route>
              <Route path='account' element={<Account />}></Route>
            </Route>
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>

    </BrowserRouter>
  );
}

function ProtectedRoute() {
  const isAuth = useSelector((state: RootState) => state.userSliceReducer.isAuth);
  return (isAuth ? <Outlet /> : <Navigate to="/login/" replace={true} />)
};

export default App;
