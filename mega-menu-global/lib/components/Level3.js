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
var Level3 = /** @class */ (function (_super) {
    __extends(Level3, _super);
    function Level3(props) {
        return _super.call(this, props) || this;
    }
    Level3.prototype.render = function () {
        var level3Items = this.props.links.map(function (link) { return (React.createElement("li", null,
            React.createElement("a", { href: link.url }, link.text))); });
        return React.createElement(React.Fragment, null, level3Items);
    };
    return Level3;
}(React.Component));
export default Level3;
//# sourceMappingURL=Level3.js.map