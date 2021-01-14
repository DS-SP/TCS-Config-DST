import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'BannerWebPartStrings';
import Banner from './components/Banner';
import { IBannerProps } from './components/IBannerProps';

export interface IBannerWebPartProps {
  thumbnailURL: string;
  backgroundImageURL: string;
  heading: string;
  paragraph: string;
  linkText: string;
  linkURL: string;
  logo: string;
}

export default class BannerWebPart extends BaseClientSideWebPart<IBannerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IBannerProps> = React.createElement(
      Banner,
      {
        webpartProperties: this.properties
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
                PropertyPaneTextField('thumbnailURL', {
                  label: strings.ThumbnailFieldLabel
                }),
                PropertyPaneTextField('backgroundImageURL', {
                  label: strings.BackgroundFieldLabel
                }),
                PropertyPaneTextField('heading', {
                  label: strings.HeadingFieldLabel
                }),
                PropertyPaneTextField('paragraph', {
                  label: strings.ParagraphFieldLabel
                }),
                PropertyPaneTextField('linkText', {
                  label: strings.LinkTextFieldLabel
                }),
                PropertyPaneTextField('linkURL', {
                  label: strings.LinkURLFieldLabel
                }),
                PropertyPaneTextField('logo', {
                  label: strings.LogoURLFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
