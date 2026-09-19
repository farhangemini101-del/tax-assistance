import React from 'react';
import PageHeader from '../components/PageHeader';
import PortfolioSection from '../components/PortfolioSection';

export default function PortfolioPage({ portfolio }) {
  return (
    <div>
      <PageHeader
        title="Our Track Record & Service Portfolio"
        subtitle="Chronological milestones demonstrating our expanding practice in SOP documentation, FDI filings, external audit reports, appellate representations, and AI-powered financial automation."
        badge="Proven Experience"
        breadcrumbs={[{ name: 'Portfolio' }]}
      />

      <PortfolioSection portfolio={portfolio} />
    </div>
  );
}
