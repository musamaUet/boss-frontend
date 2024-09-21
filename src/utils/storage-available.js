// ----------------------------------------------------------------------

import Iconify from "src/components/iconify";

export function localStorageAvailable() {
  try {
    const key = '__some_random_key_you_are_not_going_to_use__';
    window.localStorage.setItem(key, key);
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
}

export function localStorageGetItem(key, defaultValue = '') {
  const storageAvailable = localStorageAvailable();

  let value;

  if (storageAvailable) {
    value = localStorage.getItem(key) || defaultValue;
  }

  return value;
}


export const TABS = [
  {
    value: 'draft',
    icon: <Iconify icon="solar:heart-bold" width={24} />,
    label: 'Drafts',
  },
  {
    value: 'estimate',
    icon: <Iconify icon="solar:phone-bold" width={24} />,
    label: 'Estimates',
  },
  {
    value: 'work-order',
    icon: <Iconify icon="eva:headphones-fill" width={24} />,
    label: 'Work Orders',
  },
  {
    value: 'change-order',
    icon: <Iconify icon="eva:headphones-fill" width={24} />,
    label: 'Change Orders',
  },
  {
    value: 'invoices',
    icon: <Iconify icon="eva:headphones-fill" width={24} />,
    label: 'Invoices',
  },
  {
    value: 'to-project',
    icon: <Iconify icon="eva:headphones-fill" width={24} />,
    label: 'Estimates sent to projects',
  },
];
