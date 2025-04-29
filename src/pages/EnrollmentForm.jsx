import React, { useEffect } from 'react';

const EnrollmentForm = () => {
  useEffect(() => {
    document.title = "Enrollment Form";
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Enrollment Form</h1>
      <p style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '20px' }}>
        Upon confirming your order, an admin will contact you shortly to verify the order details and enroll you.
      </p>
      <iframe
        width="800"
        height="900"
        frameBorder="0"
        allow="clipboard-write; camera; geolocation; fullscreen"
        src="https://zzzzzuwwiuwv.budibase.app/embed/form"
        title="Enrollment Form"
        style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
      ></iframe>
    </div>
  );
};

export default EnrollmentForm;
