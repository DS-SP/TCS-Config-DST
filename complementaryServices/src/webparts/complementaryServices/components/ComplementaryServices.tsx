import * as React from 'react';
import styles from './ComplementaryServices.module.scss';
import { IComplementaryServicesProps } from './IComplementaryServicesProps';
import IComplementaryServicesItem from './IComplementaryServicesItem';
import * as CONSTANTS from './CONSTANTS';
import SharePointManagerService from './services/SharePointService';
import IComplementaryServicesState from './IComplementaryServicesState';
import Pagnation from './Pagnation';
import { escape } from '@microsoft/sp-lodash-subset';

export default class ComplementaryServices extends React.Component<IComplementaryServicesProps, IComplementaryServicesState> {
  constructor(props) {
    super(props);
    this.state = {
      complementaryServicesItems: [],
      index: 0,
      pagnationcount: 0,
      pagnationCurrentIndex: 1
    };
    require("./fontawesome.js");
    require("./complementary.css");
  }

  private async getItemsFromList(listName: string) {
    let response: any = await SharePointManagerService.getItems(listName);
    let jsonresponse: any = await response.json();
    let items: any = jsonresponse.d.results;
    debugger;
    let complementaryServicesItems: IComplementaryServicesItem[] = items.map((item) => {
      let complementaryServicesItem: IComplementaryServicesItem = {
        title: item.Title,
        description: item.Description,
        category: item.Category,
        capability: item.Capability,
        serviceOwner: item.ServiceOwner.Title
      };
      return complementaryServicesItem;
    });
    this.setState({
      complementaryServicesItems: complementaryServicesItems,
    });
    let totalItems = this.state.complementaryServicesItems.length;
    let pagnationCount: number = totalItems % 3 != 0 ? (totalItems / 3 + 1) : (totalItems / 3);
    this.setState({ pagnationcount: pagnationCount });
  }

  public handleClick(direction: string) {
    if (direction == "left") {
      if (this.state.index - 1 >= 0) {
        let newIndex = this.state.index - 3;
        let newPagnationIndex: number = this.state.pagnationCurrentIndex - 1;
        this.setState({ index: newIndex, pagnationCurrentIndex: newPagnationIndex });
      }
    } else {
      if (this.state.index + 3 < this.state.complementaryServicesItems.length) {
        let newIndex = this.state.index + 3;
        let newPagnationIndex: number = this.state.pagnationCurrentIndex + 1;
        this.setState({ index: newIndex, pagnationCurrentIndex: newPagnationIndex });
      }
    }
  }

  public componentDidMount() {
    this.getItemsFromList(CONSTANTS.LIBRARYNAME);
  }

  public render(): React.ReactElement<IComplementaryServicesProps> {
    return (
      <div style={{background: "rgb(243, 242, 241)"}}>
        <div className="complementary-title">Complementary Services and add-ons</div>
        <div className="all-cards">
          {this.state.index < this.state.complementaryServicesItems.length ? (<div className="individual-cards">
            <div className="individual-cards-title">{this.state.complementaryServicesItems[this.state.index].title}</div>
            <div className="card-description">{this.state.complementaryServicesItems[this.state.index].description}<a className="read-more">Read more </a>
            </div>
            <div className="below-info">
              <div className="cat-cap-ser">
                <label className="cat-cap-ser-title">CATEGORY</label>
                <label className="cat-cap-ser-info">{this.state.complementaryServicesItems[this.state.index].category}</label>
              </div>
              <div className="cat-cap-ser">
                <label className="cat-cap-ser-title">CAPABILITY</label>
                <label className="cat-cap-ser-info">{this.state.complementaryServicesItems[this.state.index].capability}</label>
              </div>
              <div className="cat-cap-ser">
                <label className="cat-cap-ser-title">SERVICE OWNER</label>
                <label className="cat-cap-ser-info">{this.state.complementaryServicesItems[this.state.index].serviceOwner}</label>
              </div>
            </div>
          </div>) : null}
          {this.state.index + 1 < this.state.complementaryServicesItems.length ? (<div className="individual-cards">
            <div className="individual-cards-title">{this.state.complementaryServicesItems[this.state.index + 1].title}</div>
            <div className="card-description">{this.state.complementaryServicesItems[this.state.index + 1].description}<a className="read-more">Read more </a>
            </div>
            <div className="below-info">
              <div className="cat-cap-ser">
                <label className="cat-cap-ser-title">CATEGORY</label>
                <label className="cat-cap-ser-info">{this.state.complementaryServicesItems[this.state.index + 1].category}</label>
              </div>
              <div className="cat-cap-ser">
                <label className="cat-cap-ser-title">CAPABILITY</label>
                <label className="cat-cap-ser-info">{this.state.complementaryServicesItems[this.state.index + 1].capability}</label>
              </div>
              <div className="cat-cap-ser">
                <label className="cat-cap-ser-title">SERVICE OWNER</label>
                <label className="cat-cap-ser-info">{this.state.complementaryServicesItems[this.state.index + 1].serviceOwner}</label>
              </div>
            </div>
          </div>) : null}
          {this.state.index + 2 < this.state.complementaryServicesItems.length ? (<div className="individual-cards">
            <div className="individual-cards-title">{this.state.complementaryServicesItems[this.state.index + 2].title}</div>
            <div className="card-description">{this.state.complementaryServicesItems[this.state.index + 2].description}<a className="read-more">Read more </a>
            </div>
            <div className="below-info">
              <div className="cat-cap-ser">
                <label className="cat-cap-ser-title">CATEGORY</label>
                <label className="cat-cap-ser-info">{this.state.complementaryServicesItems[this.state.index + 2].category}</label>
              </div>
              <div className="cat-cap-ser">
                <label className="cat-cap-ser-title">CAPABILITY</label>
                <label className="cat-cap-ser-info">{this.state.complementaryServicesItems[this.state.index + 2].capability}</label>
              </div>
              <div className="cat-cap-ser">
                <label className="cat-cap-ser-title">SERVICE OWNER</label>
                <label className="cat-cap-ser-info">{this.state.complementaryServicesItems[this.state.index + 2].serviceOwner}</label>
              </div>
            </div>
          </div>) : null}
        </div>
        <div className="for-back-arr back-arrow">
          <i className="fa fa-angle-left" onClick={() => this.handleClick("left")}></i>
          <Pagnation totalItems={this.state.pagnationcount} currentPagnationIndex={this.state.pagnationCurrentIndex} />
          <i className="fa fa-angle-right forw-arrow" onClick={() => this.handleClick("right")}></i>
        </div>
      </div>
    );
  }
}
