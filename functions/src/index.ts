import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp();

// Temporarily comment out nodemailer usage until dependencies are fixed
/*
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.password,
  },
});
*/

export const sendContactFormEmail = functions.firestore
  .document('contactMessages/{messageId}')
  .onCreate(async (snapshot) => {
    const data = snapshot.data();
    
    const storeMailOptions = {
      from: `Pet Store Website <${functions.config().email.user}>`,
      to: data.storeEmail,
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
        <p>Submitted on: ${new Date(data.createdAt.toDate()).toLocaleString()}</p>
      `,
    };
    
    const customerMailOptions = {
      from: `Paws & Claws Pet Store <${functions.config().email.user}>`,
      to: data.email,
      subject: 'Thank you for contacting Paws & Claws Pet Store',
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Dear ${data.name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <p>${data.message}</p>
        <br>
        <p>Best regards,</p>
        <p>Paws & Claws Pet Store Team</p>
      `,
    };
    
    try {
      // Temporarily comment out nodemailer usage until dependencies are fixed
      /*
      await transporter.sendMail(storeMailOptions);
      console.log('Email sent to store owner');
      
      await transporter.sendMail(customerMailOptions);
      console.log('Confirmation email sent to customer');
      */
      console.log('Email functionality temporarily disabled');
      return { success: true, message: 'Email functionality temporarily disabled' };
    } catch (error) {
      console.error('Error:', error);
      return { error: error.toString() };
    }
  });
