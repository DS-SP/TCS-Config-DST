import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'OurProcessWebPartStrings';
import OurProcess from './components/OurProcess';
import { IOurProcessProps } from './components/IOurProcessProps';
import SharePointManagerService from '../ourProcess/services/SharePointService';
import * as CONSTANTS from '../ourProcess/components/CONSTANTS';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IItems } from '@pnp/sp/items';
export interface IOurProcessWebPartProps {
  para1: string;
  para2: string;
  thumbnailUrl: string;
  processImageURL: string;
}

export default class OurProcessWebPart extends BaseClientSideWebPart<IOurProcessWebPartProps> {

  public para1: string = "Please provide content for this webpart in Services list";
  public thumbnail_image: string;
  public viewFullProcess_Url: string;

  private async getDataFromSP() {
    debugger;
    let currentPageURL: string = this.context.pageContext.site.serverRequestPath;
    const camlQuery: string = `<View><Query><Where><Eq><FieldRef Name="RedirectURL" /><Value Type="Url">${currentPageURL}</Value></Eq></Where></Query></View>`;
    // const items: IItems = await sp.web.lists.getByTitle(CONSTANTS.LISTNAME).getItemsByCAMLQuery({ViewXml:camlQuery});
    const items: IItems = await sp.web.lists.getByTitle(CONSTANTS.LISTNAME).items.get();
    console.log("Current page URL: " + currentPageURL);
    for(let i = 0; i<items.length;i++) {
      let UrlInList: string = items[i].RedirectURL.Url;
      console.log("Url in list: "+UrlInList);
      if(UrlInList.indexOf(currentPageURL) != -1) {
        console.log("Url in list: "+UrlInList);
        console.log("Expression value: " + UrlInList.indexOf(currentPageURL));
        this.para1 = items[i].OurProcess_Content;
        this.thumbnail_image = JSON.parse(items[i].OurProcess_Image).serverRelativeUrl;
        this.viewFullProcess_Url = items[i].OurProcess_ViewFullProcessURL;
        this.render();
        break;
      }
    }
  }
  public render(): void {
    const element: React.ReactElement<IOurProcessProps> = React.createElement(
      OurProcess,
      {
        para1: this.para1,
        thumbnail_image: this.thumbnail_image,
        viewFullProcess_Url: this.viewFullProcess_Url
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit().then(() => {
      SharePointManagerService.setup(this.context);
      sp.setup({
        spfxContext: this.context
      });
      this.getDataFromSP();
    });
  }


  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('para1', {
                  label: strings.Paragraph1FieldLabel
                }),
                PropertyPaneTextField('para2', {
                  label: strings.Paragraph2FieldLabel
                }),
                PropertyPaneTextField('thumbnailUrl', {
                  label: strings.ThumbnailFieldLabel
                }),
                PropertyPaneTextField('processImageURL', {
                  label: strings.ProcessImageFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
