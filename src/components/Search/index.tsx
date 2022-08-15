import { FC, FormEvent, useState, useEffect } from "react";

import Spinner from "../Spinner";

import { LoginResults } from "../../interfaces";
import { getDataFn } from "../../utils";
import "./search.css";

interface Props {
  usernameEntered: (login: string) => void;
  getResults: (data: LoginResults[]) => void;
  changeLoading: (state: boolean) => void;
  loading: boolean;
  results: LoginResults[];
  changeMessage: (message: string) => void;
  message: string;
}

const Search: FC<Props> = ({
  usernameEntered,
  getResults,
  loading,
  changeLoading,
  results,
  changeMessage,
  message,
}) => {
  const [login, setLogin] = useState<string>("");

  useEffect(() => {
    if (results.length > 0) {
      getResults(results);
    }

    // eslint-disable-next-line
  }, [results]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (login.trim().length === 0) return;

    usernameEntered(login);
    getDataFn({
      login,
      setLoading: changeLoading,
      getResults,
      setMessage: changeMessage,
    });
  };

  const handleClearFilter = () => {
    if (login.trim().length > 0) {
      setLogin("");
      usernameEntered("");
      getResults([]);
    }
  };

  return (
    <>
      <aside className="search__form-container">
        <form onSubmit={handleSubmit} className="search__form">
          <h1 className="search__form-title">Search github user(s)</h1>
          <input
            type="text"
            value={login}
            autoFocus
            onChange={({ target }) => setLogin(target.value)}
            className="search__form-input"
          />

          <div className="search__form-btns__container">
            <button type="submit" className="search__form-btn">
              Submit
            </button>

            <button className="search__form-btn" onClick={handleClearFilter}>
              Clear Filter
            </button>
          </div>

          {message.trim().length > 0 && (
            <p className="error__message">{message}</p>
          )}
        </form>
      </aside>
      {loading && <Spinner />}
    </>
  );
};

export default Search;
