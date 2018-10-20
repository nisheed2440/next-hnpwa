import { css } from "emotion";

const footerCss = css`
  padding: 0.5em;
  font-size: 12px;
  text-align: center;
  border-top: 1px dashed #cccccc;
`;

export default () => (
  <footer className={footerCss}>
    <span>&copy; {new Date().getFullYear()} Nisheed Jagadish</span>
  </footer>
);
