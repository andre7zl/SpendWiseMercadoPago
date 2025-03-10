import { Link, Outlet } from "react-router-dom";
import { ClipboardList, Wallet, List, ChartColumn } from "lucide-react";
import { useState } from "react";

const Layout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="w-screen h-screen flex">
      {/* Sidebar */}
      <div className="w-64 h-full bg-zinc-900 p-4 flex flex-col space-y-2 shadow-lg">
        <Link to="/">
          <h2 className="text-white text-2xl font-bold">SpendWise</h2>
        </Link>
        <Link
          to="dashboard"
          className={`flex items-center mt-5 p-2 text-white rounded-lg transition ${
            activeTab === "dashboard" ? "bg-zinc-800" : "hover:bg-zinc-800"
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          <ChartColumn className="mr-2" size={20} />{" "}
          <p style={{ fontSize: "15px" }}>Dashboard</p>
        </Link>

        <Link
          to="/gastos-nao-categorizados"
          className={`flex items-center p-2 text-white rounded-lg transition ${
            activeTab === "gastos-nao-categorizados"
              ? "bg-zinc-800"
              : "hover:bg-zinc-800"
          }`}
          onClick={() => setActiveTab("gastos-nao-categorizados")}
        >
          <ClipboardList className="mr-2" size={20} />{" "}
          <p style={{ fontSize: "15px" }}>Configurar gastos</p>
        </Link>

        <Link
          to="/gastos-categorizados"
          className={`flex items-center p-2 text-white rounded-lg transition ${
            activeTab === "gastos-categorizados"
              ? "bg-zinc-800"
              : "hover:bg-zinc-800"
          }`}
          onClick={() => setActiveTab("gastos-categorizados")}
        >
          <Wallet className="mr-2" size={20} />{" "}
          <p style={{ fontSize: "15px" }}>Gastos categorizados</p>
        </Link>

        <Link
          to="/categorias"
          className={`flex items-center p-2 text-white rounded-lg transition ${
            activeTab === "categorias" ? "bg-zinc-800" : "hover:bg-zinc-800"
          }`}
          onClick={() => setActiveTab("categorias")}
        >
          <List className="mr-2" size={20} />{" "}
          <p style={{ fontSize: "15px" }}>Categorias</p>
        </Link>
      </div>

      {/* Área de Conteúdo */}
      <div className="flex-1 bg-zinc-800 flex justify-center p-6">
        <div className="w-full space-y-4">
          <Outlet /> {/* Renderiza a página atual */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
