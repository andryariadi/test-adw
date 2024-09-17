import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TrBody from "src/components/TrBody/TrTbody";
import useUsersStore from "src/libs/storeUser";
import useCurrentUserStore from "src/libs/storeAuth";
import useDeleteUser from "src/hooks/useDeleteUser";
import { getUserById } from "src/libs/data";
import { notFound } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Mock external modules
jest.mock("src/libs/storeUser");
jest.mock("src/libs/storeAuth");
jest.mock("src/hooks/useDeleteUser");
jest.mock("src/libs/data");
jest.mock("next/navigation");
jest.mock("react-hot-toast");

describe("TrBody", () => {
  const mockUsers = [
    {
      id: "user1",
      firstName: "John",
      lastName: "Doe",
      age: 25,
      gender: "male",
      address: { address: "123 Street" },
      email: "john.doe@example.com",
    },
    {
      id: "user2",
      firstName: "Jane",
      lastName: "Smith",
      age: 30,
      gender: "female",
      address: { address: "456 Avenue" },
      email: "jane.smith@example.com",
    },
  ];

  const mockCurrentUser = { id: "user1", role: "admin" };

  beforeEach(() => {
    useUsersStore.mockReturnValue({
      users: mockUsers,
      removeUser: jest.fn(),
    });

    useCurrentUserStore.mockReturnValue({
      currentUser: mockCurrentUser,
    });

    useDeleteUser.mockReturnValue({
      deleteUser: jest.fn(),
    });

    toast.error = jest.fn();

    useRouter.mockReturnValue({
      push: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders user data correctly", () => {
    render(<TrBody />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("male")).toBeInTheDocument();
    expect(screen.getByText("123 Street")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();

    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("female")).toBeInTheDocument();
    expect(screen.getByText("456 Avenue")).toBeInTheDocument();
    expect(screen.getByText("jane.smith@example.com")).toBeInTheDocument();
  });

  it("handles edit button click", async () => {
    getUserById.mockResolvedValue(mockUsers[0]);

    render(<TrBody />);

    const editButton = screen.getAllByTestId("edit-button")[0];
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(getUserById).toHaveBeenCalledWith("user1");
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  it("shows error when non-owner user tries to edit", async () => {
    useCurrentUserStore.mockReturnValueOnce({
      currentUser: { id: "user2", role: "admin" },
    });

    render(<TrBody />);

    const editButton = screen.getAllByTestId("edit-button")[0];
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("You are not allowed to edit this user!");
    });
  });

  it("handles delete button click", async () => {
    render(<TrBody />);

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(useDeleteUser().deleteUser).toHaveBeenCalledWith("user1");
      expect(useUsersStore().removeUser).toHaveBeenCalledWith("user1");
    });
  });

  it("shows error when non-admin user tries to delete", () => {
    useCurrentUserStore.mockReturnValueOnce({
      currentUser: { id: "user1", role: "user" },
    });

    render(<TrBody />);

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    expect(toast.error).toHaveBeenCalledWith("You are not admin, you cannot delete user!");
  });

  it("navigates to user profile on profile button click", () => {
    const mockRouter = useRouter();
    render(<TrBody />);

    const profileButton = screen.getAllByTestId("profile-button")[0];
    fireEvent.click(profileButton);

    expect(mockRouter.push).toHaveBeenCalledWith("/user/user1");
  });

  it("shows error when non-owner user tries to view profile", () => {
    useCurrentUserStore.mockReturnValueOnce({
      currentUser: { id: "user2", role: "admin" },
    });

    render(<TrBody />);

    const profileButton = screen.getAllByTestId("profile-button")[0];
    fireEvent.click(profileButton);

    expect(toast.error).toHaveBeenCalledWith("You are not allowed to view this profile!");
  });

  it("renders notFound when no users exist", () => {
    useUsersStore.mockReturnValueOnce({
      users: null,
    });

    render(<TrBody />);

    expect(notFound).toHaveBeenCalled();
  });
});
