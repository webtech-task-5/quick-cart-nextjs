import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  SimpleGrid,
  AppShell,
  Grid,
  Card,
  Container,
} from "@mantine/core";
import NavbarMinimal from "../../components/seller/navbar";
import Dashboard from "../../components/seller/dashboard";
import UploadProduct from "../../components/seller/upload-product";
import OrderHistory from "../../components/seller/order-history";
import Head from "next/head";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import Products from "pages/products";
import Header from "components/header";
export default function Demo() {
  const [active, setActive] = useState(1);

  const [seller, setSeller] = useState(null);
  const [addData, setAddData] = useState(null) as any;
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token") as string;
      const decoded = jwt.decode(token) as any;
      const id = decoded._doc?._id;
      const type = decoded._doc?.type;
      if (type !== "seller") return router.push("/");
      const res = await axios.get(`/api/seller?id=${id}`);
      const additonalData = await axios.get(
        `/api/additonal?id=${id}&type=${type}`
      );
      console.log(additonalData.data);
      console.log(res.data);
      setSeller(res.data);
      setAddData([
        {
          title: "REVENUE",
          value: additonalData.data.goal,
          diff: 1000,
        },
        {
          title: "PROFIT",
          value: additonalData.data.totalProfit,
          diff: 1000,
        },
        {
          title: "TOTAL ORDER",
          value: additonalData.data.orderCount,
          diff: 1000,
        },
        {
          title: "TOTAL CUSTOMER",
          value: additonalData.data.totalCustomers,
          diff: 1000,
        },
      ]);
    };
    if (!seller) fetchData();
  }, [seller]);

  return (
    <>
      <Head>
        <title>Seller Dashboard</title>
      </Head>
      {seller && (
        <AppShell
          navbar={<NavbarMinimal active={active} setActive={setActive} />}
        >
          <Header />
          <div>
            {active === 0 && <Products />}
            {active === 1 && (
              <Dashboard data={{ data: addData, seller: seller }} />
            )}
            {active === 2 && <UploadProduct />}
            {active === 3 && <OrderHistory />}
          </div>
        </AppShell>
      )}
      {!seller && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading...
        </div>
      )}
    </>
  );
}
