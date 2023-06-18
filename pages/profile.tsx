
import React, { useEffect, useState } from "react";
import OrderHistory from "components/seller/order-history";
import axios from "axios";
import jwt from "jsonwebtoken";
import Dashboard from "components/seller/dashboard";


const Profile = () => {
  const BASE_HEIGHT = 360;
  (children: number, spacing: number) =>
    BASE_HEIGHT / children - spacing * ((children - 1) / children);
  const dummy = {
    data: [
      { title: "REVENUE", value: "13,456", diff: 1000 },
      { title: "PROFIT", value: "13,456", diff: 1000 },
      { title: "COUPON USAGE", value: "13,456", diff: 1000 },
      { title: "NEW CUSTOMER", value: "13,456", diff: 1000 },
    ],
    seller: {
      firstname: "John",
      lastname: "Doe",
      companyName: "John Doe Company",
      apiKey: "123456789",
      phoneNo: "123456789",
      bankAccount: "123456789",
    },
  };
  const [data, setData] = useState(dummy);
  const [seller, setSeller] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token") as string;
      const decoded = jwt.decode(token) as any;
      const id = decoded._doc?._id;
      const res = await axios.get("/api/seller?id=" + id);
      setSeller(res.data);
      setData({ ...data, seller: res.data });
    };
    if (!seller) fetchData();
  }, []);

  return (
    <>
      {!seller ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Dashboard data={data} />
          <OrderHistory />
        </>
      )}
    </>
  );
};

export default Profile;
