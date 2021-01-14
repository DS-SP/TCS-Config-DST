import { SPHttpClientResponse } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";
export declare class SharePointManager {
    context: WebPartContext;
    setup(context: WebPartContext): void;
    getItems(listName: string): Promise<SPHttpClientResponse>;
}
declare const SharePointManagerService: SharePointManager;
export default SharePointManagerService;
//# sourceMappingURL=SharePointService.d.ts.map