import { AccountSettings } from "../Components/ProfileMenu/AccountSettings";
import { ImageSettings } from "../Components/ProfileMenu/ImageSettings";
import { ProfileSidebar } from "../Components/ProfileMenu/ProfileSidebar";
import { UploadImage } from "../Components/ProfileMenu/UploadImage";
import { IsAuth } from "../Components/UserAuth/IsAuth";
import { useState, useRef, useEffect } from "react";
import { PasswordSettings } from "../Components/ProfileMenu/PasswordSettings";

export const Profile = () => {
  const accountSettingsPage = useRef(null);
  const imgSettingsPage = useRef(null);
  const uploadImgPage = useRef(null);
  const handleScroll = (scrollElement) => {
    if (scrollElement === "account-settings-section") {
      window.scrollTo({
        top: accountSettingsPage.current.offsetTop - 100,
        behavior: "smooth",
      });
    } else if (scrollElement === "image-settings-section") {
      window.scrollTo({
        top: imgSettingsPage.current.offsetTop -100,
        behavior: "smooth",
      });
    } else if (scrollElement === "upload-image-section") {
      window.scrollTo({
        top: uploadImgPage.current.offsetTop -100,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      {IsAuth() ? null : <p>You need to be logged</p>}
      <div>
        <div style={{ position: "fixed", marginTop: -200 }}>
          <ProfileSidebar handleScroll={handleScroll} />
        </div>
        <div
          ref={accountSettingsPage}
          style={{
            width: "50%",
            margin: "200px auto",
            paddingBottom: "2%",
          }}
        >
          <AccountSettings />
        </div>
        <div
          style={{
            width: "50%",
            margin: "200px auto",
            paddingBottom: "2%",
          }}
        >
          <PasswordSettings />
        </div>
        <div
          ref={imgSettingsPage}
          style={{
            width: "50%",
            margin: "200px auto",
            paddingBottom: "2%",
          }}
        >
          <ImageSettings />
        </div>
        <div
          ref={uploadImgPage}
          style={{
            width: "50%",
            margin: "200px auto",
            paddingBottom: "2%",
          }}
        >
          <UploadImage />
        </div>
      </div>
    </>
  );
};
