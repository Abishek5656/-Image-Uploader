import UploadImg from "./components/uploadImg/UploadImg";
import "./App.css";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
function App() {
  const [filePerc, setFilePerc] = useState(0);
  const [fileUrl, setFileUrl] = useState(null);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UploadImg setFilePerc={setFilePerc} setFileUrl={setFileUrl}/>} />
          <Route
            path="/loading"
            element={<ProgressBar filePerc={filePerc} fileUrl={fileUrl}/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
