import { ICarouselItem } from "./ICarouselItem";
export interface ICarouselState {
  carouselItems: ICarouselItem[];
  currentItemIndex: number;
  interval?:any;
}
