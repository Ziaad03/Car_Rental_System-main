import "./App.css";

import HomePage from "./Components/HomePage";
import AdminPage from "./Components/AdminPage";
import CustomerPage from "./Components/CustomerPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/customer" element={<CustomerPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
