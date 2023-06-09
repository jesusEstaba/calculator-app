import React from "react";
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import { Calculator } from "./screens/Calculator";
import {History} from "./screens/History";
import {Navbar} from "./shared/Navbar";
import {AuthProvider} from "./contexts/AuthContext";
import {AlertProvider} from "./contexts/AlertContext";
import Alert from "./shared/Alert";
import {BalanceProvider} from "./contexts/BalanceContext";

const App: React.FC = () => {
  return (
      <>
          <AuthProvider>
              <BalanceProvider>
                  <AlertProvider>
                      <Router>
                          <Navbar />
                          <Alert/>
                          <Routes>
                              <Route path="/" element={<Navigate to="/login" />} />
                              <Route path="/login" element={<Login />} />
                              <Route path="/register" element={<Register />} />
                              <Route path="/operations" element={<Calculator />} />
                              <Route path="/history" element={<History />} />
                          </Routes>
                      </Router>
                  </AlertProvider>
              </BalanceProvider>
          </AuthProvider>
      </>
  );
};

export default App;
