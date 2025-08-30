import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AssetItem = ({ asset, onEdit, onDelete }) => {
  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this asset?');
    if (confirmed) {
      onDelete(asset.id);
    }
  };

  const getMetalColor = (metal) => {
    const colors = {
      gold: '#FFD700',
      silver: '#C0C0C0',
      diamond: '#B9F2FF',
      platinum: '#E5E4E2',
    };
    return colors[metal] || '#f0f0f0';
  };

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <View style={[styles.container, { borderLeftColor: getMetalColor(asset.metal) }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.metalType}>{capitalizeFirst(asset.metal)}</Text>
          <Text style={styles.ornamentType}>{capitalizeFirst(asset.ornamentType)}</Text>
        </View>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons name="copy-outline" size={16} color="#666" />
            <Text style={styles.detailText}>Count: {asset.count}</Text>
          </View>
          
          {asset.weight && (
            <View style={styles.detailItem}>
              <Ionicons name="barbell-outline" size={16} color="#666" />
              <Text style={styles.detailText}>
                Weight: {asset.weight}g 
                {asset.weightType === 'per_item' ? ' each' : ' total'}
                {asset.weightType === 'per_item' && ` (${(asset.weight * asset.count).toFixed(1)}g total)`}
              </Text>
            </View>
          )}
        </View>
        
        {asset.createdAt && (
          <Text style={styles.dateText}>
            Added: {new Date(asset.createdAt).toLocaleDateString()}
          </Text>
        )}
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(asset)}>
          <Ionicons name="create-outline" size={20} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={20} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metalType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  ornamentType: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    padding: 8,
    marginRight: 8,
  },
  deleteButton: {
    padding: 8,
  },
});

export default AssetItem;
