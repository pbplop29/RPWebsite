import React from "react";
import "../Styles/components.css";
import { useState } from "react";
import { db, storage } from "../Config/firebase-config";
import { set, ref } from "firebase/database";
import {
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  ref as sRef,
} from "firebase/storage";

function Create() {
  const [percent, setPercent] = useState(0);
  const INITIAL_STATE = {
    name: "",
    age: "",
    gender: "",
    id: "",
    photo: null,
  };

  const [patient, setPatient] = useState(INITIAL_STATE);
  const [urlx, setUrlx] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPatient((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handlePhotoChange = (event) => {
    const photo = event.target.files[0];
    setPatient((prevProps) => ({
      ...prevProps,
      photo: photo,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { id, name, age, gender, photo } = patient;

    try {
      const storageRef = sRef(storage, "/" + id);
      const uploadTask = uploadBytesResumable(storageRef, photo);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          ); // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUrlx(url);
            console.log(urlx);
          });
        }
      );
      // Set the name, age, and gender fields of the new document
      await set(ref(db, id), {
        Name: name,
        Age: parseInt(age),
        Gender: gender,
        "Heart Rate": 0,
        "Heart Rate ECG": 0,
        spO2: 0,
        zlink: urlx,
      });

      console.log("Patient data added successfully");
      setPatient(INITIAL_STATE);
    } catch (error) {
      console.error("Error adding or updating patient data", error);
    }
  };

  return (
    <>
      <div>{patient.name}</div>
      <div>{patient.age}</div>
      <div>{patient.gender}</div>
      <div>{patient.id}</div>
      {patient.photo && (
        <div>
          <img src={URL.createObjectURL(patient.photo)} alt="Patient" />
        </div>
      )}
      <div className="wrapper">
        <h1 className="patient_form_title">PATIENT ENTRY </h1>
        <div className="patient_entry_form">
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label>name</label>
              <input
                type="text"
                name="name"
                value={patient.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label>age</label>
              <input
                type="number "
                name="age"
                value={patient.age}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label>gender</label>
              <input
                type="text"
                name="gender"
                value={patient.gender}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label>id</label>
              <input
                type="text"
                name="id"
                value={patient.id}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label>photo</label>
              <input type="file" name="image" onChange={handlePhotoChange} />
            </div>
            <div className="form-control">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;
