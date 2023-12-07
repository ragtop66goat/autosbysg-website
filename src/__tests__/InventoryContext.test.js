import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import {InventoryContext, InventoryProvider} from "../context/Inventory";
import '@testing-library/jest-dom/extend-expect';

describe('Inventory Context tests', () => {

  it('should render without crashing', () => {

    render(
      <InventoryProvider>
       <div>Test</div>
      </InventoryProvider>
    )
  })

  it('should render the correct inventory context', () => {
    render(
      <InventoryProvider>
        <InventoryContext.Consumer>
          {value => <div>{value.inventory.length}</div>}
        </InventoryContext.Consumer>
      </InventoryProvider>
    )

    const div = screen.getByText("0");
    expect(div).toBeInTheDocument();
  })

  it('should update inventoryData when setInventoryData is called', () => {

    render(
      <InventoryProvider>
        <InventoryContext.Consumer>
          {({inventory, setInventoryData}) => {

            return <>
              <div>{inventory[0]}</div>
              <button onClick={() => setInventoryData(["test"])}>Update</button>
            </>
          }}
        </InventoryContext.Consumer>
      </InventoryProvider>
    )

    const btn = screen.getByText("Update");
    fireEvent.click(btn);

    expect(screen.getByText("test")).toBeInTheDocument();
  })
})