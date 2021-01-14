import * as React from "react";
import { IMegamenuProps } from "./IMegamenuProps";
import Level2 from "./Level2";
import { SPComponentLoader } from "@microsoft/sp-loader";
import * as jQuery from "jquery";
// require("megamenujs");
require("jquery");
// import "../extensions/megamenu.css";

export default class Megamenu extends React.Component<IMegamenuProps, {}> {
  constructor(props) {
    super(props);
    this.state = {};
    require("../extensions/assets/megamenu.css");
    require("../extensions/assets/mega-menu.js");
  }

  public render() {
    return (
      <div className="nav" style={{display:"none"}}>
        <div className="mobile-menu">
          <div className="logo">
            <img src="https://pfizer.sharepoint.com/sites/DST/SiteAssets/mobile-logo.png" />
            Digital Services Team
          </div>
          <div className="hamburger">
            <a className="menu_icon mobile">
              <p>Menu</p>
              <span></span>
            </a>
          </div>
        </div>
        <ul className="main_navigation">
          <div className="main_mobile_menu">MAIN MENU</div>
          {this.props.topLevelMenuItems.map((topLevelItem) => (
            <li>
              <a href={topLevelItem.url}>{topLevelItem.text}</a>
              {topLevelItem.columns.length > 0 ? <Level2 level2Items={topLevelItem.columns} /> : null}
            </li>
          ))}
          <li>
            <a href="https://pfizer.sharepoint.com/sites/DST/SitePages/ContactDST.aspx">CONTACT DST</a>
          </li>
        </ul>
      </div>
    );
  }
}
