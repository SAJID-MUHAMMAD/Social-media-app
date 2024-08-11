import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useSelector } from "react-redux";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { GiCrossMark } from "react-icons/gi";

const Profile = () => {
  const loggedUser = useSelector((state) => state.loggedUser.user);

  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState();
  const handelChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };
  const handelClose = () => {
    setImage("");
    setCropData("");
  };
  return (
    <div className="p-10 bg-[#f4f4f4] w-fit flex flex-col items-center m-auto mt-16 shadow">
      {image && (
        <div className="absolute top-o left-1/2 -translate-x-1/2 w-fit bg-brand z-50">
          <div className="p-2 flex items-center justify-between">
            <p className="text-xl text-white">Coutomize Your Image</p>
            <GiCrossMark
              className="text-xl text-red-600 cursor-pointer"
              onClick={handelClose}
            />
          </div>
          <Cropper
            style={{ height: 400, width: "100%" }}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={true}
          />
          <div className="flex justify-center py-4">
            <button
              onClick={getCropData}
              className="text-brand py-3 px-5 bg-white rounded-xl font-semibold"
            >
              Crop Image
            </button>
          </div>
          {cropData && (
            <div className="w-24 h-24 relative rounded-full overflow-hidden m-auto border-white border-2 mb-4">
              <img src={cropData} alt="" className="w-full" />
            </div>
          )}
        </div>
      )}
      <div className="w-24 h-24 relative rounded-full overflow-hidden group">
        <img src={loggedUser?.photoURL} className="w-full" alt="profile" />
        <label
          htmlFor="img"
          className="w-full h-full scale-0 group-hover:scale-100 transition-all absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] cursor-pointer flex items-center justify-center"
        >
          <CiCirclePlus className="text-3xl text-white" />
          <input
            id="img"
            className="hidden"
            type="file"
            onChange={handelChange}
          />
        </label>
      </div>
      <h2 className="title capitalize">{loggedUser.displayName}</h2>
    </div>
  );
};

export default Profile;
