import {screen, render, fireEvent} from '@testing-library/react';
import {BrowserRouter, MemoryRouter} from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';
import {CurrentPageContext} from "../context/CurrentPage";
import {Footer} from "../components/footer/Footer";

describe("Footer Tests", () => {

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
  }))

  test("should render 'Home', 'Inventory' and 'About' links, and 'LightLogo' and brand trademark", () => {

    const mockContext = {
      page: 0,
      setPage: jest.fn()
    };

    render(<BrowserRouter>
      <CurrentPageContext.Provider value={mockContext}>
        <Footer/>
      </CurrentPageContext.Provider>
    </BrowserRouter>)

    expect(screen.getByTestId("footer-home")).toBeInTheDocument();
    expect(screen.getByTestId("footer-inventory")).toBeInTheDocument();
    expect(screen.getByTestId("footer-about")).toBeInTheDocument();
    expect(screen.getByAltText("LightLogo")).toBeInTheDocument();
    expect(screen.getByTestId("brand-trademark")).toBeInTheDocument();
  })

  test("should navigate to '/' when 'Home' link is clicked", () => {

    const mockContext = {
      page: 0,
      setPage: jest.fn()
    };

    render(<MemoryRouter initialEntries={["/"]}>
      <CurrentPageContext.Provider value={mockContext}>
        <Footer/>
      </CurrentPageContext.Provider>
    </MemoryRouter>)

    fireEvent.click(screen.getByTestId("footer-home"));
    expect(screen.getByTestId("footer-home")).toHaveAttribute('href', '/');
  })

  test("should navigate to '/inventory' when 'Inventory' link is clicked", () => {

    const mockContext = {
      page: 0,
      setPage: jest.fn()
    };

    render(<MemoryRouter initialEntries={['/']}>
      <CurrentPageContext.Provider value={mockContext}>
        <Footer/>
      </CurrentPageContext.Provider>
    </MemoryRouter> )

    fireEvent.click(screen.getByTestId("footer-inventory"));
    expect(screen.getByTestId("footer-inventory")).toHaveAttribute('href', '/inventory');
  })

  test("should navigate to '/about' when 'About' link is clicked", () => {

    const mockContext = {
      page: 0,
      setPage: jest.fn()
    };

    render(<MemoryRouter initialEntries={['/']}>
      <CurrentPageContext.Provider value={mockContext}>
        <Footer/>
      </CurrentPageContext.Provider>
    </MemoryRouter> )

    fireEvent.click(screen.getByTestId("footer-about"));
    expect(screen.getByTestId("footer-about")).toHaveAttribute('href', '/about');
  })

  test("'Home' link should have 'footer-current' class when page context is 0", () => {

    const mockContext = {
      page: 0,
      setPage: jest.fn()
    };

    render(<BrowserRouter>
      <CurrentPageContext.Provider value={mockContext}>
        <Footer/>
      </CurrentPageContext.Provider>
    </BrowserRouter>)

    expect(screen.getByTestId("footer-home")).toHaveClass("footer-current");
  })

  test("'Inventory' link should have 'footer-current' class when page context is 1", () => {

    const mockContext = {
      page: 1,
      setPage: jest.fn()
    };

    render(<BrowserRouter>
      <CurrentPageContext.Provider value={mockContext}>
        <Footer/>
      </CurrentPageContext.Provider>
    </BrowserRouter>)

    expect(screen.getByTestId("footer-inventory")).toHaveClass("footer-current");
  })

  test("'About' link should have 'footer-current' class when page context is 2", () => {

    const mockContext = {
      page: 2,
      setPage: jest.fn()
    };

    render(<BrowserRouter>
      <CurrentPageContext.Provider value={mockContext}>
        <Footer/>
      </CurrentPageContext.Provider>
    </BrowserRouter>)

    expect(screen.getByTestId("footer-about")).toHaveClass("footer-current");
  })

  test("should call setPage with '0' when 'home' link is clicked", () => {

    const mockContext = {
      page: 0,
      setPage: jest.fn()
    };

    render(<MemoryRouter initialEntries={['/']}>
      <CurrentPageContext.Provider value={mockContext}>
        <Footer/>
      </CurrentPageContext.Provider>
    </MemoryRouter> )

    fireEvent.click(screen.getByTestId("footer-home"));
    expect(mockContext.setPage).toHaveBeenCalledWith(0);
  })

  test("should call setPage with '1' when 'inventory' link is clicked", () => {

    const mockContext = {
      page: 0,
      setPage: jest.fn()
    };

    render(<MemoryRouter initialEntries={['/']}>
      <CurrentPageContext.Provider value={mockContext}>
        <Footer/>
      </CurrentPageContext.Provider>
    </MemoryRouter> )

    fireEvent.click(screen.getByTestId("footer-inventory"));
    expect(mockContext.setPage).toHaveBeenCalledWith(1);
  })

  test("should call setPage with '2' when 'about' link is clicked", () => {

    const mockContext = {
      page: 0,
      setPage: jest.fn()
    };

    render(<MemoryRouter initialEntries={['/']}>
      <CurrentPageContext.Provider value={mockContext}>
        <Footer/>
      </CurrentPageContext.Provider>
    </MemoryRouter> )

    fireEvent.click(screen.getByTestId("footer-about"));
    expect(mockContext.setPage).toHaveBeenCalledWith(2);
  })

})