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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from "react";
import "./Carousel.css";
import "./fonts.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SharePointManagerService from "../../services/SharePointService";
import Image from "./Image";
import * as CONSTANTS from "./Constants";
import { Shimmer } from "office-ui-fabric-react";
var ImageCarousel = /** @class */ (function (_super) {
    __extends(ImageCarousel, _super);
    function ImageCarousel(props, state) {
        var _this = _super.call(this, props) || this;
        _this.runTimer = function () {
            var interval = setInterval(function () {
                _this.changeItem("next");
            }, 10000);
            _this.setState({ interval: interval });
        };
        _this.changeItem = function (action) {
            var currentIndex = _this.state.currentItemIndex;
            if (action == "next") {
                if (_this.state.currentItemIndex == _this.state.carouselItems.length - 1) {
                    currentIndex = 0;
                }
                else {
                    currentIndex += 1;
                }
            }
            else {
                if (_this.state.currentItemIndex == 0) {
                    currentIndex = _this.state.carouselItems.length - 1;
                }
                else {
                    currentIndex -= 1;
                }
            }
            _this.setState({ currentItemIndex: currentIndex });
        };
        _this.state = {
            carouselItems: [],
            currentItemIndex: 0,
            interval: null,
        };
        _this.changeCurrentItemIndex = _this.changeCurrentItemIndex.bind(_this);
        return _this;
    }
    ImageCarousel.prototype.getItemsFromList = function (listName) {
        return __awaiter(this, void 0, void 0, function () {
            var response, jsonresponse, items, carouselItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, SharePointManagerService.getItems(listName)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        jsonresponse = _a.sent();
                        items = jsonresponse.d.results;
                        carouselItems = items.map(function (item) {
                            var carouselItem = {
                                FileURL: item.File.ServerRelativeUrl,
                                paragraph: item.Paragraph,
                                heading: item.Heading,
                                linkText: item.LinkText,
                                linkURL: item.LinkURL,
                            };
                            return carouselItem;
                        });
                        this.setState({
                            carouselItems: carouselItems,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ImageCarousel.prototype.componentDidMount = function () {
        this.getItemsFromList(CONSTANTS.LIBRARYNAME);
        this.runTimer();
    };
    ImageCarousel.prototype.changeCurrentItemIndex = function (i) {
        this.setState({
            currentItemIndex: i,
            interval: clearInterval(this.state.interval),
        });
        this.componentDidMount();
    };
    ImageCarousel.prototype.render = function () {
        return (React.createElement(React.Fragment, null, this.state.carouselItems.length > 0 ? (React.createElement(Image, { item: this.state.carouselItems[this.state.currentItemIndex], currentItemIndex: this.state.currentItemIndex, changeItem: this.changeItem, length: this.state.carouselItems.length, changeCurrentItemIndex: this.changeCurrentItemIndex })) : (React.createElement(React.Fragment, null,
            React.createElement(Shimmer, null),
            React.createElement(Shimmer, null),
            React.createElement(Shimmer, null),
            React.createElement(Shimmer, null)))));
    };
    return ImageCarousel;
}(React.Component));
export default ImageCarousel;
//# sourceMappingURL=Carousel.js.map