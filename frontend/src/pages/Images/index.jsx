import Loader from "@/components/app/Loader";
import { Button } from "@/components/ui/button";
import {
  useGetAllImageQuery,
  useUpdateViewsMutation,
} from "@/redux/api/imageSlice";
import React, { useEffect, useState } from "react";
import { ImSwitch } from "react-icons/im";
import { RiEarthFill } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { FaInfo } from "react-icons/fa6";
import { BsInfoCircleFill } from "react-icons/bs";
import { IoMdDownload } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch } from "react-redux";
import { FaEye } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router";
import { useLogoutMutation } from "@/redux/api/userSlice";
import { toast } from "react-toastify";
import { setCredentials } from "@/redux/features/authSlice";
const AllImages = () => {
  const { data: allImages, isLoading, refetch } = useGetAllImageQuery();
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState(null);
  const [openInfo, setOpenInfo] = useState(false);
  const [updateViews] = useUpdateViewsMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const downloadHandler = async (url, name) => {
    console.log(url, name);

    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const aTag = document.createElement("a");
    aTag.href = blobUrl;
    aTag.setAttribute("download", name);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
    window.URL.revokeObjectURL(blobUrl);
  };

  console.log(allImages);

  const handleImageClick = async (img) => {
    try {
      setImage(img);
      setShowImage(true);
      dispatch(updateViews(img._id));
    } catch (error) {}
  };

  const handleCancel = () => {
    refetch();
    setImage(null);
    setShowImage(false);
  };

  return (
    <div className="w-[100vw] overflow-x-hidden min-h-[100vh]  bg-white flex flex-col">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full overflow-clip min-h-[10vh] bg-[#f7f7f7] text-first border-b-slate-200 border-[2px] mb-8 flex gap-4 items-center justify-between px-10 sm:px-5 text-[35px] sm:text-[25px] ">
            <div className="font-sans text-center text-3xl sm:text-2xl text-[#263238] font-semibold ">
              UploadnGrab
            </div>
            <div className="flex gap-4 items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <FaCloudUploadAlt
                      onClick={() => navigate("/private/upload")}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Upload new Image</p>
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
          <div className="w-[100vw]  overflow-clip lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 px-10  p-6 grid grid-cols-4 bg-white">
            {allImages?.map((i) => {
              return (
                <div
                  key={i._id}
                  onClick={() => handleImageClick(i)}
                  className="relative"
                >
                  <img
                    src={i.imageUrl}
                    className="border-2  border-dashed border-first object-contain aspect-square h-fit"
                    alt=""
                  />
                  <div className="absolute flex gap-1 items-center rounded-ss-lg justify-center px-3 py-2 border-black border-[1px] bg-white text-first bottom-0 right-0">
                    <FaEye />
                    {i.views}
                  </div>
                </div>
              );
            })}
          </div>
          {showImage && (
            <div className="fixed z-50 left-0 top-0 flex justify-center items-center bg-black/95 w-[100vw] h-[100vh] ">
              <div className="w-[80vw] relative flex flex-col items-center bg-white h-[80vh] rounded-lg">
                <div className="flex w-[90%] vsm:w-[100%] mt-4 gap-3 h-[10%] items-center justify-end sm:justify-center vsm:justify-end px-6">
                  <Button
                    onClick={() => setOpenInfo(true)}
                    className="flex items-center gap-2"
                  >
                    <span className="vsm:hidden">More Info</span>
                    {/* <FaInfo /> */}
                    <BsInfoCircleFill />
                  </Button>
                  <Dialog
                    open={openInfo}
                    className="text-white"
                    onOpenChange={setOpenInfo}
                  >
                    <DialogContent className="w-full text-white border-none  px-0 bg-black/90 ">
                      <DialogHeader className="bg-black/90 text-white px-0 w-full flex justify-center items-center ">
                        <DialogTitle className="text-xl text-white font-serif tracking-wider capitalize">
                          Info
                        </DialogTitle>
                        <DialogDescription className="w-[85%] text-white text-[16px] flex flex-col justify-center items-start ">
                          <div className="">
                            <span className="font-serif font-semibold text-lg tracking-wide">
                              Title :
                            </span>{" "}
                            {image.title}
                          </div>
                          <div className="">
                            {" "}
                            <span className="font-serif font-semibold text-lg tracking-wide">
                              Views :
                            </span>{" "}
                            {image.views}
                          </div>
                          <div className="">
                            <span className="font-serif font-semibold text-lg tracking-wide">
                              Description :
                            </span>{" "}
                            {image.description}
                          </div>
                          {/* <ScrollArea className="w-full h-[200px] rounded-md mt-3 mb-2  "></ScrollArea> */}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <Button
                    onClick={() => {
                      downloadHandler(image.imageUrl, image.title);
                    }}
                    className="flex items-center gap-2"
                  >
                    <span className="vsm:hidden">Download</span>
                    <IoMdDownload className="text-[18px]" />
                  </Button>
                </div>
                <div className="w-[90%] h-[90%] flex justify-center items-center ">
                  <img
                    className="w-fit  object-contain aspect-square h-[80%]"
                    src={image.imageUrl}
                    alt=""
                  />
                </div>
                <div
                  onClick={handleCancel}
                  className="absolute text-[20px] text-white left-[-40px] usm:left-[0px] usm:top-[-35px] top-[4px]  "
                >
                  <ImCross />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllImages;
