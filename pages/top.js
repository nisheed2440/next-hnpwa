import { Component, Fragment } from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import Pagination from "../components/Pagination";

class TopPage extends Component {
  static async getInitialProps({ query, req }) {
    const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
    const page = query.pageId || 1;
    const res = await fetch(`${baseUrl}/api/top/${page}`);
    const json = res.json();
    return json;
  }
  render() {
    const { pagination, data } = this.props;
    return (
      <Fragment>
        <Pagination pagination={pagination} type={"top"} />
        <div>
          {/* {JSON.stringify(pagination)} */}
          {JSON.stringify(data)}
        </div>
      </Fragment>
    );
  }
}

export default withRouter(TopPage);
