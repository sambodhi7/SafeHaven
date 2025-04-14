import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DonationCampaign {
  id: string;
  ngoId: string;
  ngoName: string;
  title: string;
  description: string;
  donationType: string;
  targetQuantity: number;
  currentQuantity: number;
  location: string;
  startDate: Date;
  endDate: Date;
  imageUrl?: string;
  urgent: boolean;
}

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent {
  // Mock data for donation campaigns
  donationCampaigns = signal<DonationCampaign[]>([
    {
      id: '1',
      ngoId: '1',
      ngoName: 'Red Crescent Society',
      title: 'Winter Clothing Drive',
      description: 'Help provide warm clothing for displaced families this winter',
      donationType: 'Clothing',
      targetQuantity: 500,
      currentQuantity: 320,
      location: 'Kyiv, Ukraine',
      startDate: new Date('2025-01-15'),
      endDate: new Date('2025-02-28'),
      urgent: true
    },
    {
      id: '2',
      ngoId: '2',
      ngoName: 'World Food Programme',
      title: 'Emergency Food Relief',
      description: 'Provide food packages for families in conflict zones',
      donationType: 'Food',
      targetQuantity: 1000,
      currentQuantity: 450,
      location: 'Multiple Locations',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-03-31'),
      urgent: true
    },
    {
      id: '3',
      ngoId: '3',
      ngoName: 'Doctors Without Borders',
      title: 'Medical Supplies Fundraiser',
      description: 'Help us purchase essential medical supplies for field hospitals',
      donationType: 'Medical',
      targetQuantity: 50000, // in dollars
      currentQuantity: 18500,
      location: 'Global',
      startDate: new Date('2025-01-10'),
      endDate: new Date('2025-06-30'),
      urgent: false
    },
    {
      id: '4',
      ngoId: '4',
      ngoName: 'Save the Children',
      title: 'School Supplies for Refugee Children',
      description: 'Provide backpacks and school materials for children in refugee camps',
      donationType: 'Other',
      targetQuantity: 300,
      currentQuantity: 120,
      location: 'Lviv, Ukraine',
      startDate: new Date('2025-02-01'),
      endDate: new Date('2025-03-15'),
      urgent: false
    }
  ]);

  // Filters
  selectedDonationType = signal<string>('All');
  selectedLocation = signal<string>('All');
  searchQuery = signal<string>('');

  // Donation types for filter
  donationTypes = computed(() => {
    const types = this.donationCampaigns().map(campaign => campaign.donationType);
    return ['All', ...new Set(types)];
  });

  // Locations for filter
  locations = computed(() => {
    const locs = this.donationCampaigns().map(campaign => campaign.location);
    return ['All', ...new Set(locs)];
  });

  // Filtered campaigns
  filteredCampaigns = computed(() => {
    return this.donationCampaigns().filter(campaign =>
      (this.selectedDonationType() === 'All' || campaign.donationType === this.selectedDonationType()) &&
      (this.selectedLocation() === 'All' || campaign.location === this.selectedLocation()) &&
      (campaign.title.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
       campaign.description.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
       campaign.ngoName.toLowerCase().includes(this.searchQuery().toLowerCase()))
    );
  });

  // Modal state
  showDonationModal = signal(false);
  currentCampaign = signal<DonationCampaign | null>(null);

  // Donation form
  donationForm = {
    name: '',
    contact: '',
    donationType: '',
    quantity: 1,
    message: ''
  };

  // Open donation modal
  openDonationModal(campaign: DonationCampaign) {
    this.currentCampaign.set(campaign);
    this.donationForm.donationType = campaign.donationType;
    this.showDonationModal.set(true);
  }

  // Close modal
  closeDonationModal() {
    this.showDonationModal.set(false);
    this.currentCampaign.set(null);
    this.resetDonationForm();
  }

  // Reset form
  resetDonationForm() {
    this.donationForm = {
      name: '',
      contact: '',
      donationType: '',
      quantity: 1,
      message: ''
    };
  }

  // Submit donation
  submitDonation() {
    const donation = {
      ...this.donationForm,
      campaignId: this.currentCampaign()?.id,
      ngoId: this.currentCampaign()?.ngoId,
      date: new Date()
    };

    console.log('Donation submitted:', donation);

    // In a real app, this would update the campaign's current quantity
    // For now, we'll just show a success message
    alert(`Thank you for your donation to ${this.currentCampaign()?.ngoName}!`);

    this.closeDonationModal();
  }

  // Calculate progress percentage
  getProgressPercentage(campaign: DonationCampaign): number {
    return Math.min(100, (campaign.currentQuantity / campaign.targetQuantity) * 100);
  }

  // Check if campaign is ending soon (within 7 days)
  isEndingSoon(campaign: DonationCampaign): boolean {
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    return campaign.endDate <= sevenDaysFromNow;
  }
}
