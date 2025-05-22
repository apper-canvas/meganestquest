/**
 * Visit Service
 * Handles property visit scheduling operations
 */

// Table name from the database schema
const TABLE_NAME = 'property_visit';

// All fields from the table schema
const ALL_FIELDS = [
  'Name',
  'Tags',
  'Owner',
  'CreatedOn',
  'CreatedBy',
  'ModifiedOn',
  'ModifiedBy',
  'property_id',
  'date',
  'time',
  'email',
  'phone'
];

// Fields that can be updated (from fieldVisibility: "Updateable")
const UPDATEABLE_FIELDS = [
  'Name',
  'Tags',
  'Owner',
  'property_id',
  'date',
  'time',
  'email',
  'phone'
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
 * Schedule a property visit
 * @param {Object} visitData - Visit details
 * @param {string|number} visitData.property_id - Property ID
 * @param {string} visitData.date - Visit date
 * @param {string} visitData.time - Visit time
 * @param {string} visitData.name - Visitor name
 * @param {string} visitData.email - Visitor email
 * @param {string} visitData.phone - Visitor phone (optional)
 * @returns {Promise} Promise with created visit data
 */
export const scheduleVisit = async (visitData) => {
  try {
    if (!visitData.property_id || !visitData.date || !visitData.time || !visitData.email) {
      throw new Error('Missing required visit information');
    }
    
    const apperClient = getClient();
    
    const params = {
      records: [
        {
          Name: `Visit on ${visitData.date} at ${visitData.time}`,
          property_id: visitData.property_id,
          date: visitData.date,
          time: visitData.time,
          email: visitData.email,
          phone: visitData.phone || ''
        }
      ]
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, params);
    if (response?.success && response?.results?.[0]?.success) {
      return response.results[0].data;
    } else {
      throw new Error(response?.results?.[0]?.message || 'Failed to schedule visit');
    }
  } catch (error) {
    console.error('Error scheduling visit:', error);
    throw error;
  }
};