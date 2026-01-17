import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchFilterBar from "../components/search-filter-bar/SearchFilterBar";

describe("SearchFilterBar Component", () => {
  const mockOnFilterChange = jest.fn();
  const mockOnClearFilters = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render search input", () => {
    render(
      <SearchFilterBar
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it("should call onFilterChange when search input changes", () => {
    render(
      <SearchFilterBar
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: "Honda" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ searchTerm: "Honda" })
    );
  });

  it("should render price range inputs", () => {
    render(
      <SearchFilterBar
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    expect(screen.getByLabelText(/min price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/max price/i)).toBeInTheDocument();
  });

  it("should call onFilterChange when price range changes", () => {
    render(
      <SearchFilterBar
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    const minPriceInput = screen.getByLabelText(/min price/i);
    fireEvent.change(minPriceInput, { target: { value: "5000" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ minPrice: "5000" })
    );
  });

  it("should render mileage range inputs", () => {
    render(
      <SearchFilterBar
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    expect(screen.getByLabelText(/max mileage/i)).toBeInTheDocument();
  });

  it("should call onFilterChange when mileage changes", () => {
    render(
      <SearchFilterBar
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    const maxMileageInput = screen.getByLabelText(/max mileage/i);
    fireEvent.change(maxMileageInput, { target: { value: "100000" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ maxMileage: "100000" })
    );
  });

  it("should render clear filters button", () => {
    render(
      <SearchFilterBar
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    expect(screen.getByText(/clear filters/i)).toBeInTheDocument();
  });

  it("should call onClearFilters when clear button is clicked", () => {
    render(
      <SearchFilterBar
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
        filters={{ searchTerm: "Honda" }}
      />
    );

    const clearButton = screen.getByText(/clear filters/i);
    fireEvent.click(clearButton);

    expect(mockOnClearFilters).toHaveBeenCalled();
  });

  it("should reset inputs when filters are cleared", () => {
    const { rerender } = render(
      <SearchFilterBar
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
        filters={{ searchTerm: "Honda", minPrice: "5000" }}
      />
    );

    const searchInput = screen.getByPlaceholderText(/search/i);
    expect(searchInput.value).toBe("Honda");

    rerender(
      <SearchFilterBar
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
        filters={{ searchTerm: "", minPrice: "" }}
      />
    );

    expect(searchInput.value).toBe("");
  });
});
