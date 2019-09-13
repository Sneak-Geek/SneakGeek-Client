import React from "react";
import "./TopNavbar.scss";
import { ReactComponent as Logo } from "../../../assets/Logo.svg";

const TopNavbar: React.FC = () => {
  return (
    <div className="topnav">
      <div className="brand">
        <Logo className="logo"/>
        <div>Sneak Geek</div>
      </div>
      <div className="v-divider"></div>
    </div>
  ) 
};

export default TopNavbar;
