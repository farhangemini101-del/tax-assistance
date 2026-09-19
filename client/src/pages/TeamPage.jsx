import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import TeamSection from '../components/TeamSection';

export default function TeamPage({ team }) {
  const navigate = useNavigate();

  const handleBookConsultation = (note) => {
    navigate('/contact', { state: { preSelectedService: note } });
  };

  return (
    <div>
      <PageHeader
        title="Meet Our Leadership & Advisory Professionals"
        subtitle="Our strength comes from our people. Bringing together diverse technical knowledge, CPA credentials, Dhaka Taxes Bar experience, and sector-specific acumen to solve real-world business challenges."
        badge="Executive Leadership"
        breadcrumbs={[{ name: 'Team' }]}
      />

      <TeamSection 
        team={team} 
        onBookConsultation={handleBookConsultation} 
      />
    </div>
  );
}
