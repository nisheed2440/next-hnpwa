import { withRouter } from "next/router";
import { cx } from "emotion";
class RouterLink extends React.Component {
  componentDidMount() {
    const { router, href } = this.props;
    router.prefetch(href);
  }

  handleClick = e => {
    const { router, href } = this.props;
    e.preventDefault();
    router.push(href);
  };

  render() {
    const {
      children,
      router,
      href,
      title,
      activeClass,
      inactiveClass,
      className,
      ...rest
    } = this.props;

    const linkClass = router.pathname === href ? activeClass : inactiveClass;

    return (
      <a
        href={href}
        title={title}
        onClick={this.handleClick}
        className={cx(className, linkClass)}
        {...rest}
      >
        {children}
      </a>
    );
  }
}

RouterLink.defaultProps = {
  activeClass: "",
  inactiveClass: ""
};

export default withRouter(RouterLink);
