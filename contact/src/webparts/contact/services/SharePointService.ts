import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ScriptHTMLAttributes } from "react";
import * as CONSTANTS from '../components/CONSTANTS';

export class SharePointManager {
  public context: WebPartContext;

  public setup(context: WebPartContext): void {
    this.context = context;
  }

  public getItems(listName: string): Promise<SPHttpClientResponse> {
    return new Promise<SPHttpClientResponse>((resolve, reject) => {
      try {
        this.context.spHttpClient
          .get(
            `${CONSTANTS.SITEURL}/_api/web/lists/getbytitle('${listName}')/items?$select=Title`,
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
