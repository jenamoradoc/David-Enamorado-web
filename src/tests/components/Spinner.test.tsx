import { render, screen } from "@testing-library/react";

import { Spinner } from "../../components";

describe("Testing <Spinner /> component", () => {
  test("should show the spinner", () => {
    const { container } = render(<Spinner />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
