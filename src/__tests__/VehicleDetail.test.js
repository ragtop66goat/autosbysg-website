import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import VehicleDetail from "../pages/vehicle-detail/VehicleDetail";
import { InventoryContext } from "../context/Inventory";

const mockVehicle = {
  id: "test-vehicle-1",
  title: "2020 Honda Accord",
  price: "25,000",
  miles: "30,000",
  engine: "2.0L I-4",
  image: "/cars/honda-accord.jpg",
  images: ["/cars/honda-accord.jpg", "/cars/honda-accord-2.jpg"],
  options: ["Power Windows", "Bluetooth", "Backup Camera"],
};

const mockInventory = [mockVehicle];

const mockContextValue = {
  inventory: mockInventory,
  getInventoryData: jest.fn(),
};

const renderWithRouter = (
  component,
  { route = "/inventory/test-vehicle-1" } = {}
) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <InventoryContext.Provider value={mockContextValue}>
        <Routes>
          <Route path="/inventory/:id" element={component} />
        </Routes>
      </InventoryContext.Provider>
    </MemoryRouter>
  );
};

describe("VehicleDetail Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders vehicle detail page with correct information", async () => {
    renderWithRouter(<VehicleDetail />);

    await waitFor(() => {
      expect(screen.getAllByText("2020 Honda Accord")[0]).toBeInTheDocument();
      expect(screen.getByText("25,000")).toBeInTheDocument();
      expect(screen.getByText("30,000")).toBeInTheDocument();
      expect(screen.getByText("2.0L I-4")).toBeInTheDocument();
    });
  });

  test("displays breadcrumb navigation", async () => {
    renderWithRouter(<VehicleDetail />);

    await waitFor(() => {
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Inventory")).toBeInTheDocument();
      expect(screen.getAllByText("2020 Honda Accord").length).toBeGreaterThan(
        0
      );
    });
  });

  test("shows loading spinner when vehicle is not yet loaded", () => {
    const emptyContextValue = {
      inventory: [],
      getInventoryData: jest.fn(),
    };

    render(
      <MemoryRouter initialEntries={["/inventory/test-vehicle-1"]}>
        <InventoryContext.Provider value={emptyContextValue}>
          <Routes>
            <Route path="/inventory/:id" element={<VehicleDetail />} />
          </Routes>
        </InventoryContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("displays all vehicle features and options", async () => {
    renderWithRouter(<VehicleDetail />);

    await waitFor(() => {
      expect(screen.getByText("Power Windows")).toBeInTheDocument();
      expect(screen.getByText("Bluetooth")).toBeInTheDocument();
      expect(screen.getByText("Backup Camera")).toBeInTheDocument();
    });
  });

  test("displays contact form when button is clicked", async () => {
    renderWithRouter(<VehicleDetail />);

    await waitFor(() => {
      const contactButton = screen.getByText("Contact About This Vehicle");
      fireEvent.click(contactButton);
    });

    expect(screen.getByLabelText(/Name \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
  });

  test("hides contact form when hide button is clicked", async () => {
    renderWithRouter(<VehicleDetail />);

    await waitFor(() => {
      const contactButton = screen.getByText("Contact About This Vehicle");
      fireEvent.click(contactButton);
    });

    const hideButton = screen.getByText("Hide Contact Form");
    fireEvent.click(hideButton);

    expect(screen.queryByLabelText(/Name \*/i)).not.toBeInTheDocument();
  });

  test("handles contact form submission", async () => {
    window.alert = jest.fn();
    renderWithRouter(<VehicleDetail />);

    await waitFor(() => {
      const contactButton = screen.getByText("Contact About This Vehicle");
      fireEvent.click(contactButton);
    });

    const nameInput = screen.getByLabelText(/Name \*/i);
    const emailInput = screen.getByLabelText(/Email \*/i);
    const submitButton = screen.getByText("Send Message");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        expect.stringContaining("Thank you for your interest")
      );
    });
  });

  test("displays call button with correct phone number", async () => {
    renderWithRouter(<VehicleDetail />);

    await waitFor(() => {
      const callButton = screen.getByText(/Call Us:/i);
      expect(callButton.closest("a")).toHaveAttribute(
        "href",
        "tel:+12165353566"
      );
    });
  });

  test("displays back to inventory button", async () => {
    renderWithRouter(<VehicleDetail />);

    await waitFor(() => {
      expect(screen.getByText("Back to Inventory")).toBeInTheDocument();
    });
  });

  test("changes image when thumbnail is clicked", async () => {
    renderWithRouter(<VehicleDetail />);

    await waitFor(() => {
      const thumbnails = screen.getAllByAltText(/view/i);
      expect(thumbnails).toHaveLength(2);
    });

    const thumbnails = screen.getAllByAltText(/view/i);
    fireEvent.click(thumbnails[1]);

    await waitFor(() => {
      const images = screen.getAllByAltText("2020 Honda Accord");
      const mainImage = images.find((img) => !img.alt.includes("view"));
      expect(mainImage).toHaveAttribute("src", "/cars/honda-accord-2.jpg");
    });
  });

  test("calls getInventoryData when inventory is empty", () => {
    const emptyContextValue = {
      inventory: [],
      getInventoryData: jest.fn(),
    };

    render(
      <MemoryRouter initialEntries={["/inventory/test-vehicle-1"]}>
        <InventoryContext.Provider value={emptyContextValue}>
          <Routes>
            <Route path="/inventory/:id" element={<VehicleDetail />} />
          </Routes>
        </InventoryContext.Provider>
      </MemoryRouter>
    );

    expect(emptyContextValue.getInventoryData).toHaveBeenCalled();
  });

  test("displays company information section", async () => {
    renderWithRouter(<VehicleDetail />);

    await waitFor(() => {
      expect(screen.getByText("About S-G Auto Sales")).toBeInTheDocument();
      expect(
        screen.getByText(/family-owned and operated/i)
      ).toBeInTheDocument();
    });
  });

  test("updates form input values correctly", async () => {
    renderWithRouter(<VehicleDetail />);

    await waitFor(() => {
      const contactButton = screen.getByText("Contact About This Vehicle");
      fireEvent.click(contactButton);
    });

    const nameInput = screen.getByLabelText(/Name \*/i);
    const emailInput = screen.getByLabelText(/Email \*/i);
    const phoneInput = screen.getByLabelText(/Phone Number/i);
    const messageInput = screen.getByLabelText(/Message/i);

    fireEvent.change(nameInput, { target: { value: "Jane Smith" } });
    fireEvent.change(emailInput, { target: { value: "jane@example.com" } });
    fireEvent.change(phoneInput, { target: { value: "555-1234" } });
    fireEvent.change(messageInput, { target: { value: "Test message" } });

    expect(nameInput.value).toBe("Jane Smith");
    expect(emailInput.value).toBe("jane@example.com");
    expect(phoneInput.value).toBe("555-1234");
    expect(messageInput.value).toBe("Test message");
  });
});
