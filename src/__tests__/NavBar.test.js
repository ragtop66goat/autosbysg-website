import {screen, render, fireEvent} from '@testing-library/react';
import {BrowserRouter, MemoryRouter} from "react-router-dom";
import '@testing-library/jest-dom/extend-expect'; // for additional matchers
import {NavBarComponent} from "../components/navbar/NavBarComponent";
import {CurrentPageContext} from "../context/CurrentPage";

describe("NavBarComponent tests", () => {

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
  }));

  test("should render 'Home', 'About', and 'Inventory' links and Logo", () => {

    const mockContext = {
      page: 0,
      setPage: jest.fn()
    };

    render(<BrowserRouter>
      <CurrentPageContext.Provider value={mockContext}>
        <NavBarComponent/>
      </CurrentPageContext.Provider>
    </BrowserRouter>);

    expect(screen.getByTestId("home")).toBeInTheDocument();
    expect(screen.getByTestId("inventory")).toBeInTheDocument();
    expect(screen.getByTestId("about")).toBeInTheDocument();
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });

  test("'Home' link should have 'current' class when page context is 0", () => {

    const mockContext = {
      page: 0,
      setPage: jest.fn()
    };

    render(<BrowserRouter>
      <CurrentPageContext.Provider value={mockContext}>
        <NavBarComponent/>
      </CurrentPageContext.Provider>
    </BrowserRouter>);

    expect(screen.getByTestId("home")).toHaveClass("current");
    expect(screen.getByTestId("inventory")).not.toHaveClass("current");
    expect(screen.getByTestId("about")).not.toHaveClass("current");
  });

  test("'Inventory' link should have 'current' class when page context is 1", () => {

    const mockContext = {
      page: 1,
      setPage: jest.fn()
    };

    render(<BrowserRouter>
      <CurrentPageContext.Provider value={mockContext}>
        <NavBarComponent/>
      </CurrentPageContext.Provider>
    </BrowserRouter>);

    expect(screen.getByTestId("inventory")).toHaveClass("current");
    expect(screen.getByTestId("home")).not.toHaveClass("current");
    expect(screen.getByTestId("about")).not.toHaveClass("current");
  });

  test("'About' should have 'current' class when page context is 2", () => {

    const mockContext = {
      page: 2,
      setPage: jest.fn()
    };

    render(<BrowserRouter>
      <CurrentPageContext.Provider value={mockContext}>
        <NavBarComponent/>
      </CurrentPageContext.Provider>
    </BrowserRouter>);

    expect(screen.getByTestId("about")).toHaveClass("current");
    expect(screen.getByTestId("home")).not.toHaveClass("current");
    expect(screen.getByTestId("inventory")).not.toHaveClass("current");
  });

  test("should call 'setPage' with '0' when 'Home' link is clicked", () => {

    const mockContext = {
      page: 0,
      setPage: jest.fn()
    };

    render(<BrowserRouter>
      <CurrentPageContext.Provider value={mockContext}>
        <NavBarComponent/>
      </CurrentPageContext.Provider>
    </BrowserRouter>);

    fireEvent.click(screen.getByTestId("home"));

    expect(mockContext.setPage).toHaveBeenCalledWith(0);
  });

  test("should call 'setPage' with '1' when 'Inventory' link is clicked", () => {

    const mockContext = {
      page: 0,
      setPage: jest.fn()
    };

    render(<BrowserRouter>
      <CurrentPageContext.Provider value={mockContext}>
        <NavBarComponent/>
      </CurrentPageContext.Provider>
    </BrowserRouter>)

    fireEvent.click(screen.getByTestId("inventory"));

    expect(mockContext.setPage).toHaveBeenCalledWith(1);
  });

  test("should call 'setPage' with '2' when 'About' link is clicked", () => {

    const mockContext = {
      page: 0,
      setPage: jest.fn()
    };

    render(<BrowserRouter>
      <CurrentPageContext.Provider value={mockContext}>
        <NavBarComponent/>
      </CurrentPageContext.Provider>
    </BrowserRouter>)

    fireEvent.click(screen.getByTestId("about"));

    expect(mockContext.setPage).toHaveBeenCalledWith(2);
  });

  test("should navigate to '/home' when 'Home' link is clicked", () => {

    const mockContext = {
      page: 0,
      setPage: jest.fn()
    };

    render(<MemoryRouter initialEntries={['/']}>
      <CurrentPageContext.Provider value={mockContext}>
        <NavBarComponent/>
      </CurrentPageContext.Provider>
    </MemoryRouter>)

    fireEvent.click(screen.getByTestId("home"));
    expect(screen.getByTestId("home")).toHaveAttribute('href', '/')
  })

  test("should navigate to '/inventory' when 'Inventory' link is clicked", () => {

    const mockContext = {
      page: 0,
      setPage: jest.fn()
    };

    render(<MemoryRouter initialEntries={['/']}>
      <CurrentPageContext.Provider value={mockContext}>
        <NavBarComponent/>
      </CurrentPageContext.Provider>
    </MemoryRouter>)

    fireEvent.click(screen.getByTestId("inventory"));
    expect(screen.getByTestId("inventory")).toHaveAttribute('href', '/inventory');

  })

  test("should navigate to '/about' when 'About' link is clicked", () => {

    const mockContext = {
      page: 0,
      setPage: jest.fn()
    };

    render(<MemoryRouter initialEntries={['/']}>
      <CurrentPageContext.Provider value={mockContext}>
        <NavBarComponent/>
      </CurrentPageContext.Provider>
    </MemoryRouter>)

    fireEvent.click(screen.getByTestId("about"));
    expect(screen.getByTestId("about")).toHaveAttribute('href', '/about');
  })

});