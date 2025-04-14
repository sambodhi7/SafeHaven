import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface DonationCampaign {
  id: number;
  title: string;
  target: string;
  targetValue: number;
  current: number;
  description: string;
  date: Date;
}

interface Donation {
  id: number;
  campaignId: number;
  donorName: string;
  contact: string;
  amount: number | string;
  message: string;
  date: Date;
}

@Component({
  selector: 'app-public-donations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './public-donations.component.html',
  styleUrls: ['./public-donations.component.css']
})
export class PublicDonationsComponent {
  campaignTitle = signal('');
  campaignTarget = signal('');
  campaignDescription = signal('');

  // Modal state
  showDonorsModal = signal(false);
  currentCampaignId = signal<number | null>(null);

  campaigns = signal<DonationCampaign[]>([
    {
      id: 1,
      title: 'Winter Clothes Drive',
      target: '200 jackets',
      targetValue: 200,
      current: 87,
      description: 'Help refugees stay warm this winter with warm clothing donations',
      date: new Date()
    },
    {
      id: 2,
      title: 'Emergency Food Fund',
      target: '$5000',
      targetValue: 5000,
      current: 3200,
      description: 'Provide meals for displaced families in our shelters',
      date: new Date(Date.now() - 86400000)
    }
  ]);

  // Mock donor data
  donations = signal<Donation[]>([
    {
      id: 1,
      campaignId: 1,
      donorName: 'John Smith',
      contact: 'john@example.com',
      amount: '5 jackets',
      message: 'Hope this helps!',
      date: new Date('2025-01-15')
    },
    {
      id: 2,
      campaignId: 1,
      donorName: 'Sarah Johnson',
      contact: '+1234567890',
      amount: '10 jackets',
      message: 'From our family to yours',
      date: new Date('2025-01-18')
    },
    {
      id: 3,
      campaignId: 2,
      donorName: 'Michael Brown',
      contact: 'michael@company.com',
      amount: 500,
      message: '',
      date: new Date('2025-01-20')
    },
    {
      id: 4,
      campaignId: 2,
      donorName: 'Anonymous',
      contact: 'N/A',
      amount: 1000,
      message: 'For the children',
      date: new Date('2025-01-22')
    }
  ]);

  createCampaign() {
    const targetValue = this.campaignTarget().startsWith('$')
      ? parseFloat(this.campaignTarget().substring(1))
      : parseInt(this.campaignTarget().match(/\d+/)?.[0] || '0');

    this.campaigns.update(campaigns => [
      ...campaigns,
      {
        id: Date.now(),
        title: this.campaignTitle(),
        target: this.campaignTarget(),
        targetValue: targetValue,
        current: 0,
        description: this.campaignDescription(),
        date: new Date()
      }
    ]);

    // Reset form
    this.campaignTitle.set('');
    this.campaignTarget.set('');
    this.campaignDescription.set('');
  }

  // Open modal with donors for a specific campaign
  showCampaignDonors(campaignId: number) {
    this.currentCampaignId.set(campaignId);
    this.showDonorsModal.set(true);
  }

  // Close modal
  closeDonorsModal() {
    this.showDonorsModal.set(false);
    this.currentCampaignId.set(null);
  }

  // Get donations for current campaign
  getCampaignDonations() {
    return this.donations().filter(d => d.campaignId === this.currentCampaignId());
  }

  // Calculate progress percentage
  getProgressPercentage(current: number, target: number): number {
    return Math.min(100, (current / target) * 100);
  }

  getCurrentCampaignTitle(): string | undefined {
    const campaign = this.campaigns().find(c => c.id === this.currentCampaignId());
    return campaign ? campaign.title : undefined;
  }

  isDonationInUSD(donation: any): boolean {
    const campaign = this.campaigns().find(c => c.id === this.currentCampaignId());
    return typeof donation.amount === 'number' && campaign?.target?.startsWith('$') === true;
  }
}
