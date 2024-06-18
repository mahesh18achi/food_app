import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <div>
          <h3>About Us</h3>
          <p>
            this is my full stack food delivery app which is developed using mern stack my aim is to do useful products which makes tasks easier
          </p>
        </div>
        <div>
          <h3>Contact Us</h3>
          <p>
            Email: maheshgumma18.com <br />
            Phone: i wont tell u <br />
            Address: 123 Main Street, City, Country(its wrong adress heeeee)
          </p>
        </div>
        <div>
          <h3>Opening Hours</h3>
          <p>
            Monday-Friday: 9am - 6pm <br />
            Saturday: 10am - 4pm <br />
            Sunday: Closed
          </p>
        </div>
      </div>
      <div style={styles.bottomText}>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "20px 0",
    marginTop: "20px",
  },
  content: {
    display: "flex",
    justifyContent: "space-around",
    maxWidth: "1200px",
    margin: "0 auto",
    flexWrap: "wrap",
  },
  bottomText: {
    textAlign: "center",
    marginTop: "20px",
  },
};

export default Footer;
