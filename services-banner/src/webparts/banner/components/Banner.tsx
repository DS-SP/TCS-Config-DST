import * as React from "react";
import { IBannerProps } from "./IBannerProps";
import "./banner.css";
import { escape } from "@microsoft/sp-lodash-subset";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Label, Icon, PrimaryButton } from "office-ui-fabric-react";

export default class Banner extends React.Component<IBannerProps, {}> {
  constructor(props) {
    super(props);
  }
  public render(): React.ReactElement<IBannerProps> {
    debugger;
    console.log("Webpart properties: " + this.props.webpartProperties);
    console.log(
      "Object.keys(this.props.webpartProperties).length" +
        Object.keys(this.props.webpartProperties).length
    );
    return (
      <>
        {Object.keys(this.props.webpartProperties).length > 1 ? (
          <div
            className="banner-wrapper"
            style={{
              background: `url(${this.props.webpartProperties.backgroundImageURL}) no-repeat center center/cover`,
            }}
          >
            <div className="banner-container">
              <div className="banner-item edge-touch">
                <div className="banner-text">
                  <img src={this.props.webpartProperties.logo} />
                  <h1>{this.props.webpartProperties.heading}</h1>
                  <div className="short-text desktop">
                    <p>{this.props.webpartProperties.paragraph}</p>
                    {this.props.webpartProperties.linkText != null &&
                    this.props.webpartProperties.linkText != "" ? (
                      <a href={this.props.webpartProperties.linkURL}>
                        {this.props.webpartProperties.linkText}
                      </a>
                    ) : null}
                  </div>
                </div>
                {this.props.webpartProperties.promotedHeading != null &&
                this.props.webpartProperties.promotedHeading != "" ? (
                  <div className="banner-promo-section">
                    <div className="banner-image">
                      <img src={this.props.webpartProperties.thumbnailURL} />
                    </div>
                    <div className="promoted-text">
                      <h2>{this.props.webpartProperties.promotedHeading}</h2>
                      <div className="promo-detail">
                        {this.props.webpartProperties.promotedParagraph}
                        <a
                          href={
                            this.props.webpartProperties.promotedReadMoreLink
                          }
                          className="read-more"
                        >
                          Read more
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="banner-image">
                    <img src={this.props.webpartProperties.thumbnailURL} />
                    <div className="short-text mobile">
                      <p>{this.props.webpartProperties.paragraph}</p>
                      <a href={this.props.webpartProperties.linkURL}>
                        {this.props.webpartProperties.linkText}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>Please configure webpart properties</>
        )}
      </>
    );
  }
}
