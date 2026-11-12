import { createElement } from 'react';
import type { RouteObject } from 'react-router-dom';
import SldcMbeCertificationPage from '../../pages/seo/SldcMbeCertificationPage';
import SldcWbeCertificationPage from '../../pages/seo/SldcWbeCertificationPage';
import MoOeoMbeWbeCertificationPage from '../../pages/seo/MoOeoMbeWbeCertificationPage';
import ModotDbeCertificationPage from '../../pages/seo/ModotDbeCertificationPage';
import AcdbeCertificationPage from '../../pages/seo/AcdbeCertificationPage';
import Federal8aCertificationPage from '../../pages/seo/Federal8aCertificationPage';
import WosbCertificationPage from '../../pages/seo/WosbCertificationPage';
import SdvosbCertificationPage from '../../pages/seo/SdvosbCertificationPage';
import HubzoneCertificationPage from '../../pages/seo/HubzoneCertificationPage';
import StlCountyMbeCertificationPage from '../../pages/seo/StlCountyMbeCertificationPage';
import MetroBiStateCertificationPage from '../../pages/seo/MetroBiStateCertificationPage';
import MsdDiversityCertificationPage from '../../pages/seo/MsdDiversityCertificationPage';

export const certificationPages: RouteObject[] = [
  { path: 'certifications/sldc-mbe-certification', element: createElement(SldcMbeCertificationPage) },
  { path: 'certifications/sldc-wbe-certification', element: createElement(SldcWbeCertificationPage) },
  { path: 'certifications/mo-oeo-mbe-certification', element: createElement(MoOeoMbeWbeCertificationPage) },
  { path: 'certifications/modot-dbe-certification', element: createElement(ModotDbeCertificationPage) },
  { path: 'certifications/acdbe-certification', element: createElement(AcdbeCertificationPage) },
  { path: 'certifications/sba-8a-certification', element: createElement(Federal8aCertificationPage) },
  { path: 'certifications/wosb-certification', element: createElement(WosbCertificationPage) },
  { path: 'certifications/sdvosb-certification', element: createElement(SdvosbCertificationPage) },
  { path: 'certifications/hubzone-certification', element: createElement(HubzoneCertificationPage) },
  { path: 'certifications/st-louis-county-mbe-certification', element: createElement(StlCountyMbeCertificationPage) },
  { path: 'certifications/metro-bi-state-dbe-certification', element: createElement(MetroBiStateCertificationPage) },
  { path: 'certifications/msd-diversity-program', element: createElement(MsdDiversityCertificationPage) },
];
