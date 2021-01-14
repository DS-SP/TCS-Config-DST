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
import "./fonts.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselIndicator from "./CarouselIndicator";
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    function Image(props, state) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Image.prototype.componentDidMount = function () { };
    Image.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "carousel-wrapper" },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "carousel-item" },
                    React.createElement("div", { className: "corousel-text" },
                        React.createElement("img", { src: "https://pfizer.sharepoint.com/sites/DST/HomePage_Carousel_Images/DST_logo.png" }),
                        React.createElement("div", { className: "short-text" },
                            this.props.item.paragraph != null ? (React.createElement("p", null, this.props.item.paragraph)) : null,
                            this.props.item.heading != null ? (React.createElement("h2", null, this.props.item.heading)) : null,
                            this.props.item.linkText != null ? (React.createElement("a", { href: this.props.item.linkURL != null
                                    ? this.props.item.linkURL
                                    : null }, this.props.item.linkText)) : null)),
                    React.createElement("div", { className: "carousel-image" },
                        React.createElement("img", { src: this.props.item.FileURL }))),
                React.createElement("a", { className: "carousel-control-prev", role: "button", "data-slide": "prev", onClick: function () { return _this.props.changeItem("prev"); } },
                    React.createElement("span", { className: "carousel-control-prev-icon", "aria-hidden": "true" })),
                React.createElement("a", { className: "carousel-control-next", role: "button", "data-slide": "next", onClick: function () { return _this.props.changeItem("next"); } },
                    React.createElement("span", { className: "carousel-control-next-icon", "aria-hidden": "true" })),
                React.createElement(CarouselIndicator, { length: this.props.length, currentIndex: this.props.currentItemIndex, changeCurrentItemIndex: this.props.changeCurrentItemIndex }))));
    };
    return Image;
}(React.Component));
export default Image;
//# sourceMappingURL=Image.js.map