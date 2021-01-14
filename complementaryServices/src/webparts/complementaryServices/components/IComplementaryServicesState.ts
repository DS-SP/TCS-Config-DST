import IComplementaryServicesItem from "./IComplementaryServicesItem";

export default interface IComplementaryServicesState {
    complementaryServicesItems: IComplementaryServicesItem[];
    index: number;
    pagnationcount: number;
    pagnationCurrentIndex: number;
}