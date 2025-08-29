import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@asset_tracker_data';

export const saveAssets = async (assets) => {
  try {
    const jsonValue = JSON.stringify(assets);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving assets:', error);
    return false;
  }
};

export const loadAssets = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error loading assets:', error);
    return [];
  }
};

export const addAsset = async (asset) => {
  try {
    const assets = await loadAssets();
    const newAsset = {
      id: Date.now().toString(),
      ...asset,
      createdAt: new Date().toISOString(),
    };
    assets.push(newAsset);
    await saveAssets(assets);
    return newAsset;
  } catch (error) {
    console.error('Error adding asset:', error);
    return null;
  }
};

export const updateAsset = async (id, updatedAsset) => {
  try {
    const assets = await loadAssets();
    const index = assets.findIndex(asset => asset.id === id);
    if (index !== -1) {
      assets[index] = { ...assets[index], ...updatedAsset, updatedAt: new Date().toISOString() };
      await saveAssets(assets);
      return assets[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating asset:', error);
    return null;
  }
};

export const deleteAsset = async (id) => {
  try {
    const assets = await loadAssets();
    const filteredAssets = assets.filter(asset => asset.id !== id);
    await saveAssets(filteredAssets);
    return true;
  } catch (error) {
    console.error('Error deleting asset:', error);
    return false;
  }
};
