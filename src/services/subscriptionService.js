/**
 * Subscription Service
 * Handles newsletter subscription operations
 */

// Table name from the database schema
const TABLE_NAME = 'subscription';

// All fields from the table schema
const ALL_FIELDS = [
  'Name',
  'Tags',
  'Owner',
  'CreatedOn',
  'CreatedBy',
  'ModifiedOn',
  'ModifiedBy',
  'email',
  'subscribed_at'
];

// Fields that can be updated (from fieldVisibility: "Updateable")
const UPDATEABLE_FIELDS = [
  'Name',
  'Tags',
  'Owner',
  'email',
  'subscribed_at'
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
 * Subscribe a user to the newsletter
 * @param {string} email - User email
 * @returns {Promise} Promise with created subscription data
 */
export const subscribe = async (email) => {
  try {
    if (!email) {
      throw new Error('Email is required');
    }
    
    const apperClient = getClient();
    
    const params = {
      records: [
        {
          Name: `Subscription for ${email}`,
          email: email,
          subscribed_at: new Date().toISOString()
        }
      ]
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, params);
    if (response?.success && response?.results?.[0]?.success) {
      return response.results[0].data;
    } else {
      throw new Error(response?.results?.[0]?.message || 'Failed to subscribe');
    }
  } catch (error) {
    console.error('Error subscribing:', error);
    throw error;
  }
};