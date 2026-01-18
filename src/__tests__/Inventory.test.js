import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Inventory from "../pages/inventory/Inventory";

jest.mock("../components/inventory card list/InventoryList", () => {
  return () => <div>InventoryList</div>;
});

jest.mock("../config/firebase", () => ({
  auth: {},
  db: {},
  storage: {},
}));

describe("Inventory Page Tests", () => {
  it("should render the InventoryList component", () => {
    render(<Inventory />);

    expect(screen.getByText("InventoryList")).toBeInTheDocument();
  });
});
