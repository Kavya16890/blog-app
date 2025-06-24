import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/protected", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setName(data.name);
        setEmail(data.email);
        setImage(data.image);
      } catch (err) {
        console.error("error to fetch user.", err.message);
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      <section className="text-gray-600 body-font">
        <h1 className="text-3xl p-10">Your Profile</h1>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
            <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
              {!image ? (
                <img src="https://imgs.search.brave.com/p7wTkIvslowa-wWgv34Zn5V---LR8tmCew0m1JcolWI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzQ2LzgzLzk2/LzM2MF9GXzM0Njgz/OTY4M182bkFQemJo/cFNrSXBiOHBtQXd1/ZmtDN2M1ZUQ3d1l3/cy5qcGc" />
              ) : (
                <img
                  src={image}
                  className="object-center rounded-full w-32 h-32"
                />
              )}
            </div>
            <div className="grid">
              <h1 className="text-2xl font-semibold">{name}</h1>
              <h2 className="text-lg text-gray-500">{email}</h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
