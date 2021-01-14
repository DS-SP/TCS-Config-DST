import * as React from 'react';
import styles from './Contact.module.scss';
import { IContactProps } from './IContactProps';
import { IContactState } from './IContactState';
import { escape } from '@microsoft/sp-lodash-subset';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { Dropdown, IDropdown, IDropdownOption, IPersonaProps } from 'office-ui-fabric-react';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import SharePointManagerService from '../services/SharePointService';
import * as CONSTANTS from './CONSTANTS';
import {IRegionItem} from './IRegionItem';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { ISiteUserProps } from "@pnp/sp/site-users/";


export default class Contact extends React.Component<IContactProps, IContactState> {
  constructor(props) {
    super(props);
    require("./fontawesome.js");
    require("./contact.css");
    sp.setup({
      spfxContext: this.props.context
    });
    this.state = {
      region_options: [],
      message: null,
      person: null,
      selectedRegion: null,
      user: null
    };
    this._getPeoplePickerItems = this._getPeoplePickerItems.bind(this);
    this.handleMessageInputchange = this.handleMessageInputchange.bind(this);
  }

  private _getPeoplePickerItems(persons:IPersonaProps[]) {
    debugger;
    this.setState({person: persons[0], user: null});
  }
  private async getItemsFromList(listName: string) {
    let response: any = await SharePointManagerService.getItems(listName);
    let user: ISiteUserProps = await sp.web.currentUser();
    debugger;
    let jsonresponse: any = await response.json();
    let items: any = jsonresponse.d.results;
    let regionItems: IRegionItem[] = items.map((item) => {
      let regionItem: IRegionItem = {
        key: item.Title,
        text: item.Title
      };
      return regionItem;
    });
    this.setState({region_options: regionItems, user: user });
  }

  public componentDidMount() {
    debugger;
    this.getItemsFromList(CONSTANTS.LIBRARYNAME);
  }

  public async handleSubmit() {
    if((this.state.selectedRegion != null) && (this.state.person != null || this.state.user) && (this.state.message != null)) {
      let user = this.state.person ? await sp.web.ensureUser(this.state.person.id) : await sp.web.ensureUser(this.state.user.Email);
      const listItem = await sp.web.lists.getByTitle("ContactDetails").items.add({
        UserId: user.data.Id,
        Region: this.state.selectedRegion,
        MessageFromUser: this.state.message
      });
      alert("Thanks for your enquiry. We will contact you shortly. Have a nice day :-)");
    }
  }

  public handleMessageInputchange(event) {
    this.setState({message: event.target.value});
  }

  public render(): React.ReactElement<IContactProps> {
    let currentUserEmail: string = this.state.user ? this.state.user.Email: "";
    let isPeopleRequired: boolean = (this.state.user || this.state.person) ? false : true;
    return (
      <div className="contact-wrapper" id="contact">
        <hr/>
        <div className="contact-title">CONTACT</div>
        
        <div className="inputs">
    <div className="input-title">{this.props.title}</div>
          <div className="user-input region">
            <label>Your Region</label>
            {this.state.selectedRegion==null ? <label className="required-text">Required</label>: null}
            <Dropdown 
              placeholder="Select a region"
              options={this.state.region_options}
              required
              onChange={(event, selectedOption) => {this.setState({selectedRegion:selectedOption.key.toString()});}}
            />
          </div>
          <div className="user-input contact">
            <label>Your Name</label>
            {isPeopleRequired ? <label className="required-text">Required</label>:null}
            <PeoplePicker
              context={this.props.context}
              titleText="People Picker"
              personSelectionLimit={1}
              showtooltip={true}
              required={this.state.user || this.state.person ? false: true}
              showHiddenInUI={false}
              principalTypes={[PrincipalType.User]}
              resolveDelay={1000}
              onChange={this._getPeoplePickerItems}
              defaultSelectedUsers={[currentUserEmail]}
            />
          </div>

          <div className="user-input message">
            <label>Your Message</label>
            {this.state.message==null?<label className="required-text">Required</label>:null}
            <textarea onChange={this.handleMessageInputchange} rows={10}>{this.state.message}</textarea>
          </div>
          <button className="send-button" onClick={() => {this.handleSubmit();}} disabled={(this.state.message && (this.state.person || this.state.user) && this.state.selectedRegion)?false:true}>Send</button>

        </div>
        <hr />
      </div>
    );
  }
}
