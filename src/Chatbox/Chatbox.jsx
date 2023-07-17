import React, { useState } from "react";
import axios from "axios";

function Chatbox() {
  const [file, setFile] = useState();
  const [uploadedFile, setUploadedFile] = useState();
  const [error, setError] = useState();

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "https://uploader.gcp.corover.ai/api/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    console.log(formData);
    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // };
    // axios
    //   .post(url, formData, config)
    //   .then((response) => {
    //     console.log(response.data);
    //     setUploadedFile(response.data.file);
    //   })
    //   .catch((error) => {
    //     console.error("Error uploading file: ", error);
    //     setError(error);
    //   });

    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: formDataJsonString,
    };
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    return response.json();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
      {uploadedFile && <p>success uploading file</p>}
      {error && <p>Error uploading file: {error.message}</p>}
    </div>
  );
}

export default Chatbox;
