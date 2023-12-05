import {render, screen} from "@testing-library/react";
import {InventoryContext} from "../context/Inventory";
import InventoryList from "../components/inventory card list/InventoryList";


const customRender = (ui, {providerProps, ...renderOptions}) => {
  return render(
    <InventoryContext.Provider value={{...providerProps}}>{ui}</InventoryContext.Provider>,
    renderOptions
  );
};

jest.mock('../components/inventory card/InventoryCard', () => {
  return () => <div>Item</div>;
});

describe("InventoryList Component tests", () => {

  test("InventoryList renders an inventory component for each item in data", () => {

    const providerProps = {
      inventory: [{id: 1, title: "test1"}, {id: 2, title: "test2"}],
      getInventoryData: jest.fn()
    };

    customRender(<InventoryList/>, {providerProps});

    expect(screen.getAllByText("Item")).toHaveLength(2);
  });

});

