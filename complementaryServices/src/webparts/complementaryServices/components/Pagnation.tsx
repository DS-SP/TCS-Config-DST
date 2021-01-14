import * as React from 'react';
interface IPagnationProps {
    totalItems: number;
    currentPagnationIndex: number;
}
export default class Pagnation extends React.Component<IPagnationProps, {}> {
    constructor(props) {
        super(props);
    }

    public render(): React.ReactElement<IPagnationProps> {
        let pagnationJSXElement: JSX.Element[] = [];
        for (let i = 1; i <= this.props.totalItems; i++) {
            if (i == this.props.currentPagnationIndex) {
                pagnationJSXElement.push(<span className="slicks active-slick"></span>);
            } else {
                pagnationJSXElement.push(<span className="slicks inactive-slick"></span>);
            }

        }
        return <>
            {pagnationJSXElement}</>;
    }
}