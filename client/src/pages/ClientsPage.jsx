import React from 'react';
import PageHeader from '../components/PageHeader';
import ClientsSection from '../components/ClientsSection';

export default function ClientsPage({ clients }) {
  return (
    <div>
      <PageHeader
        title="Our Clients & Institutional Partners"
        subtitle="Trusted by leading commercial banks, consumer brands, international NGOs, pharmaceuticals, energy groups, and over 250+ high net-worth individuals across Bangladesh."
        badge="Client Portfolio"
        breadcrumbs={[{ name: 'Our Clients' }]}
      />

      <ClientsSection clients={clients} />
    </div>
  );
}
