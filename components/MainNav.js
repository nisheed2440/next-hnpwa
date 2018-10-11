import { css } from "emotion";
import RouterLink from "./RouterLink";

const mainNavList = css`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const mainNavListItem = css`
  display: inline-block;
`;

const mainNavListItemLink = css`
  position: relative;
  display: block;
  color: #ffffff;
  text-decoration: none;
  padding: 1em 0.5em;
  font-size: 14px;
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    left: 0;
    bottom: 0;
    background-color: transparent;
  }
`;

const activeLink = css`
  &:after {
    background-color: #ffffff;
  }
`;

export default ({ links }) => (
  <nav>
    <ul className={mainNavList}>
      {links.map((linkObj, idx) => (
        <li key={idx} className={mainNavListItem}>
          <RouterLink
            href={linkObj.link}
            title={linkObj.label}
            className={mainNavListItemLink}
            activeClass={activeLink}
          >
            {linkObj.label}
          </RouterLink>
        </li>
      ))}
    </ul>
  </nav>
);
