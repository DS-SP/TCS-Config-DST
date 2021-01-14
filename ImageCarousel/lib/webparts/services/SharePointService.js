import { SPHttpClient } from "@microsoft/sp-http";
import * as CONSTANTS from "../carousel/components/Constants";
var SharePointManager = /** @class */ (function () {
    function SharePointManager() {
    }
    SharePointManager.prototype.setup = function (context) {
        this.context = context;
    };
    SharePointManager.prototype.getItems = function (listName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.context.spHttpClient
                    .get(CONSTANTS.SITEURL + "/_api/web/lists/getbytitle('" + listName + "')/items?$expand=File", SPHttpClient.configurations.v1, {
                    headers: {
                        Accept: "application/json;odata=verbose",
                        "Content-type": "application/json;odata=verbose",
                        "odata-version": "",
                    },
                })
                    .then(function (response) {
                    resolve(response);
                });
            }
            catch (error) {
                console.error(error);
            }
        });
    };
    return SharePointManager;
}());
export { SharePointManager };
var SharePointManagerService = new SharePointManager();
export default SharePointManagerService;
//# sourceMappingURL=SharePointService.js.map