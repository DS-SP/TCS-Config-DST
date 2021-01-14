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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { override } from "@microsoft/decorators";
import { Log } from "@microsoft/sp-core-library";
import { BaseApplicationCustomizer, PlaceholderName, } from "@microsoft/sp-application-base";
import * as React from "react";
import * as ReactDom from "react-dom";
import * as strings from "MegamenuApplicationCustomizerStrings";
import { MegaMenuService } from "../service/MegaMenuService";
import Megamenu from "../../components/Megamenu";
var LOG_SOURCE = "MegamenuApplicationCustomizer";
/** A Custom Action which can be run during execution of a Client Side Application */
var MegamenuApplicationCustomizer = /** @class */ (function (_super) {
    __extends(MegamenuApplicationCustomizer, _super);
    function MegamenuApplicationCustomizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MegamenuApplicationCustomizer.prototype.onInit = function () {
        var spSiteHeader = document.getElementById("spSiteHeader");
        spSiteHeader.setAttribute("style", "display: none !important");
        Log.info(LOG_SOURCE, "Initialized " + strings.Title);
        var message = this.properties.testMessage;
        if (!message) {
            message = "(No properties were provided.)";
        }
        this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
        return Promise.resolve();
    };
    MegamenuApplicationCustomizer.prototype._renderPlaceHolders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var topLevelMenus, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("HelloWorldApplicationCustomizer._renderPlaceHolders()");
                        console.log("Available placeholders: ", this.context.placeholderProvider.placeholderNames
                            .map(function (name) { return PlaceholderName[name]; })
                            .join(", "));
                        if (!this._topPlaceholder) {
                            this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, { onDispose: this._onDispose });
                        }
                        if (!this._topPlaceholder) {
                            console.error("The expected placeholder (Top) was not found.");
                            return [2 /*return*/];
                        }
                        if (!this._topPlaceholder.domElement) return [3 /*break*/, 2];
                        return [4 /*yield*/, MegaMenuService.getMenuItems(this.context.pageContext.site.absoluteUrl)];
                    case 1:
                        topLevelMenus = _a.sent();
                        element = React.createElement(Megamenu, {
                            topLevelMenuItems: topLevelMenus
                        });
                        ReactDom.render(element, this._topPlaceholder.domElement);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /*  @override
    public onRender(): void {
      debugger;
      if (!this.headerPlaceholder) {
        this.headerPlaceholder = this.context.placeholders.tryAttach(
          "PageHeader",
          {
            onDispose: this._onDispose,
          }
        );
  
        if (this.headerPlaceholder) {
          if (this.headerPlaceholder.domElement) {
            console.log("PageHeader placeholder is OK.");
  
            MegaMenuService.getMenuItems(
              this.context.pageContext.site.absoluteUrl
            )
              .then((topLevelMenus: TopLevelMenu[]) => {
                console.log("Toplevel: " + topLevelMenus);
                const element: React.ReactElement<IMegamenuProps> = React.createElement(
                  Megamenu,
                  {
                    topLevelMenuItems: topLevelMenus,
                  }
                );
  
                ReactDom.render(element, this.headerPlaceholder.domElement);
              })
              .catch((error: any) => {
                console.error(
                  `Error trying to read menu items or render component : ${error.message}`
                );
              });
          } else {
            console.error("PageHeader placeholder has no DOM element.");
          }
        } else {
          console.error("PageHeader placeholder not found.");
        }
      }
    }*/
    MegamenuApplicationCustomizer.prototype._onDispose = function () { };
    __decorate([
        override
    ], MegamenuApplicationCustomizer.prototype, "onInit", null);
    return MegamenuApplicationCustomizer;
}(BaseApplicationCustomizer));
export default MegamenuApplicationCustomizer;
//# sourceMappingURL=MegamenuApplicationCustomizer.js.map