"use client";

import { Suspense, useEffect } from "react";
import TrTbody from "../TrBody/TrTbody";
import Loading from "../Loader";
import { useQuery } from "react-query";
import useSearchStore from "src/libs/storeSearch";
import useSortStore from "src/libs/storeSort";
import { getUsers, searchUsers, sortUsers } from "src/libs/data";
import useUsersStore from "src/libs/storeUser";

const TableUser = () => {
  const { setUsers, users } = useUsersStore();
  const { query } = useSearchStore();
  const { input } = useSortStore();

  const { data, error, isLoading, refetch } = useQuery(
    ["users", query, input],
    async () => {
      if (query) {
        const searchData = await searchUsers(query);
        return searchData;
      } else if (input.sort && input.order) {
        const sortedData = await sortUsers(input);
        return sortedData;
      } else {
        const allUsers = await getUsers();
        return allUsers;
      }
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setUsers(data);
      },
    }
  );

  useEffect(() => {
    if (query || (input.sort && input.order)) {
      refetch();
    }
  }, [query, input, refetch]);

  if (isLoading || !data) return <Loading />;

  if (error) return <span className="text-red-500">Error: {error.message}</span>;

  return (
    <section className="tableContainer px-5 dark:bg-n-8 bg-neutral-100 border border-n-1/10 rounded-md w-full lg:w-[100%] overflow-x-hidden max-h-[32rem] md:max-h-[43rem] lg:max-h-[25rem] xl:max-h-[33rem] 2xl:max-h-[30.5rem]">
      <table className="table-auto w-full dark:text-neutral-200 text-n-5">
        <thead className="dark:bg-n-7 bg-white text-base border-b dark:border-n-1/10 border-n-2/50 sticky top-0">
          <tr>
            <th className="text-start py-4 md:w-[40%] lg:w-[20%] 2xl:w-[20%]">Entire Name</th>
            <th className="hidden md:table-cell text-start py-4 md:w-[20%] lg:w-[10%] 2xl:w-[5%]">Age</th>
            <th className="text-start py-4 md:w-[20%] lg:w-[10%] 2xl:w-[7%]">Gender</th>
            <th className="hidden lg:table-cell text-start py-4 lg:w-[27%] 2xl:w-[20%]">Address</th>
            <th className="hidden xl:table-cell text-start py-4 xl:w-[17%] 2xl:w-[23%]">Email</th>
            <th className="text-start py-4 md:w-[20%] lg:w-[16%] 2xl:w-[10%]">Action</th>
          </tr>
        </thead>

        <tbody className="text-md font-mono">
          <Suspense fallback={<Loading />}>
            <TrTbody />
          </Suspense>
        </tbody>
      </table>
    </section>
  );
};

export default TableUser;
