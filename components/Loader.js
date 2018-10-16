import { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { css } from "emotion";
const loaderFade = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.6);
`;

const loaderSpinner = css`
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;

  div {
    position: absolute;
    top: 27px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #00d1b2;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  div:nth-child(1) {
    left: 6px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  div:nth-child(2) {
    left: 6px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(3) {
    left: 26px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(4) {
    left: 45px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(19px, 0);
    }
  }
`;

@inject("store")
@observer
export class Loader extends Component {
  render() {
    const { store } = this.props;
    return store.isLoading ? (
      <Fragment>
        <div className={loaderFade} />
        <div className={loaderSpinner}>
          <div />
          <div />
          <div />
          <div />
        </div>
      </Fragment>
    ) : null;
  }
}
