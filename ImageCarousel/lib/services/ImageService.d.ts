import { ServiceScope, ServiceKey } from "@microsoft/sp-core-library";
import { IDataService } from './IDataService';
export declare class ImageService implements IDataService {
    static readonly serviceKey: ServiceKey<IDataService>;
    private _spHttpClient;
    private _pageContext;
    private _currentWebUrl;
    constructor(serviceScope: ServiceScope);
    getImages(listName?: string): Promise<string[]>;
    private readImages;
}
//# sourceMappingURL=ImageService.d.ts.map