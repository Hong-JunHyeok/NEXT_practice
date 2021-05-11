import Layout from "../components/Layout";
import axios from "axios";

const SSRTest = ({ users }) => {
  const userList = users.map((user) => <li key={user.id}>{user.username}</li>);
  return (
    <Layout>
      <ul>{userList}</ul>
    </Layout>
  );
};

SSRTest.getInitialProps = async ({ req }) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users`
  );

  return { users: response.data };
};

export default SSRTest;
