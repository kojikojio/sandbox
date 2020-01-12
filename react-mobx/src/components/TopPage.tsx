import React from "react";
import { Redirect } from "react-router-dom";
const TopPage: React.FC = () => {
  return <Redirect to={"/todos"} />;
};

export default TopPage;
