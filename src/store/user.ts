import { defineStore } from "pinia";
import { ref } from "vue";
import { CACHE_BASE } from "../constant";

interface User {
  id: number;
  name: string;
  avatar: string;
}

export const USER_CACHE_KEY = `${CACHE_BASE}-users`;

export const useUserStore = defineStore("user", () => {
  const users = ref<User[]>([]);
  const userMap = ref<{ [userId: number]: User }>({});

  function updateUsers() {
    const str = localStorage.getItem(USER_CACHE_KEY);
    if (str) {
      const _users = JSON.parse(str);
      if (
        Array.isArray(_users) &&
        _users.every((user) => user.id && user.name)
      ) {
        users.value = _users;
        users.value.forEach((user) => {
          userMap.value[user.id] = user;
        });
      }
    }
  }

  function addUser(user: User) {
    users.value.push(user);
    userMap.value[user.id] = user;
    localStorage.setItem(USER_CACHE_KEY, JSON.stringify(users.value));
  }

  function removeUser(userId: number) {
    const index = users.value.findIndex((user) => user.id === userId);
    if (index > -1) {
      delete userMap.value[userId];
      users.value.splice(index, 1);
      localStorage.setItem(USER_CACHE_KEY, JSON.stringify(users.value));
    }
  }

  return {
    users,
    userMap,
    updateUsers,
    addUser,
    removeUser,
  };
});
