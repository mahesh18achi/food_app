import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { auth } from "../firebase";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Register() {
  
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const [per, setPer] = useState(null);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    country: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const upload = () => {
      if (file) {
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setPer(progress);
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setFormData((prev) => ({ ...prev, img: downloadURL }));

              console.log("File available at", downloadURL);
            });
          }
        );
      }
    };
    upload();
  }, [file]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const sendData = async () => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const response = await setDoc(doc(db, "registrations", res.user.uid), {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        country: formData.country,
        phone: formData.phone,
        address: formData.address,
        Timestamp: serverTimestamp(),
        img: formData.img,
      });

      console.log(response);

      console.log(formData);

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
      setFormData({
        username: "",
        password: "",
        email: "",
        country: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    margin: "0 auto",
  };

  const inputStyle = {
    margin: "10px 0",
    padding: "10px",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <p>Current user is {currentUser.email}</p>
      <form style={formStyle}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="file"
          name="file"
          placeholder="file upload"
          onChange={(e) => setFile(e.target.files[0])}
          style={inputStyle}
        />
        <b> {per && per}% completed</b>
        <button
          disabled={per !== null && per < 100}
          type="button"
          onClick={sendData}
          style={buttonStyle}
        >
          Send
        </button>
      </form>

      {success && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            top: "-600px",
            left: "500px",
            height: "100px",
            width: "300px",
            font: "bold",
            color: "white",
            fontSize: "1.5rem",
            border: "2px solid black",
            borderRadius: "50px",
            backgroundColor: "lightgreen",
          }}
        >
          Registered successfully
        </div>
      )}
    </div>
  );
}

export default Register;
