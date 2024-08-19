import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <div>
      <div className="font-[sans-serif] max-w-4xl flex items-center mx-auto md:h-screen p-4">
        <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
          <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-[#17153B] to-[#060517] lg:px-8 px-4 py-4">
            <div>
              <h4 className="text-white text-lg font-semibold">
                Welcome back!
              </h4>
              <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                Quickly log in to continue where you left off.
              </p>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold">
                Simple & Secure Login
              </h4>
              <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                Our login process is designed to be straightforward and secure.
                We prioritize your privacy and data security.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 w-full py-6 px-6 sm:px-16 bg-dark">
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
