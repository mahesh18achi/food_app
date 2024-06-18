import React, { useState, useEffect } from "react";
import { db,storage } from "../firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";
import { ref, deleteObject } from "firebase/storage";
import Navbar from "./Navbar";
function Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, 'registrations'));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id,imgURL) => {
    const auth = getAuth();
    const user = auth.currentUser;
    try {

        const imageRef = ref(storage, imgURL);
        await deleteObject(imageRef);

      await deleteDoc(doc(db, 'registrations', id));
      setData(data.filter(item => item.id !== id));
      await deleteUser(user)
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleMouseEnter = (id) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading data: {error.message}</h2>;

  return (
    <div >
      <Navbar/>
    <div style={styles.container}>
      <h1 style={styles.title}>Users Data</h1>
      {data.length > 0 ? (
        data.map((doc) => (
          <div
            key={doc.id}
            style={hoveredCard === doc.id ? { ...styles.userCard, ...styles.userCardHover } : styles.userCard}
            onMouseEnter={() => handleMouseEnter(doc.id)}
            onMouseLeave={handleMouseLeave}
          >
            <img src={doc.img} alt="Profile" style={styles.profileImage} />
            <div style={styles.userInfo}>
              <p style={styles.userDetail}><strong>Username:</strong> {doc.username}</p>
              <p style={styles.userDetail}><strong>Email:</strong> {doc.email}</p>
              <p style={styles.userDetail}><strong>Country:</strong> {doc.country}</p>
              <p style={styles.userDetail}><strong>Address:</strong> {doc.address}</p>
              <p style={styles.userDetail}><strong>Phone:</strong> {doc.phone}</p>
            </div>
            <button
              onClick={() => handleDelete(doc.id,doc.img)}
              style={hoveredCard === doc.id ? { ...styles.deleteButton, ...styles.deleteButtonHover } : styles.deleteButton}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <h2>No Users</h2>
      )}
    </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#f0f2f5',
  background:'linear-gradient(to right, #2E3192 , #1BFFFF)'
  },
  title: {
    fontSize: '2em',
    margin: '20px 0',
    color: '#333',
  },
  userCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    background:'linear-gradient(to right, #FDFC47,#f5af19)' ,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    padding: '20px',
    margin: '10px 0',
    transition: 'transform 0.2s ease-in-out',
  },
  userCardHover: {
    transform: 'scale(1.02)',
  },
  profileImage: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    marginRight: '20px',
  },
  userInfo: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  userDetail: {
    margin: '5px 0',
    color: '#555',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
  },
  deleteButtonHover: {
    backgroundColor: '#ff1a1a',
  },
};

export default Users;
