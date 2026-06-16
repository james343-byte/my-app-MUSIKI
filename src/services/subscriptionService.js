import { db } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const SUBSCRIPTION_PLANS = {
  combined: [
    {
      id: 'combined_29',
      duration: 29,
      price: 90,
      adsRemovalPrice: 20,
      adsRemovalDuration: 30,
      totalWithAdsRemoval: 110,
      type: 'combined',
    },
    {
      id: 'combined_85',
      duration: 85,
      price: 263,
      adsRemovalPrice: 37,
      adsRemovalDuration: 91,
      totalWithAdsRemoval: 300,
      type: 'combined',
    },
    {
      id: 'combined_360',
      duration: 360,
      price: 1050,
      adsRemovalPrice: 150,
      adsRemovalDuration: 392,
      totalWithAdsRemoval: 1150,
      type: 'combined',
    },
  ],
  individual: [
    {
      id: 'individual_30',
      duration: 30,
      price: 100,
      type: 'individual',
    },
    {
      id: 'individual_90',
      duration: 90,
      price: 283,
      type: 'individual',
    },
    {
      id: 'individual_360',
      duration: 360,
      price: 1111,
      type: 'individual',
    },
  ],
};

export const purchaseSubscription = async (userId, planId, paymentMethod) => {
  try {
    const plan = findPlanById(planId);
    if (!plan) throw new Error('Plan not found');
    
    // Create payment transaction
    const transactionData = {
      userId,
      planId,
      amount: plan.price,
      paymentMethod,
      status: 'pending',
      createdAt: new Date(),
    };
    
    // Update user subscription
    await updateDoc(doc(db, 'users', userId), {
      subscriptionStatus: 'active',
      currentPlan: planId,
      subscriptionStartDate: new Date(),
      subscriptionEndDate: new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000),
    });
    
    return transactionData;
  } catch (error) {
    console.error('Error purchasing subscription:', error);
    throw error;
  }
};

export const removeAds = async (userId, planId) => {
  try {
    const plan = SUBSCRIPTION_PLANS.combined.find((p) => p.id === planId);
    if (!plan) throw new Error('Plan not found');
    
    await updateDoc(doc(db, 'users', userId), {
      adsFree: true,
      adsFreeDuration: plan.adsRemovalDuration,
      adsFreEndDate: new Date(Date.now() + plan.adsRemovalDuration * 24 * 60 * 60 * 1000),
    });
  } catch (error) {
    console.error('Error removing ads:', error);
    throw error;
  }
};

const findPlanById = (planId) => {
  for (const plan of [
    ...SUBSCRIPTION_PLANS.combined,
    ...SUBSCRIPTION_PLANS.individual,
  ]) {
    if (plan.id === planId) return plan;
  }
  return null;
};
