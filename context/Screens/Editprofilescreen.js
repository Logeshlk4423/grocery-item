// screens/EditProfileScreen.js
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert, ScrollView } from 'react-native';
import { AppContext } from '../AppContext';

export default function EditProfileScreen({ navigation }) {
  const { userProfile, setUserProfile } = useContext(AppContext);

  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [address, setAddress] = useState(userProfile.address);

  const handleSave = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      Alert.alert('Validation Error', 'தயவுசெய்து அனைத்து விபரங்களையும் பூர்த்தி செய்யவும்!');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Validation Error', 'சரியான மின்னஞ்சல் முகவரியை பதிவு செய்யவும்!');
      return;
    }

    setUserProfile({ name, email, phone, address });
    Alert.alert('Success', 'Profile Updated Successfully!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.title}>Edit Profile</Text>

          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholderTextColor="#62728D" />

          <Text style={styles.label}>Email Address</Text>
          <TextInput 
            style={styles.input} 
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address" 
            autoCapitalize="none" 
            placeholderTextColor="#62728D"
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholderTextColor="#62728D" />

          <Text style={styles.label}>Delivery Address</Text>
          <TextInput 
            style={[styles.input, { height: 80 }]} 
            value={address} 
            onChangeText={setAddress} 
            multiline 
            placeholderTextColor="#62728D"
          />

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0D17' },
  scroll: { padding: 20 },
  card: { backgroundColor: '#161B2E', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: 'rgba(0, 255, 163, 0.3)' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#00FFA3', marginBottom: 20 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#8E9BAE', marginBottom: 6 },
  input: {
    backgroundColor: '#0B0D17',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#242C44',
  },
  saveBtn: {
    backgroundColor: '#00FFA3',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  saveBtnText: { color: '#0B0D17', fontSize: 16, fontWeight: '900' },
});