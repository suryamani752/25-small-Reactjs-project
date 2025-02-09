import React from "react";

const User = ({ user }) => {
  const { avatar_url, followers, following, public_repos, login, created_at } =
    user;
  const createdDate = new Date(created_at);

  return (
    <div className="p-4 border rounded-lg">
      <div>
        <img
          className="h-36 w-36 rounded-full object-cover mx-auto"
          src={avatar_url}
          alt={login}
        />
      </div>
      <div className="flex flex-col items-center mt-5">
        <a
          className="text-xl font-semibold text-teal-600"
          href={`https://github.com/${login}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {login}
        </a>
        <p className="text-lg">
          User joined on{" "}
          {`${createdDate.getDate()} ${createdDate.toLocaleDateString("en-us", {
            month: "short",
          })} ${createdDate.getFullYear()}`}
        </p>
      </div>
      <div className="flex justify-center gap-10 mt-6 text-lg font-semibold">
        <div>
          <p>Public Repos: {public_repos}</p>
        </div>
        <div>
          <p>Followers: {followers}</p>
        </div>
        <div>
          <p>Following: {following}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
