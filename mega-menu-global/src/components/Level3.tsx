import * as React from "react";
import { ILevel3Props } from "./ILevel3Props";
import { Link } from "../extensions/model/Link";

export default class Level3 extends React.Component<ILevel3Props, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    let level3Items: JSX.Element[] = this.props.links.map((link: Link) => (
      <li>
        <a href={link.url}>{link.text}</a>
      </li>
    ));

    return <>{level3Items}</>;
  }
}
