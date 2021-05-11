import Layout from "../components/Layout";
import axios from "axios";
import styled from "styled-components";

const SSRTest = ({ users }) => {
  const userList = users.map((user) => (
    <UserItem key={user.id}>{user.username}</UserItem>
  ));
  return (
    <Layout>
      <UserList>{userList}</UserList>
    </Layout>
  );
};

SSRTest.getInitialProps = async ({ req }) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users`
  );

  return { users: response.data };
};

const UserList = styled.ul`
  list-style: none;
`;

const UserItem = styled.li`
  border: 1px solid lightgray;
  padding: 20px;
`;

export default SSRTest;
