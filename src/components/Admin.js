import React from 'react';
import firebase from './firebase';
import { utils, writeFile } from 'xlsx';
import './admin.css';

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newForms: [], // Initialize newForms array
            contacts: [], // Initialize contacts array
            readedForms: [], // Initialize readedForms array
            loading: true,
            loggedIn: false,
            email: '',
            password: '',
            error: null
        };
        this.readedSectionRef = React.createRef(); // Create ref for the readed section
    }

    componentDidMount() {
        this.fetchContactData();
        this.fetchReadedForms(); // Fetch readed forms on component mount
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

    fetchReadedForms = () => {
        firebase.database().ref('readedForms').on('value', snapshot => {
            const readedFormsData = snapshot.val();
            if (readedFormsData) {
                const readedFormsArray = Object.entries(readedFormsData).map(([key, value]) => ({ id: key, ...value }));
                this.setState({ readedForms: readedFormsArray });
            } else {
                this.setState({ readedForms: [] });
            }
        });
    }

    saveReadedForm = (form) => {
        firebase.database().ref('readedForms').push(form); // Save readed form to Firebase
    };

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

    scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    scrollToReadedSection = () => {
        if (this.readedSectionRef.current) {
            this.readedSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    handleReadButtonClick = (form) => {
        this.saveReadedForm(form); // Save the readed form
        this.fetchReadedForms(); // Fetch readed forms after saving
        this.scrollToReadedSection(); // Scroll to the readed section
        // Update the state to remove the readed form from contacts
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== form.id)
        }));
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
        const { contacts, newForms, readedForms } = this.state; // Assuming you have a state variable newForms to store new form submissions
        return (
            <div className="contact-form-container">
                <h2>New Forms</h2>
                <ul>
                    {newForms.map(form => (
                        <li key={form.id}>
                            {/* Render new form data here */}
                            <strong>Name:</strong> {form.name}<br />
                            <strong>Email:</strong> {form.email}<br />
                            <strong>Phone:</strong> {form.phone}<br />
                            <strong>Message:</strong> {form.message}<br />
                        </li>
                    ))}
                </ul>
    
                <h2>Contact Form Data</h2>
                <button onClick={this.exportToExcel}>Export to Excel</button>
                <button onClick={this.handleLogout}>Logout</button>
                <ul>
                    {contacts.map(contact => (
                        <li key={contact.id}>
                            {/* Render existing contact form data here */}
                            <strong>Name:</strong> {contact.name}<br />
                            <strong>Email:</strong> {contact.email}<br />
                            <strong>Phone:</strong> {contact.phone}<br />
                            <strong>Message:</strong> {contact.message}<br />
                            <button onClick={() => this.handleReadButtonClick(contact)} style={{ color: 'white' }}>Read Button</button> {/* Red button */}
                        </li>
                    ))}
                </ul>

                <div ref={this.readedSectionRef} /> {/* Ref for the readed section */}
                
                <div>
                    <h2>Readed Forms</h2>
                    <ul>
                        {readedForms.map(form => (
                            <li key={form.id}>
                                {/* Render readed form data here */}
                                <strong>Name:</strong> {form.name}<br />
                                <strong>Email:</strong> {form.email}<br />
                                <strong>Phone:</strong> {form.phone}<br />
                                <strong>Message:</strong> {form.message}<br />
                            </li>
                        ))}
                    </ul>
                </div>
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
