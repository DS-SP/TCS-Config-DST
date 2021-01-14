import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'FactsFiguresWebPartStrings';
import FactsFigures from './components/FactsFigures';
import SharePointManagerService from "./services/SharePointService";
import { IFactsFiguresProps } from './components/IFactsFiguresProps';

export interface IFactsFiguresWebPartProps {
  description: string;
  title: string;
  para1: string;
  para2: string;
  para3: string;
  imageURL: string;
}

export default class FactsFiguresWebPart extends BaseClientSideWebPart<IFactsFiguresWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IFactsFiguresProps> = React.createElement(
      FactsFigures,
      {
        description: this.properties.description,
        title: this.properties.title,
        para1: this.properties.para1,
        para2: this.properties.para2,
        para3: this.properties.para3,
        imageURL: this.properties.imageURL
      }
    );

    ReactDom.render(element, this.domElement);
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
                }),
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                ,
                PropertyPaneTextField('imageURL', {
                  label: strings.ImageURLFieldLabel
                }),
                PropertyPaneTextField('para1', {
                  label: strings.Para1FieldLabel
                }),
                PropertyPaneTextField('para2', {
                  label: strings.Para2FieldLabel
                }),
                PropertyPaneTextField('para3', {
                  label: strings.Para3FieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
