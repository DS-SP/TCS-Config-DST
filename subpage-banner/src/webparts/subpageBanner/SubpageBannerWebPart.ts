import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SubpageBannerWebPartStrings';
import SubpageBanner from './components/SubpageBanner';
import { ISubpageBannerProps } from './components/ISubpageBannerProps';
import { PropertyPaneCheckbox } from '@microsoft/sp-property-pane';
import { PropertyFieldPeoplePicker, PrincipalType } from '@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker';
import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";

export interface ISubpageBannerWebPartProps {
  thumbnailURL: string;
  backgroundImageURL: string;
  heading: string;
  paragraph: string;
  readmoreURL: string;
  isAddonRequired: boolean;
  serviceOwner: IPropertyFieldGroupOrPerson;
}

export default class SubpageBannerWebPart extends BaseClientSideWebPart<ISubpageBannerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISubpageBannerProps> = React.createElement(
      SubpageBanner,
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
                PropertyPaneTextField('heading', {
                  label: strings.HeadingFieldLabel
                }),
                PropertyPaneTextField('paragraph', {
                  label: strings.ParagraphFieldLabel
                }),
                PropertyPaneTextField('readmoreURL', {
                  label: strings.ReadmoreURLFieldLabel
                }),
                PropertyPaneToggle('isAddonRequired', {
                  label:strings.isAddonRequiredFieldLable
                }),
                PropertyFieldPeoplePicker('serviceOwner', {
                  label: strings.ServiceOwnerFieldLabel,
                  allowDuplicate: false,
                  principalType: [PrincipalType.Users, PrincipalType.SharePoint, PrincipalType.Security],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'peopleFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
