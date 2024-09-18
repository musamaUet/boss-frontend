// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
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
    sales: {
      root: `${ROOTS.DASHBOARD}/sales`,
      schedule: `${ROOTS.DASHBOARD}/sales/schedule`,
      home: `${ROOTS.DASHBOARD}/sales/home`,
      commercial: `${ROOTS.DASHBOARD}/sales/commercial`,
      residential: `${ROOTS.DASHBOARD}/sales/residential`,
      services: `${ROOTS.DASHBOARD}/sales/services`,
    },
  },
};
