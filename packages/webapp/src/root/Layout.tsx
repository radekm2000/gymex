import { useLocation } from "wouter";
import { Sidebar } from "../components/organisms/Sidebar";
import { TopBar } from "../components/organisms/TopBar";
import { Routes } from "../routes/Routes";
import React, { useState } from "react";

const Layout = () => {
  const [location] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-dvh bg-primary-dark">
      <div className="hidden md:block ">
        <Sidebar open={isSidebarOpen} onOpenChange={toggleSidebar} />
      </div>
      <div className={`flex flex-col flex-grow `}>
        <TopBar currentUrlLocation={location} toggleSheet={toggleSidebar} />
        <div className="overflow-x-hidden  flex-grow px-3 pr-2  pt-6 pb-6 overflow-y-scroll 2xl:px-60 lg:px-32 xl:px-24  [&::-webkit-scrollbar]:w-[7px] [&::-webkit-scrollbar-thumb]:bg-primary-light ">
          <Routes />
        </div>
      </div>
    </div>
  );
};

export const MemoizedLayout = React.memo(Layout);
