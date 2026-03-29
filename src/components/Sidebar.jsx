import { useState } from "react";
import { Home, Repeat, Grid, Settings, Menu } from "lucide-react";

export default function SidebarWithPanels() {
  const [activePanel, setActivePanel] = useState(null); // 'home', 'arrows', 'grid', 'settings'
  const [sidebarOpen, setSidebarOpen] = useState(true); // for collapsing sidebar

  const mainIcons = [
    { id: "home", icon: Home, label: "Home" },
    { id: "arrows", icon: Repeat, label: "Open Banking Services" },
    { id: "grid", icon: Grid, label: "Letter of Guarantee" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="flex min-h-full">
      {/* Collapsible Sidebar */}
      {sidebarOpen && (
        <div className="flex flex-col items-center w-16 bg-white border-r shadow-md py-4 space-y-6 min-h-full">
          {mainIcons.map(({ id, icon: Icon, label }) => {
            const isActive = activePanel === id;
            return (
              <button
                key={id}
                onClick={() => setActivePanel(isActive ? null : id)}
                className={`flex items-center justify-center w-12 h-12 rounded-md transition-colors
                  ${isActive ? "bg-orange-400 text-white" : "text-gray-600 hover:bg-gray-200"}`}
                title={label}
                aria-label={label}
              >
                <Icon size={24} />
              </button>
            );
          })}
        </div>
      )}

      {/* Secondary Sidebar (panel) */}
      {activePanel && sidebarOpen && (
        <div className="w-64 bg-gray-50 border-r p-4 flex flex-col min-h-full">
          {/* Header */}
          <div className="mb-4 font-semibold text-lg border-b pb-2">
            {activePanel === "home" && "Home Page"}
            {activePanel === "arrows" && "Arrows icon"}
            {activePanel === "grid" && "OPEN BANKING SERVICES"}
            {activePanel === "settings" && "Settings"}
          </div>

          {/* Content */}
          <div className="flex flex-col space-y-2 text-gray-700 flex-1 overflow-auto">
            {activePanel === "home" && <p>Welcome to the Home page panel.</p>}

            {activePanel === "grid" && (
  <>

    <button className="flex justify-between text-left hover:underline">
      E-Statements <span className="bg-gray-200 text-gray-700 px-2 rounded-full text-xs">19</span>
    </button>
    <button className="flex justify-between text-left hover:underline">
      Credit Check <span className="bg-gray-200 text-gray-700 px-2 rounded-full text-xs">10</span>
    </button>

    <p className="font-semibold text-sm text-orange-600 mt-4">
      LETTER OF GUARANTEE
    </p>
    <button className="flex justify-between text-left hover:underline">
      Request New Guarantee <span className="bg-gray-200 text-gray-700 px-2 rounded-full text-xs">14</span>
    </button>
    <button className="flex justify-between text-left hover:underline">
      Active Guarantees <span className="bg-gray-200 text-gray-700 px-2 rounded-full text-xs">0</span>
    </button>
    <button className="flex justify-between text-left hover:underline">
      Closed Guarantees <span className="bg-gray-200 text-gray-700 px-2 rounded-full text-xs">0</span>
    </button>
    <button className="flex justify-between text-left hover:underline">
      Pending Guarantees <span className="bg-gray-200 text-gray-700 px-2 rounded-full text-xs">0</span>
    </button>
    <button className="flex justify-between text-left hover:underline bg-blue-100 rounded px-2 py-0.5">
      Drafts <span className="bg-gray-200 text-gray-700 px-2 rounded-full text-xs">14</span>
    </button>
  </>
)}

            {activePanel === "arrows" && <p>Arrow panel.</p>}

            {activePanel === "settings" && <p>This is the Settings panel content.</p>}
          </div>
        </div>
      )}
    </div>
  );
}