import { ref, Ref } from 'vue';

export type ProfileType = {
  uuid: string;
  name: string;
  description: string;
  can_delete: boolean;
  label: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  selected?: boolean;
}

const data: Ref<ProfileType[]> = ref<ProfileType[]>([{
  uuid: '34fbb002-fc41-11ec-b939-0242ac120003',
  name: 'Dodaje 1',
  description: 'Lorem ipsum',
  is_active: true,
  can_delete: false,
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
  label: 'Lorem Ipusm',
}, {
  uuid: '34fbb002-fc41-11ec-b939-0242ac120002',
  name: 'Dodawać 2',
  description: 'Lorem ipsum',
  is_active: true,
  can_delete: true,
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
  label: 'Lorem Ipusm',
}, {
  uuid: '34fbb002-fc41-11ec-b939-0242ac120004',
  name: 'Dodawać 2',
  description: 'Lorem ipsum',
  is_active: true,
  can_delete: true,
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
  label: 'Lorem Ipusm',
}, {
  uuid: '34fbb002-fc41-11ec-b939-0242ac120005',
  name: 'Dodawać 2',
  description: 'Lorem ipsum',
  is_active: true,
  can_delete: true,
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
  label: 'Lorem Ipusm',
}, {
  uuid: '34fbb002-fc41-11ec-b939-0242ac120006',
  name: 'Dodawać 2',
  description: 'Lorem ipsum',
  is_active: true,
  can_delete: true,
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
  label: 'Lorem Ipusm',
}, {
  uuid: '34fbb002-fc41-11ec-b939-0242ac120007',
  name: 'Dodawać 2',
  description: 'Lorem ipsum',
  is_active: true,
  can_delete: true,
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
  label: 'Lorem Ipusm',
}, {
  uuid: '34fbb002-fc41-11ec-b939-0242ac120008',
  name: 'Dodawać 2',
  description: 'Lorem ipsum',
  is_active: true,
  can_delete: true,
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
  label: 'Lorem Ipusm',
}, {
  uuid: '34fbb002-fc41-11ec-b939-0242ac120009',
  name: 'Dodawać 2',
  description: 'Lorem ipsum',
  is_active: true,
  can_delete: true,
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
  label: 'Lorem Ipusm',
}, {
  uuid: '34fbb002-fc41-11ec-b939-0242ac120010',
  name: 'Dodawać 2',
  description: 'Lorem ipsum',
  is_active: true,
  can_delete: true,
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
  label: 'Lorem Ipusm',
}, {
  uuid: '34fbb002-fc41-11ec-b939-0242ac120011',
  name: 'Dodawać 2',
  description: 'Lorem ipsum',
  is_active: true,
  can_delete: true,
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
  label: 'Lorem Ipusm',
}, {
  uuid: '34fbb002-fc41-11ec-b939-0242ac120012',
  name: 'Dodawać 2',
  description: 'Lorem ipsum',
  is_active: true,
  can_delete: true,
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
  label: 'Lorem Ipusm',
}, {
  uuid: '34fbb002-fc41-11ec-b939-0242ac120013',
  name: 'Dodawać 2',
  description: 'Lorem ipsum',
  is_active: true,
  can_delete: true,
  created_at: '10-10-2022 10:10:10',
  updated_at: '',
  label: 'Lorem Ipusm',
}]);

export default data;
