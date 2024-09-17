import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import QueryClientProvider from "src/libs/queryClient";
import Providers from "./providers";
import { AuthContextProvider } from "src/context/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "iProc",
  description: "iProc test frontend wisesa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} dark:bg-n-8 bg-neutral-200 dark:text-white text-n-7 h-[150dvh] md:h-screen`}>
        <Providers>
          <QueryClientProvider>
            <AuthContextProvider>{children}</AuthContextProvider>
            <Toaster position="top-right" />
          </QueryClientProvider>
        </Providers>
      </body>
    </html>
  );
}
