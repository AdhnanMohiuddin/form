import { useState } from "react";
import Navbar from "./components/Navbar";
import SidebarWithPanels from "./components/Sidebar";
import BankingFormPage from "./pages/BankingFormPage";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar toggle

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        {sidebarOpen && <SidebarWithPanels />}

        {/* Main content */}
        <div className="flex-1 overflow-auto p-4">
          <BankingFormPage />
        </div>
      </div>
    </div>
  );
}

export default App;