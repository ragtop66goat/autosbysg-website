import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../context/Auth";

// Mock Firebase
jest.mock("../config/firebase", () => ({
  auth: {
    currentUser: null,
  },
}));

const mockOnAuthStateChanged = jest.fn();
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: (...args) => mockOnAuthStateChanged(...args),
}));

describe("ProtectedRoute Component", () => {
  const TestAdminComponent = () => <div>Admin Dashboard</div>;

  const renderProtectedRoute = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<div>Login Page</div>} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <TestAdminComponent />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    window.history.pushState({}, "Admin Page", "/admin");
  });

  it("should show loading spinner while checking auth", () => {
    mockOnAuthStateChanged.mockImplementation(() => jest.fn());

    renderProtectedRoute();

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should redirect to login when user is not authenticated", async () => {
    mockOnAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null);
      return jest.fn();
    });

    renderProtectedRoute();

    await screen.findByText("Login Page");
    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.queryByText("Admin Dashboard")).not.toBeInTheDocument();
  });

  it("should redirect to login when user is not admin", async () => {
    const nonAdminUser = {
      uid: "test-uid",
      email: "customer@gmail.com",
    };

    mockOnAuthStateChanged.mockImplementation((auth, callback) => {
      callback(nonAdminUser);
      return jest.fn();
    });

    renderProtectedRoute();

    await screen.findByText("Login Page");
    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.queryByText("Admin Dashboard")).not.toBeInTheDocument();
  });

  it("should render protected content when user is admin", async () => {
    const adminUser = {
      uid: "admin-uid",
      email: "shyguythe13th@gmail.com",
    };

    mockOnAuthStateChanged.mockImplementation((auth, callback) => {
      callback(adminUser);
      return jest.fn();
    });

    renderProtectedRoute();

    await screen.findByText("Admin Dashboard");
    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
    expect(screen.queryByText("Login Page")).not.toBeInTheDocument();
  });

  it("should reject non-whitelisted admin emails", async () => {
    const nonWhitelistedUser = {
      uid: "user-uid",
      email: "admin@sgautosales.com",
    };

    mockOnAuthStateChanged.mockImplementation((auth, callback) => {
      callback(nonWhitelistedUser);
      return jest.fn();
    });

    renderProtectedRoute();

    await screen.findByText("Login Page");
    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.queryByText("Admin Dashboard")).not.toBeInTheDocument();
  });
});
