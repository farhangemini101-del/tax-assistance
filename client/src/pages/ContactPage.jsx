import React from 'react';
import { useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ContactSection from '../components/ContactSection';

export default function ContactPage() {
  const location = useLocation();
  const preSelectedService = location.state?.preSelectedService || '';

  return (
    <div>
      <PageHeader
        title="Contact Us & Consultation"
        subtitle="Let's talk. Whether you need tax assistance, audit support, accounting solutions, business consulting, or help establishing a company in Bangladesh, our advisory team is ready to assist you."
        badge="Connect With Advisors"
        breadcrumbs={[{ name: 'Contact Us' }]}
      />

      <ContactSection preSelectedService={preSelectedService} />
    </div>
  );
}
