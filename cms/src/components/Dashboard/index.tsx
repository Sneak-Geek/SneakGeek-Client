import React from "react";
import "./Dashboard.scss";
import TopNavbar from "./TopNavbar";
import SideNavbar from "./SideNavbar";

interface Props {};

interface State {};

export default class Dashboard extends React.Component<Props, State> {
  
  render() {
    return (
      <div>
        <TopNavbar/>
        <div className="body-container">
          <SideNavbar/>
        </div>
      </div>
    )
  }
}
