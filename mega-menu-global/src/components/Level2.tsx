import * as React from "react";
import { FlyoutColumn } from "../extensions/model/FlyoutColumn";
import { ILevel2Props } from "./ILevel2Props";
import Level3 from "./Level3";

export default class Level2 extends React.Component<ILevel2Props, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    let maxColumns = Math.max.apply(
      Math,
      this.props.level2Items.map((level2Item) => level2Item.columnNumber)
    );
    let ArrayOfcolumnWiseLevel2Items: FlyoutColumn[][] = new Array<
      Array<FlyoutColumn>
    >();
    for (let i = 1; i <= maxColumns; i++) {
      let columnWiseItems: FlyoutColumn[] = this.props.level2Items.filter(
        (level2Item) => {
          if (level2Item.columnNumber == i) {
            return level2Item;
          }
        }
      );
      ArrayOfcolumnWiseLevel2Items.push(columnWiseItems);
    }

    let level2HeadingsArray: JSX.Element[] = ArrayOfcolumnWiseLevel2Items.map(
      (columnWiseLevel2Items, index) => {
        let level2Headings: JSX.Element[] = columnWiseLevel2Items.map(
          (columnWiseLevel2Item) => (
            <li>
              <span>{columnWiseLevel2Item.heading.text}</span>
              <ul className="sub_menu">
                <Level3 links={columnWiseLevel2Item.links} />
              </ul>
            </li>
          )
        );
        return <div className="column">{level2Headings}</div>;
      }
    );

    return (
      <ul className="main_sub_menu sub_menu">
        <div className="grid">{level2HeadingsArray}</div>
      </ul>
    );
  }
}
