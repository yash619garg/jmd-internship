import { InputAdornment, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import TitleRoundedIcon from "@mui/icons-material/TitleRounded";
import { Button } from "@/components/ui/button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import {
  useCreateImageMutation,
  useUploadImageMutation,
} from "@/redux/api/imageSlice";
import { ImImages, ImSwitch } from "react-icons/im";
import { RiEarthFill } from "react-icons/ri";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router";
import { TbLogout } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "@/redux/api/userSlice";
import { setCredentials } from "@/redux/features/authSlice";

const UploadImage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [uploadImage] = useUploadImageMutation();
  const [createImage] = useCreateImageMutation();

  const handleImageClick = () => {
    imageRef.current.click();
  };

  const [logout] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      const response = await logout().unwrap();
      dispatch(setCredentials(null));
      navigate("/auth");
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message || error.data.error);
    }
  };

  const handleImageChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        throw new Error("please select image");
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const response = await uploadImage(formData);
      console.log(response);
      setImageUrl(response?.data?.url);
      setLoading(false);
      //   console.log(response);
    } catch (error) {
      setLoading(false);
      toast.error(error?.message || error?.data?.error);
    }
  };

  const uploadImageHandler = async () => {
    try {
      if (!imageUrl || !title || !description) {
        throw new Error("please provide all data");
      }
      const response = await createImage({ imageUrl, title, description });
      setTitle("");
      setDescription("");
      setImageUrl("");
      toast.success("image uploaded successfully");
    } catch (error) {
      toast.error(error?.message || error?.data?.error);
    }
  };

  return (
    <div className="w-full bg-white flex items-center min-h-[100vh] flex-col">
      <div className="w-full overflow-clip min-h-[10vh] bg-[#f7f7f7] text-first border-b-slate-200 border-[2px] mb-8 flex gap-4 items-center justify-between px-10 sm:px-5 text-[35px] sm:text-[25px] ">
        <div className="font-sans text-center text-3xl sm:text-2xl text-[#263238] font-semibold ">
          UploadnGrab
        </div>
        <div className="flex gap-4 items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <ImImages onClick={() => navigate("/private/images")} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Explore Images</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <TbLogout onClick={() => logoutHandler()} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="w-full flex flex-col gap-6 capitalize items-center text-center">
        <div className="text-4xl sm:text-3xl my-4 font-serif font-semibold ">
          Upload your media
        </div>
        <div className="w-[60%] py-10 lg:w-[85%] md:w-[90%] vsm:w-full gap-8 md:flex-col justify-center sm:w-full bg-white flex items-center">
          <div className="w-1/2 md:w-full px-5">
            <div
              onClick={handleImageClick}
              className="w-full h-[400px] vsm:h-[300px] bg-[#f7f7f7] border-dashed border-slate-400 border-[2px]"
            >
              {imageUrl ? (
                <div className="w-full h-full">
                  <img
                    src={imageUrl}
                    className="flex w-full h-full justify-center items-center object-contain "
                    alt=""
                  />
                </div>
              ) : (
                <div className="w-full h-full flex flex-col gap-2 justify-center items-center text-first ">
                  <FaCloudUploadAlt className="text-8xl" />
                  <div className="font-semibold text-xl ">Browse File</div>
                </div>
              )}
            </div>
          </div>
          <Input
            type="file"
            ref={imageRef}
            className="hidden"
            onChange={handleImageChange}
            accept=".png , .jpg , .jpeg , .svg , .webp"
            name="image"
          />
          <div className="w-1/2 md:w-full h-[400px] flex flex-col items-center px-5">
            <TextField
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              label="Title"
              style={{ width: "100%" }}
              variant="outlined"
            />
            <TextField
              id="standard-multiline-static"
              label="Description"
              multiline
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              rows={9}
              style={{ marginTop: "20px", width: "100%" }}
              variant="outlined"
            />
            <Button
              onClick={uploadImageHandler}
              className="w-full h-[60px] py-4 bg-first hover:bg-[#324042] mt-8 "
            >
              Upload Image
            </Button>
          </div>
        </div>
      </div>
      {loading && (
        <div className="w-[100vw] fixed left-0 top-0 text-[16px] text-white h-[100vh] bg-black/90 flex justify-center items-center">
          uploading......
        </div>
      )}
    </div>
  );
};

export default UploadImage;
