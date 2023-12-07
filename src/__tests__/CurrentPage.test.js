import React from 'react';
import {render, fireEvent, screen} from "@testing-library/react";
import {CurrentPageContext, CurrentPageProvider} from "../context/CurrentPage";
import '@testing-library/jest-dom/extend-expect';

describe("CurrentPage context tests", () => {
  it('should render without crashing', () => {
    render(
      <CurrentPageProvider>
        <div>Test</div>
      </CurrentPageProvider>
    );
  });

  it('should provide the correct context value', () => {

    render(
      <CurrentPageProvider>
        <CurrentPageContext.Consumer>
          {value => <div>{value.page}</div>}
        </CurrentPageContext.Consumer>
      </CurrentPageProvider>
    );

    const testContent = screen.getByText('0');
    expect(testContent).toBeInTheDocument();
  });

});