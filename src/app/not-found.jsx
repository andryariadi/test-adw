"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 5000);
  });

  return (
    <div className="flex items-center justify-center h-screen pt-[4.75rem] lg:pt-[5rem]">
      <Image src="/error.svg" alt="Error" width={700} height={700} />
    </div>
  );
};

export default NotFound;
