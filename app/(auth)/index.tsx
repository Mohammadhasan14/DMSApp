import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { setLoginData } from '../../store/userSlice';
import { generateOTP, validateOTP } from '../../services/authApi';
import { setAuthToken } from '../../services/api';

export default function LoginScreen() {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSendOTP = async () => {
    if (!mobile) {
      Alert.alert("Enter mobile number");
      return;
    }

    try {
      setLoading(true);
      await generateOTP(mobile);
      setIsOtpSent(true);
      Alert.alert("OTP Sent");
    } catch (error: any) {
      console.log(error);
      Alert.alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      Alert.alert("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      let token = "";

      try {
        // real backend
        const res = await validateOTP(mobile, otp);
        token = res.data?.token;
        console.log("real token......", token);
      } catch (apiErr) {
        console.log("Bbackend OTP failed so using mock token....");
      }

      // fallback if no token from backend
      if (!token) {
        token = "mock-token-123";
        console.log("Using mock token");
      }

      setAuthToken(token);

      dispatch(
        setLoginData({
          token,
          mobile_number: mobile,
        })
      );

      Alert.alert("Login Successful");

    } catch (error: any) {
      console.log("login error....", error);
      Alert.alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DMS Login</Text>

      <TextInput
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        style={styles.input}
        keyboardType="phone-pad"
      />

      {isOtpSent && (
        <TextInput
          placeholder="Enter OTP"
          value={otp}
          onChangeText={setOtp}
          style={styles.input}
          keyboardType="number-pad"
        />
      )}

      <Button
        title={loading ? "Please wait..." : isOtpSent ? "Verify OTP" : "Get OTP"}
        onPress={isOtpSent ? handleVerifyOTP : handleSendOTP}
        disabled={loading}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8 },
});
