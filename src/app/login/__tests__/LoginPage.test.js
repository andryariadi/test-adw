import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import useLogin from "src/hooks/useLogin";
import { useRouter } from "next/navigation";
import LoginPage from "src/app/login/page";

// Mocking the necessary modules
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("src/hooks/useLogin", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("LoginPage", () => {
  const mockLoginForm = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    useLogin.mockReturnValue({ loginForm: mockLoginForm });
    useRouter.mockReturnValue({ push: mockPush });
  });

  it("renders LoginPage correctly", () => {
    // Arrange
    render(<LoginPage />);

    // Assert
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByAltText("Login")).toBeInTheDocument();
  });

  it("shows validation errors when submitting an empty form", async () => {
    // Arrange
    render(<LoginPage />);

    // Act
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Assert
    await waitFor(() => {
      expect(screen.getByText("Username is required!")).toBeInTheDocument();
      expect(screen.getByText("Password is required!")).toBeInTheDocument();
    });
  });

  it("toggles password visibility when clicking the eye icon", () => {
    // Arrange
    render(<LoginPage />);

    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const toggleButton = screen.getByTestId("password-toggle");

    // Act
    // Password should be hidden by default
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click the toggle button to show the password
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Click again to hide the password
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("submits the form with valid data", async () => {
    // Arrange
    render(<LoginPage />);

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const submitButton = screen.getByRole("button", { name: /login/i });

    // Act
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(mockLoginForm).toHaveBeenCalledWith({
        username: "testuser",
        password: "password123",
      });
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  it("displays loading spinner when form is submitting", async () => {
    // Arrange
    render(<LoginPage />);

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const submitButton = screen.getByRole("button", { name: /login/i });

    // Mock isSubmitting behavior
    mockLoginForm.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 1000)));

    // Act
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      // While submitting, there should be a spinner
      expect(submitButton).toBeDisabled();
      // Assuming the spinner has a test id of 'spinner'
      expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });
  });
});
