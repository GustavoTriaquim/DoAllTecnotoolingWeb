import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeadsPage from "./Pages/Leads/Leads";
import FormularioPage from "./Pages/Formulario/Formulario";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LeadsPage />}/>
        <Route path="/analise/:id" element={<FormularioPage />}/>
      </Routes>
    </Router>
  )
}

export default App;