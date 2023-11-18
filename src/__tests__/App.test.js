import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

describe("App Component Tests", () => {

  test("should render Hero, NavBar, and Footer components", () => {

    render(<App />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("hero")).toBeInTheDocument();
  });

})

