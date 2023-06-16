import { Button } from "@mantine/core";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../libs/Firebase";
import { useState } from "react";
const UploadImage = () => {
  const [files, setFiles] = useState([]);
  const onChange = (e: any) => {
    e.preventDefault();
    setFiles(e.target.files[0]);
  };
  const uploadImage = () => {
    if (files.length !== 0) {
      const folderPath = `image/${Date.now()}`;
      const imageRef = ref(storage, folderPath);
      uploadBytes(imageRef, files).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          alert("click me : - " +url)
        });
      });
    } else return;
  };
  return (
    <>
      <input type="file" onChange={onChange} accept="image/*" />
      <Button
        onClick={uploadImage}
      >
        Upload
      </Button>
    </>
  );
};

export default UploadImage;
