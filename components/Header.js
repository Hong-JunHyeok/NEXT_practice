import Link from "next/link";

const linkStyle = {
  marginRight: "1rem",
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>홈</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>소개</a>
    </Link>
    <Link href="/ssr-test">
      <a style={linkStyle}>SSR 테스트</a>
    </Link>
  </div>
);

export default Header;
