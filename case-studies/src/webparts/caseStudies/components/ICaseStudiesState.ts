import ICaseStudiesItem from "./ICaseStudiesItem";

export default interface ICaseStudiesState {
    caseStudiesItems: ICaseStudiesItem[];
    index: number;
}