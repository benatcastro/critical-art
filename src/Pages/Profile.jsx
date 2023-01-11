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
        top: accountSettingsPage.current.offsetTop,
        behavior: "smooth",
      });
    } else if (scrollElement === "image-settings-section") {
      window.scrollTo({
        top: imgSettingsPage.current.offsetTop,
        behavior: "smooth",
      });
    } else if (scrollElement === "upload-image-section") {
      window.scrollTo({
        top: uploadImgPage.current.offsetTop,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      {IsAuth() ? null : <p>You need to be logged</p>}
      <ProfileSidebar handleScroll={handleScroll} />
      <div
        ref={accountSettingsPage}
        style={{
          position: "absolute",
          left: "50%",
          top: "60%",
          transform: "translate(-50%, -50%)",
          width: "75%",
        }}
      >
        <AccountSettings />
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "140%",
          transform: "translate(-50%, -50%)",
          width: "75%",
          paddingBottom: "2%",
        }}
      >
        <PasswordSettings />
      </div>
      <div ref={imgSettingsPage}>
        <ImageSettings />
      </div>
      <div
        ref={uploadImgPage}
        style={{
          position: "absolute",
          left: "50%",
          top: "180%",
          transform: "translate(-50%, -50%)",
          width: "75%",
          paddingBottom: "2%",
        }}
      >
        <UploadImage />
      </div>
    </>
  );
};
