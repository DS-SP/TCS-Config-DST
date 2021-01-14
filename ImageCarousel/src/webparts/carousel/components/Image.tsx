import * as React from "react";
import "./Carousel.css";
import "./fonts.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ICarouselProps } from "./ICarouselProps";
import { IImageProps } from "./IImageProps";
import { IImageState } from "./IImageState";
import { ImageService } from "../../../services/ImageService";
import { IDataService } from "../../../services/IDataService";
import { ICarouselItem } from "./ICarouselItem";
import CarouselIndicator from "./CarouselIndicator";

export default class Image extends React.Component<IImageProps, IImageState> {
  private dataCenterServiceInstance: IDataService;
  public constructor(props: IImageProps, state: IImageState) {
    super(props);

    this.state = {};
  }

  public componentDidMount() { }
  public render(): React.ReactElement<IImageProps> {
    return (
      <div className="carousel-wrapper">
        <div className="container">
          <div className="carousel-item">
            <div className="corousel-text">
              <img src="https://pfizer.sharepoint.com/sites/DST/HomePage_Carousel_Images/DST_logo.png" />
              <div className="short-text">
                {this.props.item.paragraph != null ? (
                  <p>{this.props.item.paragraph}</p>
                ) : null}
                {this.props.item.heading != null ? (
                  <h2>{this.props.item.heading}</h2>
                ) : null}
                {this.props.item.linkText != null ? (
                  <a
                    href={
                      this.props.item.linkURL != null
                        ? this.props.item.linkURL
                        : null
                    }
                  >
                    {this.props.item.linkText}
                  </a>
                ) : null}
              </div>
            </div>
            <div className="carousel-image">
              <img src={this.props.item.FileURL} />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            role="button"
            data-slide="prev"
            onClick={() => this.props.changeItem("prev")}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
          </a>
          <a
            className="carousel-control-next"
            role="button"
            data-slide="next"
            onClick={() => this.props.changeItem("next")}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
          </a>

          <CarouselIndicator
            length={this.props.length}
            currentIndex={this.props.currentItemIndex}
            changeCurrentItemIndex={this.props.changeCurrentItemIndex}
          />
        </div>
      </div>
    );
  }
}
