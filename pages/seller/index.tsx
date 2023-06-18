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
import OrderHistory from "../../components/seller/order-history"
import Head from "next/head";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import Products from "pages/products";
import Header from "components/header";
export default function Demo() {
  const [active, setActive] = useState(1);
  const demoData: { title: string; value: string; diff: number }[] = [
    { title: "REVENUE", value: "13,456", diff: 1000 },
    { title: "PROFIT", value: "13,456", diff: 1000 },
    { title: "COUPON USAGE", value: "13,456", diff: 1000 },
    { title: "NEW CUSTOMER", value: "13,456", diff: 1000 },
  ];

  console.log({ demoData });
  const [seller, setSeller] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token") as string;
      const decoded = jwt.decode(token) as any;
      const id = decoded._doc?._id;
      const type = decoded._doc?.type;
      if (type !== "seller") return router.push("/");
      const res = await axios.get("/api/seller?id=" + id);
      console.log(res.data);
      setSeller(res.data);
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
              <Dashboard data={{ data: demoData, seller: seller }} />
            )}
            {active === 2 && <UploadProduct />}
            {active === 3 && <OrderHistory/>}
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
