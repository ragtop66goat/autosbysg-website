import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import AdminInventory from "../pages/admin/AdminInventory";
import { InventoryContext } from "../context/Inventory";
import "@testing-library/jest-dom/extend-expect";

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../config/firebase", () => ({
  auth: {},
  db: {},
  storage: {},
}));

describe("AdminInventory Component", () => {
  const mockInventory = [
    {
      id: "1",
      title: "2020 Honda Accord",
      price: "25,000",
      miles: "30,000",
      engine: "2.0L I-4",
      image: "/cars/accord.jpg",
      options: ["Power Windows", "Bluetooth"],
    },
    {
      id: "2",
      title: "2019 Toyota Camry",
      price: "22,000",
      miles: "45,000",
      engine: "2.5L I-4",
      image: "/cars/camry.jpg",
      options: ["Backup Camera", "Cruise Control"],
    },
  ];

  const mockGetInventoryData = jest.fn();
  const mockDeleteVehicle = jest.fn();

  const mockContextValue = {
    inventory: mockInventory,
    getInventoryData: mockGetInventoryData,
    deleteVehicle: mockDeleteVehicle,
  };

  const renderWithContext = (contextValue = mockContextValue) => {
    return render(
      <BrowserRouter>
        <InventoryContext.Provider value={contextValue}>
          <AdminInventory />
        </InventoryContext.Provider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders AdminInventory page with heading", () => {
    renderWithContext();
    expect(screen.getByText("Manage Inventory")).toBeInTheDocument();
  });

  test("renders Add Vehicle button", () => {
    renderWithContext();
    const addButton = screen.getByText("Add Vehicle");
    expect(addButton).toBeInTheDocument();
  });

  test("calls getInventoryData on mount", () => {
    renderWithContext();
    expect(mockGetInventoryData).toHaveBeenCalledTimes(1);
  });

  test("displays all vehicles in table", () => {
    renderWithContext();
    expect(screen.getByText("2020 Honda Accord")).toBeInTheDocument();
    expect(screen.getByText("2019 Toyota Camry")).toBeInTheDocument();
  });

  test("displays vehicle details in table", () => {
    renderWithContext();
    expect(screen.getByText("$25,000")).toBeInTheDocument();
    expect(screen.getByText("30,000 miles")).toBeInTheDocument();
  });

  test("renders Edit buttons for each vehicle", () => {
    renderWithContext();
    const editButtons = screen.getAllByText("Edit");
    expect(editButtons).toHaveLength(2);
  });

  test("renders Delete buttons for each vehicle", () => {
    renderWithContext();
    const deleteButtons = screen.getAllByText("Delete");
    expect(deleteButtons).toHaveLength(2);
  });

  test("navigates to add vehicle page when Add Vehicle clicked", () => {
    renderWithContext();
    const addButton = screen.getByText("Add Vehicle");
    userEvent.click(addButton);
    expect(mockNavigate).toHaveBeenCalledWith("/admin/vehicles/add");
  });

  test("navigates to edit page when Edit button clicked", () => {
    renderWithContext();
    const editButtons = screen.getAllByText("Edit");
    userEvent.click(editButtons[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/admin/vehicles/1/edit");
  });

  test("shows confirmation dialog when Delete clicked", () => {
    global.confirm = jest.fn(() => false);
    renderWithContext();
    const deleteButtons = screen.getAllByText("Delete");
    userEvent.click(deleteButtons[0]);
    expect(global.confirm).toHaveBeenCalledWith(
      "Are you sure you want to delete this vehicle?"
    );
  });

  test("calls deleteVehicle when deletion confirmed", async () => {
    global.confirm = jest.fn(() => true);
    mockDeleteVehicle.mockResolvedValue();
    renderWithContext();
    const deleteButtons = screen.getAllByText("Delete");

    await act(async () => {
      userEvent.click(deleteButtons[0]);
      // Wait for the async handler to complete
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    await waitFor(() => {
      expect(mockDeleteVehicle).toHaveBeenCalledWith("1");
    });

    // Wait for the finally block to complete (setDeletingId(null))
    await waitFor(() => {
      expect(screen.queryByText("Deleting...")).not.toBeInTheDocument();
    });
  });

  test("does not call deleteVehicle when deletion cancelled", () => {
    global.confirm = jest.fn(() => false);
    renderWithContext();
    const deleteButtons = screen.getAllByText("Delete");
    userEvent.click(deleteButtons[0]);
    expect(mockDeleteVehicle).not.toHaveBeenCalled();
  });

  test("displays empty state when no vehicles", () => {
    const emptyContextValue = {
      ...mockContextValue,
      inventory: [],
    };
    renderWithContext(emptyContextValue);
    expect(screen.getByText("No vehicles in inventory")).toBeInTheDocument();
  });

  test("shows loading state during delete operation", async () => {
    global.confirm = jest.fn(() => true);
    mockDeleteVehicle.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    renderWithContext();
    const deleteButtons = screen.getAllByText("Delete");

    // Click to trigger delete
    await act(async () => {
      userEvent.click(deleteButtons[0]);
      // Give React time to process the click
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Check for loading state
    await waitFor(() => {
      expect(screen.getByText("Deleting...")).toBeInTheDocument();
    });

    // Wait for the delete operation and finally block to complete
    await waitFor(() => {
      expect(screen.queryByText("Deleting...")).not.toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test("displays vehicle thumbnail image", () => {
    renderWithContext();
    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("src", "/cars/accord.jpg");
    expect(images[1]).toHaveAttribute("src", "/cars/camry.jpg");
  });
});
