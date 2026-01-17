import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import VehicleForm from "../components/VehicleForm";

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

describe("VehicleForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render form fields", () => {
    render(
      <BrowserRouter>
        <VehicleForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mileage/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/engine/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image url/i)).toBeInTheDocument();
  });

  it("should display 'Add Vehicle' heading when no initial data", () => {
    render(
      <BrowserRouter>
        <VehicleForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      </BrowserRouter>
    );

    expect(screen.getByRole("heading", { name: /add vehicle/i })).toBeInTheDocument();
  });

  it("should display 'Edit Vehicle' heading when initial data provided", () => {
    const initialData = {
      title: "2020 Honda Accord",
      price: "25000",
      miles: "30000",
      engine: "2.0L I-4",
      image: "/cars/honda.jpg",
    };

    render(
      <BrowserRouter>
        <VehicleForm
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          initialData={initialData}
        />
      </BrowserRouter>
    );

    expect(screen.getByRole("heading", { name: /edit vehicle/i })).toBeInTheDocument();
  });

  it("should populate form with initial data", () => {
    const initialData = {
      title: "2020 Honda Accord",
      price: "25000",
      miles: "30000",
      engine: "2.0L I-4",
      image: "/cars/honda.jpg",
    };

    render(
      <BrowserRouter>
        <VehicleForm
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          initialData={initialData}
        />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/title/i).value).toBe("2020 Honda Accord");
    expect(screen.getByLabelText(/price/i).value).toBe("25000");
    expect(screen.getByLabelText(/mileage/i).value).toBe("30000");
    expect(screen.getByLabelText(/engine/i).value).toBe("2.0L I-4");
  });

  it("should update form fields on input change", () => {
    render(
      <BrowserRouter>
        <VehicleForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      </BrowserRouter>
    );

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: "2021 Toyota Camry" } });

    expect(titleInput.value).toBe("2021 Toyota Camry");
  });

  it("should call onSubmit with form data", async () => {
    render(
      <BrowserRouter>
        <VehicleForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "2021 Toyota Camry" },
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "28000" },
    });
    fireEvent.change(screen.getByLabelText(/mileage/i), {
      target: { value: "15000" },
    });
    fireEvent.change(screen.getByLabelText(/engine/i), {
      target: { value: "2.5L I-4" },
    });

    const submitButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "2021 Toyota Camry",
          price: "28000",
          miles: "15000",
          engine: "2.5L I-4",
        })
      );
    });
  });

  it("should call onCancel when cancel button clicked", () => {
    render(
      <BrowserRouter>
        <VehicleForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      </BrowserRouter>
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("should require title field", async () => {
    render(
      <BrowserRouter>
        <VehicleForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(submitButton);

    const titleInput = screen.getByLabelText(/title/i);
    expect(titleInput).toBeRequired();
  });

  it("should show loading state during submission", async () => {
    const slowSubmit = jest.fn(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );

    render(
      <BrowserRouter>
        <VehicleForm onSubmit={slowSubmit} onCancel={mockOnCancel} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Test Vehicle" },
    });

    const submitButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/saving/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
});
