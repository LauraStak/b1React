import React from "react";
import { Button } from "@mui/material";
import axios from "axios";

const ImageUpload = (props: { uploaded: (url: string) => void }) => {
  const upload = async (files: FileList | null) => {
    if (files === null) return;

    const formData = new FormData();
    formData.append("image", files[0]);
    const { data } = await axios.post("upload", formData);

    props.uploaded(data.url);
  };
  return (
    <Button variant="text" component="label">
      Upload
      <input type="file" hidden onChange={(e) => upload(e.target.files)} />
    </Button>
  );
};

export default ImageUpload;
