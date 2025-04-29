import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '60px',
      padding: '40px 20px',
    }}
  >
    <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
      Build Your Future, One Scaffold at a Time
    </h1>

    {/* Section 1: image left, text right */}
    <section
      style={{
        display: 'flex',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        gap: '90px',
      }}
    >
      <img
        src="https://media.istockphoto.com/id/662675934/photo/construction-worker-on-construction-site.jpg?s=612x612&w=0&k=20&c=-8pfQRMwx1i9nd4E2gBSeBTyL-_gISdspjwcrQ0QDq0="
        alt="ScaffoldMaster"
        style={{
          flex: '1 1 50%',
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '8px',
        }}
      />
      <div style={{ flex: '1 1 50%' }}>
        <p
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '1.325rem',
            lineHeight: 1.6,
            color: '#333333',
            letterSpacing: '0.5px',
            fontWeight: 400,
            marginBottom: '1.5em',
            maxWidth: '800px',
          }}
        >
          Join thousands of aspiring professionals on ScaffoldMaster: the most trusted platform for hands-on
          scaffolding training and education. Learn the fundamentals, gain practical skills, and build a safe
          career in the scaffolding industry.
        </p>

        {/* BUTTONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
          <Link to="/form" style={{ textDecoration: 'none' }}>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-md transition-colors">
            
              Enroll Now
            </button>
          </Link>

          <h3 style={{ fontSize: '1.75rem', marginBottom: '12px' }}>Our Courses</h3>
          <p
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '1.2rem',
              lineHeight: 1.6,
              color: '#555',
              marginBottom: '1.5em',
            }}
          >
            We currently offer two hands-on training courses designed to get you started in scaffolding safely and
            confidently.
            
          </p>

          <div>
          <Link to="/courses" style={{ textDecoration: 'none' }}>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-md transition-colors">
              Our Courses
            </button>
          </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Section 2: text left, image right */}
    <section
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row-reverse',
        maxWidth: '1200px',
        margin: '0 auto',
        gap: '200px',
      }}
    >
      <img
        src="https://t3.ftcdn.net/jpg/04/92/56/88/360_F_492568892_ethgFqbyqBTAtMXZnciSDtfJyq6mvzLO.jpg"
        alt="Scaffold in Action"
        style={{
          flex: '1 1 50%',
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '8px',
        }}
      />
      <div style={{ flex: '1 1 50%' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '2rem' }}>
          Built to lift workers higher—from day one
        </h2>
        <p
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '1.325rem',
            lineHeight: 1.6,
            color: '#333333',
            letterSpacing: '0.5px',
            fontWeight: 400,
            marginBottom: '1.5em',
            maxWidth: '800px',
          }}
        >
          After years of experience in the refinery industry, our founder saw a serious gap: too many workers were entering the scaffolding field with little guidance—unprepared, unsupported, and unsure how to succeed.
        </p>
        <p
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '1.2rem',
            lineHeight: 1.6,
            color: '#555',
          }}
        >
          With safety on the line and high turnover within the first few weeks, he knew something had to change. Driven by a passion for teaching and a commitment to safety, he created this training platform to give new workers the solid foundation they deserve—before ever stepping on a scaffold.
        </p>
      </div>
    </section>
  </div>
);

export default Home;
