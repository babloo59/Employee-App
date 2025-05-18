import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CreateEmployeePage from "./pages/CreateEmployeePage";

function App() {
  return (
    <div className="bg-slate-800 h-screen w-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addemployee" element={<CreateEmployeePage />} />
        <Route path="/edit/:id" element={<EditEmployeePage />} />
      </Routes>
    </div>
  );
}

export default App;
