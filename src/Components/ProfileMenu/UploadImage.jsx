import { useState, useRef } from "react";
import PropTypes from "prop-types";

import "./UploadImage.scss";
import CloseIcon from "@mui/icons-material/Close";
import { ImageConfig } from "./UploadImgConfig";
import uploadImg from "./Assets/cloud-upload-regular-240.png";
import { Typography, Paper, IconButton, Button } from "@mui/material";

export const UploadImage = (props) => {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

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
      <div className="drag-drop-container">
        <div
          ref={wrapperRef}
          className="drop-file-input"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="drop-file-input__label">
            <img src={uploadImg} alt="" />
            <Typography color="basics.black">
              Drag & Drop your files here
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
                <img
                  src={
                    ImageConfig[item.type.split("/")[1]] ||
                    ImageConfig["default"]
                  }
                  alt=""
                />
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
            <Button>Upload</Button>
          </div>
        </>
      ) : null}
    </Paper>
  );
};

UploadImage.propTypes = {
  onFileChange: UploadImage.func,
};
