import Link from "next/link";

const Header = () => {
  return (
    <header id="header" className="wrapper">
      <div id="header-inner" className="inner">
        <h1 id="logo-wrap">
          <a href="/" id="logo"></a>
        </h1>
        <nav id="main-nav">
          <Link href={{ pathname: "/posts/wp_note1" }}>
            <a className="main-nav-link">Wordpress</a>
          </Link>
          <Link href={{ pathname: "/posts/php_note1" }}>
            <a className="main-nav-link">PHP</a>
          </Link>
          <Link href={{ pathname: "/posts/aws_2" }}>
            <a className="main-nav-link">AWS</a>
          </Link>
          <Link href={{ pathname: "/posts/linux_centos" }}>
            <a className="main-nav-link">Linux</a>
          </Link>
          <Link href={{ pathname: "/posts/ts_electron" }}>
            <a className="main-nav-link">ts/js</a>
          </Link>
          <Link href={{ pathname: "/posts/mysql" }}>
            <a className="main-nav-link">mysql</a>
          </Link>
          <Link href={{ pathname: "/posts/rust" }}>
            <a className="main-nav-link">rust</a>
          </Link>
        </nav>
      </div>
      <style jsx>{`
        header {
          display: block;
        }
        #header {
          position: relative;
          padding: 10px 0;
        }
        #header-inner {
          display: -webkit-box;
          display: -moz-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: box;
          display: flex;
          -webkit-box-orient: horizontal;
          -moz-box-orient: horizontal;
          -webkit-box-lines: single;
          -moz-box-lines: single;
          -webkit-flex-flow: row nowrap;
          -ms-flex-flow: row nowrap;
          flex-flow: row nowrap;
          -webkit-box-align: center;
          -moz-box-align: center;
          -ms-flex-align: center;
          -webkit-align-items: center;
          align-items: center;
        }
        .wrapper {
          max-width: 1240px;
          margin: 0 auto;
        }
        #logo-wrap {
          -webkit-box-flex: 1;
          -moz-box-flex: 1;
          box-flex: 1;
          -webkit-flex: 0 50px;
          -ms-flex: 0 50px;
          flex: 0 50px;
        }
        #logo {
          text-indent: 101%;
          white-space: nowrap;
          overflow: hidden;
          width: 50px;
          height: 50px;
          -webkit-background-size: 50px 50px;
          -moz-background-size: 50px 50px;
          background-size: 50px 50px;
          display: block;
        }
        #main-nav {
          display: block;
          flex: 1 auto;
          padding-left: 20px;
        }
        .main-nav-link {
          color: #fff;
          text-decoration: none;
          line-height: 50px;
          opacity: 0.7;
          -webkit-transition: 0.2s;
          -moz-transition: 0.2s;
          -ms-transition: 0.2s;
          transition: 0.2s;
          font-family: Lato, "Helvetica Neue", Helvetica, Arial, sans-serif;
          display: inline-block;
          padding: 0 13px;
        }
        .inner,
        #article-toc-inner {
          padding: 0 20px;
        }
      `}</style>
    </header>
  );
};
export default Header;
