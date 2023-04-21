<template>
  <div class="user-list">
    <div
      v-for="user in users"
      :key="user.id"
      :class="{
        'user-list--item': true,
        'user-list--item__active': activeUser === user.id,
      }"
      @click="onUserChange(user.id)"
    >
      {{ user.name }}
    </div>
    <div @click="onUserAdd">+添加用户</div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "../store/user";
import { computed } from "vue";

defineProps<{
  activeUser: number;
}>();

const emit = defineEmits<{ (e: "on-change", userId: number) }>();

const userStore = useUserStore();
const users = computed(() => userStore.users);

function onUserChange(userId: number) {
  emit("on-change", userId);
}

function onUserAdd() {
  const idInput = window.prompt("请输入用户id");
  if (!idInput) {
    return;
  }
  const id = Number.parseInt(idInput);
  if (Number.isNaN(id) || !id) {
    return;
  }
  const nameInput = window.prompt("请输入用户名");
  if (!nameInput) {
    return;
  }
  userStore.addUser({
    id,
    name: nameInput,
    avatar: "",
  });
  onUserChange(id);
}
</script>

<style >
.user-list {
  width: 200px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
}

.user-list--item {
  height: 28px;
  line-height: 28px;
  border-radius: 4px;
  margin-bottom: 4px;
}

.user-list--item__active {
  background: rgba(0, 77, 255, 0.07) !important;
}

.user-list--item:hover {
  background: rgba(18, 17, 42, 0.05);
}
</style>