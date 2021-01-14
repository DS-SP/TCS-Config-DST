import { override } from "@microsoft/decorators";
import { Log } from "@microsoft/sp-core-library";
import {
  BaseApplicationCustomizer,
  PlaceholderName,
  PlaceholderContent,
} from "@microsoft/sp-application-base";
import { Dialog } from "@microsoft/sp-dialog";
import * as React from "react";
import * as ReactDom from "react-dom";
import * as strings from "MegamenuApplicationCustomizerStrings";
import { MegaMenuService } from "../service/MegaMenuService";
import { TopLevelMenu } from "../model/TopLevelMenu";
import { IMegamenuProps } from "../../components/IMegamenuProps";
import Megamenu from "../../components/Megamenu";

const LOG_SOURCE: string = "MegamenuApplicationCustomizer";

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IMegamenuApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class MegamenuApplicationCustomizer extends BaseApplicationCustomizer<
  IMegamenuApplicationCustomizerProperties
> {
  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    let spSiteHeader: HTMLElement = document.getElementById("spSiteHeader") as HTMLElement;
    spSiteHeader.setAttribute("style", "display: none !important");
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let message: string = this.properties.testMessage;
    if (!message) {
      message = "(No properties were provided.)";
    }

    this.context.placeholderProvider.changedEvent.add(
      this,
      this._renderPlaceHolders
    );

    return Promise.resolve();
  }

  private async _renderPlaceHolders() {
    console.log("HelloWorldApplicationCustomizer._renderPlaceHolders()");
    console.log(
      "Available placeholders: ",
      this.context.placeholderProvider.placeholderNames
        .map((name) => PlaceholderName[name])
        .join(", ")
    );
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );
    }

    if (!this._topPlaceholder) {
      console.error("The expected placeholder (Top) was not found.");
      return;
    }

    if (this._topPlaceholder.domElement) {
      let topLevelMenus: TopLevelMenu[] = await MegaMenuService.getMenuItems(
        this.context.pageContext.site.absoluteUrl
      );
      const element: React.ReactElement<IMegamenuProps> = React.createElement(
        Megamenu,
        {
          topLevelMenuItems: topLevelMenus
        }
      );
      ReactDom.render(element, this._topPlaceholder.domElement);
      /* MegaMenuService.getMenuItems(this.context.pageContext.site.absoluteUrl)
        .then((topLevelMenus: TopLevelMenu[]) => {
          console.log("Toplevel: " + topLevelMenus);
          const element: React.ReactElement<IMegamenuProps> = React.createElement(
            Megamenu,
            {
              topLevelMenuItems: topLevelMenus,
            }
          );

          ReactDom.render(element, this._topPlaceholder.domElement);
        })
        .catch((error: any) => {
          console.error(
            `Error trying to read menu items or render component : ${error.message}`
          );
        }); */
    }
  }

  /*  @override
  public onRender(): void {
    debugger;
    if (!this.headerPlaceholder) {
      this.headerPlaceholder = this.context.placeholders.tryAttach(
        "PageHeader",
        {
          onDispose: this._onDispose,
        }
      );

      if (this.headerPlaceholder) {
        if (this.headerPlaceholder.domElement) {
          console.log("PageHeader placeholder is OK.");

          MegaMenuService.getMenuItems(
            this.context.pageContext.site.absoluteUrl
          )
            .then((topLevelMenus: TopLevelMenu[]) => {
              console.log("Toplevel: " + topLevelMenus);
              const element: React.ReactElement<IMegamenuProps> = React.createElement(
                Megamenu,
                {
                  topLevelMenuItems: topLevelMenus,
                }
              );

              ReactDom.render(element, this.headerPlaceholder.domElement);
            })
            .catch((error: any) => {
              console.error(
                `Error trying to read menu items or render component : ${error.message}`
              );
            });
        } else {
          console.error("PageHeader placeholder has no DOM element.");
        }
      } else {
        console.error("PageHeader placeholder not found.");
      }
    }
  }*/
  private _onDispose(): void {}
}
