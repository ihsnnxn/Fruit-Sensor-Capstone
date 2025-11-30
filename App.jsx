import React from "react";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <div className="container">
      <h1>Hypobaric Chamber Dashboard</h1>
      <Dashboard apiBase="http://localhost:4000" />
    </div>
  );
}
