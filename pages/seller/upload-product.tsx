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
import { useState } from 'react';
import { Text, Image, SimpleGrid, AppShell } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import NavbarMinimal from '../../components/seller/navbar';

export default function Demo() {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [active, setActive] = useState(1);
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
    <AppShell navbar={<NavbarMinimal active={active} setActive={setActive}/>}>
       <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
        <Text align="center">Drop images here</Text>
      </Dropzone>

      <SimpleGrid
        cols={4}
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
        mt={previews.length > 0 ? 'xl' : 0}
      >
        {previews}
      </SimpleGrid>
    </AppShell>
  );
}
