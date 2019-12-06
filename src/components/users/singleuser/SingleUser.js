import React, { useEffect, Fragment, useContext } from "react";
import { withRouter } from "react-router-dom";
import Repos from "../../repos/Repos";
import { Link } from "react-router-dom";
import Spinner from "../../layout/spinner/Spinner";
import GithubContext from "../../../context/github/GithubContext";
const SingleUser = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { getUser, loading, user, getUserRepo, repos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepo(match.params.login);
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    company,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable
  } = user;

  if (loading) return <Spinner />;
  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back to Search
      </Link>
      Hireable:{""}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img src={avatar_url} alt="avatar" style={{ width: "150px" }} />
          <h1>{name}</h1>
          <p>Location:{location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Visit Github Profile
          </a>
          <ul>
            {login && (
              <Fragment>
                <strong>Username:</strong>
                {login}
              </Fragment>
            )}
            {company && (
              <Fragment>
                <strong>Company:</strong>
                {company}
              </Fragment>
            )}
            {blog && (
              <Fragment>
                <strong>Website:</strong>
                {blog}
              </Fragment>
            )}
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers:{followers}</div>
        <div className="badge badge-success">Following:{following}</div>
        <div className="badge badge-white">Public Repos:{public_repos}</div>
        <div className="badge badge-dark">Public Gist:{public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

export default withRouter(SingleUser);
