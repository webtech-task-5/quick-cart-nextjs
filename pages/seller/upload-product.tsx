// import { Button } from "@mantine/core";
// import {  uploadImage } from "../../libs/Firebase";
// import { useState } from "react";
// const UploadImage = () => {
//   const [files, setFiles] = useState<Blob | Uint8Array | ArrayBuffer | null>( null);
//   const onChange = (e: any) => {
//     e.preventDefault();
//     setFiles(e.target.files);
//   };

//   const handleUploadClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
//     event.preventDefault();
//     if(files){
//       uploadImage(files);
//     }

//   };

//   return (
//     <>
//       <input type="file" onChange={onChange} accept="image/*" />
//       <Button
//         onClick={handleUploadClick}
//       >
//         Upload
//       </Button>
//     </>
//   );
// };

// export default UploadImage;
import React, { useState } from "react";
import { Text, Image, SimpleGrid, AppShell } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import NavbarMinimal from "../../components/seller/navbar";
import Dashboard from "../../components/seller/dashboard";
import DefaultButton from "components/button";
export default function Demo() {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [active, setActive] = useState(1);
  const demoData = [
    { title: "REVENUE", value: "13,456", diff: 1000 },
    { title: "PROFIT", value: "13,456", diff: 1000 },
    { title: "COUPON USAGE", value: "13,456", diff: 1000 },
    { title: "NEW CUSTOMER", value: "13,456", diff: 1000 },
  ];
  const previews = files.map((file, index) => {
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
    <AppShell navbar={<NavbarMinimal active={active} setActive={setActive} />}>
      {active == 1 && <Dashboard data={demoData} />}
      <DefaultButton text="Upload a Product" width="100%" />
      <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
        <Text align="center">Drop images here</Text>
      </Dropzone>

      <SimpleGrid
        cols={4}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        mt={previews.length > 0 ? "xl" : 0}
      >
        {previews}
      </SimpleGrid>
    </AppShell>
  );
}
