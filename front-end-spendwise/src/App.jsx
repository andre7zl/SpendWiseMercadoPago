import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import GastosCategorizados from "./pages/GastosCategorizados";
import GastosNaoCategorizados from "./pages/GastosNaoCategorizados";
import Home from "./pages/Home";
import Categorias from "./pages/Categorias";
import Dashboard from "./pages/Dashboard";
import Gasto from "./pages/Gasto";
import AdicionarCategoria from "./pages/AdicionarCategoria";
function App() {
  return (
    <Router>
      <Routes>
        {/* Layout com Sidebar fixa */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="gastos-nao-categorizados"
            element={<GastosNaoCategorizados />}
          />
          <Route
            path="gastos-categorizados"
            element={<GastosCategorizados />}
          />
          <Route path="gasto" element={<Gasto />} />
          <Route path="categorias" element={<Categorias />} />
          <Route path="add-categoria" element={<AdicionarCategoria />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
