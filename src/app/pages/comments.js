import { Component, Fragment } from "react";
import { withRouter } from "next/router";
import { inject, observer } from "mobx-react";
import Error from "./_error";
@inject("store")
@observer
class TopPage extends Component {
  static async getInitialProps({ query, req, mobxStore }) {
    await mobxStore.getCommentData(query, req);
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
          {JSON.stringify(store.commentsData)}
      </Fragment>
    );
  }
}

export default withRouter(TopPage);