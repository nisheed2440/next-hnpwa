import { Component, Fragment } from "react";
import { withRouter } from "next/router";
import Pagination from "../components/Pagination";
import DataWrapper from "../components/DataWrapper";
import { inject, observer } from "mobx-react";
import Head from "next/head";
import Error from "./_error";
@inject("store")
@observer
class ShowPage extends Component {
  static async getInitialProps({ query, req, mobxStore }) {
    await mobxStore.getPageData("show", query, req);
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
          <title>HN | Show</title>
          <meta name="description" content="Show Hacker News Data" />
        </Head>
        <Pagination pagination={store.paginationData} type={"show"} />
        <DataWrapper data={store.pageData} type={"show"} />
      </Fragment>
    );
  }
}

export default withRouter(ShowPage);
