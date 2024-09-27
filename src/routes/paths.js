// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  organization: '/organization',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
      contact: `${ROOTS.AUTH}/jwt/contact`,
      about: `${ROOTS.AUTH}/jwt/about`,
      portfolio: `${ROOTS.AUTH}/jwt/portfolio`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    one: `${ROOTS.DASHBOARD}/one`,
    invoice: {
      root: (type) => `${ROOTS.DASHBOARD}/invoice/add/${type}`,
      details: (id, type) => `${ROOTS.DASHBOARD}/invoice/${type}/${id}`,
    },
    // invoice: (id) => id ? `${ROOTS.DASHBOARD}/invoice/${id}` : `${ROOTS.DASHBOARD}/invoice`,
    // schedule: `${ROOTS.DASHBOARD}/schedule`,
    // schedule: `${ROOTS.DASHBOARD}/schedule`,
    payment: (id) => `${ROOTS.DASHBOARD}/payment/${id}`,
    two: `${ROOTS.DASHBOARD}/two`,
    three: `${ROOTS.DASHBOARD}/three`,
    messagesDashboard: `${ROOTS.DASHBOARD}/messages-dashboard`,
    sales: {
      root: `${ROOTS.DASHBOARD}/sales`,
      schedule: `${ROOTS.DASHBOARD}/sales/schedule`,
      home: `${ROOTS.DASHBOARD}/sales/home`,
      commercial: `${ROOTS.DASHBOARD}/sales/commercial`,
      residential: `${ROOTS.DASHBOARD}/sales/residential`,
      services: `${ROOTS.DASHBOARD}/sales/services`,
    },
  },

  organization: {
    root: ROOTS.organization,
    dashboard: `${ROOTS.organization}/dashboard`,
    login: `${ROOTS.organization}/login`,
    user_login: `${ROOTS.organization}/user-login`,
    users: `${ROOTS.organization}/users`,
    roles: `${ROOTS.organization}/roles`,
    permissions: `${ROOTS.organization}/permissions`,
    relationships: `${ROOTS.organization}/relationships`,
    settings: `${ROOTS.organization}/system-settings`,
  },
};
