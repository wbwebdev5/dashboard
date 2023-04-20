import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { uploadVideo } from "./api/apiVideos";

export const Form = () => {
  const [categoryOptions, setCategoryOptions] = useState([
    { id: "1", name: "Cat" },
    { id: "2", name: "Cat2" },
    { id: "3", name: "Cat3" },
  ]);
  const [modelOptions, setModelOptions] = useState([
    { id: "1", name: "Mod" },
    { id: "2", name: "Mod2" },
    { id: "3", name: "Mod3" },
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [catTemp, setCatTemp] = useState("");
  const [models, setModels] = useState([]);
  const [modTemp, setModTemp] = useState("");
  const [quality, setQuality] = useState(1080);
  const [duration, setDuration] = useState(0);
  const [page, setPage] = useState(5);
  const [miniature, setMiniature] = useState();
  const [preview, setPreview] = useState();
  const [short, setShort] = useState();
  const [video, setVideo] = useState();

  const addCategory = (e) => {
    e.preventDefault();
    const exist = categoryOptions.find((category) => category == catTemp);
    if (!exist) {
      return
    }
    const repeated = categories.find((categorie) => categorie == catTemp);
    if (!repeated) {
      setCategories([catTemp, ...categories]);
    }
  };

  const addModel = (e) => {
    e.preventDefault();
    const exist = modelOptions.find((model) => model == modTemp);
    if (!exist) {
      return
    }
    const repeated = models.find((model) => model == modTemp);
    if (!repeated) {
      setModels([modTemp, ...models]);
    }
  };

  const hanldeInputChange = ({ target }, origin) => {
    switch (origin) {
      case "miniature":
        if (target.files[0] == null) {
          return;
        } else {
          setMiniature(target.files);
        }
        break;
      case "preview":
        if (target.files[0] == null) {
          return;
        } else {
          setPreview(target.files);
        }
        break;
      case "short":
        if (target.files[0] == null) {
          return;
        } else {
          setShort(target.files);
        }
        break;
      case "full":
        if (target.files[0] == null) {
          return;
        } else {
          setVideo(target.files);
        }
        break;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault()
    if (
      categories == [] ||
      models == [] ||
      categories == null ||
      models == null
    ) {
      return;
    }
    const object = {
      videoName: video?.[0]?.name,
      videoContent: video,
      shortName: short?.[0].name,
      shortContent: short,
      previewName: preview?.[0].name,
      previewContent: preview,
      miniatureName: miniature?.[0].name,
      miniatureContent: miniature,
      title: title,
      description: description,
      categories: categories,
      models: models,
      quality: quality,
      duration: duration,
      page: page,
    };

    const sendData = await uploadVideo(object);
  };

  return (
    <div>
      <form className={`${styles.formulario}`} onSubmit={(e) => submitHandler(e)}>
        <label className={`${styles.kanitForm}`}>Title</label>
        <br />
        <input
          required
          className={`${styles.expand}`}
          type="text"
          pattern="[0-9a-zA-Z ]{1,50}"
          onChange={(e) => setTitle(e.target.value)}
        ></input>

        <label className={`${styles.kanitForm}`}>Description</label>
        <br />
        <input
          className={`${styles.expand}`}
          type="text"
          pattern="[0-9a-zA-Z ]+"
          onChange={(e) => setDescription(e.target.value)}
        ></input>

        <label className={`${styles.kanitForm}`}>Categories</label>
        <br />
        <input
          required
          style={{ width: "90%", marginRight: "5px", height: "25px" }}
          type="text"
          list="categories"
          autoComplete="off"
          onChange={(e) => setCatTemp(e.target.value)}
        />
        <datalist id="categories">
          {categoryOptions?.map((cat) => {
            return (
              <option key={cat.id} data-value={cat.id}>
                {cat.name}
              </option>
            );
          })}
        </datalist>
        <button style={{ width: "9%" }} onClick={(e) => addCategory(e)}>
          Add
        </button>
        {categories.map((category, i) => {
          return (
            <label key={i} style={{ fontFamily: "Kanit" }}>
              {category}{" "}
            </label>
          );
        })}
        <br />

        <label className={`${styles.kanitForm}`}>Models</label>
        <br />
        <input
          required
          style={{ width: "90%", marginRight: "5px", height: "25px" }}
          type="text"
          list="models"
          autoComplete="off"
          onChange={(e) => setModTemp(e.target.value)}
        />
        <datalist id="models">
          {modelOptions?.map((mod) => {
            return (
              <option key={mod.id} data-value={mod.id}>
                {mod.name}
              </option>
            );
          })}
        </datalist>
        <button style={{ width: "9%" }} onClick={(e) => addModel(e)}>
          Add
        </button>
        {models.map((model, i) => {
          return (
            <label key={i} style={{ fontFamily: "Kanit" }}>
              {model}{" "}
            </label>
          );
        })}
        <br />

        <label className={`${styles.kanitForm} ${styles.textMargin}`}>
          Quality
        </label>
        <label className={`${styles.kanitForm} ${styles.textMargin2}`}>
          Duration
        </label>
        <label className={`${styles.kanitForm}`}>Page</label>
        <br />

        <select
          className={`${styles.expandMin}`}
          onChange={(e) => setQuality(e.target.value)}
        >
          <option value={480}>480</option>
          <option value={720}>720</option>
          <option value={1080}>1080</option>
          <option value={4000}>4000</option>
        </select>
        <input
          required
          className={`${styles.expandMin}`}
          type="number"
          min={1}
          pattern="[0-9]"
          onChange={(e) => setDuration(e.target.value)}
        ></input>

        <select
          className={`${styles.expandMin}`}
          onChange={(e) => setPage(e.target.value)}
        >
          <option value={5}>Run Good Girls</option>
          <option value={6}>Latin Boy Toys</option>
        </select>

        <label className={`${styles.kanitForm}`}>Miniature</label>
        <br />
        <input
          required
          className={`${styles.expand}`}
          type="file"
          accept="image/jpeg"
          onChange={(e) => hanldeInputChange(e, "miniature")}
        ></input>

        <label className={`${styles.kanitForm}`}>Preview</label>
        <br />
        <input
          required
          className={`${styles.expand}`}
          type="file"
          accept="video/*"
          onChange={(e) => hanldeInputChange(e, "preview")}
        ></input>

        <label className={`${styles.kanitForm}`}>Short Video</label>
        <br />
        <input
          required
          className={`${styles.expand}`}
          type="file"
          accept="video/*"
          onChange={(e) => hanldeInputChange(e, "short")}
        ></input>

        <label className={`${styles.kanitForm}`}>Full Video</label>
        <br />
        <input
          required
          className={`${styles.expand}`}
          type="file"
          accept="video/*"
          onChange={(e) => hanldeInputChange(e, "full")}
        ></input>

        <br />
        <button
          className={`${styles.expand}`}
          style={{ marginTop: "10px" }}
          accept="video/*"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
