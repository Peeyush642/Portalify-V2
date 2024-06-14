import axios from "axios";

export const cloudinaryFileUploadApi = async (formData) => {
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/de7vthitc/image/upload",
      formData
    );

    if (response.status === 200) {
      return {
        success: true,
        resp: response.data,
      };
    } else {
      return {
        success: false,
        resp: null,
      };
    }
  } catch (error) {
    console.error(error);

    return {
      success: false,
      resp: null,
    };
  }
};

export const uploadImageCloudinary = async (inputFile) => {
  try {
    if (!inputFile) {
      alert("not valid file or empty file");
      return null;
    }
    const formDataForImage = new FormData();
    formDataForImage.append("file", inputFile);
    formDataForImage.append(
      "upload_preset",
      "g7y1xz1n"
    );

    const imageURL = await cloudinaryFileUploadApi(formDataForImage);
    if (!imageURL.success || imageURL.resp === null) {
      alert("error in uploading the  image");
      return null;
    }
    return imageURL.resp.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
};