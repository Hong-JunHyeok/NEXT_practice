import Layout from "../components/Layout";

const SSRTest = ({ from }) => {
  return <Layout>{from}에서 실행되었습니다.</Layout>;
};

SSRTest.getInitialProps = ({ req }) => {
  return req ? { from: "server" } : { from: "client" };
};

export default SSRTest;
