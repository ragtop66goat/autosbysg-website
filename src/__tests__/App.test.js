import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

jest.mock('../components/navbar/NavBarComponent', () => {
  return () => <div>NavBar</div>;
});

jest.mock('../components/footer/Footer', () => {
  return () => <div>Footer</div>;
});

jest.mock('../pages/home/Home', () => {
  return () => <div>Home</div>;
});

describe("App Component Tests", () => {

  it("should render Hero, NavBar, and Footer components", () => {

    render(<App/>);

    expect(screen.getByText("NavBar")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

});

