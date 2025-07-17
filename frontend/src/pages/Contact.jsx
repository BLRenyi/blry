import { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission API integration
    alert(
      'Form submission will be implemented when API endpoints are integrated!'
    );
    console.log('Form data:', formData);
  };

  return (
    <div className="contact">
      <div className="contact-content">
        <h1>Contact Us</h1>
        <p className="contact-intro">
          Get in touch with us! This form will be connected to our Django
          backend once the API endpoints are integrated.
        </p>

        <div className="contact-container">
          <div className="contact-form">
            <h2>Send us a message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>

          <div className="contact-info">
            <h2>Project Information</h2>
            <div className="info-item">
              <h3>🚀 Development Status</h3>
              <p>Frontend: ✅ Complete</p>
              <p>Backend: ✅ Django Setup Complete</p>
              <p>Integration: 🔄 In Progress</p>
            </div>
            <div className="info-item">
              <h3>📧 Next Steps</h3>
              <p>API endpoint integration</p>
              <p>Contact form submission</p>
              <p>User authentication</p>
              <p>Database integration</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
