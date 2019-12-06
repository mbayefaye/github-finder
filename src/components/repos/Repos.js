import React from "react";
import RepoItem from "./RepoItem";
const Repos = ({ repos }) => {
  return (
    <div className="repos">
      {repos.map(repo => (
        <RepoItem repo={repo} key={repo.id} />
      ))}
    </div>
  );
};

export default Repos;
