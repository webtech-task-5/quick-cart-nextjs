import { Center, Select, Table, Text } from "@mantine/core";
import React from "react";

type Product = {
    info: {
        imageSrc: string,
        name: string,
        price: string,
        orderTime: string,
    },
    quantity: string,
    tprice: string,
    deliverAddress: string,
    status: "Pending"| "Accepted"| "Rejected" | "Delivered"
}
export default function OrderHistory() {
  const elements: Product[] = [
    { info: {imageSrc: "/images/icons/user.png", name:"abd", price: "100", orderTime: "23/06/23"}, quantity: "2", tprice: "2*100", deliverAddress: "Bagan Bari, CTG", status: "Pending" },
    { info: {imageSrc: "/images/icons/user.png", name:"abd", price: "100", orderTime: "23/06/23"}, quantity: "2", tprice: "2*100", deliverAddress: "Bagan Bari, CTG", status: "Pending" },
  ];
  const rows = elements.map((element, key) => (
    <tr key={key} style={{ alignItems: "center" }}>
  <td style={{ textAlign: "center" }}>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <img
        className="w-24 h-24 mb-3 rounded-full shadow-lg"
        src={element.info.imageSrc}
        alt="Bonnie image"
      />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: "10px" }}>
        <Text weight="bold">
          {element.info.name}
        </Text>
        <Text weight="bold">
          {element.info.price} taka
        </Text>
        <Text weight="bold">
          {element.info.orderTime}
        </Text>
      </div>
    </div>
  </td>
  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{element.quantity}</td>
  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{element.deliverAddress}</td>
  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{element.tprice}</td>
  <td style={{ textAlign: "center", verticalAlign: "middle", width:"150px" }}>
    <Select
      placeholder="Custom active styles"
      size="xs"
      label="Custom active styles"
      defaultValue={element.status}
      data={["Pending", "Accepted", "Rejected", "Delivered"]}
      styles={(theme) => ({
        item: {
          // applies styles to selected item
          '&[data-selected]': {
            '&, &:hover': {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[1],
              color: theme.colorScheme === 'dark' ? theme.white : theme.colors.teal[9],
            },
          },
          // applies styles to hovered item (with mouse or keyboard)
          '&[data-hovered]': {},
        },
      })}
    />
  </td>
</tr>


  ));

  return (
    <Center>
         <Table mt={"100px"} style={{width:"80%"}}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", verticalAlign: "middle" }}>Product Info </th>
          <th style={{ textAlign: "center", verticalAlign: "middle" }}>Quantity</th>
          <th style={{ textAlign: "center", verticalAlign: "middle" }}>Delivery Address</th>
          <th style={{ textAlign: "center", verticalAlign: "middle" }}>Total Price</th>
          <th style={{ textAlign: "center", verticalAlign: "middle" }}>Status</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
    </Center>

  );
}
