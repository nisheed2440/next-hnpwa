import "isomorphic-unfetch";
import React from "react";
import App, { Container } from "next/app";
import Layout from "../components/Layout";
import withMobx from "../lib/WithMobx";
import { Provider } from "mobx-react";
class MyApp extends App {
  render() {
    const { Component, pageProps, mobxStore } = this.props;
    return (
      <Container>
        <Provider store={mobxStore}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default withMobx(MyApp);
