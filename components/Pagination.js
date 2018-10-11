import { css } from "emotion";
import { Fragment } from "react";
const buttonCss = css`
  background-color: #1bb394;
  border-color: transparent;
  color: #fff;
  border-radius: 0;
  height: 50px;
  width: 50px;
  z-index: 10;
  cursor: pointer;
  justify-content: center;
  padding: calc(0.375em - 1px) 0.75em;
  text-align: center;
  white-space: nowrap;
  align-items: center;
  border: 1px solid transparent;
  display: inline-flex;
  font-size: 1rem;
  box-shadow: none;
  border-radius: 0;
`;
const buttonPrev = css`
  ${buttonCss};
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  position: fixed;
  bottom: 30px;
  left: 0;
`;
const buttonNext = css`
  ${buttonCss};
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  position: fixed;
  bottom: 30px;
  right: 0;
`;
export default ({ prevHandler = () => {}, nextHandler = () => {} }) => (
  <Fragment>
    <button className={buttonPrev} type="button" onClick={prevHandler}>
      Prev
    </button>
    <button className={buttonNext} type="button" onClick={nextHandler}>
      Next
    </button>
  </Fragment>
);
