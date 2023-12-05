import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import Carousel from "../components/carousel/Carousel";
import {BrowserRouter, MemoryRouter} from "react-router-dom";
import {CurrentPageContext} from "../context/CurrentPage";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";


describe("Carousel Component Tests", () => {

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
  }));

  const setState = jest.fn();
  const useStateMock = (initState = 0) => [initState, setState];


  test("should call setPage with 1 when 'Inventory' link is clicked", async () => {
    const mockContext = {
      page: 0,
      setPage: jest.fn()
    };

    const mockData = [{name: "test"}];

    render(<MemoryRouter initialEntries={['/']}>
      <CurrentPageContext.Provider value={mockContext}>
        <Carousel data={mockData}/>
      </CurrentPageContext.Provider>
    </MemoryRouter>);

    fireEvent.click(screen.queryByTestId('inventory-link'));

    expect(mockContext.setPage).toHaveBeenCalledTimes(1);
    expect(mockContext.setPage).toHaveBeenCalledWith(1);

  });

  it("should call setSlide when Right Arrow link is clicked", () => {

    const mockContext = {
      page: 0,
      setPage: jest.fn()
    };

    const mockData = [{name: "test"}, {name: "test2"}];

    jest.spyOn(React, 'useState').mockImplementation(useStateMock);


    render(<MemoryRouter>
      <CurrentPageContext.Provider value={mockContext}>
        <Carousel data={mockData}/>
      </CurrentPageContext.Provider>
    </MemoryRouter>);

    const rightArrow = screen.getByTestId('right-arrow');

    userEvent.click(rightArrow);

    expect(screen.getByText("Check out this weeks highlights")).toBeInTheDocument();
    expect(setState).toHaveBeenCalledTimes(1);
  });

  it("should call setSlide when Left Arrow is clicked", () => {

    const mockContext = {
      page: 1,
      setPage: jest.fn()
    };

    const mockData = [{name: "test"}, {name: "test2"}];

    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    render(<BrowserRouter>
      <CurrentPageContext.Provider value={mockContext}>
        <Carousel data={mockData}/>
      </CurrentPageContext.Provider>
    </BrowserRouter>);

    const leftArrow = screen.getByTestId("left-arrow");

    userEvent.click(leftArrow);

    expect(setState).toHaveBeenCalledTimes(1);
  });

});