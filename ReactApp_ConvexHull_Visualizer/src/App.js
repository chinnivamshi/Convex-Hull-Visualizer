// import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import KPM from "./components/kpm/kpm";
import MARCH from "./components/march/march";
import Landing from "./components/landing/landing";
import Comparison from "./components/comparison/comparison";
import Applications from "./components/applications/applications";


function App() {
  return (
    <div className="App">
      <script src="lines.js"></script>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="kpm" element={<KPM />} />
            <Route path="march" element={<MARCH />} />
            <Route path="comparison" element={<Comparison />} />
            <Route path="applications" element={<Applications />} />
          </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
