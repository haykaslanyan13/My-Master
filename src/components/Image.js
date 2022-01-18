import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";

function Image() {
  const storage = getStorage();
  const [url, setUrl] = useState("");
  const metadata = {
    contentType: "image/jpeg",
  };
  const uploadImage = async (e) => {
    const storageRef = ref(storage, e.target.files[0].name);
    try {
      await uploadBytes(storageRef, e.target.files[0], metadata);
    } catch {}
    getDownloadURL(ref(storage, e.target.files[0].name))
      .then((url) => {
        setUrl(url);
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  return (
    <div>
      <input onChange={(e) => uploadImage(e)} type="file"></input>
      <img alt="" src={url} />
    </div>
  );
}

export default Image;
