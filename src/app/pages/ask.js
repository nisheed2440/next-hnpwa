import { Component, Fragment } from "react";
import { withRouter } from "next/router";
import Pagination from "../components/Pagination";
import DataWrapper from "../components/DataWrapper";
import { inject, observer } from "mobx-react";
import Head from "next/head";
import Error from "./_error";
@inject("store")
@observer
class AskPage extends Component {
  static async getInitialProps({ query, req, mobxStore }) {
    await mobxStore.getPageData("ask", query, req);
    return {
      store: mobxStore
    };
  }
  render() {
    const { store } = this.props;
    return store.hasError ? (
      <Error />
    ) : (
      <Fragment>
        <Head>
          <title>HN | Ask</title>
          <meta name="description" content="Ask Hacker News Data" />
        </Head>
        <Pagination pagination={store.paginationData} type={"ask"} />
        <DataWrapper data={store.pageData} type={"ask"} />
      </Fragment>
    );
  }
}

export default withRouter(AskPage);
