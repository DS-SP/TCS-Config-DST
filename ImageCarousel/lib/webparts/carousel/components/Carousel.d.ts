import * as React from "react";
import "./Carousel.css";
import "./fonts.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ICarouselProps } from "./ICarouselProps";
import { ICarouselState } from "./ICarouselState";
export default class ImageCarousel extends React.Component<ICarouselProps, ICarouselState> {
    constructor(props: ICarouselProps, state: ICarouselState);
    private getItemsFromList;
    runTimer: () => void;
    componentDidMount(): void;
    changeItem: (action: string) => void;
    changeCurrentItemIndex(i: number): void;
    render(): React.ReactElement<ICarouselProps>;
}
//# sourceMappingURL=Carousel.d.ts.map