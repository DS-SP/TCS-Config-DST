import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
export interface ICarouselWebPartProps {
    description: string;
}
export default class CarouselWebPart extends BaseClientSideWebPart<ICarouselWebPartProps> {
    render(): void;
    protected onInit(): Promise<void>;
    protected onDispose(): void;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=CarouselWebPart.d.ts.map