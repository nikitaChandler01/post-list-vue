<template>
  <div class="container">
    <div class="formgrid grid">
      <h2 class="field col-12">Форма создания поста</h2>
      <p class="field col-12">ID поста: {{ creatingPost.id }}</p>
      <div class="field col-12">
        <label for="title">Заголовок поста</label>
        <InputText id="title" v-model="creatingPost.title" placeholder="Введите заголовок" />
      </div>
      <div class="field col-12">
        <label for="body">Содержимое поста</label>
        <Textarea id="body" v-model="creatingPost.body" placeholder="Введите содержимое поста" />
      </div>
      <div class="field col-12 md:col-6">
        <Button label="Создать" severity="success" @click="createPost" />
        <Button label="Отменить" severity="danger" @click="cancelCreating" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['postCreated', 'canceledCreating']);

const creatingPost = ref({
  id: props.id + 1,
  title: '',
  body: '',
  userId: 1,
});

const createPost = (event) => {
  const postItem = creatingPost.value;
  createPost.value = {
    id: props.id + 1,
    title: '',
    body: '',
    userId: 1,
  };
  emit('postCreated', postItem);
};
const cancelCreating = () => {
  emit('canceledCreating')
};
</script>

<style scoped>
.container {
  z-index: 5;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px;
  background: #fff;
  width: 80%;
  height: 500px;
  border-radius: 20px;
  border: 2px solid #949494;
}

.p-inputtext {
  margin-top: 10px;
  width: 100%;
}
.p-dropdown {
  margin-top: 10px;
  width: 100%;
}
.p-button {
  width: 100px;
  margin-right: 20px;
}
</style>
