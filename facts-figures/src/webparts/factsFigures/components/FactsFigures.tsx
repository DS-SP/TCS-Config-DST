import * as React from 'react';
import { IFactsFiguresProps } from './IFactsFiguresProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as CONSTANTS from "./CONSTANTS";
import SharePointManagerService from "../services/SharePointService";
import IFactFigureItem from "./IFactsFigureItem";
import { IFactsFiguresState } from './IFactsFiguresState';
//  import "./factsFigures.css";

export default class FactsFigures extends React.Component<IFactsFiguresProps, IFactsFiguresState> {
  constructor(props) {
    super(props);
    this.state = {
      factFigureItems: []
    };
    require("./factsFigures.css");
    this.getItemsFromList = this.getItemsFromList.bind(this);
  }

  private async getItemsFromList(listName: string) {
    let response: any = await SharePointManagerService.getItems(listName);
    let jsonresponse: any = await response.json();
    let items: any = jsonresponse.d.results;
    debugger;
    let factFigureItems: IFactFigureItem[] = items.map((item) => {
      let factFigureItem: IFactFigureItem = {
        title: item.Title,
        imageURL: item.File.ServerRelativeUrl
      };
      return factFigureItem;
    });
    this.setState({
      factFigureItems: factFigureItems,
    });
  }

  public componentDidMount() {
    this.getItemsFromList(CONSTANTS.LIBRARYNAME);
  }
  public render(): React.ReactElement<IFactsFiguresProps> {
    debugger;
    return (
      <>
        <div className="facts_figure">
          <div className="title">{this.props.title}</div>

          {this.state.factFigureItems.length > 0 ? this.state.factFigureItems.map(factsFigureItem => {
            return <div className="facts"><div className="rounded_part"><img src={factsFigureItem.imageURL}/></div><div className="fact_info">{factsFigureItem.title}</div></div>;
          }) : null}
        </div>
      </>
    );
  }
}
