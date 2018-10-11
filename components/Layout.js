import { css, injectGlobal } from "emotion";
import "./GlobalStyles";
import Head from "next/head";
import Header from "./Header";
import Container from "./Container";
import Footer from "./Footer";

injectGlobal`
  html, body{
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: #f3f3f4;
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
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

export default ({ title, children }) => (
  <div className={layoutWrapper}>
    <div className={layoutInner}>
      <Head>
        <title key="title">{title}</title>
      </Head>
      <Header title={title} />
      <Container className={containerCss}>
        <div className={containerInner}>{children}</div>
      </Container>
      <Container className={footerContainerCss}>
        <Footer />
      </Container>
    </div>
  </div>
);
