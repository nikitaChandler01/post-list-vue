<template>
  <Button label="Создать" @click="() => (isVisibleCreatingForm = true)" />
  <Dialog v-model:visible="isVisibleCreatingForm" modal header="Header" style="width: 100%">
    <template #container>
      <MyCreateForm
        :id="postsArray.length"
        @postCreated="addPost"
        @canceledCreating="() => (isVisibleCreatingForm = false)"
      />
    </template>
  </Dialog>
  <DataTable
    v-model:editingRows="editingRows"
    :value="postsArray"
    editMode="row"
    dataKey="id"
    @row-edit-save="onRowEditSave"
    :loading="props.isLoading"
  >
    <Column header="ID поста" field="id" />
    <Column header="Заголовок поста" field="title">
      <template #editor="{ data, field }"> <InputText v-model="data[field]" /></template>
    </Column>
    <Column header="Содержимое поста" field="body">
      <!-- <template #editor="{ data, field }"> <Textarea v-model="data[field]" /></template> -->
      <!-- Если надо изменять содержимое поста -->
    </Column>
    <Column header="ID пользователя" field="userId"></Column>
    <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center" />
    <Column style="background-color: #f9fafb">
      <template #body="{ data }">
        <Button label="Удалить" severity="danger" @click="removePost(data)" />
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { reactive, ref, onUpdated } from 'vue';
const props = defineProps({
  posts: {
    type: Object,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
});
const isVisibleCreatingForm = ref(false);
const postsArray = ref(props.posts);
onUpdated(() => {
  postsArray.value = props.posts;
});
const editingRows = ref([]);
const emit = defineEmits(['postsChanged', 'addPost', 'addedPost', 'deletePost']);

const onRowEditSave = ({ newData }) => {
  const editItem = newData;
  emit('postsChanged', editItem);
};

const addPost = (newPost) => {
  isVisibleCreatingForm.value = false;
  emit('addedPost', newPost);
};
const removePost = (post) => {
  emit('deletePost', post);
};
</script>

<style scoped></style>
