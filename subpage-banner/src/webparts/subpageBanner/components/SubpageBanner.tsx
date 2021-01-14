import * as React from 'react';
import styles from './SubpageBanner.module.scss';
import { ISubpageBannerProps } from './ISubpageBannerProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class SubpageBanner extends React.Component<ISubpageBannerProps, {}> {
  constructor(props) {
    super(props);
    
  }
  
  public render(): React.ReactElement<ISubpageBannerProps> {
    debugger;
    require('./SubpageBanner.css');
    let profileIconImageUrl: string = require('./images/profile-icon.png');
    let mailIconImageUrl: string = require('./images/mail-icon.png');
    let addonImageUrl: string = require('./images/addon.png');
    return (
      <>
        <div className="subpageBanner-wrapper">
          <div className="subpageBanner-container">
            <div className="subpageBanner-item">
              <div className="subpageBanner-text">
                {this.props.webpartProperties.isAddonRequired ? <img src={addonImageUrl} /> : null}
                <h1>{this.props.webpartProperties.heading}</h1>
                <div className="short-text desktop">
                  <p>{this.props.webpartProperties.paragraph} {this.props.webpartProperties.readmoreURL != "" ?
                    <a href={this.props.webpartProperties.readmoreURL} className="subpageread-more">Read more</a> : null}
                  </p>
                </div>
                {this.props.webpartProperties.serviceOwner ? <div className="blue_div">
                  <div className="profile_icon">
                    <img src={this.props.webpartProperties.serviceOwner[0].imageUrl} />
                  </div>
                  <div className="owner_details">
                    <label className="owner_name">{this.props.webpartProperties.serviceOwner[0].fullName}</label>
                    <label className="owner_desig">Service Owner</label>
                    <a href="#contact"><img src={mailIconImageUrl} /></a>
                  </div>
                </div>:null}
              </div>
              <div className="subpageBanner-image">
                <img src={this.props.webpartProperties.thumbnailURL} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}