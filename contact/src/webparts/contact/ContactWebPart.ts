import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ContactWebPartStrings';
import Contact from './components/Contact';
import { IContactProps } from './components/IContactProps';
import { sp } from "@pnp/sp/presets/all";
import SharePointManagerService from './services/SharePointService';

export interface IContactWebPartProps {
  title: string;
}

export default class ContactWebPart extends BaseClientSideWebPart<IContactWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IContactProps> = React.createElement(
      Contact,
      {
        title: this.properties.title,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected onInit(): Promise<void> {

    return super.onInit().then(_ => {
  
      // other init code may be present
      SharePointManagerService.setup(this.context);
      sp.setup({
        spfxContext: this.context
      });
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
