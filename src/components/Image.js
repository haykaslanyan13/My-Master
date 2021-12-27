import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";

function Image() {
  const storage = getStorage();
  const [url, setUrl] = useState("");
  const metadata = {
    contentType: "image/jpeg",
  };
  const uploadImage = async (e) => {
    // console.log(e.target.files);
    const storageRef = ref(storage, e.target.files[0].name);
    // console.log(storageRef);
    // const httpsReference = ref(
    //   storage,
    //   `https://firebasestorage.googleapis.com/b/test-53482.appspot.com/o/stars.jpg`
    // );
    // console.log(httpsReference);
    try {
      const uploadTask = await uploadBytes(
        storageRef,
        e.target.files[0],
        metadata
      );
      // console.log(uploadTask.metadata.bucket);
      // setUrl(httpsReference);
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
      <img src={url} />
    </div>
  );
}

export default Image;
