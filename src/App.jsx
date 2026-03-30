import { useState } from "react";
import Navbar from "./components/Navbar";
import SidebarWithPanels from "./components/Sidebar";
import BankingFormPage from "./pages/BankingFormPage";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex h-[calc(100vh-3.5rem)]">
        {sidebarOpen && <SidebarWithPanels />}

        <div className="flex-1 overflow-auto p-5">
          <BankingFormPage />
        </div>
      </div>
    </div>
  );
}

export default App;
