"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import {
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  LogInIcon,
  RocketIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="bg-dark p-5 overflow-x-hidden">
      {/* <Header /> */}
      <div className="bg-dark-300 rounded-lg h-screen w-full relative p-3">
        {/* center image */}
        <img
          src="/hero-img.png"
          alt="image"
          width={500}
          height={500}
          className="home-page-img inset-0 bg-transparent opacity-80 z-10 hidden sm:block sm:top-[20%] sm:left-[16%] md:top-[15%] md:left-[5%]"
        />
        {/* top right container */}
        <div className="bg-dark p-3 absolute top-0 right-0 rounded-bl-2xl">
          <div className="bg-primary w-72 h-8 rounded-full p-2 flex items-center justify-center">
            {user ? (
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => router.push("/dashboard")}
              >
                <p className="text-lg text-white">Get Started</p>
                <RocketIcon className="text-white" />
              </div>
            ) : (
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => router.push("/sign-in")}
              >
                <p className="text-lg text-white">Sign-in</p>
                <LogInIcon className="text-white" />
              </div>
            )}
          </div>
        </div>
        {/* bottom left container */}
        <div className="bg-dark p-3 absolute bottom-0 left-0 rounded-tr-2xl">
          <div className="flex flex-row gap-3">
            <div className="bg-gray-900 w-72 h-8 rounded-full p-2 flex items-center justify-center">
              <p className="text-sm font-medium">{user?.fullName}</p>
            </div>
            <div className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center">
              {user && <UserButton />}
            </div>
          </div>
        </div>
        {/* content header top left */}
        <div className="bg-gray-900 max-w-96 h-10 rounded-lg flex items-center justify-center mt-14 md:mt-0 flex-shrink-0 z-20">
          <p className="text-white text-lg font-bold">
            Create Content Faster and Better with IdeAI
          </p>
        </div>
        <div className="bg-gray-800 max-w-72 h-5 rounded-full flex items-center justify-center mt-2 flex-shrink-0 z-20">
          <p className="text-xs">
            helps you produce high-quality content in seconds
          </p>
        </div>
        {/* bottom left side info */}
        <div className="bg-gray-800 max-w-72 h-4 rounded-full flex items-center justify-center mt-[25.5rem] md:mt-[29.5rem] flex-shrink-0 z-20">
          <p className="text-xs text-gray-500">
            © 2024 IdeAI-JCMisa. All rights reserved.
          </p>
        </div>
        {/* footer */}
        <div className="h-7 absolute bottom-5 left-[24rem] max-w-72 hidden md:flex flex-shrink-0 flex-row gap-5 z-20">
          <Link
            href={"https://web.facebook.com/johncarlomisa26"}
            target="_blank"
            className="bg-dark h-10 w-10 rounded-full cursor-pointer p-2"
          >
            <Facebook className="text-primary" />
          </Link>
          <Link
            href={"https://github.com/JCMisa"}
            target="_blank"
            className="bg-dark h-10 w-10 rounded-full cursor-pointer p-2"
          >
            <Github className="text-primary" />
          </Link>
          <Link
            href={"https://official-portfolio-sigma.vercel.app/"}
            target="_blank"
            className="bg-dark h-10 w-10 rounded-full cursor-pointer p-2"
          >
            <Globe className="text-primary" />
          </Link>
          <Link
            href={"https://www.linkedin.com/in/john-carlo-misa-80a1b5208/"}
            target="_blank"
            className="bg-dark h-10 w-10 rounded-full cursor-pointer p-2"
          >
            <Linkedin className="text-primary" />
          </Link>
        </div>
        {/* cards bottom right */}
        <div className="md:flex flex-col gap-5 absolute right-3 bottom-20 hidden">
          <div className="w-52 h-40 lg:w-60 lg:h-52 xl:w-96 bg-gray-900 rounded-lg z-20">
            <Image
              src={"/ideai-img1.png"}
              alt="img1"
              width={1000}
              height={1000}
              className="rounded-lg"
            />
          </div>
          <div className="w-52 h-40 lg:w-60 lg:h-52 xl:w-96 bg-gray-800 rounded-lg z-20">
            <Image
              src={"/ideai-img2.png"}
              alt="img2"
              width={1000}
              height={1000}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
