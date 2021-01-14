import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'EmailMarketingWebPartStrings';
import EmailMarketing from './components/EmailMarketing';
import { IEmailMarketingProps } from './components/IEmailMarketingProps';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IItems } from '@pnp/sp/items';
import * as CONSTANTS from './components/CONSTANTS';

export interface IEmailMarketingWebPartProps {
  description: string;
  title: string;
}

export default class EmailMarketingWebPart extends BaseClientSideWebPart<IEmailMarketingWebPartProps> {

  public para: string = "Please provide content for this webpart in Services list";
  public thumbnail_url: string = "";

  public render(): void {
    const element: React.ReactElement<IEmailMarketingProps> = React.createElement(
      EmailMarketing,
      {
        para: this.para,
        thumbnail_url: this.thumbnail_url,
        title: this.properties.title
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private async getDataFromSP() {
    debugger;
    let currentPageURL: string = this.context.pageContext.site.serverRequestPath;
    // const camlQuery: string = `<View><Query><Where><Contains><FieldRef Name="RedirectURL" /><Value Type="Url">${currentPageURL}</Value></Contains></Where></Query></View>`;
    // const items: IItems = await sp.web.lists.getByTitle(CONSTANTS.LISTNAME).getItemsByCAMLQuery({ViewXml:camlQuery});
    const items: IItems = await sp.web.lists.getByTitle(CONSTANTS.LISTNAME).items.get();
    console.log("Current page URL: " + currentPageURL);
    for(let i = 0; i<items.length;i++) {
      let UrlInList: string = items[i].RedirectURL.Url;
      console.log("Url in list: "+UrlInList);
      if(UrlInList.indexOf(currentPageURL) != -1) {
        console.log("Url in list: "+UrlInList);
        console.log("Expression value: " + UrlInList.indexOf(currentPageURL));
        this.para = items[i].EmailMarketingMoreInfo_Content;
        this.thumbnail_url = JSON.parse(items[i].EmailMarketingMoreInfo_Image).serverRelativeUrl;
        this.render();
        break;
      }
    }
  }

  protected onInit(): Promise<void> {
    return super.onInit().then(() => {
      sp.setup({
        spfxContext: this.context
      });
      this.getDataFromSP();
    });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
