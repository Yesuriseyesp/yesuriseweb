import React from 'react';
import firebase from './firebase';
import { Link } from 'react-router-dom';

class ContactForm extends React.Component {
    state = {
        name: '',
        email: '',
        phone: '',
        message: '',
        submitted: false // Added state to track submission status
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    saveContactFormToFirebase = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const contactFormData = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            message: this.state.message
        };

        firebase.database().ref('contacts').push(contactFormData)
            .then(() => {
                console.log("Contact form data saved to Firebase");
                // Clear form fields after successful submission and set submitted state to true
                this.setState({
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                    submitted: true
                });
            })
            .catch((error) => {
                console.error("Error saving contact form data:", error);
            });
    };

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ width: '400px', padding: '40px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)', color: '#333' }}>
                    <h2>Contact Form</h2>
                    {this.state.submitted ? (
                        <div style={{ textAlign: 'center', animation: 'fadeInUp 0.8s ease forwards' }}>
                            <h3 style={{ marginBottom: '10px', fontSize: '24px' }}>Thank you for contacting us!</h3>
                            <p style={{ fontSize: '18px', lineHeight: '1.5' }}>We appreciate your message and will get back to you soon.</p>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <button style={{ backgroundColor: '#8a2be2', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', marginTop: '20px', transition: 'background-color 0.3s ease' }}>Home</button>
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={this.saveContactFormToFirebase}>
                            <div style={{ marginBottom: '20px', animation: 'fadeInLeft 0.8s ease forwards' }}>
                                <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', fontSize: '16px', color: '#555' }}>Your Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Your Name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    required
                                    style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px', transition: 'border-color 0.3s ease' }}
                                />
                            </div>
                            <div style={{ marginBottom: '20px', animation: 'fadeInLeft 0.8s ease forwards' }}>
                                <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontSize: '16px', color: '#555' }}>Your Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    required
                                    style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px', transition: 'border-color 0.3s ease' }}
                                />
                            </div>
                            <div style={{ marginBottom: '20px', animation: 'fadeInLeft 0.8s ease forwards' }}>
                                <label htmlFor="phone" style={{ display: 'block', marginBottom: '8px', fontSize: '16px', color: '#555' }}>Your Phone Number:</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="Your Phone Number"
                                    value={this.state.phone}
                                    onChange={this.handleChange}
                                    required
                                    style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px', transition: 'border-color 0.3s ease' }}
                                />
                            </div>
                            <div style={{ marginBottom: '20px', animation: 'fadeInLeft 0.8s ease forwards' }}>
                                <label htmlFor="message" style={{ display: 'block', marginBottom: '8px', fontSize: '16px', color: '#555' }}>Your Message:</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Your Message"
                                    value={this.state.message}
                                    onChange={this.handleChange}
                                    required
                                    style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px', transition: 'border-color 0.3s ease', minHeight: '120px' }}
                                />
                            </div>
                            <button type="submit" style={{ backgroundColor: '#8a2be2', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.3s ease' }}>Submit</button>
                        </form>
                    )}
                </div>
            </div>
        );
    }
}

export default ContactForm;
