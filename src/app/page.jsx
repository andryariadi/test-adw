import AddUser from "src/components/AddUser/AddUser";
import Header from "src/components/Header";
import MenuSidebar from "src/components/MenuSidebar";
import TableUser from "src/components/TableUser/TableUser";
import UserInformation from "src/components/UserInformation";

export default function Home() {
  return (
    <>
      <section className="flex gap-5 h-max md:h-full p-5">
        <aside className="hidden dark:bg-n-7 bg-white dark:border dark:border-n-1/10 md:w-[35%] lg:w-[27%] 2xl:w-[20%] p-5 rounded-md md:flex flex-col gap-5">
          {/* Top */}
          <div className="border-b dark:border-n-1/10 border-n-2/50">
            <UserInformation />
          </div>
          {/* Bottom */}
          <MenuSidebar />
        </aside>
        <main className="dark:bg-n-7 bg-white dark:border dark:border-n-1/10 w-full md:w-[75%] lg:w-[73%] 2xl:w-[80%] p-5 rounded-md flex flex-col gap-5">
          <Header />
          <div className="flex flex-col gap-3">
            <AddUser />
            <TableUser />
          </div>
        </main>
      </section>
    </>
  );
}
