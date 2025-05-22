/**
 * Favorite Service
 * Handles user favorite properties operations
 */

// Table name from the database schema
const TABLE_NAME = 'user_favorite';

// All fields from the table schema
const ALL_FIELDS = [
  'Name',
  'Tags',
  'Owner',
  'CreatedOn',
  'CreatedBy',
  'ModifiedOn',
  'ModifiedBy',
  'user_email',
  'property_id'
];

// Fields that can be updated (from fieldVisibility: "Updateable")
const UPDATEABLE_FIELDS = [
  'Name',
  'Tags',
  'Owner',
  'user_email',
  'property_id'
];

// Initialize ApperClient
const getClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

/**
 * Fetch user favorites by email
 * @param {string} email - User email
 * @returns {Promise} Promise with favorites data
 */
export const fetchUserFavorites = async (email) => {
  try {
    if (!email) {
      return [];
    }
    
    const apperClient = getClient();
    
    const params = {
      fields: ALL_FIELDS,
      where: [
        {
          fieldName: 'user_email',
          operator: 'ExactMatch',
          values: [email]
        }
      ]
    };
    
    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    throw error;
  }
};

/**
 * Add a property to user favorites
 * @param {string} email - User email
 * @param {string|number} propertyId - Property ID
 * @param {string} propertyName - Property name (for the Name field)
 * @returns {Promise} Promise with created favorite data
 */
export const addFavorite = async (email, propertyId, propertyName) => {
  try {
    if (!email || !propertyId) {
      throw new Error('Email and property ID are required');
    }
    
    const apperClient = getClient();
    
    const params = {
      records: [
        {
          Name: `Favorite: ${propertyName}`,
          user_email: email,
          property_id: propertyId
        }
      ]
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, params);
    if (response?.success && response?.results?.[0]?.success) {
      return response.results[0].data;
    } else {
      throw new Error(response?.results?.[0]?.message || 'Failed to add favorite');
    }
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
};

/**
 * Remove a property from user favorites
 * @param {string|number} favoriteId - Favorite record ID
 * @returns {Promise} Promise with deletion result
 */
export const removeFavorite = async (favoriteId) => {
  try {
    if (!favoriteId) {
      throw new Error('Favorite ID is required');
    }
    
    const apperClient = getClient();
    
    const params = {
      RecordIds: [favoriteId]
    };
    
    const response = await apperClient.deleteRecord(TABLE_NAME, params);
    return response?.success || false;
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};