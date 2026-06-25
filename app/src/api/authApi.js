import api from "../api.js";

const API_URL = api("/users");

export async function getUserByEmail(email) {
  const response = await fetch(`${API_URL}?email=${encodeURIComponent(email)}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const users = await response.json();
  return users[0];
}

export async function createUser(user) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
}

export async function updateUser(userId, updatedFields) {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFields),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
}
