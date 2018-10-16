import { css } from "emotion";
import Link from "next/link";

const paginationCss = css`
  flex-shrink: 0;
  display: flex;
  width: 100%;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;
const linkWrapper = css`
  display: flex;
  flex: 1;
  &:first-child {
    justify-content: flex-start;
  }
  &:last-child {
    justify-content: flex-end;
  }

  a {
    padding: 15px 30px;
    text-decoration: none;
  }
`;
const pageOffset = css`
  padding: 15px;
  display: flex;
  justify-content: center;
`;
export default ({ pagination = {}, type = "" }) => (
  <nav className={paginationCss}>
    <div className={linkWrapper}>
      {pagination.prevPage && (
        <Link
          href={{
            pathname: `/${type}`,
            query: { pageId: pagination.prevPage }
          }}
        >
          <a>&lt; prev</a>
        </Link>
      )}
    </div>
    <div className={pageOffset}>Page {pagination.currPage}</div>
    <div className={linkWrapper}>
      {pagination.nextPage && (
        <Link
          href={{
            pathname: `/${type}`,
            query: { pageId: pagination.nextPage }
          }}
        >
          <a>more &gt;</a>
        </Link>
      )}
    </div>
  </nav>
);
