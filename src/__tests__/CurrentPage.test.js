import { render, screen } from "@testing-library/react";
import {
  CurrentPageContext,
  CurrentPageProvider,
} from "../context/CurrentPage";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

describe("Current Page Context tests", () => {
  // Test if the component renders without crashing
  test("renders CurrentPageProvider without errors", () => {
    render(
      <CurrentPageProvider>
        <div>Test Content</div>
      </CurrentPageProvider>
    );
  });

  // Test if the context value is set correctly
  test("provides the correct context value", () => {
    render(
      <CurrentPageProvider>
        <CurrentPageContext.Consumer>
          {(value) => <div>{value.page}</div>}
        </CurrentPageContext.Consumer>
      </CurrentPageProvider>
    );

    const testContent = screen.getByText("0"); // Assuming the initial page is 0
    expect(testContent).toBeInTheDocument();
  });

  // Test if setPage function updates the context value
  test("setPage updates the context value", () => {
    render(
      <CurrentPageProvider>
        <CurrentPageContext.Consumer>
          {({ page, setPage }) => (
            <>
              <div data-testid="page">{page}</div>
              <button onClick={() => setPage(1)}>Update Page</button>
            </>
          )}
        </CurrentPageContext.Consumer>
      </CurrentPageProvider>
    );

    const updateButton = screen.getByText("Update Page");

    userEvent.click(updateButton);

    expect(screen.getByTestId("page").textContent).toBe("1");
  });
});
