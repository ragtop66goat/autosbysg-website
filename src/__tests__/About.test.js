import {screen, render} from "@testing-library/react";
import About from '../pages/about/About';
import '@testing-library/jest-dom/extend-expect';

describe("About Page tests", () => {

  it("should render 'About Us', summary1, summary2", () => {

    render(<About/>);

    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByTestId("summary1")).toBeInTheDocument();
    expect(screen.getByTestId("summary2")).toBeInTheDocument();
    expect(screen.getByTestId("summary3")).toBeInTheDocument();

  })
})