// src/api/communityService.js

import axios from 'axios';
import axiosInstance from './axiosInstance';

export const addCommunity = async (name) => {
  const response = await axiosInstance.post('/add', null, { params: { name } });
  return response.data;
};

export const updateCommunity = async (id, newCommunityName) => {
  const response = await axiosInstance.put(`/${id}`, null, { params: { newCommunityName } });
  return response.data;
};

export const deleteCommunity = async (id) => {
  await axiosInstance.delete(`/${id}`);
};

export const getCommunity = async (id) => {
  const response = await axiosInstance.get(`/${id}`);
  return response.data;
};

export const getAllCommunityUsers = async (id) => {
  const response = await axiosInstance.get(`/${id}/users`);
  return response.data;
};

export const findUserInCommunityByEmail = async (id, email) => {
  const response = await axiosInstance.get(`/${id}/users/${email}`);
  return response.data;
};

export const addUserToCommunity = async (id, personId) => {
  const response = await axiosInstance.post(`/${id}/users`, null, { params: { personId } });
  return response.data;
};

export const deleteUserFromCommunity = async (id, userId) => {
  await axiosInstance.delete(`/${id}/users/${userId}`);
};

export const getAllCommunities = async () => {
  try {
    const response = await axiosInstance.get('');
    return response.data;
  } catch (error) {
    console.error('Error fetching communities:', error);
    throw error;
  }
};
