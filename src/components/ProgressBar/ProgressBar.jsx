import React, { useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { toast } from "react-toastify";
import "./style.css";
import LinearProgress from "@mui/material/LinearProgress";
const ProgressBar = ({ filePerc, fileUrl }) => {
  const Url = fileUrl;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(Url)
      .then(() => {
        toast.success("Link Copied");
      })
      .catch((err) => {
        console.error("Error copying to clipboard:", err);
        toast.error("Error copying to clipboard");
      });
  };
  return (
    <div className="main">
      {filePerc == 100 ? (
        <div className="final_section">
          <div className="final_content">
            <BsCheckCircle size={40} color="green" />
            <p className="final_text">Uploaded Successfully!</p>
          </div>
          <div className="final_imgContainer">
            {/* <img src={fileUrl} alt="" /> */}
            <img src={Url} alt="" />
          </div>

          <div className="final_input">
            <p>{Url && Url.length > 0 ? `${Url.substring(0, 58)}...` : Url}</p>
            <button onClick={copyToClipboard}>Copy</button>
          </div>
        </div>
      ) : (
        //
        <div className="progressbar_section">
          <p className="progressbar_text">Uploading...</p>
          <div className="progressbar_div">
            <LinearProgress
              variant="determinate"
              value={filePerc}
              className="progressbar"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
