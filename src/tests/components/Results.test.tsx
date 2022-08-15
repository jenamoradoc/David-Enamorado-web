import { render, screen } from "@testing-library/react";

import { Results } from "../../components";
import { LoginResults } from "../../interfaces";

describe("Testing <Results />", () => {
  const changeLoading = jest.fn();
  const getResults = jest.fn();
  const changeMessage = jest.fn();
  const results: LoginResults[] = [];
  const queryLogin: string = "";

  test("should render the initial screen", () => {
    const { container } = render(
      <Results
        changeLoading={changeLoading}
        changeMessage={changeMessage}
        getResults={getResults}
        login={queryLogin}
        results={results}
      />
    );

    expect(container).toMatchSnapshot();
    expect(container).toBeInTheDocument();
  });

  test("should render a list of elements", () => {
    const resultsList: LoginResults[] = [
      {
        avatar_url: "pedro.jpg",
        login: "pedro",
        id: 1234,
        type: "User",
      },
      {
        avatar_url: "pedro123.jpg",
        login: "pedro123",
        id: 12344,
        type: "User",
      },
    ];

    const { container } = render(
      <Results
        changeLoading={changeLoading}
        changeMessage={changeMessage}
        getResults={getResults}
        login={queryLogin}
        results={resultsList}
      />
    );

    expect(container).toMatchSnapshot();
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);
  });
});
