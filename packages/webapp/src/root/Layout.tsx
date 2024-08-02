import { useLocation } from "wouter";
import { Sidebar } from "../components/organisms/Sidebar";
import { TopBar } from "../components/organisms/TopBar";
import { Routes } from "../routes/Routes";
import React from "react";

const Layout = () => {
  const [location] = useLocation();
  console.log(location);
  return (
    <div className="flex h-dvh bg-primary-dark">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <TopBar currentUrlLocation={location} />
        <div className="flex-grow">
          <Routes />
        </div>
      </div>
    </div>
  );
};

export const MemoizedLayout = React.memo(Layout);
