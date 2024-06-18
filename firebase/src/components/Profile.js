import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null); // Initialize as null

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

  return (
    <div>
        
    <div style={styles.container}>
      {profileData && (
        <div style={styles.profileCard}>
          <h1>My Profile</h1>
          <img src={profileData.img} alt="Profile" style={styles.profileImage} />
          <h2 style={styles.name}>{profileData.username}</h2>
          <p style={styles.bio}>{'I am a Tech Enthusiast'}</p>
          <div style={styles.info}>
            <p style={styles.infoItem}>
              <strong>Location:</strong> {profileData.country+ '  '+profileData.address}
            </p>
            <p style={styles.infoItem}>
              <strong>Website:</strong>{'Maac industries 8261.in '}
              <a href={profileData.website} style={styles.link}>
                {'www.mahi8261.com'}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    padding: '20px',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center',
    width: '300px',
  },
  profileImage: {
    borderRadius: '50%',
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    marginBottom: '20px',
  },
  name: {
    fontSize: '24px',
    margin: '10px 0',
    color: '#333',
  },
  bio: {
    fontSize: '16px',
    margin: '10px 0',
    color: '#666',
  },
  info: {
    marginTop: '20px',
  },
  infoItem: {
    fontSize: '14px',
    margin: '5px 0',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default Profile;
