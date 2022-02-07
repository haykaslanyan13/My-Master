import React, { useCallback, useEffect, useState } from "react";
import "../styles/Slider.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../Firebase/FirebaseUser";

const Slider = () => {
  const [currentId, setCurrentId] = useState(0);
  const [images, setImages] = useState([]);

  const getData = useCallback(async () => {
    const imageCol = collection(db, "slider");
    const imageSnapshot = await getDocs(imageCol);
    const imageList = imageSnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    setImages(imageList);
  }, []);

  useEffect(() => {
    getData(db);
  }, [getData]);

  const length = images.length;

  const next = () => {
    setCurrentId(currentId === length - 1 ? 0 : currentId + 1);
  };

  const prev = () => {
    setCurrentId(currentId === 0 ? length - 1 : currentId - 1);
  };

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  return (
    <div className="container-slider">
      <h1 className="blog">Blog</h1>
      <ArrowBackIosIcon className="prev" onClick={prev} />
      <ArrowForwardIosIcon className="next" onClick={next} />
      {images.map((obj, index) => {
        return (
          <div
            className={index === currentId ? "slide-active" : "slide"}
            key={obj.id}
          >
            {currentId === index && (
              <img src={obj.image} alt="" className="image" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
