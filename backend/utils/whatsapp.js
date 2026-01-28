
const axios = require('axios');

// Meta WhatsApp Business API Configuration
const WHATSAPP_API_URL = `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const ADMIN_PHONE = process.env.ADMIN_PHONE_NUMBER;

/**
 * Send WhatsApp message using Meta WhatsApp Business API
 * @param {string} phoneNumber - Recipient phone number (format: 919876543210)
 * @param {string} message - Message text to send
 * @returns {Promise<Object>} Response object with success status
 */
const sendWhatsAppMessage = async (phoneNumber, message) => {
  try {
    console.log(`📱 Sending WhatsApp message to ${phoneNumber}...`);
    
    const response = await axios({
      method: 'POST',
      url: WHATSAPP_API_URL,
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: phoneNumber,
        type: 'text',
        text: {
          preview_url: false,
          body: message
        }
      }
    });

    console.log('✅ WhatsApp message sent successfully');
    console.log('Message ID:', response.data.messages[0].id);
    
    return {
      success: true,
      messageId: response.data.messages[0].id,
      data: response.data
    };
  } catch (error) {
    console.error('❌ WhatsApp API Error:', error.response?.data || error.message);
    
    return {
      success: false,
      error: error.response?.data?.error?.message || error.message,
      errorDetails: error.response?.data
    };
  }
};

/**
 * Send order notification to admin via WhatsApp
 * @param {Object} orderDetails - Order information
 */
const sendOrderNotification = async (orderDetails) => {
  try {
    // Format items list
    const itemsList = orderDetails.items
      .map(item => `  • ${item.name} x${item.quantity} - ₹${item.price * item.quantity}`)
      .join('\n');

    // Create formatted message
    const message = `
🛍️ *NEW ORDER RECEIVED*

━━━━━━━━━━━━━━━━━━━━━
📦 *Order Details*
Order ID: #${orderDetails.orderId.slice(-8).toUpperCase()}

👤 *Customer Information*
Name: ${orderDetails.customerName}
📱 Phone: ${orderDetails.customerPhone}
📧 Email: ${orderDetails.customerEmail}

🛒 *Order Items*
${itemsList}

━━━━━━━━━━━━━━━━━━━━━
💰 *Total Amount: ₹${orderDetails.totalAmount}*
━━━━━━━━━━━━━━━━━━━━━

${orderDetails.notes ? `📝 *Customer Notes:*\n${orderDetails.notes}\n\n` : ''}⏰ Order Time: ${new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    })}

✅ Please confirm this order and notify the customer for pickup!
    `.trim();

    const result = await sendWhatsAppMessage(ADMIN_PHONE, message);
    
    if (result.success) {
      console.log('✅ Order notification sent to admin successfully');
    } else {
      console.error('❌ Failed to send order notification:', result.error);
    }
    
    return result;
  } catch (error) {
    console.error('❌ Error in sendOrderNotification:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Send contact form notification to admin via WhatsApp
 * @param {Object} contactDetails - Contact form information
 */
const sendContactNotification = async (contactDetails) => {
  try {
    const message = `
📞 *NEW CONTACT INQUIRY*

━━━━━━━━━━━━━━━━━━━━━
👤 *Contact Information*
Name: ${contactDetails.name}
📧 Email: ${contactDetails.email}
📱 Phone: ${contactDetails.phone}

💬 *Message:*
${contactDetails.message}

━━━━━━━━━━━━━━━━━━━━━
⏰ Received: ${new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    })}

⚡ Please respond to this inquiry promptly!
    `.trim();

    const result = await sendWhatsAppMessage(ADMIN_PHONE, message);
    
    if (result.success) {
      console.log('✅ Contact notification sent to admin successfully');
    } else {
      console.error('❌ Failed to send contact notification:', result.error);
    }
    
    return result;
  } catch (error) {
    console.error('❌ Error in sendContactNotification:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Test WhatsApp API connection
 */
const testWhatsAppConnection = async () => {
  try {
    const testMessage = `
🧪 *WHATSAPP API TEST*

━━━━━━━━━━━━━━━━━━━━━
This is a test message from *Kusuri Mane*.

✅ If you're reading this, the Meta WhatsApp Business API integration is working correctly!

📱 System: Kusuri Mane E-commerce
🔧 API Version: ${process.env.WHATSAPP_API_VERSION}
⏰ Test Time: ${new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'long'
    })}

━━━━━━━━━━━━━━━━━━━━━
🎉 Configuration successful!
    `.trim();

    console.log('🧪 Testing WhatsApp API connection...');
    const result = await sendWhatsAppMessage(ADMIN_PHONE, testMessage);
    
    if (result.success) {
      console.log('✅ WhatsApp API test successful!');
    } else {
      console.error('❌ WhatsApp API test failed:', result.error);
    }
    
    return result;
  } catch (error) {
    console.error('❌ WhatsApp test error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = {
  sendWhatsAppMessage,
  sendOrderNotification,
  sendContactNotification,
  testWhatsAppConnection
};