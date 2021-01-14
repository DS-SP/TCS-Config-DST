import { ICarouselItem } from "./ICarouselItem";
export interface IImageProps {
  item: ICarouselItem;
  currentItemIndex: number;
  changeItem: any;
  length: number;
  changeCurrentItemIndex:any;
}