import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ScriptHTMLAttributes } from "react";
import * as CONSTANTS from '../CONSTANTS';

export class SharePointManager {
  public context: WebPartContext;

  public setup(context: WebPartContext): void {
    this.context = context;
  }

  public getItems(listName: string, isPageLibrary: boolean): Promise<SPHttpClientResponse> {
    return new Promise<SPHttpClientResponse>((resolve, reject) => {
      let queryString: string = isPageLibrary ? `$filter=(Id eq '${this.context.pageContext.listItem.id}')`: "$select=Title,Category,Capability,Description,ServiceOwner/Title,ServicePage/Title&$expand=ServiceOwner/Title,ServicePage";
      try {
        this.context.spHttpClient
          .get(
            `${CONSTANTS.SITEURL}/_api/web/lists/getbytitle('${listName}')/items?${queryString}`,
            SPHttpClient.configurations.v1,
            {
              headers: {
                Accept: "application/json;odata=verbose",
                "Content-type": "application/json;odata=verbose",
                "odata-version": "",
              },
            }
          )
          .then((response: SPHttpClientResponse) => {
            resolve(response);
          });
      } catch (error) {
        console.error(error);
      }
    });
  }
}

const SharePointManagerService = new SharePointManager();
export default SharePointManagerService;
