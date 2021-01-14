import * as React from 'react';
import { IDownloadSectionProps } from './IDownloadSectionProps';
import { escape } from '@microsoft/sp-lodash-subset';
import SharePointManagerService from '../services/SharePointService';
import { IDownloadItem } from './IDownloadItem';
import { IDownloadSectionState } from './IDownloadSectionState';
import * as CONSTANTS from './CONSTANTS';

export default class DownloadSection extends React.Component<IDownloadSectionProps, IDownloadSectionState> {

  constructor(props) {
    super(props);
    this.state = {
      downloadItems: []
    };
    require('./downloads.css');
  }
  private async getItemsFromList(listName: string) {
    debugger;
    let response: any = await SharePointManagerService.getItems(listName);
    let jsonresponse: any = await response.json();
    let items: any = jsonresponse.d.results;
    debugger;
    let downloadItems: IDownloadItem[] = items.map((item) => {
      let downloadItem: IDownloadItem = {
        serverRelativeUrl: item.File.ServerRelativeUrl,
        fileName: item.File.Name
      };
      return downloadItem;
    });
    this.setState({
      downloadItems: downloadItems,
    });
  }

  public componentDidMount() {
    this.getItemsFromList(CONSTANTS.LIBRARYNAME);
  }
  public render(): React.ReactElement<IDownloadSectionProps> {
    const filesLogo: any = require('../assets/files-icon-black.png');
    const pdfLogo: any = require('../assets/pdf-icon-black.png');
    let pdfItems = this.state.downloadItems.filter(downloadItem => {
      if (downloadItem.fileName.indexOf('.pdf') != -1) {
        return downloadItem;
      }
    });
    let nonPdfItems = this.state.downloadItems.filter(downloadItem => {
      if (downloadItem.fileName.indexOf('.pdf') == -1) {
        return downloadItem;
      }
    });
    return (
      <div className='download-section'>
        <hr />
        <div className="download-title">DOWNLOADS</div>
        <div className="report-link">
          {pdfItems.length > 0 ? <ul className="pdf-links links">
            <li><img src={pdfLogo} /><label>PDFS</label></li>
            {pdfItems.slice(0, 4).map(pdfItem => <li><a href="#" onClick={() => this.props.downloadFileHandler(pdfItem.serverRelativeUrl, pdfItem.fileName)}>{pdfItem.fileName.substr(0,pdfItem.fileName.indexOf("."))}</a></li>)}
          </ul> : null}
          {nonPdfItems.length > 0 ? <ul className="report-links links">
            <li><img src={filesLogo} /><label>REPORTS</label></li>
            {nonPdfItems.slice(0, 4).map(nonPdfItem => <li><a href="#" onClick={() => this.props.downloadFileHandler(nonPdfItem.serverRelativeUrl, nonPdfItem.fileName)}>{nonPdfItem.fileName.substr(0,nonPdfItem.fileName.indexOf("."))}</a></li>)}
          </ul> : null}
        </div>
        </div>
    );
  }
}
