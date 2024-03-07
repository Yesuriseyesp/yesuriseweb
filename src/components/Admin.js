import React from 'react';
import firebase from './firebase';
import XLSX from 'xlsx'; // Import xlsx library
import { utils, writeFile } from 'xlsx';

import './admin.css'; // Import CSS file for styling
import BlogCreator from './blog';

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            loading: true,
            loggedIn: false,
            email: '',
            password: '',
            error: null
        };
    }

    componentDidMount() {
        // Fetch data from Firebase Realtime Database
        this.fetchContactData();
        // Add Firebase authentication listener
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    fetchContactData = () => {
        firebase.database().ref('contacts').on('value', snapshot => {
            const contactsData = snapshot.val();
            if (contactsData) {
                const contactsArray = Object.entries(contactsData).map(([key, value]) => ({ id: key, ...value }));
                this.setState({ contacts: contactsArray, loading: false });
            } else {
                this.setState({ contacts: [], loading: false });
            }
        });
    }

    exportToExcel = () => {
        const { contacts } = this.state;
        const ws = utils.json_to_sheet(contacts);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, 'Contacts');
        writeFile(wb, 'contacts.xlsx');
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleLogin = async () => {
        const { email, password } = this.state;
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            this.setState({ error: null });
        } catch (error) {
            this.setState({ error: error.message });
        }
    };

    handleLogout = async () => {
        try {
            await firebase.auth().signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    renderLoginForm = () => {
        const { email, password, error } = this.state;
        return (
            <div className="login-form">
                <h2>Login</h2>
                {error && <div className="error">{error}</div>}
                <input type="email" name="email" placeholder="Email" value={email} onChange={this.handleInputChange} />
                <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleInputChange} />
                <button onClick={this.handleLogin}>Login</button>
            </div>
        );
    };

    renderContactData = () => {
        const { contacts } = this.state;
        return (
            <div className="contact-form-container">
                {/* <BlogCreator /> */}
                <h2>Contact Form Data</h2>
                <button onClick={this.exportToExcel}>Export to Excel</button>
                <button onClick={this.handleLogout}>Logout</button>
                <ul>
                    {contacts.map(contact => (
                        <li key={contact.id}>
                            <strong>Name:</strong> {contact.name}<br />
                            <strong>Email:</strong> {contact.email}<br />
                            <strong>Phone:</strong> {contact.phone}<br />
                            <strong>Message:</strong> {contact.message}<br />
                        </li>
                    ))}
                </ul>
                <BlogCreator />
            </div>
        );
    };

    render() {
        const { loading, loggedIn } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                {loggedIn ? this.renderContactData() : this.renderLoginForm()}
            </div>
        );
    }
}

export default ContactForm;
