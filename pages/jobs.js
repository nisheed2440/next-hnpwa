import { Component, Fragment } from "react";
import { withRouter } from "next/router";
import Pagination from "../components/Pagination";
import DataWrapper from "../components/DataWrapper";
import { inject, observer } from "mobx-react";
import Error from "./_error";
@inject("store")
@observer
class JobsPage extends Component {
  static async getInitialProps({ query, req, mobxStore }) {
    await mobxStore.getPageData("jobs", query, req);
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
        <Pagination pagination={store.paginationData} type={"jobs"} />
        <DataWrapper data={store.pageData} type={"jobs"}/>
      </Fragment>
    );
  }
}

export default withRouter(JobsPage);
