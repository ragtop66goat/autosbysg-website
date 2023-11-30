import React from 'react';
import {render, screen} from "@testing-library/react";
import {Carousel} from "../components/carousel/Carousel";
import {BrowserRouter} from "react-router-dom";
import {CurrentPageContext} from "../context/CurrentPage";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";


describe("Carousel Component Tests", () => {

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
  }));

  const setState = jest.fn();
  const useStateMock = (initState) => [initState, setState]

  it("should call setPage with '1' when 'Inventory' link is clicked", () => {

    const mockContext = {
      page: 0,
      setPage: jest.fn()
    };

    const mockData = [{name: "test"}, {name: "test2"}];

    jest.spyOn(React, 'useState').mockImplementation(useStateMock)


    render(<BrowserRouter>
      <CurrentPageContext.Provider value={mockContext}>
        <Carousel data={mockData}/>
      </CurrentPageContext.Provider>
    </BrowserRouter>);

    const rightArrow = screen.getByTestId('right-arrow')

    userEvent.click(rightArrow);

    expect(screen.getByText("Check out this weeks highlights")).toBeInTheDocument();
    expect(setState).toHaveBeenCalledTimes(1);
  });
});