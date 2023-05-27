import { useSelector } from "react-redux";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Compose from "./components/Mail/Compose";
import InboxPage from "./components/Mail/InboxPage";
import About from "./components/pages/About";
import Registration from "./components/Auth/Registration";
import Login from "./components/Auth/Login";
import Home from "./components/pages/Home";

function App() {
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLogin);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            !isLogin ? (
              <Navigate to="login" />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route path="/login" element={!isLogin && <Login />} />
        <Route path="/register" element={!isLogin && <Registration />} />
        <Route path="/home" element={isLogin && <Home />} />
        <Route path="/email" element={isLogin && <InboxPage />} />
        <Route path="/about" element={isLogin && <About />} />
      </Routes>
      {isLogin && (
        <Layout>
          <Compose />
          <InboxPage/>
        </Layout>
      )}
    </>
  );
}

export default App;
