import {screen, render} from "@testing-library/react";
import Home from "../pages/home/Home";
import '@testing-library/jest-dom/extend-expect';

jest.mock('../components/hero/Hero', () => {
  return () => <div>Hero</div>
})

jest.mock('../components/carousel/Carousel', () => {
  return () => <div>Carousel</div>
})

describe("Home Page Tests", () => {

  it("renders the Hero and Carousel components", () => {

    render(<Home/>)

    expect(screen.getByText("Hero")).toBeInTheDocument();
  })
})