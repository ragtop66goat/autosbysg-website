import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import InventoryCard from "../components/inventory card/InventoryCard";
import "@testing-library/jest-dom/extend-expect";

describe("InventoryCard component tests", () => {
  test("should render all values of the item passed to it", () => {
    const mockItem = {
      id: "test-id",
      title: "car",
      price: "20",
      miles: "100",
      engine: "v-8",
      options: ["windows", "wheels"],
    };

    render(
      <BrowserRouter>
        <InventoryCard item={mockItem} />
      </BrowserRouter>
    );

    expect(screen.getByText("car")).toBeInTheDocument();
    expect(screen.getByAltText("car")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("v-8")).toBeInTheDocument();
    expect(screen.getByText("| windows")).toBeInTheDocument();
    expect(screen.getByText("| wheels")).toBeInTheDocument();
  });
});
