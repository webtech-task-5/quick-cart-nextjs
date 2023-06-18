import React, { useEffect, useState } from "react";
import OrderHistory from "components/seller/order-history";
import axios from "axios";
import jwt from "jsonwebtoken";
import Dashboard from "components/seller/dashboard";
import Header from "components/header";
import Head from "next/head";

const Profile = () => {
  const BASE_HEIGHT = 360;
  (children: number, spacing: number) =>
    BASE_HEIGHT / children - spacing * ((children - 1) / children);
  //TODO add Total Order, Total Cost, Coupons new etc from backend
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
      const additonalData = await axios.get(
        "/api/additonal?id=" + id + "&type=customer"
      );

      setSeller(res.data);
      setData({
        data: [
          {
            title: "REVENUE",
            value: additonalData.data.totalSpentAmount,
            diff: 1000,
          },
          {
            title: "Total Spend",
            value: additonalData.data.totalSpentAmount,
            diff: 1000,
          },
          {
            title: "Total Order",
            value: additonalData.data.orderCount,
            diff: 1000,
          },
          {
            title: "Total Store",
            value: additonalData.data.totalSeller,
            diff: 1000,
          },
        ],
        seller: res.data,
      });
    };
    if (!seller) fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      {!seller ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Header />
          <div
            style={{
              marginTop: "120px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <Dashboard data={data} />
          </div>

          <OrderHistory />
        </>
      )}
    </>
  );
};

export default Profile;
