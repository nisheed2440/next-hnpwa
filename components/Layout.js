import { css, injectGlobal } from "emotion";
import "./GlobalStyles";
import Header from "./Header";
import Container from "./Container";
import Footer from "./Footer";
import { Loader } from "./Loader";

injectGlobal`
  html, body{
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: #f2f3f5;
  }
`;

const layoutWrapper = css`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const layoutInner = css`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  height: 100%;
`;

const containerCss = css`
  flex: 1;
  width: 100%;
`;

const footerContainerCss = css`
  width: 100%;
`;

const containerInner = css`
  overflow-y: hidden;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default ({ children }) => (
  <div className={layoutWrapper}>
    <div className={layoutInner}>
      <Header />
      <Container className={containerCss}>
        <div className={containerInner}>{children}</div>
        <Loader></Loader>
      </Container>
      <Container className={footerContainerCss}>
        <Footer />
      </Container>
    </div>
  </div>
);
