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
  Popover,
} from "@mui/material";
import { updateImage } from "../../graphql/mutations";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";

const unsetFavourite = async (id) => {
  await API.graphql({
    query: updateImage,
    variables: { input: { id: id, isFav: false } },
  });
};

const setFavourite = async (id) => {
  try {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const imageData = await API.graphql({
      query: imageByAuth,
      variables: { auth: attributes.sub },
    });
    const imageList = imageData.data.imageByAuth.items;
    const favImgs = imageList.filter((image) => image.isFav === true);
    favImgs.forEach((element) => {
      unsetFavourite(element.id);
    });
    await API.graphql({
      query: updateImage,
      variables: { input: { id: id, isFav: true } },
    });
    console.log(imageList);
  } catch (error) {
    console.log("Error updating fav img:", error);
  }
};

const saveChanges = async (data, id) => {
  try {
    if (data.favourite) setFavourite(id);
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
  const [Editing, setEditing] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [Id, setId] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
    favourite: Yup.boolean().nullable(),
  });
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      favourite: false,
    },
  });
  const onSubmit = (data) => {
    console.log("data:", data, "id", Id);
    saveChanges(data, Id);
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
                  src={image.src}
                  alt="test"
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
                  defaultValue={image.type}
                  fullWidth
                  {...register("type")}
                  error={errors.type ? true : false}
                  helperText={errors.type ? errors.type.message : null}
                  inputProps={{
                    readOnly: !Editing ? true : false,
                  }}
                />
                <Typography>Short description</Typography>
                <TextField
                  id="shortDesc"
                  name="shortDesc"
                  defaultValue={image.shortDesc}
                  fullWidth
                  {...register("shortDesc")}
                  error={errors.shortDesc ? true : false}
                  helperText={
                    errors.shortDesc ? errors.shortDesc.message : null
                  }
                  inputProps={{
                    readOnly: !Editing ? true : false,
                  }}
                />
                <Typography>Description</Typography>
                <TextField
                  id="description"
                  name="description"
                  defaultValue={image.description}
                  fullWidth
                  {...register("description")}
                  error={errors.description ? true : false}
                  helperText={
                    errors.description ? errors.description.message : null
                  }
                  inputProps={{
                    readOnly: !Editing ? true : false,
                  }}
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="favourite"
                      control={control}
                      render={({ field: props }) => (
                        <Checkbox {...props} checked={props.value} />
                      )}
                    />
                  }
                  label="Set as favourite"
                />
                <p>{image.id}</p>
                <p>{image.type}</p>
                <p>{image.shortDesc}</p>
                <p>{image.description}</p>
              </Box>
              <Button
                aria-describedby={id}
                sx={{ ml: "12.5%" }}
                variant="contained"
                color="secondary"
                onClick={
                  !Editing
                    ? () => setEditing(!Editing)
                    : (event) => {
                        setAnchorEl(event.currentTarget);
                        setId(image.id);
                      }
                }
              >
                <Typography color="basics.white">
                  {Editing ? "Save changes" : "Edit"}
                </Typography>
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Box padding={2}>
                  <Typography textAlign="center">Confirm changes</Typography>
                  <Box display="flex">
                    <Button variant="text" onClick={handleSubmit(onSubmit)}>
                      Yes
                    </Button>
                    <Button variant="text" onClick={handleClose}>
                      No
                    </Button>
                  </Box>
                </Box>
              </Popover>
            </Box>
          );
        })}
      </Paper>
    );
};
