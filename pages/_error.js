import React from "react";
import { css } from "emotion";

const errorPageWrapper = css`
  padding: 100px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;

const errorImage = css`
  flex-shrink: 0;
  width: 200px;
  height: 200px;
  background: url("/static/bug.png") no-repeat center center;
  background-size: contain;
  @media screen and (min-width: 1088px) {
    width: 256px;
    height: 256px;
  }
`;

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <div className={errorPageWrapper}>
        <div className={errorImage} />
        <p>
          {this.props.statusCode
            ? `An error ${this.props.statusCode} occurred on server`
            : "An error occurred on client"}
        </p>
      </div>
    );
  }
}
