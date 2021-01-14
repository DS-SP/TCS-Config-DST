import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'DownloadSectionWebPartStrings';
import DownloadSection from './components/DownloadSection';
import { IDownloadSectionProps } from './components/IDownloadSectionProps';
import SharePointManagerService from '../downloadSection/services/SharePointService';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import { saveAs } from 'file-saver';


export interface IDownloadSectionWebPartProps {
  description: string;
}

export default class DownloadSectionWebPart extends BaseClientSideWebPart<IDownloadSectionWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDownloadSectionProps> = React.createElement(
      DownloadSection,
      {
        description: this.properties.description,
        downloadFileHandler: this.downloadFileHandler
      }
    );

    ReactDom.render(element, this.domElement);
  }

  public async downloadFileHandler(serverRelativeURL: string, filename: string) {
    var FileSaver = require('file-saver');
    // const blob: Blob = await sp.web.getFileByServerRelativeUrl("/sites/dev/documents/file.avi").getBlob();
    saveAs(serverRelativeURL, filename);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onInit(): Promise<void> {
    return super.onInit().then(() => {
      SharePointManagerService.setup(this.context);
      sp.setup({
        spfxContext: this.context
      });
    });
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
