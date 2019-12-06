import React, { useState, useContext } from "react";
import "./SearchForm.css";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";
const SearchForm = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const [text, setText] = useState("");

  const onChange = e => {
    setText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (text === "") {
      alertContext.setAlert("Please enter something", "light");
    } else {
      githubContext.searchUsers(text);
      setText("");
    }
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search Users ...."
          value={text}
          onChange={onChange}
        />
        <input type="submit" vaue="Search" className="btn btn-dark btn-block" />
        {githubContext.users.length > 0 && (
          <button
            className="btn btn-light btn-block"
            onClick={githubContext.clearUsers}
          >
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchForm;
