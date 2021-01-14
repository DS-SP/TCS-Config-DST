import { TopLevelMenu } from "../model/TopLevelMenu";
export declare class MegaMenuService {
    static readonly useSampleData: boolean;
    static readonly level1ListName: string;
    static readonly level2ListName: string;
    static readonly level3ListName: string;
    static readonly cacheKey: string;
    static getMenuItems(siteCollectionUrl: string): Promise<TopLevelMenu[]>;
    private static getMenuItemsFromSp;
    private static convertItemsFromSp;
}
//# sourceMappingURL=MegaMenuService.d.ts.map