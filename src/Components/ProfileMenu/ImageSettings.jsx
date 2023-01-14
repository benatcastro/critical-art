import { API, Auth, Storage } from "aws-amplify";
import { useState, useEffect } from "react";
import { imageByAuth } from "../../graphql/queries";
import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const ImageSettings = () => {
  const [Images, setImages] = useState([]);
  const [editing, setEdit] = useState();
  const [hasLoaded, setHasLoaded] = useState(false);
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
  if (hasLoaded)
    return (
      <Paper elevation={3} style={{ paddingBottom: "2%" }}>
        {Images.map((image, index) => {
          return (
            <>
              <Box
                key={image.id}
                width="100%"
                display="flex"
                alignContent="center"
                alignItems="center"
              >
                <img
                  key={image.id}
                  src={image.src}
                  alt=""
                  style={{
                    width: "75%",
                    margin: "2% auto",
                  }}
                />
				<Typography>{editing && editing ? "editing" : null}</Typography>
              </Box>
              <Box ml="12.5%" key={index}>
                <Button
                  key={index}
                  variant="contained"
                  color="secondary"
                  onClick={() => setEdit(image)}
                >
                  <Typography color="basics.white">Edit</Typography>
                </Button>
              </Box>
            </>
          );
        })}
      </Paper>
    );
};
