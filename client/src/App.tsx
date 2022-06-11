import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Form from "./components/Form/Form";
import Loading from "./components/Loading/Loading";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { ContextProvider } from "./context";
import ProtectedRoute from "./utils/ProtectedRoute";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
function App() {
  const { loading, modal } = useContext(ContextProvider);
  return (
    <>
      <BrowserRouter>
        {loading ? <Loading /> : <></>}
        {modal ? <Form /> : <></>}
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  );
}

export default App;
