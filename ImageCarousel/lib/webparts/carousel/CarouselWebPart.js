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
import * as ReactDom from "react-dom";
import { PropertyPaneTextField, } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import SharePointManagerService from "../services/SharePointService";
import * as strings from "CarouselWebPartStrings";
import ImageCarousel from "./components/Carousel";
var CarouselWebPart = /** @class */ (function (_super) {
    __extends(CarouselWebPart, _super);
    function CarouselWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CarouselWebPart.prototype.render = function () {
        var element = React.createElement(ImageCarousel, {
            description: this.properties.description,
        });
        ReactDom.render(element, this.domElement);
    };
    CarouselWebPart.prototype.onInit = function () {
        var _this = this;
        return _super.prototype.onInit.call(this).then(function () {
            SharePointManagerService.setup(_this.context);
        });
    };
    CarouselWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    /* protected get dataVersion(): Version {
      return Version.parse('1.0');
    } */
    CarouselWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription,
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField("description", {
                                    label: strings.DescriptionFieldLabel,
                                }),
                            ],
                        },
                    ],
                },
            ],
        };
    };
    return CarouselWebPart;
}(BaseClientSideWebPart));
export default CarouselWebPart;
//# sourceMappingURL=CarouselWebPart.js.map