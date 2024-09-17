import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserForm from "src/components/UserForm/UserForm";
import useAddUser from "src/hooks/useAddUser";
import { useRouter } from "next/navigation"; // Import useRouter for testing purposes

// jest.mock("src/hooks/useAddUser");

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(), // Mock the useRouter hook
}));

jest.mock("src/hooks/useAddUser", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("UserForm Component", () => {
  const mockCreateUserForm = jest.fn();
  const mockSetIsOpen = jest.fn();

  beforeEach(() => {
    useAddUser.mockReturnValue({
      createUserForm: mockCreateUserForm,
    });

    useRouter.mockReturnValue({
      refresh: jest.fn(),
    });
  });

  it("should render input fields correctly", () => {
    render(<UserForm isOpen={true} setIsOpen={mockSetIsOpen} />);

    // Check input fields
    expect(screen.getByPlaceholderText("John")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Doe")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Jl...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Age")).toBeInTheDocument();
  });

  it("should have input fields empty initially", () => {
    render(<UserForm isOpen={true} setIsOpen={mockSetIsOpen} />);

    // Ensure input fields are empty
    expect(screen.getByPlaceholderText("John").value).toBe("");
    expect(screen.getByPlaceholderText("Doe").value).toBe("");
    expect(screen.getByPlaceholderText("Email@example.com").value).toBe("");
    expect(screen.getByPlaceholderText("Enter your password").value).toBe("");
    expect(screen.getByPlaceholderText("Jl...").value).toBe("");
    expect(screen.getByPlaceholderText("Age").value).toBe("");
  });

  it("should toggle password visibility when clicking the eye icon", () => {
    render(<UserForm isOpen={true} setIsOpen={mockSetIsOpen} />);

    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const toggleButton = screen.getByTestId("password-toggle");

    // Initially should be type="password"
    expect(passwordInput.type).toBe("password");

    // Click to show password
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("text");

    // Click again to hide password
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("password");
  });

  it("should not show error messages initially", () => {
    render(<UserForm isOpen={true} setIsOpen={mockSetIsOpen} />);

    expect(screen.queryByTestId("firstName-error")).not.toBeInTheDocument();
    expect(screen.queryByTestId("lastName-error")).not.toBeInTheDocument();
    expect(screen.queryByTestId("email-error")).not.toBeInTheDocument();
    expect(screen.queryByTestId("password-error")).not.toBeInTheDocument();
    expect(screen.queryByTestId("address-error")).not.toBeInTheDocument();
    expect(screen.queryByTestId("age-error")).not.toBeInTheDocument();
  });

  it("should display error messages after submitting an empty form", async () => {
    render(<UserForm isOpen={true} setIsOpen={mockSetIsOpen} />);

    // Click the submit button
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByTestId("firstName-error")).toBeInTheDocument();
      expect(screen.getByTestId("lastName-error")).toBeInTheDocument();
      expect(screen.getByTestId("email-error")).toBeInTheDocument();
      expect(screen.getByTestId("password-error")).toBeInTheDocument();
      expect(screen.getByTestId("address-error")).toBeInTheDocument();
      expect(screen.getByTestId("age-error")).toBeInTheDocument();
    });
  });

  it("should render the submit button correctly", () => {
    render(<UserForm isOpen={true} setIsOpen={mockSetIsOpen} />);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("should call createUserForm on form submission with correct data", async () => {
    render(<UserForm isOpen={true} setIsOpen={mockSetIsOpen} />);

    // Fill the form with data
    fireEvent.change(screen.getByPlaceholderText("John"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Doe"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Email@example.com"), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), { target: { value: "password123" } });
    fireEvent.change(screen.getByTestId("address"), { target: { value: "Jl. Example" } });
    fireEvent.change(screen.getByTestId("age"), { target: { value: "25" } });

    const [maleCheckbox] = screen.getAllByLabelText(/male/i);
    const [femaleCheckbox] = screen.getAllByLabelText(/female/i);

    fireEvent.click(maleCheckbox); // Check 'male' checkbox
    fireEvent.click(femaleCheckbox); // Optionally check 'female' checkbox to ensure it works

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockCreateUserForm).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        address: { address: "Jl. Example" },
        age: "25",
        gender: "female",
      });
    });
  });

  it("should close the form when close icon is clicked", () => {
    const mockRefresh = jest.fn();
    useRouter.mockReturnValueOnce({ refresh: mockRefresh });

    render(<UserForm isOpen={true} setIsOpen={mockSetIsOpen} />);

    const closeButton = screen.getByTestId("close-icon");
    fireEvent.click(closeButton);

    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    expect(mockRefresh).toHaveBeenCalled();
  });
});
