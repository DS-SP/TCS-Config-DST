import pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js/lib/sharepoint/webs";
import { sampleData } from "./MegaMenuSampleData";
var MegaMenuService = /** @class */ (function () {
    function MegaMenuService() {
    }
    // Get items for the menu and cache the result in session cache.
    MegaMenuService.getMenuItems = function (siteCollectionUrl) {
        if (!MegaMenuService.useSampleData) {
            return new Promise(function (resolve, reject) {
                // See if we've cached the result previously.
                var topLevelItems = pnp.storage.session.get(MegaMenuService.cacheKey);
                if (topLevelItems) {
                    console.log("Found mega menu items in cache.");
                    resolve(topLevelItems);
                }
                else {
                    console.log("Didn't find mega menu items in cache, getting from list.");
                    var level1ItemsPromise = MegaMenuService.getMenuItemsFromSp(MegaMenuService.level1ListName, siteCollectionUrl);
                    var level2ItemsPromise = MegaMenuService.getMenuItemsFromSp(MegaMenuService.level2ListName, siteCollectionUrl);
                    var level3ItemsPromise = MegaMenuService.getMenuItemsFromSp(MegaMenuService.level3ListName, siteCollectionUrl);
                    Promise.all([
                        level1ItemsPromise,
                        level2ItemsPromise,
                        level3ItemsPromise,
                    ]).then(function (results) {
                        topLevelItems = MegaMenuService.convertItemsFromSp(results[0], results[1], results[2]);
                        // Store in session cache.
                        pnp.storage.session.put(MegaMenuService.cacheKey, topLevelItems);
                        resolve(topLevelItems);
                    });
                }
            });
        }
        else {
            return new Promise(function (resolve, reject) {
                resolve(sampleData);
            });
        }
    };
    // Get raw results from SP.
    MegaMenuService.getMenuItemsFromSp = function (listName, siteCollectionUrl) {
        return new Promise(function (resolve, reject) {
            var web = new Web(siteCollectionUrl);
            // TODO : Note that passing in url and using this approach is a workaround. I would have liked to just
            // call pnp.sp.site.rootWeb.lists, however when running this code on SPO modern pages, the REST call ended
            // up with a corrupt URL. However it was OK on View All Site content pages, etc.
            web.lists
                .getByTitle(listName)
                .items.orderBy("SortOrder")
                .get()
                .then(function (items) {
                resolve(items);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    // Convert results from SP into actual entities with correct relationships.
    MegaMenuService.convertItemsFromSp = function (level1, level2, level3) {
        var level1Dictionary = {};
        var level2Dictionary = {};
        // Convert level 1 items and store in dictionary.
        var level1Items = level1.map(function (item) {
            var newItem = {
                id: item.Id,
                text: item.Title,
                columns: [],
                url: item.Url ? item.Url.Url : "",
            };
            level1Dictionary[newItem.id] = newItem;
            return newItem;
        });
        // Convert level 2 items and store in dictionary.
        var level2Items = level2.map(function (item) {
            var newItem = {
                id: item.Id,
                heading: {
                    text: item.Title,
                    url: item.Url ? item.Url.Url : "",
                    openInNewTab: item.OpenInNewTab,
                },
                links: [],
                level1ParentId: item.Level1ItemId,
                columnNumber: item.ColumnNumber
            };
            level2Dictionary[newItem.id] = newItem;
            return newItem;
        });
        // Convert level 3 items and store in dictionary.
        var level3Items = level3.map(function (item) {
            return {
                level2ParentId: item.Level2ItemId,
                text: item.Title,
                url: item.Url.Url,
                openInNewTab: item.OpenInNewTab,
                columnNumber: item.columnNumber
            };
        });
        // Now link the entities into the desired structure.
        for (var _i = 0, level3Items_1 = level3Items; _i < level3Items_1.length; _i++) {
            var l3 = level3Items_1[_i];
            level2Dictionary[l3.level2ParentId].links.push(l3);
        }
        for (var _a = 0, level2Items_1 = level2Items; _a < level2Items_1.length; _a++) {
            var l2 = level2Items_1[_a];
            level1Dictionary[l2.level1ParentId].columns.push(l2);
        }
        var retVal = [];
        for (var _b = 0, level1Items_1 = level1Items; _b < level1Items_1.length; _b++) {
            var l1 = level1Items_1[_b];
            retVal.push(l1);
        }
        return retVal;
    };
    MegaMenuService.useSampleData = false;
    MegaMenuService.level1ListName = "Mega Menu - Level 1";
    MegaMenuService.level2ListName = "Mega Menu - Level 2";
    MegaMenuService.level3ListName = "Mega Menu - Level 3";
    MegaMenuService.cacheKey = "MegaMenuTopLevelItems";
    return MegaMenuService;
}());
export { MegaMenuService };
//# sourceMappingURL=MegaMenuService.js.map