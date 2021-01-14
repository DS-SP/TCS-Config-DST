import * as React from "react";
import "./Carousel.css";
import "./fonts.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ICarouselProps } from "./ICarouselProps";
import { ICarouselState } from "./ICarouselState";
import { escape } from "@microsoft/sp-lodash-subset";
import { ServiceScope } from "@microsoft/sp-core-library";
import { ImageService } from "../../../services/ImageService";
import { IDataService } from "../../../services/IDataService";
import { ICarouselItem } from "./ICarouselItem";
import SharePointManagerService, {
  SharePointManager,
} from "../../services/SharePointService";
import Image from "./Image";
import * as CONSTANTS from "./Constants";
import { Shimmer } from "office-ui-fabric-react";

export default class ImageCarousel extends React.Component<
  ICarouselProps,
  ICarouselState
> {
  public constructor(props: ICarouselProps, state: ICarouselState) {
    super(props);

    this.state = {
      carouselItems: [],
      currentItemIndex: 0,
      interval: null,
    };
    this.changeCurrentItemIndex = this.changeCurrentItemIndex.bind(this);
  }

  private async getItemsFromList(listName: string) {
    let response: any = await SharePointManagerService.getItems(listName);
    let jsonresponse: any = await response.json();
    let items: any = jsonresponse.d.results;
    let carouselItems: ICarouselItem[] = items.map((item) => {
      let carouselItem: ICarouselItem = {
        FileURL: item.File.ServerRelativeUrl,
        paragraph: item.Paragraph,
        heading: item.Heading,
        linkText: item.LinkText,
        linkURL: item.LinkURL,
      };
      return carouselItem;
    });
    this.setState({
      carouselItems: carouselItems,
    });
  }

  public runTimer = () => {
    let interval = setInterval(() => {
      this.changeItem("next");
    }, 10000);
    this.setState({ interval: interval });
  }

  public componentDidMount() {
    this.getItemsFromList(CONSTANTS.LIBRARYNAME);
    this.runTimer();
  }

  public changeItem = (action: string) => {
    let currentIndex: number = this.state.currentItemIndex;
    if (action == "next") {
      if (this.state.currentItemIndex == this.state.carouselItems.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex += 1;
      }
    } else {
      if (this.state.currentItemIndex == 0) {
        currentIndex = this.state.carouselItems.length - 1;
      } else {
        currentIndex -= 1;
      }
    }
    this.setState({ currentItemIndex: currentIndex });
  }

  public changeCurrentItemIndex(i: number) {
    this.setState({
      currentItemIndex: i,
      interval: clearInterval(this.state.interval),
    });
    this.componentDidMount();
  }
  public render(): React.ReactElement<ICarouselProps> {
    return (
      <>
        {this.state.carouselItems.length > 0 ? (
          <Image
            item={this.state.carouselItems[this.state.currentItemIndex]}
            currentItemIndex={this.state.currentItemIndex}
            changeItem={this.changeItem}
            length={this.state.carouselItems.length}
            changeCurrentItemIndex={this.changeCurrentItemIndex}
          />
        ) : (
          <>
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
          </>
        )}
      </>
    );
  }
}
