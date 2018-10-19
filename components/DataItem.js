import { Component } from "react";
import { css, cx } from "emotion";
import Link from "next/link";

const dataItemWrapper = css`
  display: flex;
  flex-direction: row;
  padding: 10px;
  background: #ffffff;
  margin-bottom: 2px;
  border-radius: 3px;
`;

const pointsWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  span {
    display: inline-block;
  }
`;

const pointsCountText = css`
  font-size: 18px;
  margin-bottom: 5px;
  min-width: 60px;
  text-align: center;
`;

const contentWrapper = css`
  padding: 10px;
  flex: 1;
`;
const itemTitle = css`
  font-weight: 500;
  @media screen and (min-width: 768px) {
    font-size: 18px;
  }
  a {
    text-decoration: none;
    color: #000;
  }
`;

const itemSubText = css`
  font-size: 16px;
  margin-top: 5px;
`;

const itemUser = css`
  display: inline-block;
  color: #1d1d1d;
  a {
    color: #1d1d1d;
    text-decoration: none;
    &:hover {
      color: #1d1d1d;
      text-decoration: underline;
    }
  }
`;

const timeAgo = css`
  display: none;
  @media screen and (min-width: 768px) {
    ${itemUser};
  }
`;

const hideSpacerMb = css`
  display: none;
  @media screen and (min-width: 768px) {
    display: inline-block;
  }
`;

const itemSpacer = css`
  display: inline-block;
  color: #1d1d1d;
  margin: 0 10px;
`;

class DataItem extends Component {
  getUrl = () => {
    const { type, data } = this.props;
    const hnLinksTypes = ["ask", "jobs"];
    if (hnLinksTypes.indexOf(type) > -1) {
      return `https://news.ycombinator.com/${data.url}`;
    }
    return data.url;
  };
  render() {
    const { data } = this.props;
    return (
      <div className={dataItemWrapper}>
        {data.type !== "job" && (
          <div className={pointsWrapper}>
            <span className={pointsCountText}>{data.points}</span>
          </div>
        )}
        <div className={contentWrapper}>
          <div className={itemTitle}>
            <a
              href={this.getUrl()}
              title={data.title}
              target={"_blank"}
              rel={"noopener"}
            >
              {data.title}
            </a>
          </div>
          <div className={itemSubText}>
            {data.type !== "job" && (
              <div className={itemUser}>
                by{" "}
                <Link href={`/user?itemId=${data.user}`}>
                  <a title={data.user}>{data.user}</a>
                </Link>
              </div>
            )}
            {data.type !== "job" && <div className={itemSpacer}>|</div>}
            <div className={timeAgo}>
              <span>{data.time_ago}</span>
            </div>
            <div className={cx(itemSpacer, hideSpacerMb)}>|</div>
            <div className={itemUser}>
              <Link href={`/comments?itemId=${data.id}`}>
                <a title={data.comments_count}>
                  comments {data.comments_count}
                </a>
              </Link>
            </div>
          </div>
          {/* <div>{JSON.stringify(data)}</div> */}
        </div>
      </div>
    );
  }
}

export default DataItem;
