import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const METALS = [
  { label: 'Gold', value: 'gold' },
  { label: 'Silver', value: 'silver' },
  { label: 'Diamond', value: 'diamond' },
  { label: 'Platinum', value: 'platinum' },
];

const ORNAMENT_TYPES = [
  { label: 'Bangle', value: 'bangle' },
  { label: 'Ring', value: 'ring' },
  { label: 'Chain', value: 'chain' },
  { label: 'Necklace', value: 'necklace' },
  { label: 'Earrings', value: 'earrings' },
  { label: 'Bracelet', value: 'bracelet' },
  { label: 'Pendant', value: 'pendant' },
  { label: 'Anklet', value: 'anklet' },
  { label: 'Coin', value: 'coin' },
];

const AssetForm = ({ asset, onSave, onCancel }) => {
  const [metal, setMetal] = useState('');
  const [ornamentType, setOrnamentType] = useState('');
  const [weight, setWeight] = useState('');
  const [count, setCount] = useState('1');

  useEffect(() => {
    if (asset) {
      setMetal(asset.metal || '');
      setOrnamentType(asset.ornamentType || '');
      setWeight(asset.weight ? asset.weight.toString() : '');
      setCount(asset.count ? asset.count.toString() : '1');
    }
  }, [asset]);

  const handleSave = () => {
    if (!metal || !ornamentType || !count) {
      Alert.alert('Error', 'Please fill in all required fields (Metal, Type, Count)');
      return;
    }

    const countNum = parseInt(count);
    if (isNaN(countNum) || countNum < 1) {
      Alert.alert('Error', 'Count must be a valid number greater than 0');
      return;
    }

    const weightNum = weight ? parseFloat(weight) : null;
    if (weight && (isNaN(weightNum) || weightNum <= 0)) {
      Alert.alert('Error', 'Weight must be a valid positive number');
      return;
    }

    const assetData = {
      metal,
      ornamentType,
      count: countNum,
      weight: weightNum,
    };

    onSave(assetData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{asset ? 'Edit Asset' : 'Add New Asset'}</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Metal Type *</Text>
        <Picker
          selectedValue={metal}
          onValueChange={setMetal}
          style={styles.picker}
        >
          <Picker.Item label="Select metal type..." value="" />
          {METALS.map(item => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Ornament Type *</Text>
        <Picker
          selectedValue={ornamentType}
          onValueChange={setOrnamentType}
          style={styles.picker}
        >
          <Picker.Item label="Select ornament type..." value="" />
          {ORNAMENT_TYPES.map(item => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Count *</Text>
        <TextInput
          style={styles.input}
          value={count}
          onChangeText={setCount}
          placeholder="Enter count"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Weight (grams)</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          placeholder="Enter weight (optional)"
          keyboardType="decimal-pad"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    height: 50,
  },
});

export default AssetForm;
