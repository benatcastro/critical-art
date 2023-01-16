import { API, Auth, Storage } from "aws-amplify";
import { useState, useEffect } from "react";
import { imageByAuth } from "../../graphql/queries";
import {
  Button,
  Paper,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import { updateImage } from "../../graphql/mutations";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

const setFavourite = async (id) => {
  try {
    await API.graphql({
      query: updateImage,
      variables: { input: { id: id, isFav: true } },
    });
  } catch (error) {
    console.log("Error updating fav img:", error);
  }
};

const saveChanges = async (data, id) => {
  try {
    if (data.isFav) {
      setFavourite(id);
    }
    const inputData = {
      id: id,
      type: data.type,
      shortDesc: data.shortDesc,
      description: data.description,
    };
    await API.graphql({ query: updateImage, variables: { input: inputData } });
  } catch (error) {
    console.log("Error updating img:", error);
  }
};

export const ImageSettings = () => {
  const [Images, setImages] = useState([]);
  const [Editing, setEditing] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    fetchImages();
  }, []);
  const fetchImages = async () => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const imageData = await API.graphql({
      query: imageByAuth,
      variables: { auth: attributes.sub },
    });
    const imageList = imageData.data.imageByAuth.items;
    await Promise.all(
      imageList.map(async (image) => {
        image.src = image.src.substring(image.src.indexOf("=") + 1);
        image.src = image.src.substring(0, image.src.length - 1);
        const url = await Storage.get(image.src);
        image.src = url;
        return image;
      })
    );
    setImages(imageList);
    setHasLoaded(true);
  };
  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Type is required"),
    shortDesc: Yup.string().required("Short description is required"),
    description: Yup.string().required("Description is required"),
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data) => {
    console.log("data:", data, id);
    saveChanges(data, id);
  };
  if (hasLoaded)
    return (
      <Paper elevation={3} style={{ paddingBottom: "2%" }}>
        {Images.map((image) => {
          return (
            <Box key={image.id}>
              <Box
                width="100%"
                display="flex"
                alignContent="center"
                alignItems="center"
              >
                <img
                  className={image.id}
                  key={image.id}
                  src={image.src}
                  alt=""
                  style={{
                    width: "75%",
                    margin: "2% auto",
                  }}
                />
              </Box>
              <Box ml="12.5%" mb={1} width="50%">
                <Typography>Type</Typography>
                <TextField
                  id="type"
                  name="type"
                  fullWidth
                  {...register("type")}
                  defaultValue={image.type}
                  inputProps={{
                    readOnly: !Editing ? true : false,
                  }}
                />
                <Typography>Short description</Typography>
                <TextField
                  id="shortDesc"
                  name="shortDesc"
                  fullWidth
                  {...register("shortDesc")}
                  defaultValue={image.shortDesc}
                  inputProps={{
                    readOnly: !Editing ? true : false,
                  }}
                />
                <Typography>Description</Typography>
                <TextField
                  id="description"
                  name="description"
                  fullWidth
                  {...register("description")}
                  defaultValue={image.description}
                  inputProps={{
                    readOnly: !Editing ? true : false,
                  }}
                />
                <FormControlLabel
                  style={{ display: "flex" }}
                  control={<Checkbox />}
                  label="Favourite image"
                  {...register("isFav")}
                />
              </Box>
              <Button
                sx={{ ml: "12.5%" }}
                variant="contained"
                color="secondary"
                onMouseOver={() => setId(image.id)}
                onClick={handleSubmit(onSubmit)}
              >
                <Typography color="basics.white">
                  {Editing ? "Save changes" : "Edit"}
                </Typography>
              </Button>
            </Box>
          );
        })}
      </Paper>
    );
};
