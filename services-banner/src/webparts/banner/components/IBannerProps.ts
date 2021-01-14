import { IBannerWebPartProps } from "../BannerWebPart";
import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IBannerProps {
  webpartProperties: IBannerWebPartProps;
  context: WebPartContext;
}
