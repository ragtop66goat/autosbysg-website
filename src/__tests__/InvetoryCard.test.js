import {render, screen} from "@testing-library/react";
import InventoryCard from "../components/inventory card/InventoryCard";
import '@testing-library/jest-dom/extend-expect';

describe("InventoryCard component tests", () => {

  test("should render all values of the item passed to it", () => {
    const mockItem = {
      title: "car",
      price: "20",
      miles: "100",
      engine: "v-8",
      options:["windows", "wheels"]
    };

    render(<InventoryCard item={mockItem}/>);

    expect(screen.getByText("car")).toBeInTheDocument();
    expect(screen.getByAltText("car")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("v-8")).toBeInTheDocument();
    expect(screen.getByText("| windows")).toBeInTheDocument();
    expect(screen.getByText("| wheels")).toBeInTheDocument();

  })
})