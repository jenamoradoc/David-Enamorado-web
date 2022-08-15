import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Search } from "../../components";
import { LoginResults } from "../../interfaces";

describe("Testing <Search />", () => {
  const changeLoading = jest.fn();
  const changeMessage = jest.fn();
  const getResults = jest.fn();
  const getLoginQuery = jest.fn();
  const loading: boolean = false;
  const message: string = "";
  const results: LoginResults[] = [];

  test("should show the initial screen", () => {
    const { container } = render(
      <Search
        changeLoading={changeLoading}
        changeMessage={changeMessage}
        getResults={getResults}
        usernameEntered={getLoginQuery}
        loading={loading}
        message={message}
        results={results}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test("should focus the input field", () => {
    render(
      <Search
        changeLoading={changeLoading}
        changeMessage={changeMessage}
        getResults={getResults}
        usernameEntered={getLoginQuery}
        loading={loading}
        message={message}
        results={results}
      />
    );

    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  test("should allow typing in the text field", () => {
    render(
      <Search
        changeLoading={changeLoading}
        changeMessage={changeMessage}
        getResults={getResults}
        usernameEntered={getLoginQuery}
        loading={loading}
        message={message}
        results={results}
      />
    );

    userEvent.type(screen.getByRole("textbox"), "pablo");
    userEvent.click(screen.getByText(/submit/i));
    expect((screen.getByRole("textbox") as HTMLInputElement).value).toBe(
      "pablo"
    );
  });
});
