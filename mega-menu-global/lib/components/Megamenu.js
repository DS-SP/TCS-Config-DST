var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from "react";
import Level2 from "./Level2";
// require("megamenujs");
require("jquery");
// import "../extensions/megamenu.css";
var Megamenu = /** @class */ (function (_super) {
    __extends(Megamenu, _super);
    function Megamenu(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        require("../extensions/assets/megamenu.css");
        require("../extensions/assets/mega-menu.js");
        return _this;
    }
    Megamenu.prototype.render = function () {
        return (React.createElement("div", { className: "nav", style: { display: "none" } },
            React.createElement("div", { className: "mobile-menu" },
                React.createElement("div", { className: "logo" },
                    React.createElement("img", { src: "https://pfizer.sharepoint.com/sites/DST/SiteAssets/mobile-logo.png" }),
                    "Digital Services Team"),
                React.createElement("div", { className: "hamburger" },
                    React.createElement("a", { className: "menu_icon mobile" },
                        React.createElement("p", null, "Menu"),
                        React.createElement("span", null)))),
            React.createElement("ul", { className: "main_navigation" },
                React.createElement("div", { className: "main_mobile_menu" }, "MAIN MENU"),
                this.props.topLevelMenuItems.map(function (topLevelItem) { return (React.createElement("li", null,
                    React.createElement("a", { href: topLevelItem.url }, topLevelItem.text),
                    topLevelItem.columns.length > 0 ? React.createElement(Level2, { level2Items: topLevelItem.columns }) : null)); }),
                React.createElement("li", null,
                    React.createElement("a", { href: "https://pfizer.sharepoint.com/sites/DST/SitePages/ContactDST.aspx" }, "CONTACT DST")))));
    };
    return Megamenu;
}(React.Component));
export default Megamenu;
//# sourceMappingURL=Megamenu.js.map