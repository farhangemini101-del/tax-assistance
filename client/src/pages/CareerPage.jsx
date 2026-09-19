import React from 'react';
import PageHeader from '../components/PageHeader';
import CareerSection from '../components/CareerSection';

export default function CareerPage({ vacancies }) {
  return (
    <div>
      <PageHeader
        title="Build Your Career With Tax Assistance"
        subtitle="We are always interested in meeting talented, motivated, and ethical professionals eager to work across Tax, VAT, Audit & Assurance, Consulting, RJSC Legal, and AI Automation."
        badge="Career & Growth"
        breadcrumbs={[{ name: 'Career' }]}
      />

      <CareerSection vacancies={vacancies} />
    </div>
  );
}
