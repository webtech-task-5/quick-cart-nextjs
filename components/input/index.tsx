import React from "react";
import { TextInput } from "@mantine/core";

export default function DefaultTextInput({
  style,
  p = "sm",
  label,
  placeholder,
  props,
  withAsterisk = true,
}: {
  style?: React.CSSProperties;
  p?: string;
  label: string;
  placeholder: string;
  props?: any;
  withAsterisk?: boolean;
}) {
  return (
    <TextInput
      withAsterisk={withAsterisk}
      variant="filled"
      sx={{
        "& input": {
          radius: "lg",
          fontWeight: "500",
          color: "#808080",
          padding: "0 22px",
          borderRadius: " 40px",
          border: "1px solid #D8D8D8",
          height: "47px",
          width: "100%",
        },
        ...style,
      }}
      p={p}
      label={label}
      placeholder={placeholder}
      {...props}
    />
  );
}
// form.getInputProps('number')
