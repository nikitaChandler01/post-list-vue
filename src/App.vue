<template>
  <h1>Посты пользователей</h1>
  <Button label="Создать" @click="() => (isVisibleCreatingForm = true)" />
  <Dialog v-model:visible="isVisibleCreatingForm" modal header="Header" style="width: 100%">
    <template #container>
      <MyCreateForm
        :id="posts.length"
        @postCreated="addPost"
        @canceledCreating="() => (isVisibleCreatingForm = false)"
        :disabled="isLoading"
      />
    </template>
  </Dialog>
  <MyDataTable
    :posts="posts"
    :isLoading="isLoading"
    @addedPost="addPost"
    @postsChanged="changePost"
    @deletePost="deletePost"
  />
</template>

<script setup>
import { getDataFromServer, putNewDataToServer } from '@services/index.js';
import { ref, onMounted } from 'vue';

const url = import.meta.env.VITE_URL;
const posts = ref([]);
const isLoading = ref(true);
const isVisibleCreatingForm = ref(false);
onMounted(async () => {
  getDataFromServer(`${url}?_start=0&_limit=10`)
    .then((result) => {
      posts.value = result.response.data;
      isLoading.value = false;
    })
    .catch((err) => console.log(err));
});

const changePost = (editItem) => {
  posts.value.forEach((post, index) => {
    if (editItem.id === post.id) {
      posts.value[index] = editItem;
      // putNewDataToServer(url, posts.value)
      // .then(() => getDataFromServer(url))
      // .then((result) => posts.value = result.response.data)
      // но через фейк-апи не изменить данные на сервере, поэтому для отображения, меняю пропсы локально.
    }
  });
};

const addPost = (newPost) => {
  posts.value.push(newPost);
  // putNewDataToServer(url, posts.value)
  // .then(() => getDataFromServer(url))
  // .then((result) => posts.value = result.response.data)
  // но через фейк-апи не изменить данные на сервере, поэтому для отображения, меняю пропсы локально.
};

const deletePost = (post) => {
  const index = posts.value.indexOf(post);
  posts.value.splice(index, 1);
  posts.value.forEach((post, index) => {
    post.id = index + 1;
  });
  // putNewDataToServer(url, posts.value)
  // .then(() => getDataFromServer(url))
  // .then((result) => posts.value = result.response.data)
  // но через фейк-апи не изменить данные на сервере, поэтому для отображения, меняю пропсы локально.
};

</script>

<style scoped></style>
