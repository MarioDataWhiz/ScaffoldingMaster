import React from 'react';

const Home = () => (
  <div className="home">
    <h1>Build Your Future One Scaffold at a Time </h1>
    
    {/* Add an image here */}
    <img 
      src="https://media.istockphoto.com/id/662675934/photo/construction-worker-on-construction-site.jpg?s=612x612&w=0&k=20&c=-8pfQRMwx1i9nd4E2gBSeBTyL-_gISdspjwcrQ0QDq0="  // Replace with your image link
      alt="ScaffoldMaster"  // Alternative text for the image
      width="500"  // Adjust width if necessary
      height="auto"  // Keeps aspect ratio
    />

    <p>
      We're here to provide quality training and hands-on learning experiences
      in construction and scaffolding. Whether you're just starting out or looking to
      sharpen your skills, you've come to the right place.
    </p>

  </div>
);

export default Home;
