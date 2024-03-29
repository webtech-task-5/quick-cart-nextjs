import React, { useEffect, useState } from "react";
import DefaultButton from "./button";
import jwt from "jsonwebtoken";

export default function Usercard({ data }: any) {
  const [type, setType] = useState("customer");
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      window.location.href = "/";
    }
    const token = localStorage.getItem("token") as string;
    const user = jwt.decode(token) as any;
    setType(user._doc.type);
  }, []);
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5 mx-10">
      <div className="flex justify-end px-4 pt-4 ms-5">
        {/* <button
          id="dropdownButton"
          onClick={() => setOpen((op) => !op)}
          data-dropdown-toggle="dropdown"
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
          </svg>
        </button> */}
        {/* <!-- Dropdown menu --> */}
        {/* <div
          id="dropdown"
          className={`z-10 ${
            open ? "" : "hidden"
          } text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
        >
          <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Edit
              </a>
            </li>
          </ul>
        </div> */}
      </div>
      <div className="flex flex-col items-center ">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="/images/icons/user.png"
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {data.firstname} {data.lastname}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {data.email}
        </span>
        <br />
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Mobile Number: {data.phoneNo}
        </span>
        {type === "seller" && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Store/Company name: {data.companyName}
          </span>
        )}
        <br />
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Bank Account Number : {data.bankAccount}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          API Key : {data.apiKey}
        </span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <DefaultButton
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            text="Logout"
          />
          {/* <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
          >
            Message
          </a> */}
        </div>
      </div>
    </div>
  );
}
