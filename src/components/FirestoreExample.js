import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const FirestoreExample = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const querySnapshot = await getDocs(collection(db, 'your-collection-name'));
      const docs = querySnapshot.docs.map(doc => doc.data());
      setDocuments(docs);
    };

    fetchDocuments();
  }, []);

  const addDocument = async () => {
    try {
      await addDoc(collection(db, 'your-collection-name'), {
        name: 'New Document',
        timestamp: new Date(),
      });
      alert('Document added successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Firestore Example</h1>
      <button onClick={addDocument}>Add Document</button>
      <h2>Documents</h2>
      <ul>
        {documents.map((doc, index) => (
          <li key={index}>{JSON.stringify(doc)}</li>
        ))}
      </ul>
    </div>
  );
};

export default FirestoreExample;