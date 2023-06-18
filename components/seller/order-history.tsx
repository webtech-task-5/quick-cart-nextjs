import { Center, Select, Table, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
type Product = {
  info: {
    imageSrc: string;
    name: string;
    price: string;
    orderTime: string;
  };
  quantity: string;
  tprice: string;
  deliverAddress: string;
  status: "Pending" | "Accepted" | "Rejected" | "Delivered";
};
import axios from "axios";
export default function OrderHistory() {
  const elements: Product[] = [
    {
      info: {
        imageSrc: "/images/icons/user.png",
        name: "abd",
        price: "100",
        orderTime: "23/06/23",
      },
      quantity: "2",
      tprice: "2*100",
      deliverAddress: "Bagan Bari, CTG",
      status: "Pending",
    },
    {
      info: {
        imageSrc: "/images/icons/user.png",
        name: "abd",
        price: "100",
        orderTime: "23/06/23",
      },
      quantity: "2",
      tprice: "2*100",
      deliverAddress: "Bagan Bari, CTG",
      status: "Pending",
    },
  ];

  const [data, setData] = useState([]);

  const callAccepted = async (id: string,type:string) => {
    console.log(id);
    try{
      const result = await axios.put("/api/order?id=" + id + "&type="+type);
      if (result.status === 200) {
        alert(`Order ${type} successfully`);
        window.location.reload();
      } else {
        alert("Something went wrong");
      }
    }
    catch(err:any){
      console.log(err);
      alert(err.message);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token") as string;
      const decoded = jwt.decode(token) as any;
      const bankId = decoded._doc?.bankAccount;
      const result = await axios(
        "/api/order?bankId=" + bankId + "&type=" + "seller"
      );
      console.log(result.data);
      setData(result.data);
    };
    fetchData();
  }, []);
  const rows = data.map((element, key) => (
    <tr key={key} style={{ alignItems: "center" }}>
      <td style={{ textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={element.productId.images[0]}
            alt="Bonnie image"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "10px",
            }}
          >
            <Text weight="bold">{element.productId.name}</Text>
            <Text weight="bold">{element.productId.price} taka</Text>
            <Text weight="bold">{processTime(element.createdAt)}</Text>
          </div>
        </div>
      </td>
      <td style={{ textAlign: "center", verticalAlign: "middle" }}>
        {element.quantity}
      </td>
      <td style={{ textAlign: "center", verticalAlign: "middle" }}>
        {processAddress(
          element.address,
          element.city,
          element.zip,
          element.country
        )}
      </td>
      <td style={{ textAlign: "center", verticalAlign: "middle" }}>
        {element.productId.price * element.quantity}
      </td>
      <td
        style={{ textAlign: "center", verticalAlign: "middle", width: "150px" }}
      >
        <Select
          placeholder="Custom active styles"
          size="xs"
          label="Custom active styles"
          defaultValue={element.status}
          data={["Pending", "Accepted", "Rejected", "Delivered"]}
          onChange={(value) => {
            console.log(value);
            if (value === "Pending") return;
            if (value === "Accepted") callAccepted(element._id,"Accepted");
            if (value === "Rejected") callAccepted(element._id,"Rejected");
            if (value === "Delivered") callAccepted(element._id,"Delivered");
          }}
          styles={(theme) => ({
            item: {
              // applies styles to selected item
              "&[data-selected]": {
                "&, &:hover": {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.teal[9]
                      : theme.colors.teal[1],
                  color:
                    theme.colorScheme === "dark"
                      ? theme.white
                      : theme.colors.teal[9],
                },
              },
              // applies styles to hovered item (with mouse or keyboard)
              "&[data-hovered]": {},
            },
          })}
        />
      </td>
    </tr>
  ));

  return (
    <Center>
      <Table mt={"100px"} style={{ width: "80%" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", verticalAlign: "middle" }}>
              Product Info{" "}
            </th>
            <th style={{ textAlign: "center", verticalAlign: "middle" }}>
              Quantity
            </th>
            <th style={{ textAlign: "center", verticalAlign: "middle" }}>
              Delivery Address
            </th>
            <th style={{ textAlign: "center", verticalAlign: "middle" }}>
              Total Price
            </th>
            <th style={{ textAlign: "center", verticalAlign: "middle" }}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Center>
  );
}
const processAddress = (
  address: string,
  city: string,
  zip: string,
  country: string
) => {
  return address + ", " + city + ", " + zip + ", " + country;
};
const processTime = (time: string) => {
  const date = new Date(time);
  return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
};
