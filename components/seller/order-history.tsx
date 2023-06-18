import { Table } from "@mantine/core";
import React from "react";

export default function OrderHistory() {
  const elements = [
    { name: "6", position: "Carbon", symbol: "C", mass: "12.011" },
    { name: "7", position: "Nitrogen", symbol: "N", mass: "14.007" },
  ];
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Element position</th>
          <th>Element name</th>
          <th>Symbol</th>
          <th>Atomic mass</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
