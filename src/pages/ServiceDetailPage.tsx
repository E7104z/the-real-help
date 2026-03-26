import { Helmet } from 'react-helmet-async';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';
import { SERVICE_CATEGORIES } from './ServicesPage';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICE_CATEGORIES.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  const Icon = service.icon;

  return (
    <div>
      <Helmet>
        <title>{service.title} in St. Louis | The Real Help, LLC</title>
        <meta name="description" content={`${service.tagline} ${service.description.slice(0, 100)}...`} />
        <link rel="canonical" href={`https://therealhelp.com/services/${service.slug}`} />
      </Helmet>
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue-500 hover:underline mb-8">
            <ArrowLeft className="h-4 w-4" /> All Services
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue-50 text-brand-blue-500">
              <Icon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-extrabold text-brand-black sm:text-4xl">{service.title}</h1>
              <p className="text-brand-blue-500 font-medium">{service.tagline}</p>
            </div>
          </div>

          <p className="text-lg text-brand-silver-500 leading-relaxed mb-12">{service.description}</p>

          <div className="grid gap-8 md:grid-cols-3 mb-12">
            <div className="rounded-2xl border border-brand-silver-200 p-6">
              <h3 className="font-heading text-lg font-bold text-brand-black mb-4">The Process</h3>
              <ol className="space-y-3">
                {service.process.map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-brand-silver-600">
                    <span className="flex-shrink-0 font-bold text-brand-blue-500">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-brand-silver-200 p-6">
              <h3 className="font-heading text-lg font-bold text-brand-black mb-4">What&apos;s Included</h3>
              <ul className="space-y-3">
                {service.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-brand-silver-600">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-brand-blue-500 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-brand-blue-500 p-6 text-white">
              <h3 className="font-heading text-lg font-bold mb-4">The Result</h3>
              <p className="text-blue-100 leading-relaxed text-sm">{service.result}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-brand-silver-50 p-8 text-center">
            <h3 className="font-heading text-2xl font-bold text-brand-black">Ready to get started?</h3>
            <p className="mt-2 text-brand-silver-500">Tell me about your situation and I&apos;ll tell you exactly how I can help.</p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-blue-500 px-8 py-4 text-base font-bold text-white hover:bg-brand-blue-600 transition-colors"
            >
              Let&apos;s Talk <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
