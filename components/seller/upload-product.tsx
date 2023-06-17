import React, { useState, useEffect } from "react";
import {
  Stepper,
  Group,
  Card,
  Center,
  Text,
  Container,
  SimpleGrid,
  Image,
  Select,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import DefaultTextInput from "../../components/input";
import {uploadImage} from "../../libs/Firebase"
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import DefaultButton from "components/button";

export default function UploadProduct() {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [value, setValue] = useState<string | null>("rug");
  const [imgList, setImgList] = useState<any>([]);
  const form = useForm({
    initialValues: {
      name: "",
      price: 0,
      spec: "",
      category: value,
      imagelist: null,
    },

    validate: {
        name: (value) => (value ? null : "Invalid name"),
        price: (value) => (value ? null : "Invalid price"),
        spec: (value) => (value ? null : "Invalid specifications"),
    },
  });
  const onSubmit = async (values: { name?: string; price?: number; spec?: string; category?: string | null; imagelist?: null; number?: any; comname?: any; key?: any; code?: any; bankacc?: any; }) => {
    console.log({ values });
  };

  const previews = files.map((file, index) => {
    setImgList((prev: void[]) => prev.push(uploadImage(file)))
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Center>
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <Card style={{ width: "850px", height: "auto" }} withBorder>
            <Dropzone
              accept={IMAGE_MIME_TYPE}
              onDrop={setFiles}
              radius={"lg"}
              {...form.getInputProps("imagelist")}
            >
              <Text align="center">Drop product images here</Text>
            </Dropzone>
            <SimpleGrid
              cols={4}
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
              mt={previews.length > 0 ? "xl" : 0}
            >
              {previews}
            </SimpleGrid>
            <Select
              label="Product category"
              value={value}
              onChange={setValue}
              variant="filled"
              radius={"lg"}
              px="lg"
              sx={{
                color: "#000000",
                cursor: "pointer",
                fontSize: "13px",
                borderColor: "#D8D8D8",
                // display: "inline-block",
                fontWeight: "610 !important",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                height: "50px !important",
                marginTop: "20px",
                marginBottom: "20px",
              }}
              placeholder="Pick one"

              data={[
                { value: "rug", label: "Rug" },
                { value: "doormat", label: "Doormat" },
                { value: "curtain", label: "Curtain" },
              ]}
                {...form.getInputProps("category")}
            />
            <DefaultTextInput
              label="Product name"
              placeholder="abc"
              props={{ mt: "lg", ...form.getInputProps("name") }}
            />

            <DefaultTextInput
              label="price"
              placeholder="+880 11111111111"
              props={{ ...form.getInputProps("price") }}
            />

            <Textarea
              label="Product Specification"
              radius={"lg"}
              px="lg"
              placeholder="Write about your product"
              { ...form.getInputProps("spec") }
            />
            <DefaultButton text="Submit" props={{type:'submit'}}/>
          </Card>
        </form>
      </Center>
    </div>
  );
}
