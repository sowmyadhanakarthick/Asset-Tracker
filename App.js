import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AssetForm from './components/AssetForm';
import AssetItem from './components/AssetItem';
import { loadAssets, addAsset, updateAsset, deleteAsset } from './utils/storage';

export default function App() {
  const [assets, setAssets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssetsFromStorage();
  }, []);

  const loadAssetsFromStorage = async () => {
    try {
      const storedAssets = await loadAssets();
      setAssets(storedAssets);
    } catch (error) {
      Alert.alert('Error', 'Failed to load assets');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAsset = () => {
    setEditingAsset(null);
    setShowForm(true);
  };

  const handleEditAsset = (asset) => {
    setEditingAsset(asset);
    setShowForm(true);
  };

  const handleSaveAsset = async (assetData) => {
    try {
      if (editingAsset) {
        // Update existing asset
        const updatedAsset = await updateAsset(editingAsset.id, assetData);
        if (updatedAsset) {
          setAssets(prevAssets =>
            prevAssets.map(asset =>
              asset.id === editingAsset.id ? updatedAsset : asset
            )
          );
          Alert.alert('Success', 'Asset updated successfully');
        } else {
          Alert.alert('Error', 'Failed to update asset');
        }
      } else {
        // Add new asset
        const newAsset = await addAsset(assetData);
        if (newAsset) {
          setAssets(prevAssets => [...prevAssets, newAsset]);
          Alert.alert('Success', 'Asset added successfully');
        } else {
          Alert.alert('Error', 'Failed to add asset');
        }
      }
      setShowForm(false);
      setEditingAsset(null);
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  const handleDeleteAsset = async (assetId) => {
    try {
      const success = await deleteAsset(assetId);
      if (success) {
        setAssets(prevAssets => prevAssets.filter(asset => asset.id !== assetId));
        Alert.alert('Success', 'Asset deleted successfully');
      } else {
        Alert.alert('Error', 'Failed to delete asset');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingAsset(null);
  };

  const getTotalsByMetal = () => {
    const totals = {};
    assets.forEach(asset => {
      if (!totals[asset.metal]) {
        totals[asset.metal] = { count: 0, weight: 0 };
      }
      totals[asset.metal].count += asset.count;
      if (asset.weight) {
        totals[asset.metal].weight += asset.weight * asset.count;
      }
    });
    return totals;
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="diamond" size={80} color="#ccc" />
      <Text style={styles.emptyStateTitle}>No Assets Yet</Text>
      <Text style={styles.emptyStateText}>
        Start tracking your precious assets by adding your first item
      </Text>
      <TouchableOpacity style={styles.emptyStateButton} onPress={handleAddAsset}>
        <Text style={styles.emptyStateButtonText}>Add First Asset</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSummary = () => {
    const totals = getTotalsByMetal();
    const metalKeys = Object.keys(totals);
    
    if (metalKeys.length === 0) return null;

    return (
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Summary</Text>
        {metalKeys.map(metal => (
          <View key={metal} style={styles.summaryItem}>
            <Text style={styles.summaryMetal}>{metal.charAt(0).toUpperCase() + metal.slice(1)}</Text>
            <Text style={styles.summaryDetails}>
              {totals[metal].count} items
              {totals[metal].weight > 0 && ` • ${totals[metal].weight.toFixed(1)}g`}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  if (showForm) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <AssetForm
          asset={editingAsset}
          onSave={handleSaveAsset}
          onCancel={handleCancelForm}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Asset Tracker</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddAsset}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {assets.length > 0 && renderSummary()}

      <FlatList
        data={assets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AssetItem
            asset={item}
            onEdit={handleEditAsset}
            onDelete={handleDeleteAsset}
          />
        )}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={assets.length === 0 ? styles.emptyContainer : null}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007bff',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  summaryMetal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  summaryDetails: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  emptyStateButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
