import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CaseStudiesWebPartStrings';
import CaseStudies from './components/CaseStudies';
import { ICaseStudiesProps } from './components/ICaseStudiesProps';
import SharePointManagerService from "./services/SharePointService";
import { sp } from '@pnp/sp'; 

export interface ICaseStudiesWebPartProps {
  description: string;
}

export default class CaseStudiesWebPart extends BaseClientSideWebPart<ICaseStudiesWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICaseStudiesProps> = React.createElement(
      CaseStudies,
      {
        description: this.properties.description,
        pageContext: this.context.pageContext
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
