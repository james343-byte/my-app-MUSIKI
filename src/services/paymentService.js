import axios from 'axios';

const RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID;
const RAZORPAY_API = 'https://api.razorpay.com/v1';

export const createPaymentOrder = async (amount, currency = 'INR', notes = {}) => {
  try {
    const response = await axios.post(
      `${RAZORPAY_API}/orders`,
      {
        amount: amount * 100, // Amount in paise
        currency: currency,
        notes: notes,
      },
      {
        auth: {
          username: RAZORPAY_KEY_ID,
          password: '', // Leave empty for client-side
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating payment order:', error);
    throw error;
  }
};

export const verifyPaymentSignature = async (orderId, paymentId, signature) => {
  try {
    // Verify on backend (never on frontend)
    const response = await axios.post('/api/verify-payment', {
      orderId,
      paymentId,
      signature,
    });
    return response.data.verified;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

export const SUBSCRIPTION_PLANS = [
  {
    id: 'combined_29',
    duration: 29,
    price: 90,
    currency: 'INR',
    adsRemovalPrice: 20,
    totalWithAdsRemoval: 110,
    type: 'combined',
    description: '29 days of streaming',
  },
  {
    id: 'combined_85',
    duration: 85,
    price: 263,
    currency: 'INR',
    adsRemovalPrice: 37,
    totalWithAdsRemoval: 300,
    type: 'combined',
    description: '85 days of streaming',
  },
  {
    id: 'combined_360',
    duration: 360,
    price: 1050,
    currency: 'INR',
    adsRemovalPrice: 150,
    totalWithAdsRemoval: 1150,
    type: 'combined',
    description: '1 year of streaming',
  },
  {
    id: 'individual_30',
    duration: 30,
    price: 100,
    currency: 'INR',
    type: 'individual',
    description: '30 days of streaming',
  },
  {
    id: 'individual_90',
    duration: 90,
    price: 283,
    currency: 'INR',
    type: 'individual',
    description: '90 days of streaming',
  },
  {
    id: 'individual_360',
    duration: 360,
    price: 1111,
    currency: 'INR',
    type: 'individual',
    description: '1 year of streaming',
  },
];
