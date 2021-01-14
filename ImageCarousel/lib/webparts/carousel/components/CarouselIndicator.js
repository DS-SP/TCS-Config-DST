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
import "./Carousel.css";
var CarouselIndicator = /** @class */ (function (_super) {
    __extends(CarouselIndicator, _super);
    function CarouselIndicator(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            listItems: [],
        };
        return _this;
    }
    CarouselIndicator.prototype.handleClick = function (e) {
        debugger;
        var id = parseInt(e.currentTarget.dataset.id);
        this.props.changeCurrentItemIndex(id);
    };
    CarouselIndicator.prototype.render = function () {
        var listItemsElements = [];
        for (var i = 0; i < this.props.length; i++) {
            if (i == this.props.currentIndex) {
                var listItem = React.createElement("li", { className: "active" });
                listItemsElements.push(listItem);
            }
            else {
                var listItem = (React.createElement("li", { onClick: this.handleClick.bind(this), "data-id": i }));
                listItemsElements.push(listItem);
            }
        }
        return React.createElement("ul", { className: "carousel-indicators" }, listItemsElements);
    };
    return CarouselIndicator;
}(React.Component));
export default CarouselIndicator;
//# sourceMappingURL=CarouselIndicator.js.map