import React, { useState } from "react";
import { Text, Image, SimpleGrid, AppShell, Grid, Card } from "@mantine/core";
import NavbarMinimal from "../../components/seller/navbar";
import Dashboard from "../../components/seller/dashboard";
import UploadProduct from "../../components/seller/upload-product";
import Head from "next/head";
export default function Demo() {
  const [active, setActive] = useState(1);
  const demoData: { title: string; value: string; diff: number }[] = [
    { title: "REVENUE", value: "13,456", diff: 1000 },
    { title: "PROFIT", value: "13,456", diff: 1000 },
    { title: "COUPON USAGE", value: "13,456", diff: 1000 },
    { title: "NEW CUSTOMER", value: "13,456", diff: 1000 },
  ];
  console.log({ demoData });
  return (
    <>
      <Head>
        <title>Seller Dashboard</title>
      </Head>
      <AppShell
        navbar={<NavbarMinimal active={active} setActive={setActive} />}
      >
        {active == 1 && <Dashboard data={{ data: demoData }} />}
        {active == 2 && <UploadProduct />}
      </AppShell>
    </>
  );
}
