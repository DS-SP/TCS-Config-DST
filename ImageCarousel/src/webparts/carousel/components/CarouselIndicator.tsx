import * as React from "react";
import "./Carousel.css";
import { IIndicatorProps } from "./IIndicatorProps";
import { IIndicatorState } from "./IIndicatorState";

export default class CarouselIndicator extends React.Component<
  IIndicatorProps,
  IIndicatorState
> {
  constructor(props) {
    super(props);
    this.state = {
      listItems: [],
    };
  }

  public handleClick(e) {
    debugger;
    let id = parseInt(e.currentTarget.dataset.id);
    this.props.changeCurrentItemIndex(id);
  }

  public render(): React.ReactElement<IIndicatorProps> {
    let listItemsElements: JSX.Element[] = [];
    for (var i = 0; i < this.props.length; i++) {
      if (i == this.props.currentIndex) {
        let listItem: JSX.Element = <li className="active"></li>;
        listItemsElements.push(listItem);
      } else {
        let listItem: JSX.Element = (
          <li onClick={this.handleClick.bind(this)} data-id={i}></li>
        );
        listItemsElements.push(listItem);
      }
    }
    return <ul className="carousel-indicators">{listItemsElements}</ul>;
  }
}
