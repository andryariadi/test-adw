import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import useUsersStore from "src/libs/storeUser";
import useCurrentUserStore from "src/libs/storeAuth";
import { getUsers, searchUsers, sortUsers } from "src/libs/data";
import TableUser from "../TableUser";

// Mocking external modules
jest.mock("react-query");
jest.mock("src/libs/storeUser");
jest.mock("src/libs/storeAuth");
jest.mock("src/libs/data");
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("TableUser", () => {
  beforeEach(() => {
    useUsersStore.mockReturnValue({
      users: [],
      removeUser: jest.fn(),
    });

    useCurrentUserStore.mockReturnValue({
      currentUser: { id: "1", role: "admin" },
    });

    useQuery.mockImplementation(() => ({
      data: [],
      error: null,
      isLoading: false,
      refetch: jest.fn(),
    }));

    getUsers.mockResolvedValue([]);
    searchUsers.mockResolvedValue([]);
    sortUsers.mockResolvedValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    useQuery.mockImplementation(() => ({
      data: [],
      error: null,
      isLoading: true,
    }));

    render(<TableUser />);
    expect(screen.getByTestId(/loading/i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    useQuery.mockImplementation(() => ({
      data: [],
      error: new Error("Test Error"),
      isLoading: false,
    }));

    render(<TableUser />);
    expect(screen.getByText(/error: test error/i)).toBeInTheDocument();
  });

  it("should render table header", () => {
    render(<TableUser />);
    expect(screen.getByText("Entire Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });
});
