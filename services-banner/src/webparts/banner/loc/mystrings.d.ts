declare interface IBannerWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ThumbnailFieldLabel: string;
  BackgroundFieldLabel: string;
  HeadingFieldLabel: string;
  ParagraphFieldLabel: string;
  LinkTextFieldLabel: string;
  LinkURLFieldLabel: string;
  LogoURLFieldLabel: string;
  PromotedHeading: string;
  PromotedParagraph: string;
  PromotedReadMoreLink: string;
  PromotedGroupName: string;
  PromotedPropertyPaneDescription: string;
}

declare module "BannerWebPartStrings" {
  const strings: IBannerWebPartStrings;
  export = strings;
}
