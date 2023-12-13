import React from 'react';
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {InventoryContext, InventoryProvider} from "../context/Inventory";
import '@testing-library/jest-dom/extend-expect';

// mock firebase and its functions
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  getFirestore: jest.fn()
}));


describe('Inventory Context tests', () => {

  const mockContextValue = {
    inventory: [],
    getInventoryData: jest.fn()
  }

// mock child component
  const MockChild = () => {
    const {inventory, getInventoryData} = React.useContext(InventoryContext);

    return (
      <div>
        <span data-testid="inventory-length">{inventory.length}</span>
        <button onClick={getInventoryData} data-testid="get-inventory-data">Get Inventory Data</button>
      </div>
    )
  }


  test('renders InventoryProvider without errors', () => {
    render(
      <InventoryProvider>
        <MockChild/>
      </InventoryProvider>
    )
  })

  test('provides the correct context value', () => {
    render(
      <InventoryProvider>
        <InventoryContext.Consumer>
          {(value) => (
            <>
              <div data-testid="data-length">{value.inventory.length}</div>
              <button onClick={value.getInventoryData}>Get Data</button>
            </>
          )}
        </InventoryContext.Consumer>
      </InventoryProvider>
    )

    const length = screen.getByTestId("data-length");
    expect(length.textContent).toBe("0");
  })

})