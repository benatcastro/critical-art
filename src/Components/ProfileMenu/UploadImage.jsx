import { useState } from "react";
import { IconButton, Paper } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";

export const UploadImage = () => {
  const [Files, setFiles] = useState([]);
  return (
    <Paper style={{ textAlign: "center" }} elevation={3}>
      <IconButton>
        <label htmlFor={"upload-button"}>
          <div className="chooseFile">
            <PublishIcon style={{ mr: 10, width: 20 }} />
          </div>
        </label>
      </IconButton>
      <input
        type="file"
        accept="image/**"
        id="upload-button"
        style={{ display: "none" }}
        onChange={(e) => setFiles(e.target.files)}
      />
    </Paper>
  );
};
