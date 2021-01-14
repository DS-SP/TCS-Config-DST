import * as React from "react";
import styles from "./Banner.module.scss";
import { IBannerProps } from "./IBannerProps";
import "./banner.css";
import { escape } from "@microsoft/sp-lodash-subset";

export default class Banner extends React.Component<IBannerProps, {}> {
  constructor(props) {
    super(props);
  }
  public render(): React.ReactElement<IBannerProps> {
    debugger;
    return (
      <>
        {this.props.webpartProperties != undefined ? (
          <div
            className="banner-wrapper"
            style={{
              background: `url(${this.props.webpartProperties.backgroundImageURL}) no-repeat center center/cover`,
            }}
          >
            <div className="banner-container">
              <div className="banner-item">
                <div className="banner-text">
                  <img src={this.props.webpartProperties.logo} />
                  <h1>{this.props.webpartProperties.heading}</h1>
                  <div className="short-text desktop">
                    <p>{this.props.webpartProperties.paragraph}</p>
                    <a href={this.props.webpartProperties.linkURL}>
                      {this.props.webpartProperties.linkText}
                    </a>
                  </div>
                </div>
                <div className="banner-image">
                  <img src={this.props.webpartProperties.thumbnailURL} />
                  <div className="short-text mobile">
                    <p>{this.props.webpartProperties.paragraph}</p>
                    <a href={this.props.webpartProperties.linkURL}>
                      {this.props.webpartProperties.linkText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          "Please configure webpart properties"
        )}
      </>
    );
  }
}
