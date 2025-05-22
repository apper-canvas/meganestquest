/**
 * Property Service
 * Handles all property-related operations with the Apper backend
 */

// Table name from the database schema
const TABLE_NAME = 'property';

// All fields from the table schema
const ALL_FIELDS = [
  'Name',
  'Tags',
  'Owner',
  'CreatedOn',
  'CreatedBy',
  'ModifiedOn',
  'ModifiedBy',
  'title',
  'price',
  'bedrooms',
  'bathrooms',
  'area',
  'address',
  'type',
  'status',
  'image',
  'description'
];

// Fields that can be updated (from fieldVisibility: "Updateable")
const UPDATEABLE_FIELDS = [
  'Name',
  'Tags',
  'Owner',
  'title',
  'price',
  'bedrooms',
  'bathrooms',
  'area',
  'address',
  'type',
  'status',
  'image',
  'description'
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
 * Fetch properties with optional filtering
 * @param {Object} filters - Filter criteria for properties
 * @param {number} limit - Number of records to fetch
 * @param {number} offset - Pagination offset
 * @returns {Promise} Promise with property data
 */
export const fetchProperties = async (filters = {}, limit = 20, offset = 0) => {
  try {
    const apperClient = getClient();
    
    // Build query params
    const params = {
      fields: ALL_FIELDS,
      pagingInfo: {
        limit,
        offset
      }
    };
    
    // Add filtering conditions if provided
    const conditions = [];
    
    if (filters.priceMin) {
      conditions.push({
        fieldName: 'price',
        operator: 'GreaterThanOrEqualTo',
        values: [filters.priceMin]
      });
    }
    
    if (filters.priceMax) {
      conditions.push({
        fieldName: 'price',
        operator: 'LessThanOrEqualTo',
        values: [filters.priceMax]
      });
    }
    
    if (filters.bedrooms) {
      conditions.push({
        fieldName: 'bedrooms',
        operator: 'GreaterThanOrEqualTo',
        values: [filters.bedrooms]
      });
    }
    
    if (filters.type) {
      conditions.push({
        fieldName: 'type',
        operator: 'ExactMatch',
        values: [filters.type]
      });
    }
    
    if (filters.status) {
      conditions.push({
        fieldName: 'status',
        operator: 'ExactMatch',
        values: [filters.status]
      });
    }
    
    if (conditions.length > 0) {
      params.where = conditions;
    }
    
    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

/**
 * Get a property by ID
 * @param {string|number} id - Property ID
 * @returns {Promise} Promise with property data
 */
export const getPropertyById = async (id) => {
  try {
    const apperClient = getClient();
    const params = { fields: ALL_FIELDS };
    const response = await apperClient.getRecordById(TABLE_NAME, id, params);
    return response.data;
  } catch (error) {
    console.error(`Error fetching property with ID ${id}:`, error);
    throw error;
  }
};