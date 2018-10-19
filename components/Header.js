import { css } from "emotion";
import { Fragment } from "react";
import Container from "./Container";
import HNLogo from "./HNLogo";
import MainNav from "./MainNav";

const headerWrapper = css`
  padding: 0 16px;
  background-color: #1d1d1d;
  color: #ffffff;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px rgba(0, 0, 0, 0.14),
    0 1px 10px rgba(0, 0, 0, 0.12);
  z-index: 3;
`;

const headerFlex = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const headerContainer = css`
  @media screen and (min-width: 768px) {
    ${headerFlex};
  }
`;

const headerLinks = css`
  ${headerFlex};
  border-top: 1px dashed rgba(255, 255, 255, 0.5);
  @media screen and (min-width: 768px) {
    flex: 1;
    border-top: none;
    border-left: 1px dashed rgba(255, 255, 255, 0.5);
    margin-left: 5px;
    padding-left: 5px;
  }
`;

const headerLeft = css`
  ${headerFlex};
  flex: 1;
`;
const headerRight = css`
  ${headerFlex};
`;

const headerLogo = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.5em 0.5em 0;
  @media screen and (min-width: 768px) {
    padding: 0 0.5em;
  }
`;

const headerLogoInner = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  @media screen and (min-width: 768px) {
    flex: none;
  }
  svg {
    margin-right: 10px;
  }
`;

const headerMbTitle = css`
  font-size: 24px;
  display: inline;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const headerTitle = css`
  display: none;
  @media screen and (min-width: 768px) {
    display: inline;
  }
`;
const headerSubtitle = css`
  font-size: 12px;
`;
const skipToContent = css`
  left: -999px;
  position: absolute;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: -999;
  font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

  &:focus,
  &:active {
    color: #fff;
    background-color: #1d1d1d;
    left: auto;
    top: auto;
    width: 200px;
    height: 44px;
    overflow: hidden;
    margin: 0px 50%;
    transform: translateX(-50%);
    border: 1px solid #ffffff;
    text-align: center;
    z-index: 999;
    line-height: 44px;
  }
`;

export default () => (
  <Fragment>
    <a href="#main-content" className={skipToContent}>
      Skip to content
    </a>
    <header className={headerWrapper}>
      <Container className={headerContainer}>
        <div className={headerLogo}>
          <div className={headerLogoInner}>
            <HNLogo width="30" height="30" />
            <span className={headerMbTitle}>HN</span>
            <span className={headerTitle}>Hacker News</span>
          </div>
          <span className={headerSubtitle}>&nbsp;Powered by Next.js</span>
        </div>
        <div className={headerLinks}>
          <div className={headerLeft}>
            <MainNav
              links={[
                { link: "/top", label: "Top" },
                { link: "/new", label: "New" },
                { link: "/show", label: "Show" },
                { link: "/ask", label: "Ask" },
                { link: "/jobs", label: "Jobs" }
              ]}
            />
          </div>
          <div className={headerRight}>
            <MainNav links={[{ link: "/about", label: "About" }]} />
          </div>
        </div>
      </Container>
    </header>
  </Fragment>
);
