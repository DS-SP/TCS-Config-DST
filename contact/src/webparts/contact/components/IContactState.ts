import { IPersonaProps } from 'office-ui-fabric-react';
import { IRegionItem } from './IRegionItem';
import { ISiteUserProps } from "@pnp/sp/site-users/";
export interface IContactState {
    region_options: IRegionItem[];
    message: string;
    person: IPersonaProps;
    selectedRegion?: string;
    user: ISiteUserProps;
  }