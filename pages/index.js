import Link from "next/link";
import Header from "../components/Header";

const Index = () => (
  <div>
    <Header />
    <h1>안녕, Next.js</h1>
    <h2>
      <Link href="/about">
        <a style={{ background: "black", color: "white" }}>소개</a>
      </Link>
    </h2>
  </div>
);

export default Index;
