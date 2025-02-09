import React, { useEffect, useRef, useState } from "react";
import User from "./user";

const GithubProfileFinder = () => {
  const [username, setUserName] = useState("");
  const [data, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const inputRef = useRef();

  async function fetchGithubUserData() {
    if (!username.trim()) {
      setErrorMessage("Please enter a valid username.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error(`User not found: ${username}`);
      }
      const responseData = await response.json();
      setUser(responseData);
    } catch (error) {
      setErrorMessage(error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit() {
    fetchGithubUserData();
  }
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg">
      <div className="flex gap-4 justify-center mb-6">
        <input
          className="px-4 py-2 border rounded-md text-lg focus:outline-none focus:ring-2"
          type="text"
          name="username"
          placeholder="Search Github Username"
          value={username}
          onChange={(event) => setUserName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSubmit();
          }}
          ref={inputRef}
        />
        <button
          className="px-4 py-2 bg-teal-400 text-black rounded-md cursor-pointer"
          type="button"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center">
          <p className="text-xl">Fetching {username} Github Profile...</p>
        </div>
      )}

      {errorMessage && (
        <div className="flex justify-center items-center">
          <p className="text-red-500 text-xl">{errorMessage}</p>
        </div>
      )}

      {!loading && !errorMessage && data && <User user={data} />}

      {!loading && !errorMessage && !data && (
        <div className="text-center">
          <p className="text-lg text-gray-500">
            Search for a user to see details
          </p>
        </div>
      )}
    </div>
  );
};

export default GithubProfileFinder;
