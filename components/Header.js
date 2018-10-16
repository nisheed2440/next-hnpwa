import { css } from "emotion";
import Container from "./Container";
import HNLogo from "./HNLogo";
import MainNav from "./MainNav";

const headerWrapper = css`
  padding: 0 16px;
  background-color: #00d1b2;
  color: #ffffff;
  box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12);
  z-index: 1;
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

export default () => (
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
);
