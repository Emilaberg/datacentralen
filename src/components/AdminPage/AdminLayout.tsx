import React from "react";
import AdminDashboardMenu from "./AdminDashboardMenu";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminDashboardMenu />
      <div>{children}</div>
    </div>
  );
}
