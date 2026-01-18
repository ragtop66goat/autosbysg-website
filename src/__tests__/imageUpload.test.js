import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageUpload from "../components/ImageUpload";
import "@testing-library/jest-dom/extend-expect";

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => "mock-object-url");
global.URL.revokeObjectURL = jest.fn();

describe("ImageUpload Component", () => {
  const mockOnImageSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders ImageUpload component", () => {
    render(<ImageUpload onImageSelect={mockOnImageSelect} />);
    expect(screen.getByText("Vehicle Image")).toBeInTheDocument();
    expect(screen.getByText("Choose Image")).toBeInTheDocument();
  });

  test("displays required asterisk", () => {
    render(<ImageUpload onImageSelect={mockOnImageSelect} />);
    const label = screen.getByText("Vehicle Image");
    expect(label.querySelector(".required")).toBeInTheDocument();
  });

  test("shows current image when provided", () => {
    const currentUrl = "https://example.com/image.jpg";
    render(
      <ImageUpload
        onImageSelect={mockOnImageSelect}
        currentImageUrl={currentUrl}
      />
    );

    const img = screen.getByAltText("Vehicle preview");
    expect(img).toHaveAttribute("src", currentUrl);
  });

  test("shows 'Change Image' button when image exists", () => {
    const currentUrl = "https://example.com/image.jpg";
    render(
      <ImageUpload
        onImageSelect={mockOnImageSelect}
        currentImageUrl={currentUrl}
      />
    );

    expect(screen.getByText("Change Image")).toBeInTheDocument();
  });

  test("shows 'Choose Image' button when no image exists", () => {
    render(<ImageUpload onImageSelect={mockOnImageSelect} />);
    expect(screen.getByText("Choose Image")).toBeInTheDocument();
  });

  test("calls onImageSelect with file when valid image selected", () => {
    render(<ImageUpload onImageSelect={mockOnImageSelect} />);

    const file = new File(["dummy content"], "test.jpg", {
      type: "image/jpeg",
    });
    const input = screen.getByLabelText("Choose Image");

    fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnImageSelect).toHaveBeenCalledWith(file);
    expect(URL.createObjectURL).toHaveBeenCalledWith(file);
  });

  test("shows error for invalid file type", () => {
    render(<ImageUpload onImageSelect={mockOnImageSelect} />);

    const file = new File(["dummy content"], "test.pdf", {
      type: "application/pdf",
    });
    const input = screen.getByLabelText("Choose Image");

    fireEvent.change(input, { target: { files: [file] } });

    expect(
      screen.getByText("Invalid file type. Please upload a JPG, PNG, or WebP image.")
    ).toBeInTheDocument();
    expect(mockOnImageSelect).toHaveBeenCalledWith(null);
  });

  test("shows error for file too large", () => {
    render(<ImageUpload onImageSelect={mockOnImageSelect} />);

    const largeContent = new Array(6 * 1024 * 1024).join("a");
    const file = new File([largeContent], "test.jpg", {
      type: "image/jpeg",
    });
    const input = screen.getByLabelText("Choose Image");

    fireEvent.change(input, { target: { files: [file] } });

    expect(
      screen.getByText("File size too large. Please upload an image smaller than 5MB.")
    ).toBeInTheDocument();
    expect(mockOnImageSelect).toHaveBeenCalledWith(null);
  });

  test("renders Remove button when image is present", () => {
    const currentUrl = "https://example.com/image.jpg";
    render(
      <ImageUpload
        onImageSelect={mockOnImageSelect}
        currentImageUrl={currentUrl}
      />
    );

    expect(screen.getByText("Remove")).toBeInTheDocument();
  });

  test("calls onImageSelect with null when Remove clicked", () => {
    const currentUrl = "https://example.com/image.jpg";
    render(
      <ImageUpload
        onImageSelect={mockOnImageSelect}
        currentImageUrl={currentUrl}
      />
    );

    const removeButton = screen.getByText("Remove");
    fireEvent.click(removeButton);

    expect(mockOnImageSelect).toHaveBeenCalledWith(null);
  });

  test("does not render file input when disabled prop is true", () => {
    render(<ImageUpload onImageSelect={mockOnImageSelect} disabled={true} />);

    const input = document.getElementById("vehicle-image-input");
    expect(input).not.toBeInTheDocument();
  });

  test("does not show Remove button when disabled", () => {
    const currentUrl = "https://example.com/image.jpg";
    render(
      <ImageUpload
        onImageSelect={mockOnImageSelect}
        currentImageUrl={currentUrl}
        disabled={true}
      />
    );

    expect(screen.queryByText("Remove")).not.toBeInTheDocument();
  });

  test("accepts only valid image types", () => {
    render(<ImageUpload onImageSelect={mockOnImageSelect} />);

    const input = document.getElementById("vehicle-image-input");
    expect(input).toHaveAttribute(
      "accept",
      "image/jpeg,image/jpg,image/png,image/webp"
    );
  });

  test("displays helper text about file requirements", () => {
    render(<ImageUpload onImageSelect={mockOnImageSelect} />);

    expect(
      screen.getByText("Upload a JPG, PNG, or WebP image (max 5MB)")
    ).toBeInTheDocument();
  });
});
