import React, { Fragment } from "react";
import SearchForm from "../form/SearchForm";
import UserList from "../users/userList/UserList";

const Home = () => (
  <Fragment>
    <SearchForm />
    <UserList />
  </Fragment>
);

export default Home;
