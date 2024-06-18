import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 50%;
  margin: auto;
  margin-top: 50px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Progress = styled.p`
  margin-top: 10px;
  color: #28a745;
`;

function Product() {
    const navigate=useNavigate()
  const [file, setFile] = useState('');
  const [dialog,setDialog]=useState(false)
  const [per, setPer] = useState(0);
  const [formData, setFormData] = useState({
    itemName: '',
    hotelName: '',
    itemPrice: '',
    rating: '',
    category: '',
    img: ''
  });

  useEffect(() => {
    if (!file) return;

    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPer(progress);
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData((prev) => ({ ...prev, img: downloadURL }));
            console.log('File available at', downloadURL);
          });
        }
      );
    };

    upload();
  }, [file]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendData = async () => {
    if(!formData.itemName||!formData.itemPrice||!formData.img||!formData.hotelName){
        setDialog(true)
        setInterval(()=>{
            setDialog(false)
        },3000)
        
        return 
    }
    const docRef = doc(db, "products", formData.itemName+new Date().getTime());
    await setDoc(docRef, {
      ...formData,
      timestamp: serverTimestamp()
    });
    console.log('Product added:', formData);
    navigate("/productlist")
  };

  return (
    <Container>
      <Title>Upload a Product</Title>
      <div style={{display:dialog?'flex':'none',color:'red'}}> 

        <p>please fill all the fields</p>
      </div>
      <Form>
        <Input type="text" name="itemName" placeholder="Item Name" onChange={handleChange} />
        <Input type="text" name="hotelName" placeholder="Hotel Name" onChange={handleChange} />
        <Input type="text" name="itemPrice" placeholder="Item Price" onChange={handleChange} />
        <Input type="text" name="rating" placeholder="Rating" onChange={handleChange} />
        <Input type="text" name="category" placeholder="Category" onChange={handleChange} />
        <Input type="file" name="file" onChange={e => setFile(e.target.files[0])} />
        <Progress>{per > 0 && `${per}% uploaded`}</Progress>
        <Button type="button" onClick={sendData}>Send</Button>
      </Form>
    </Container>
  );
}

export default Product;
