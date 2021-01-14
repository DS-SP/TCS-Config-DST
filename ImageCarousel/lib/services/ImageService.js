import { ServiceKey } from "@microsoft/sp-core-library";
import { SPHttpClient } from '@microsoft/sp-http';
import { PageContext } from '@microsoft/sp-page-context';
var ImageService = /** @class */ (function () {
    function ImageService(serviceScope) {
        var _this = this;
        serviceScope.whenFinished(function () {
            // Configure the required dependencies      
            _this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
            _this._pageContext = serviceScope.consume(PageContext.serviceKey);
            _this._currentWebUrl = _this._pageContext.web.absoluteUrl;
        });
    }
    ImageService.prototype.getImages = function (listName) {
        var _this = this;
        var images = [];
        return new Promise(function (resolve, reject) {
            _this.readImages(listName)
                .then(function (carouselItems) {
                var i = 0;
                for (i = 0; i < carouselItems.length; i++) {
                    images.push(_this._currentWebUrl + carouselItems[i].FileRef);
                }
                resolve(images);
            });
        });
    };
    ImageService.prototype.readImages = function (listName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._spHttpClient.get(_this._currentWebUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=FileRef/FileRef&$filter=FSObjType eq 0", SPHttpClient.configurations.v1, {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'odata-version': ''
                }
            })
                .then(function (response) {
                return response.json();
            })
                .then(function (response) {
                resolve(response.value);
            }, function (error) {
                reject(error);
            });
        });
    };
    ImageService.serviceKey = ServiceKey.create('carousel:data-service', ImageService);
    return ImageService;
}());
export { ImageService };
//# sourceMappingURL=ImageService.js.map