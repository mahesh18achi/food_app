
import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';






const Navbar = () => {


    const { currentUser } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(''); 
  
    useEffect(() => {
      const fetchProfileData = async () => {
        try {
          const docRef = doc(db, 'registrations', currentUser.uid);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            const profile = docSnap.data();
            setProfileData(profile);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      };
  
      if (currentUser) {
        fetchProfileData();
        
      }
    }, [currentUser]);
  








    const navigate=useNavigate()
  return (
    <nav style={styles.nav}>
      <div style={styles.profileContainer}>
        <img 
          src={profileData.img} 
          alt="Profile" 
          style={styles.profileImage} onClick={()=>{navigate('/myprofile')}}
        />
        <span style={styles.profileName}>{profileData.username?profileData.username:'Guest User'}</span>
      </div>
      <ul style={styles.ul}>
        <li style={styles.li}><Link to="/home" style={styles.a}>Home</Link></li>
        <li style={styles.li}><Link to="/productlist" style={styles.a}>Products</Link></li>
        <li style={styles.li}><Link to="/product" style={styles.a}>Upload</Link></li>
        <li style={styles.li}><Link to="/users" style={styles.a}>Users</Link></li>
        <li style={styles.li}><Link to="/cart" style={styles.a}>Cart</Link></li>
        <li style={styles.li}><Link to="/socket" style={styles.a}>Chat</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    height:'60px',
    alignItems: 'center',
    padding: '10px 20px',
    background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
    //background: 'linear-gradient(to right, #009245 , #FCEE21)',
    color: 'white',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    height:'40px'
  },
  profileImage: {
    borderRadius: '50%',
    marginRight: '10px',
    width:'60px',
    height:'60px'
  },
  profileName: {
    fontWeight: 'bold',
  },
  ul: {
    listStyleType: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  li: {
    marginLeft: '20px',
  },
  a: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
  }
};

export default Navbar;

/*

<Route path="/home" element={<RequireAuth><Home/></RequireAuth>}/>
      <Route path="/" element={<Login/>}/>
      <Route path="/users" element={<Users/>}/>
      <Route path="/product" element={<Product/>}/>
      <Route path="/productlist" element={<ProductListByCategory/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/socket" element={<Socket/>}/>

*/