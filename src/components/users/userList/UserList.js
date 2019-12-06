import React, { useContext } from "react";

import User from "../user/User";
import "./UserList.css";
import GithubContext from "../../../context/github/GithubContext";
import Spinner from "../../layout/spinner/Spinner";

const UserList = () => {
  const githubContext = useContext(GithubContext);
  const { loading, users } = githubContext;
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="userList">
        {users.map(user => (
          <User key={user.id} {...user} />
        ))}
      </div>
    );
  }
};

export default UserList;
