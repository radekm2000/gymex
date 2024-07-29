import { Routes } from "../routes/Routes";
import React from "react";

const Layout = () => {
  return (
    <div className="bg-primary-dark h-dvh">
      <Routes />
    </div>
  );
};

export const MemoizedLayout = React.memo(Layout);
