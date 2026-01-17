import { renderHook, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthProvider, useAuth } from "../context/Auth";

// Mock Firebase auth
jest.mock("../config/firebase", () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: jest.fn(),
  },
}));

// Mock Firebase auth functions
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

describe("AuthContext", () => {
  const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should provide initial auth state as null", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(true);
  });

  it("should provide login function", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.login).toBeDefined();
    expect(typeof result.current.login).toBe("function");
  });

  it("should provide logout function", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.logout).toBeDefined();
    expect(typeof result.current.logout).toBe("function");
  });

  it("should provide isAdmin function", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAdmin).toBeDefined();
    expect(typeof result.current.isAdmin).toBe("function");
  });

  it("should call signInWithEmailAndPassword on login", async () => {
    const { signInWithEmailAndPassword } = require("firebase/auth");
    signInWithEmailAndPassword.mockResolvedValue({
      user: { uid: "test-uid", email: "admin@test.com" },
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login("admin@test.com", "password123");
    });

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      "admin@test.com",
      "password123"
    );
  });

  it("should call signOut on logout", async () => {
    const { signOut } = require("firebase/auth");
    signOut.mockResolvedValue();

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.logout();
    });

    expect(signOut).toHaveBeenCalled();
  });

  it("should handle login errors", async () => {
    const { signInWithEmailAndPassword } = require("firebase/auth");
    const mockError = new Error("Invalid credentials");
    signInWithEmailAndPassword.mockRejectedValue(mockError);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await expect(
      result.current.login("wrong@test.com", "wrongpassword")
    ).rejects.toThrow("Invalid credentials");
  });

  it("should identify admin users correctly", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    // Test with admin email
    expect(result.current.isAdmin("shyguythe13th@gmail.com")).toBe(true);

    // Test with non-admin email
    expect(result.current.isAdmin("customer@gmail.com")).toBe(false);
    expect(result.current.isAdmin("admin@sgautosales.com")).toBe(false);
    expect(result.current.isAdmin(null)).toBe(false);
  });

  it("should update user state when auth state changes", async () => {
    const { onAuthStateChanged } = require("firebase/auth");
    const mockUser = { uid: "test-uid", email: "shyguythe13th@gmail.com" };

    let authCallback;
    onAuthStateChanged.mockImplementation((auth, callback) => {
      authCallback = callback;
      return jest.fn(); // unsubscribe function
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      authCallback(mockUser);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it("should set loading to false after auth state is initialized", async () => {
    const { onAuthStateChanged } = require("firebase/auth");

    let authCallback;
    onAuthStateChanged.mockImplementation((auth, callback) => {
      authCallback = callback;
      return jest.fn();
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      authCallback(null);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});
