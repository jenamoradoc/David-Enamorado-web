import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

describe("Testing <App />", () => {
  test("Should render the initial content", () => {
    const { container } = render(<App />);

    expect(container).toMatchSnapshot();
    expect(container).toBeInTheDocument();
  });

  test("should show aside container", () => {
    render(<App />);

    expect(screen.getByRole("complementary")).toBeInTheDocument();
  });

  test("should show the input field", () => {
    render(<App />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("should be empty the input field", () => {
    render(<App />);

    expect((screen.getByRole("textbox") as HTMLInputElement).value.trim()).toBe(
      ""
    );
  });

  test("should show a Submit button", () => {
    render(<App />);
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });

  test("should change the input value", async () => {
    render(<App />);

    userEvent.type(screen.getByRole("textbox"), "pedro");

    expect((screen.getByRole("textbox") as HTMLInputElement).value).toBe(
      "pedro"
    );
  });

  test("should show results when the input field is changed and the button is clicked", async () => {
    const { container } = render(<App />);

    userEvent.type(screen.getByRole("textbox"), "pedro");
    userEvent.click(screen.getByText(/submit/i));

    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByTestId("spinner"));

    await screen.findByRole("list");
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);

    expect(container).toMatchSnapshot();
  });

  test("should display the previous and next page buttons", async () => {
    render(<App />);

    userEvent.type(screen.getByRole("textbox"), "pedro");
    userEvent.click(screen.getByText(/submit/i));

    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    await waitFor(() => screen.findByRole("list"));
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);

    expect(screen.getByText("«")).toBeTruthy();
    expect(screen.getByText("»")).toBeTruthy();
  });

  test("should show the next results when the Next Page button is clicked", async () => {
    render(<App />);

    userEvent.type(screen.getByRole("textbox"), "pedro");
    userEvent.click(screen.getByText(/submit/i));

    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByTestId("spinner"));

    if (
      screen.getAllByRole("listitem").length === 0 &&
      screen.getByText(/something went wrong/i)
    ) {
      return;
    }

    await screen.findByRole("list");
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);

    userEvent.click(screen.getByText("»"));
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.queryByTestId("spinner"));

    await waitFor(() => screen.findByRole("list"));
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);
  });

  test("should show the no results page when there are no results in the search", async () => {
    render(<App />);

    userEvent.type(screen.getByRole("textbox"), "wejhifhejwfiwehfuewhuw");
    userEvent.click(screen.getByText(/submit/i));

    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByTestId("spinner"));

    expect(screen.getByText(/results not found/i)).toBeInTheDocument();
  });

  test("should clear the input element when the Clear Filter button is clicked", async () => {
    render(<App />);

    userEvent.type(screen.getByRole("textbox"), "pedro");
    userEvent.click(screen.getByText(/submit/i));

    userEvent.click(screen.getByText(/clear filter/i));

    expect((screen.getByRole("textbox") as HTMLInputElement).value.trim()).toBe(
      ""
    );
  });
});
