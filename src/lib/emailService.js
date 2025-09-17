// Email Service for portfolio notifications

// Send email notification for new contact
export const sendContactNotificationEmail = async (contactData) => {
  try {
    const formspreeEndpoint = 'https://formspree.io/f/mdklrwdw';
    
    const emailData = {
      name: contactData.name,
      email: contactData.email,
      subject: contactData.subject,
      message: contactData.message,
      _subject: `New Contact Form Submission - ${contactData.subject}`,
      _replyto: contactData.email,
      _template: 'table'
    };

    console.log('📧 SENDING EMAIL NOTIFICATION TO: abhinavsharma392@gmail.com');
    
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Formspree error response:', errorText);
      throw new Error(`Failed to send email: ${response.status} - ${errorText}`);
    }

    const responseData = await response.json();
    console.log('✅ Email sent successfully!', responseData);
    

    return { success: true };
  } catch (error) {
    console.error('Failed to send contact notification email:', error);
    return { success: false, error };
  }
};

// Send email notification for hire me click
export const sendHireMeNotificationEmail = async () => {
  try {
    const formspreeEndpoint = 'https://formspree.io/f/mdklrwdw';
    
    const emailData = {
      subject: 'Someone Clicked "Hire Me Now" on Your Portfolio! 🎉',
      message: `
Exciting news! Someone clicked the "Hire Me Now" button on your portfolio.

Details:
- Clicked at: ${new Date().toLocaleString()}
- Page URL: ${window.location.href}
- Referrer: ${document.referrer || 'Direct visit'}

This indicates strong interest in your services. You may want to be prepared for potential contact.

Best regards,
Your Portfolio Notification System
      `,
      _subject: 'Someone Clicked "Hire Me Now" on Your Portfolio! 🎉'
    };

    console.log('📧 SENDING HIRE ME EMAIL NOTIFICATION TO: abhinavsharma392@gmail.com');
    
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to send hire me email');
    }

    console.log('✅ Hire me email notification sent successfully!');
    return { success: true };
  } catch (error) {
    console.error('Failed to send hire me notification email:', error);
    return { success: false, error };
  }
};

// Send SMS notification using a simple webhook (you can use services like Twilio)
export const sendSMSNotification = async (message) => {
  try {
    console.log('SMS would be sent to +919664309440:', message);
    return { success: true };
  } catch (error) {
    console.error('Failed to send SMS:', error);
    return { success: false, error };
  }
};
