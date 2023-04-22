import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { uploadVideo } from "./api/apiVideos";
import axios from "axios";


export const Form = () => {
  const [title, setTitle] = useState("Title test");
  const [description, setDescription] = useState("Dashboard description test");
  const [categories, setCategories] = useState([{category: "6436d9e2c348c5bd3e389367"}]);
  const [models, setModels] = useState([{model: "6436e0fb119019f4e15d4053"}, {model: "6436e0f6119019f4e15d4051"}]);
  const [quality, setQuality] = useState(1080);
  const [duration, setDuration] = useState(20);
  const [page, setPage] = useState(5);
  const [miniature, setMiniature] = useState();
  const [preview, setPreview] = useState();
  const [short, setShort] = useState();
  const [video, setVideo] = useState();

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    switch (field) {
      case "miniature":
        if (file == null) {
          return;
        } else {
          reader.onload = () => {
            setMiniature(file);
          };
        }
        break;
      case "preview":
        if (file == null) {
          return;
        } else {
          reader.onload = () => {
            setPreview(file);
          };
        }
        break;
      case "short":
        if (file == null) {
          return;
        } else {
          reader.onload = () => {
            setShort(file);
          };
        }
        break;
      case "full":
        if (file == null) {
          return;
        } else {
          reader.onload = () => {
            setVideo(file);
          };
        }
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("videoName", video.name);
    formData.append("videoContent", video);
    formData.append("shortName", short.name);
    formData.append("shortContent", short);
    formData.append("previewName", preview.name);
    formData.append("previewContent", preview);
    formData.append("miniatureName", miniature.name);
    formData.append("miniatureContent", miniature);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categories", JSON.stringify(categories));
    formData.append("models", JSON.stringify(models));
    formData.append("quality", quality);
    formData.append("duration", duration);
    formData.append("page", page);

    const body = {
      videoName: video.name,
      shortName: short.name,
      previewName: preview.name,
      miniatureName: miniature.name,
      title: title,
      description: description,
      categories: [{category: "6436d9e2c348c5bd3e389367"}],
      models: [{model: "6436e0fb119019f4e15d4053"}, {model: "6436e0f6119019f4e15d4051"}],
      quality: quality,
      duration: duration,
      page: page,
      formData: formData,
    }

    try {
      const response = await axios.post(
        "http://localhost:3977/api/v1//video/uploadVideoFile",
        formData
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        {/* <div>
        <label className={`${styles.kanitForm}`}>Title</label>
        <input
          required
          className={`${styles.expand}`}
          type="text"
          pattern="[0-9a-zA-Z ]{1,50}"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        </div>

        <div>
          <label className={`${styles.kanitForm}`}>Description</label>
          <br />
          <input
            className={`${styles.expand}`}
            type="text"
            pattern="[0-9a-zA-Z ]+"
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div> */}

        <div>
          <label className={`${styles.kanitForm}`}>Miniature</label>
          <input
            type="file"
            name="alternate-face"
            className={`${styles.expand}`}
            onChange={(e) => handleFileChange(e, "miniature")}
          />
        </div>

        <div>
          <label className={`${styles.kanitForm}`}>Preview</label>
          <br />
          <input
            required
            className={`${styles.expand}`}
            type="file"
            accept="video/*"
            onChange={(e) => handleFileChange(e, "preview")}
          ></input>
        </div>

        <div>
          <label className={`${styles.kanitForm}`}>Short Video</label>
          <br />
          <input
            required
            className={`${styles.expand}`}
            type="file"
            accept="video/*"
            onChange={(e) => handleFileChange(e, "short")}
          ></input>
        </div>

        <div>
          <label className={`${styles.kanitForm}`}>Full Video</label>
          <br />
          <input
            required
            className={`${styles.expand}`}
            type="file"
            accept="video/*"
            onChange={(e) => handleFileChange(e, "full")}
          ></input>
        </div>

        <button
          type="submit"
          className={`${styles.expand}`}
          style={{ marginTop: "10px" }}
          accept="video/*"
        >
          UPLOAD
        </button>
      </form>
    </>
  );
};