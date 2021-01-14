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
import Level3 from "./Level3";
var Level2 = /** @class */ (function (_super) {
    __extends(Level2, _super);
    function Level2(props) {
        return _super.call(this, props) || this;
    }
    Level2.prototype.render = function () {
        var maxColumns = Math.max.apply(Math, this.props.level2Items.map(function (level2Item) { return level2Item.columnNumber; }));
        var ArrayOfcolumnWiseLevel2Items = new Array();
        var _loop_1 = function (i) {
            var columnWiseItems = this_1.props.level2Items.filter(function (level2Item) {
                if (level2Item.columnNumber == i) {
                    return level2Item;
                }
            });
            ArrayOfcolumnWiseLevel2Items.push(columnWiseItems);
        };
        var this_1 = this;
        for (var i = 1; i <= maxColumns; i++) {
            _loop_1(i);
        }
        var level2HeadingsArray = ArrayOfcolumnWiseLevel2Items.map(function (columnWiseLevel2Items, index) {
            var level2Headings = columnWiseLevel2Items.map(function (columnWiseLevel2Item) { return (React.createElement("li", null,
                React.createElement("span", null, columnWiseLevel2Item.heading.text),
                React.createElement("ul", { className: "sub_menu" },
                    React.createElement(Level3, { links: columnWiseLevel2Item.links })))); });
            return React.createElement("div", { className: "column" }, level2Headings);
        });
        return (React.createElement("ul", { className: "main_sub_menu sub_menu" },
            React.createElement("div", { className: "grid" }, level2HeadingsArray)));
    };
    return Level2;
}(React.Component));
export default Level2;
//# sourceMappingURL=Level2.js.map