import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UpdateUser from "src/components/UpdateUser/UpdateUser";
import useUsersStore from "src/libs/storeUser";
import useUpdateUser from "src/hooks/useUpdateUser";
import { useRouter } from "next/navigation";

// Mock external modules
jest.mock("src/libs/storeUser");
jest.mock("src/hooks/useUpdateUser");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("UpdateUser component", () => {
  const user = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    address: { address: "123 Street" },
    gender: "Male",
    age: 30,
  };

  const setIsOpen = jest.fn();
  const updateUserForm = jest.fn();

  beforeEach(() => {
    // Mocking useUsersStore
    useUsersStore.mockReturnValue({
      users: [user],
    });

    // Mocking useUpdateUser
    useUpdateUser.mockReturnValue({
      updateUserForm,
    });

    // Mocking useRouter
    useRouter.mockReturnValue({
      refresh: jest.fn(),
    });
  });

  it("should render Update User title", () => {
    render(<UpdateUser user={user} isOpen={true} setIsOpen={setIsOpen} />);

    const title = screen.getByTestId("update-user");

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Update User");
  });

  it("should render input fields correctly", () => {
    render(<UpdateUser user={user} isOpen={true} setIsOpen={setIsOpen} />);

    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Jl...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Gender")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Age")).toBeInTheDocument();
  });

  it("should render input fields with default values", () => {
    render(<UpdateUser user={user} isOpen={true} setIsOpen={setIsOpen} />);

    expect(screen.getByPlaceholderText("First Name")).toHaveValue(user.firstName);
    expect(screen.getByPlaceholderText("Last Name")).toHaveValue(user.lastName);
    expect(screen.getByPlaceholderText("Email")).toHaveValue(user.email);
    expect(screen.getByPlaceholderText("Jl...")).toHaveValue(user.address.address);
    expect(screen.getByPlaceholderText("Gender")).toHaveValue(user.gender);
    expect(screen.getByPlaceholderText("Age")).toHaveValue(String(user.age));
  });

  it("should render the button update", () => {
    render(<UpdateUser user={user} isOpen={true} setIsOpen={setIsOpen} />);

    const button = screen.getByRole("button", { name: /update/i });

    expect(button).toBeInTheDocument();
  });

  it("displays loading spinner when form is submitting", async () => {
    render(<UpdateUser user={user} isOpen={true} setIsOpen={setIsOpen} />);

    const button = screen.getByRole("button", { name: /update/i });

    fireEvent.click(button);

    await waitFor(() => expect(screen.getByRole("button")).toContainHTML("<svg"));
  });

  it("should update user successfully", async () => {
    render(<UpdateUser user={user} isOpen={true} setIsOpen={setIsOpen} />);

    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "Jane" } });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Jl..."), { target: { value: "Jl. Example" } });
    fireEvent.change(screen.getByPlaceholderText("Gender"), { target: { value: "Female" } });
    fireEvent.change(screen.getByPlaceholderText("Age"), { target: { value: "20" } });

    const button = screen.getByRole("button", { name: /update/i });

    fireEvent.click(button);

    await waitFor(() => {
      expect(updateUserForm).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: "Jane",
          lastName: "Doe",
          email: "jane@example.com",
          address: { address: "Jl. Example" },
          gender: "Female",
          age: "20",
        })
      );
    });
  });

  it("closes the form and refreshes the router on close button click", () => {
    const mockRefresh = jest.fn();
    useRouter.mockReturnValueOnce({ refresh: mockRefresh });

    render(<UpdateUser user={user} isOpen={true} setIsOpen={setIsOpen} />);

    const closeButton = screen.getByTestId("close-button");

    fireEvent.click(closeButton);

    expect(setIsOpen).toHaveBeenCalledWith(false);
    expect(mockRefresh).toHaveBeenCalled();
  });
});
