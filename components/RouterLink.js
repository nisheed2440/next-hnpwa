import { withRouter } from "next/router";
import { cx } from "emotion";
const ActiveLink = ({
  children,
  router,
  href,
  title,
  activeClass,
  inactiveClass,
  className,
  ...rest
}) => {
  const linkClass = router.pathname === href ? activeClass : inactiveClass;

  const handleClick = e => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a
      href={href}
      title={title}
      onClick={handleClick}
      className={cx(className, linkClass)}
      {...rest}
    >
      {children}
    </a>
  );
};

ActiveLink.defaultProps = {
  activeClass: "",
  inactiveClass: ""
};

export default withRouter(ActiveLink);
