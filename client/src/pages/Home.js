// Node Modules
import React from "react";
import { useQuery } from "@apollo/client";
// Utilities
import Auth from "../utils/auth";
import { QUERY_USERS } from "../utils/queries";
// Components
import Match2Game from "../components/Match2Game";

const Home = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];

  const renderUserList = () => {
    if (loading) {
      return <h2>Loading...</h2>;
    } else {
      // return <UserList users={users} title="List of Users" />
      return <Match2Game />;
    }
  };

  const renderUsername = () => {
    if (!Auth.loggedIn()) return null;
    // console.log("USER STUFF HERE ", Auth.getProfile().data);
    return Auth.getProfile().data.username;
  };

  return (
    <main>
      <div>
        <Match2Game />
      </div>
    </main>
  );
};

export default Home;
