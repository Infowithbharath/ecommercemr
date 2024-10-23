import React from "react";
import "./Contact.css";

const ContactUs = () => {
	return (
		<div className="contact-page">
			<h2 className="contact-title">Get in Touch</h2>
			<p className="contact-description">
				We value our customers and are here to assist you with all your needs.
				Whether you have a question about our luxury products, need assistance,
				or just want to say hello, feel free to reach out.
			</p>
			<div className="contact-content">
				<div className="contact-card">
					<h3>Contact Information</h3>
					<p>
						Email:{" "}
						<a href="mailto:mrijyozcollections@gmail.com">
							mrijyozcollections@gmail.com
						</a>
					</p>
					<p>
						Phone: <a href="tel:+919965551361">+91 9965551361</a>
					</p>
					<p>
						Delivery Queries:{" "}
						<a href="mailto:mrijyozcollections@gmail.com">
							mrijyozcollections@gmail.com
						</a>
					</p>
					<p>
						Phone: <a href="tel:+919965551361">+91 9965551361</a>
					</p>
				</div>
				<div className="contact-form-container">
					<h3>Send Us a Message</h3>
					<form className="contact-form">
						<input
							type="text"
							placeholder="Your Name"
							className="input-field"
						/>
						<input
							type="email"
							placeholder="Your Email"
							className="input-field"
						/>
						<textarea
							placeholder="Your Message"
							className="message-field"></textarea>
						<button type="submit" className="submit-button">
							Send Message
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
