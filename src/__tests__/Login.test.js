import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import { AuthProvider } from "../context/Auth";
import userEvent from "@testing-library/user-event";

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock Firebase
jest.mock("../config/firebase", () => ({
  auth: {
    currentUser: null,
  },
}));

jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback(null);
    return jest.fn();
  }),
}));

describe("Login Component", () => {
  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render login form", async () => {
    renderLogin();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /admin login/i }),
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /sign in/i }),
      ).toBeInTheDocument();
    });
  });

  it("should update email input on change", () => {
    renderLogin();

    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, "admin@test.com");

    expect(emailInput.value).toBe("admin@test.com");
  });

  it("should update password input on change", () => {
    renderLogin();

    const passwordInput = screen.getByLabelText(/password/i);
    userEvent.type(passwordInput, "password123");

    expect(passwordInput.value).toBe("password123");
  });

  it("should call login function on form submit", async () => {
    const { signInWithEmailAndPassword } = require("firebase/auth");
    signInWithEmailAndPassword.mockResolvedValue({
      user: { uid: "test-uid", email: "admin@sgautosales.com" },
    });

    renderLogin();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    userEvent.type(emailInput, "admin@sgautosales.com");
    userEvent.type(passwordInput, "password123");
    userEvent.click(submitButton);

    const loadingText = await screen.queryByText("Loading...");
    await waitFor(() => {
      expect(loadingText).toBeNull();
    });

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        "admin@sgautosales.com",
        "password123",
      );
    });
  });

  it("should navigate to /admin on successful login", async () => {
    const { signInWithEmailAndPassword } = require("firebase/auth");
    signInWithEmailAndPassword.mockResolvedValue({
      user: { uid: "test-uid", email: "admin@sgautosales.com" },
    });

    renderLogin();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    userEvent.type(emailInput, "admin@sgautosales.com");
    userEvent.type(passwordInput, "password123");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/admin");
    });
  });

  it("should display error message on login failure", async () => {
    const { signInWithEmailAndPassword } = require("firebase/auth");
    signInWithEmailAndPassword.mockRejectedValue({
      code: "auth/invalid-credential",
      message: "Invalid email or password",
    });

    renderLogin();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    userEvent.type(emailInput, "wrong@test.com");
    userEvent.type(passwordInput, "wrongpassword");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/invalid email or password/i),
      ).toBeInTheDocument();
    });
  });

  it("should disable submit button while loading", async () => {
    const { signInWithEmailAndPassword } = require("firebase/auth");
    signInWithEmailAndPassword.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000)),
    );

    renderLogin();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    userEvent.type(emailInput, "admin@test.com");
    userEvent.type(passwordInput, "password123");
    userEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
  });

  it("should show loading text while submitting", async () => {
    const { signInWithEmailAndPassword } = require("firebase/auth");
    signInWithEmailAndPassword.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000)),
    );

    renderLogin();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    userEvent.type(emailInput, "admin@test.com");
    userEvent.type(passwordInput, "password123");
    userEvent.click(submitButton);

    expect(screen.getByText(/signing in/i)).toBeInTheDocument();
  });
});
