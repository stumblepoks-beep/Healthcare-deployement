// src/LoadingContext.jsx
import { createContext, useContext, useState } from "react";
import './App.css'
const LoadingContext = createContext();

export function useLoading() {
  return useContext(LoadingContext);
}

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState();

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && <FullScreenSpinner />}
      {children}
    </LoadingContext.Provider>
  );
}

function FullScreenSpinner() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      zIndex: 9999
    }}>
      <div className="spinner"></div>
    </div>
  );
}
