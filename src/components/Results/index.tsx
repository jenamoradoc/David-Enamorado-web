import { FC, useEffect, useState } from "react";

import { LoginResults } from "../../interfaces";
import { getDataFn } from "../../utils";
import team from "../../assets/team.svg";
import "./results.css";

interface Props {
  login: string;
  results: LoginResults[];
  getResults: (data: LoginResults[]) => void;
  changeLoading: (state: boolean) => void;
  changeMessage: (message: string) => void;
}

interface SelectOption {
  value: string;
  text: string;
}

const Results: FC<Props> = ({
  login,
  results,
  getResults,
  changeLoading,
  changeMessage,
}) => {
  const [page, setPage] = useState<number>(1);

  console.log(results);

  const options: SelectOption[] = [
    { value: "best match", text: "Best Match" },
    { value: "followers", text: "Followers" },
    { value: "repositories", text: "Repositories" },
    { value: "joined", text: "Joined" },
  ];

  const [selected, setSelected] = useState(options[0].value);

  useEffect(() => {
    if (page > 1 && selected.trim() !== "") {
      getDataFn({
        login,
        page,
        setLoading: changeLoading,
        getResults,
        setMessage: changeMessage,
        sort: selected,
      });
    } else if (page === 1 && login.trim() !== "" && selected.trim() !== "") {
      getDataFn({
        login,
        setLoading: changeLoading,
        getResults,
        setMessage: changeMessage,
        sort: selected,
      });
    }

    // eslint-disable-next-line
  }, [page, selected]);

  const pages: number[] =
    results.length === 9 ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [1];

  return (
    <div>
      {results.length > 0 ? (
        <>
          <select
            className="results__sort"
            value={selected}
            onChange={({ target }) => setSelected(target.value)}
          >
            <option value="" disabled>
              --Choose an option
            </option>
            {options.map(({ value, text }) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
          </select>
          <ul className="results__list">
            {results.map(({ id, login, avatar_url, type }) => (
              <li key={id} className="results__list-item">
                <img
                  src={avatar_url}
                  alt={login}
                  className="results__list-item-image"
                  draggable={false}
                />
                <strong className="results__list-item-login">{login}</strong>
                <span className="results__list-item-type">{type}</span>
              </li>
            ))}
          </ul>
          <div className="buttons__container">
            <button
              onClick={() => setPage((page) => page - 1)}
              disabled={page <= 1}
              style={{ borderRadius: "5px 0 0 5px" }}
            >
              &laquo;
            </button>
            {pages.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                disabled={page === pageNumber}
                data-testid={pageNumber}
              >
                {pageNumber}
              </button>
            ))}
            <button
              onClick={() => setPage((page) => page + 1)}
              disabled={page === pages.length}
              style={{ borderRadius: "0 5px 5px 0" }}
            >
              &raquo;
            </button>
          </div>
        </>
      ) : (
        <div className="results__message">
          {login.trim().length === 0 ? (
            <>
              <h2>GitHub User Search App</h2>
              <img src={team} alt="Team" draggable={false} />
            </>
          ) : results.length === 0 ? (
            <>
              <h2>Results not found!</h2>
              <img src={team} alt="Team" draggable={false} />
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Results;
