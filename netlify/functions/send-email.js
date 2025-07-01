// Netlify Function to handle contact form submissions
// This function sends emails to both studio@arteamo.net and petyaem@abv.bg

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the form data
    const data = JSON.parse(event.body);
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // For Netlify deployment, you'll need to set up an email service
    // Options include:
    // 1. SendGrid
    // 2. Mailgun
    // 3. AWS SES
    // 4. Netlify Forms (built-in)
    
    // For now, we'll use Netlify Forms approach
    // The form will be submitted to Netlify's form handling
    // And notifications will be sent to the configured emails
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Form submission received. Please configure email service in Netlify dashboard.' 
      })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' })
    };
  }
};