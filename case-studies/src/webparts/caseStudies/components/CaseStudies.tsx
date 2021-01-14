import * as React from 'react';
import { ICaseStudiesProps } from './ICaseStudiesProps';
import ICaseStudiesState from './ICaseStudiesState';
import * as CONSTANTS from "./CONSTANTS";
import SharePointManagerService from "../services/SharePointService";
import ICaseStudiesItem from "./ICaseStudiesItem";
import { sp } from "@pnp/sp/presets/all";
import { IPageDetails } from './IPageDetails';

export default class CaseStudies extends React.Component<ICaseStudiesProps, ICaseStudiesState> {
  constructor(props) {
    super(props);
    this.state = {
      caseStudiesItems: [],
      index: 0
    };

    require("./fontawesome.js");
    require("./caseStudies.css");
    //require("./fontawesome-free-5.15.1-web/css/all.css");
    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/a076d05399.js";
    script.async = true;
    document.body.appendChild(script);

    this.getItemsFromList = this.getItemsFromList.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  private async getItemsFromList(listName: string, category: string) {
    let response: any = await SharePointManagerService.getItems(listName, category);
    let jsonresponse: any = await response.json();
    let items: any = jsonresponse.d.results;
    debugger;
    let caseStudiesItems: ICaseStudiesItem[] = items.filter((item) => {
      if (item.CaseStudies_Image != null && item.Title != null && item.CaseStudies_Title != null) {
        return item;
      }
    }).map(item => {
      let caseStudiesImage: string = JSON.parse(item.CaseStudies_Image).serverRelativeUrl;
      let caseStudiesItem: ICaseStudiesItem = {
        showcaseTitle: item.Title,
        caseStudiesTitle: item.CaseStudies_Title,
        caseStudiesImage: caseStudiesImage,
        caseStudiesRedirectLink: item.CaseStudies_URL.Url
      };
      return caseStudiesItem;
    });
    this.setState({
      caseStudiesItems: caseStudiesItems,
    });
  }

  public async componentDidMount() {
    debugger;
    const pageDetails: IPageDetails = await sp.web.lists.getById('e8491399-74c4-480b-a976-a5abb8f4cb5b')
      .items.getById(21)
      .select("Title,Category/Title")
      .expand('Category')
      .get()
      .then(d => {
        return (d)
      });
    this.getItemsFromList(CONSTANTS.LIBRARYNAME, pageDetails.Category.Title);
  }

  public handleClick(direction: string) {
    if (direction == "left") {
      if (this.state.index - 1 >= 0) {
        let newIndex = this.state.index - 1;
        this.setState({ index: newIndex });
      }
    } else {
      if (this.state.index + 3 < this.state.caseStudiesItems.length) {
        let newIndex = this.state.index + 1;
        this.setState({ index: newIndex });
      }
    }
  }

  public render(): React.ReactElement<ICaseStudiesProps> {
    debugger;
    return (
      <div className="case_studies">
        <hr />
        <div className="title_case">CASE  DETAILS</div>
        <div className="scroll_horizontal">
          {this.state.caseStudiesItems.length > 0 ? <>{this.state.index < this.state.caseStudiesItems.length ?
            <a href={this.state.caseStudiesItems[this.state.index].caseStudiesRedirectLink}>
              <div className="image desktop_visible">
                <img src={this.state.caseStudiesItems[this.state.index].caseStudiesImage} alt="" />
                <div className="overlapped_title">
                  <div className="title1">{this.state.caseStudiesItems[this.state.index].caseStudiesTitle}</div>
                  <div className="title2">{this.state.caseStudiesItems[this.state.index].showcaseTitle.substring(0,32)}{this.state.caseStudiesItems[this.state.index].showcaseTitle.length>33?"...":null}</div>
                </div>
              </div>
            </a> : null}
            {this.state.index + 1 < this.state.caseStudiesItems.length ?
              <a href={this.state.caseStudiesItems[this.state.index + 1].caseStudiesRedirectLink}>
                <div className="image desktop_visible">
                  <img src={this.state.caseStudiesItems[this.state.index + 1].caseStudiesImage} alt="" />
                  <div className="overlapped_title">
                    <div className="title1">{this.state.caseStudiesItems[this.state.index + 1].caseStudiesTitle}</div>
                    <div className="title2">{this.state.caseStudiesItems[this.state.index + 1].showcaseTitle.substring(0,32)}{this.state.caseStudiesItems[this.state.index].showcaseTitle.length>33?"...":null}</div>
                  </div>
                </div>
              </a> : null}
            {this.state.index + 2 < this.state.caseStudiesItems.length ?
              <a href={this.state.caseStudiesItems[this.state.index + 2].caseStudiesRedirectLink}>
                <div className="image desktop_visible">
                  <img src={this.state.caseStudiesItems[this.state.index + 2].caseStudiesImage} alt="" />
                  <div className="overlapped_title">
                    <div className="title1">{this.state.caseStudiesItems[this.state.index + 2].caseStudiesTitle}</div>
                    <div className="title2">{this.state.caseStudiesItems[this.state.index + 2].showcaseTitle.substring(0,32)}{this.state.caseStudiesItems[this.state.index].showcaseTitle.length>33?"...":null}</div>
                  </div>
                </div>
              </a> : null}</> : "Please provide data for this webpart in Showcase list"}

        </div>
        <div className="mobile_dots mobile_view">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="show_arrow">
          <div className="show_all" onClick={() => { window.location.assign("https://pfizer.sharepoint.com/sites/DST/SitePages/ShowCase.aspx"); }}>SHOW ALL</div>
          <i className="fa fa-angle-left" onClick={() => this.handleClick("left")}></i>
          <i className="fa fa-angle-right" onClick={() => this.handleClick("right")}></i>
        </div>
      </div>
    );
  }
}
