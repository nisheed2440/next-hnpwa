import { Component } from "react";
import { css } from "emotion";

const dataWrapper = css`
  overflow-x: hidden;
  overflow-y: auto;
`;

const dataList = css`
  padding: 0;
  list-style: none;
`;

import DataItem from "./DataItem";
class DataWrapper extends Component {
  render() {
    const { data, type } = this.props;
    return (
      <div className={dataWrapper}>
        <ul className={dataList}>
          {data.map((item, i) => (
            <li key={i}>
              <DataItem data={item} type={type} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default DataWrapper;
