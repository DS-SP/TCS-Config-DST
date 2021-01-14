import * as React from 'react';
import styles from './OurProcess.module.scss';
import { IOurProcessProps } from './IOurProcessProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class OurProcess extends React.Component<IOurProcessProps, {}> {
  constructor(props) {
    super(props);
    require("./process.css");
  }
  public render(): React.ReactElement<IOurProcessProps> {
    let viewprocess_image_url: string = require("../assets/view_all.png");
    return (
      <div className='ourprocess_container'>
        <hr />
        <div className="view_process">
          <div className="title">Our Process</div>
          <div className="process_image_mobile"> <img src={this.props.thumbnail_image} /> </div>
          <div className="process_details">
            <div className="process_info">
              <p>{this.props.para1}</p>
              <a href={this.props.viewFullProcess_Url}><img src={viewprocess_image_url} /></a>
            </div>
            <div className="process_image">
              <img src={this.props.thumbnail_image} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
