import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase.js";
import Bg from "../../assets/image.svg";
import "./style.css";

const UploadImg = ({ setFilePerc, setFileUrl }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const wrapperRef = useRef(null);

  const [file, setFile] = useState(undefined);

  const [fileUploadError, setFileUploadError] = useState(false);
 

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    navigate("/loading");
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setFileUrl(downloadURL);
        });
      }
    );
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    wrapperRef.current.classList.add("dragover");
  };

  const handleDragLeave = () => {
    wrapperRef.current.classList.remove("dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    wrapperRef.current.classList.remove("dragover");
    setFile(e.dataTransfer.files[0]);
    console.log(file);
    console.log("drag and drop");
  };

  return (
    <div className="main">
      <div className="container">
        <div className="container_content">
          <h3 className="title">Upload your image</h3>
          <p className="text">File should be Jpeg, Png,...</p>
          {/* Drag and Drop box */}
          <div
            ref={wrapperRef}
            className="box"
            onClick={handleButtonClick}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <img
              src={Bg}
              alt="background img"
              style={{ width: "150px", height: "150px" }}
            />
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <p className="box_text">Drag & Drop your image here</p>
          </div>

          <p className="text1">Or</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <button onClick={handleButtonClick} className="file_upload">
            Choose file
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImg;
