import * as React from 'react';
import styles from './EmailMarketing.module.scss';
import { IEmailMarketingProps } from './IEmailMarketingProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class EmailMarketing extends React.Component<IEmailMarketingProps, {}> {
  constructor(props) {
    super(props);
    require('./emailMarketing.css');
  }
  public render(): React.ReactElement<IEmailMarketingProps> {
    return (
        <div className="email_info_wrapper">
        <hr/>
          <h2>{this.props.title}</h2>
          <div className="email_more_info_block">
            <div className="email_image">
              <img src={this.props.thumbnail_url} alt="Please configure Image in Services list" />
            </div>
            <div className="email_details truncate">
              <p>{this.props.para}</p>
              <p></p>
              <p></p>
            </div>
          </div>
        </div>
    );
  }
}
