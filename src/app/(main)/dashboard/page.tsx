"use client"
import { Canvas } from "@/components/Canvas";
import { Settings } from "@/components/Settings";
import { SidebarComponent } from "@/components/Sidebarcomp";
import { useState } from "react";

function Page() {
  const [open, setOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <Canvas />;
      case "settings":
        return <Settings />;
      default:
        return <div className="p-6 text-white">Content not available.</div>;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-900">
      <SidebarComponent open={open} setOpen={setOpen} onMenuSelect={setActiveMenu} />
      <main className="flex-1 overflow-y-auto">{renderContent()}</main>
    </div>
  );
}

export default Page;