import { useState } from "react";
import { Home, Repeat, Grid, Settings } from "lucide-react";

const mainIcons = [
  { id: "home", icon: Home, label: "Home" },
  { id: "arrows", icon: Repeat, label: "Open Banking Services" },
  { id: "grid", icon: Grid, label: "Letter of Guarantee" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export default function SidebarWithPanels() {
  const [activePanel, setActivePanel] = useState("grid");

  return (
    <div className="flex min-h-full">
      {/* Icon Bar */}
      <div className="flex flex-col items-center w-16 bg-white border-r py-4 space-y-4 min-h-full">
        {mainIcons.map(({ id, icon: Icon, label }) => { // eslint-disable-line no-unused-vars
          const isActive = activePanel === id;
          return (
            <button
              key={id}
              onClick={() => setActivePanel(isActive ? null : id)}
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors
                ${isActive ? "bg-orange-400 text-white" : "text-gray-500 hover:bg-gray-100"}`}
              title={label}
              aria-label={label}
            >
              <Icon size={20} />
            </button>
          );
        })}
      </div>

      {/* Secondary Panel */}
      {activePanel && (
        <div className="w-56 bg-white border-r px-3 py-4 flex flex-col min-h-full">
          <div className="mb-3 font-bold text-xs tracking-wide text-blue-700 uppercase px-2">
            {activePanel === "home" && "Home"}
            {activePanel === "arrows" && "Open Banking Services"}
            {activePanel === "grid" && "OPEN BANKING SERVICES"}
            {activePanel === "settings" && "Settings"}
          </div>

          <div className="flex flex-col text-gray-700 flex-1 overflow-auto text-sm">
            {activePanel === "home" && <p className="px-2 text-gray-500">Welcome to the Home page.</p>}

            {activePanel === "grid" && (
              <>
                <SidebarItem label="E-Statements" />
                <SidebarItem label="Credit check" />

                <p className="font-semibold text-xs text-orange-500 mt-4 mb-1 px-2 uppercase tracking-wide">
                  Letter of Guarantee
                </p>

                <SidebarItem label="Request New Guarantee" />
                <SidebarItem label="Active Guarantees" count={19} />
                <SidebarItem label="Closed Guarantees" count={10} />
                <SidebarItem label="Pending Guarantees" count={14} />

                <button className="flex justify-between items-center text-left py-2 px-2 rounded-r-md bg-blue-50 border-l-[3px] border-blue-600 text-blue-600 font-medium mt-0.5">
                  Drafts
                  <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                    04
                  </span>
                </button>
              </>
            )}

            {activePanel === "arrows" && <p className="px-2 text-gray-500">Open Banking panel.</p>}
            {activePanel === "settings" && <p className="px-2 text-gray-500">Settings panel.</p>}
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarItem({ label, count }) {
  return (
    <button className="flex justify-between items-center text-left py-2 px-2 rounded hover:bg-gray-50 text-gray-600">
      {label}
      {count !== undefined && (
        <span className="bg-red-50 text-red-500 text-xs px-2 py-0.5 rounded-full font-semibold">
          {count}
        </span>
      )}
    </button>
  );
}
