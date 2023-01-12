import { useState, useRef } from "react";

import "./UploadImage.scss";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ImageConfig } from "./UploadImgConfig";
import { Typography, Paper, IconButton, Button, Divider } from "@mui/material";
import { GetCurrentUserByEmail } from "../UserAuth/FetchUserInfo";
import { API, Storage } from "aws-amplify";
import { createImage } from "../../graphql/mutations";

const createImgs = async (imageList, setUploading) => {
  await GetCurrentUserByEmail().then((author) => {
    imageList.forEach((element) => {
      putImg(element, author, setUploading);
    });
  });
};
async function putImg(file, author, setUploading) {
  try {
    setUploading(true);
    const img = await Storage.put(file.name, file, {
      contentType: "image/png",
    });
    const data = {
      authorName: author.username,
      src: img,
    };
    await API.graphql({ query: createImage, variables: { input: data } });
    setUploading(false);
  } catch (error) {
    setUploading(false);
    console.log("Error uploading file: ", error);
  }
}

export const UploadImage = () => {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);
  const [Uploading, setUploading] = useState(false);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
  };

  return (
    <Paper elevation={3}>
      <div className="header">
        <Typography fontSize={20} fontWeight={500} mt={5}>
          Upload your art
        </Typography>
        <Divider />
      </div>
      <div className="drag-drop-container">
        <div
          ref={wrapperRef}
          className="drop-file-input"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="drop-file-input__label">
            <CloudUploadIcon sx={{ fontSize: 150, color: "secondary.main" }} />
            <Typography fontWeight={600} color="basics.black">
              Drag & Drop your images here
            </Typography>
          </div>
          <input type="file" accept="image/**" value="" onChange={onFileDrop} />
        </div>
      </div>
      {fileList.length > 0 ? (
        <>
          <Typography fontWeight={400} textAlign="center">
            Ready to upload
          </Typography>
          <div className="drop-file-preview">
            {fileList.map((item, index) => (
              <div key={index} className="drop-file-preview__item">
                <img src={ImageConfig["default"]} alt="" />
                <div className="drop-file-preview__item__info">
                  <Typography mt={1.5}>{item.name}</Typography>
                </div>
                <IconButton
                  className="drop-file-preview__item__del"
                  onClick={() => fileRemove(item)}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            ))}
          </div>
          <div className="upload-btn">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => createImgs(fileList, setUploading)}
            >
              <Typography color="basics.white">{Uploading ? "Uploading" : "Upload"}</Typography>
            </Button>
          </div>
        </>
      ) : null}
    </Paper>
  );
};
