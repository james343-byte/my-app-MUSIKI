import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SUBSCRIPTION_PLANS } from '../services/subscriptionService';

const SubscriptionScreen = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
  };

  const handlePayment = () => {
    if (!selectedPlan) {
      Alert.alert('Error', 'Please select a plan');
      return;
    }
    if (!selectedPaymentMethod) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }
    Alert.alert('Success', `Processing payment for plan ${selectedPlan}`);
    // Integrate Razorpay here
  };

  const renderPlan = (plan) => (
    <TouchableOpacity
      key={plan.id}
      style={[
        styles.planCard,
        selectedPlan === plan.id && styles.planCardSelected,
      ]}
      onPress={() => handleSelectPlan(plan.id)}
    >
      <Text style={styles.planDuration}>{plan.duration} Days</Text>
      <Text style={styles.planPrice}>₹{plan.price}</Text>
      <Text style={styles.planType}>{plan.type.toUpperCase()}</Text>
      {plan.adsRemovalPrice && (
        <Text style={styles.adsRemoval}>
          +₹{plan.adsRemovalPrice} (Ads Removal)
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Choose Your Plan</Text>
      <Text style={styles.subtitle}>
        Unlock unlimited music streaming with personalized recommendations
      </Text>

      {/* Combined Plans */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Combined Plans (with Ads Removal)</Text>
        <View style={styles.plansGrid}>
          {SUBSCRIPTION_PLANS.combined.map((plan) => renderPlan(plan))}
        </View>
      </View>

      {/* Individual Plans */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Individual Plans</Text>
        <View style={styles.plansGrid}>
          {SUBSCRIPTION_PLANS.individual.map((plan) => renderPlan(plan))}
        </View>
      </View>

      {/* Payment Methods */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <TouchableOpacity
          style={[
            styles.paymentMethod,
            selectedPaymentMethod === 'upi' && styles.paymentMethodSelected,
          ]}
          onPress={() => setSelectedPaymentMethod('upi')}
        >
          <Text style={styles.paymentIcon}>💳</Text>
          <Text style={styles.paymentText}>UPI</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paymentMethod,
            selectedPaymentMethod === 'fampay' && styles.paymentMethodSelected,
          ]}
          onPress={() => setSelectedPaymentMethod('fampay')}
        >
          <Text style={styles.paymentIcon}>📱</Text>
          <Text style={styles.paymentText}>FamPay</Text>
        </TouchableOpacity>
      </View>

      {/* Purchase Button */}
      <TouchableOpacity
        style={styles.purchaseButton}
        onPress={handlePayment}
      >
        <Text style={styles.purchaseButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>🎵 Why Subscribe?</Text>
        <Text style={styles.infoText}>• Weather-based music recommendations</Text>
        <Text style={styles.infoText}>• Time-aware playlists</Text>
        <Text style={styles.infoText}>• Ad-free listening (optional)</Text>
        <Text style={styles.infoText}>• Spotify sync and integration</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  plansGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  planCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  planCardSelected: {
    borderColor: '#1DB954',
    backgroundColor: '#f0fdf4',
  },
  planDuration: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  planPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1DB954',
    marginVertical: 8,
  },
  planType: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  adsRemoval: {
    fontSize: 10,
    color: '#1DB954',
    marginTop: 6,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  paymentMethodSelected: {
    borderColor: '#1DB954',
    backgroundColor: '#f0fdf4',
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  purchaseButton: {
    backgroundColor: '#1DB954',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
});

export default SubscriptionScreen;
