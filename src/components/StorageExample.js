import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const StorageExample = () => {
  const [file, setFile] = useState(null);
  const [downloadURL, setDownloadURL] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return;
    try {
      const storageRef = ref(storage, `files/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setDownloadURL(url);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Storage Example</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload File</button>
      {downloadURL && (
        <div>
          <p>Download URL: <a href={downloadURL} target="_blank" rel="noopener noreferrer">{downloadURL}</a></p>
        </div>
      )}
    </div>
  );
};

export default StorageExample;