import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  campaigns = signal([
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

  createCampaign() {
    // Simple parsing of target value (in a real app you'd want better validation)
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
}
