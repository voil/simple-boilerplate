import { ref, Ref } from 'vue';

export type TeamType = {
  uuid: string;
  name: string;
  users: [];
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  selected?: boolean;
}

const data: Ref<TeamType[]> = ref<TeamType[]>([{
  uuid: '34fbb002-fc41-11ec-b939-0242ac120003',
  name: 'Dodaje 1',
  description: 'Lorem ipsum',
  is_active: true,
  users: [],
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
}, {
  uuid: '34fbb002-fc41-11ec-b939-0242ac120004',
  name: 'Dodaje 1',
  description: 'Lorem ipsum',
  is_active: true,
  users: [],
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
}, {
  uuid: '34fbb002-fc41-11ec-b939-0242ac120005',
  name: 'Dodaje 1',
  description: 'Lorem ipsum',
  is_active: true,
  users: [],
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
}, {
  uuid: '34fbb002-fc41-11ec-b939-0242ac120006',
  name: 'Dodaje 1',
  description: 'Lorem ipsum',
  is_active: true,
  users: [],
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
}, {
  uuid: '34fbb002-fc41-11ec-b939-0242ac120007',
  name: 'Dodaje 1',
  description: 'Lorem ipsum',
  is_active: true,
  users: [],
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
}, {
  uuid: '34fbb002-fc41-11ec-b939-0242ac120008',
  name: 'Dodaje 1',
  description: 'Lorem ipsum',
  is_active: true,
  users: [],
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
}, {
  uuid: '34fbb002-fc41-11ec-b939-0242ac120009',
  name: 'Dodaje 1',
  description: 'Lorem ipsum',
  is_active: true,
  users: [],
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
}, {
  uuid: '34fbb002-fc41-11ec-b939-0242ac1200010',
  name: 'Dodaje 1',
  description: 'Lorem ipsum',
  is_active: true,
  users: [],
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
}, {
  uuid: '34fbb002-fc41-11ec-b939-0242ac120011',
  name: 'Dodaje 1',
  description: 'Lorem ipsum',
  is_active: true,
  users: [],
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
}, {
  uuid: '34fbb002-fc41-11ec-b939-0242ac120012',
  name: 'Dodaje 1',
  description: 'Lorem ipsum',
  is_active: true,
  users: [],
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
}]);

export default data;
