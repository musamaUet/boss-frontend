import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// components
import SvgColor from 'src/components/svg-color';
import {
  SvgAccounting,
  SvgCollections,
  SvgComplains,
  SvgHomeIcon,
  SvgLeads,
  SvgMessages,
  SvgPeople,
  SvgProducts,
  SvgProjects,
  SvgPurchasing,
  SvgReport,
  SvgSales,
} from 'src/sections/common/components/list-svg-icons';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={name} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  credit: icon('ic_credit'),
  companySetting: icon('ic_company_setting'),
  creditInvoice: icon('ic-invoice-dollar'),
  listForm: icon('ic_transfer_list'),
  support: icon('ic_support'),
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  Sales: icon(SvgSales),
  Leads: icon(SvgLeads),
  Projects: icon(SvgProjects),
  Products: icon(SvgProducts),
  Collections: icon(SvgCollections),
  Accounting: icon(SvgAccounting),
  Purchasing: icon(SvgPurchasing),
  People: icon(SvgPeople),
  Messages: icon(SvgMessages),
  Report: icon(SvgReport),
  Complains: icon(SvgComplains),
  Home: icon(SvgHomeIcon),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(() => [
    // OVERVIEW
    // ----------------------------------------------------------------------
    {
      items: [
        { title: 'Home', path: paths.dashboard.root, icon: ICONS.Home },
        // { title: 'Sales', path: paths.dashboard.invoice, icon: ICONS.Sales },
        {
          title: 'Sales',
          // path: '/sales',
          path: paths.dashboard.sales.root,
          icon: ICONS.Sales,
          children: [
            {
              title: 'Dashboard',
              path: paths.dashboard.sales.home,
            },
            {
              title: 'Residential',
              path: paths.dashboard.sales.residential,
            },
            {
              title: 'Schedule',
              path: paths.dashboard.sales.schedule,
            },
            {
              title: 'Commercial',
              path: paths.dashboard.sales.commercial,
            },
            {
              title: 'Services',
              path: paths.dashboard.sales.services,
            },
          ],
        },
        {
          title: 'Products',
          path: paths.dashboard.three,
          icon: ICONS.Products,
        },
        {
          title: 'Collections',
          path: paths.dashboard.three,
          icon: ICONS.Collections,
        },
        {
          title: 'Accounting',
          path: paths.dashboard.three,
          icon: ICONS.Accounting,
        },
        {
          title: 'Purchasing',
          path: paths.dashboard.three,
          icon: ICONS.Purchasing,
        },
        {
          title: 'People',
          path: paths.dashboard.three,
          icon: ICONS.People,
        },
        {
          title: 'Messages',
          path: paths.dashboard.three,
          icon: ICONS.Messages,
        },
        {
          title: 'Reports',
          path: paths.dashboard.three,
          icon: ICONS.Report,
        },
        {
          title: 'Complains',
          path: paths.dashboard.three,
          icon: ICONS.Complains,
        },
      ],
    },
  ]);

  return data;
}
