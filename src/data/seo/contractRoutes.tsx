import { createElement } from 'react';
import type { RouteObject } from 'react-router-dom';
import MbeSupplierVsSubcontractorPage from '../../pages/seo/MbeSupplierVsSubcontractorPage';

export const contractPages: RouteObject[] = [
  { path: 'contracts/mbe-supplier-vs-subcontractor', element: createElement(MbeSupplierVsSubcontractorPage) },
];
