import PrimeVue from 'primevue/config';
import MyDataTable from '@components/MyDataTable.vue';
import MyCreateForm from '@components/MyCreateForm.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

import 'primevue/resources/themes/saga-blue/theme.css'

import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);
app
  .use(PrimeVue)
  .component('MyDataTable', MyDataTable)
  .component('MyCreateForm', MyCreateForm)
  .component('DataTable', DataTable)
  .component('Column', Column)
  .component('InputText', InputText)
  .component('Textarea', Textarea)
  .component('Dialog', Dialog)
  .component('Button', Button)
  .mount('#app');
