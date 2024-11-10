import AppHeader from "@/components/AppHeader";
import { getTokenInfo } from "@/lib/getTokenInfo";
// import { getTokenInfo } from "@ /lib/getTokenInfo";
// import { useAuth } from "@/lib/hooks/useAuth";
// import getTokenInfo from "@/lib/getTokenInfo";

import React from "react";

// import api from "@/lib/api";
// import axios from "axios";

const Dashboard = async () => {
  const user = await getTokenInfo();

  // console.log("user from dashboard", user);
  return (
    <div>
      <AppHeader title="Dashboard" buttonText="Create Resume" iconName="add" />
      <section>{/* I will put the content here */}</section>
    </div>
  );
};

export default Dashboard;
