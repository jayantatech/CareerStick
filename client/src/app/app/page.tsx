import AppHeader from "@/components/AppHeader";
import React from "react";
import { MdAdd } from "react-icons/md";

const Dashboard = () => {
  return (
    <div>
      <AppHeader title="Dashboard" buttonText="Create Resume" iconName="add" />
      <section>{/* I will put the content here */}</section>
    </div>
  );
};

export default Dashboard;
