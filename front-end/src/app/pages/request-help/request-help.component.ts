import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-help',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-help.component.html',
  styleUrls: ['./request-help.component.css']
})
export class RequestHelpComponent {
  // Form model
  requestForm = {
    ngo: '',
    helpType: '',
    name: '',
    contact: '',
    message: '',
    location: '',
    urgent: false
  };

  // Mock data for NGOs
  ngos = signal([
    { id: '1', name: 'Red Crescent Society' },
    { id: '2', name: 'Doctors Without Borders' },
    { id: '3', name: 'UNHCR' },
    { id: '4', name: 'World Food Programme' },
    { id: '5', name: 'Save the Children' }
  ]);

  // Help types
  helpTypes = signal([
    'Food',
    'Shelter',
    'Medical',
    'Clothing',
    'Rescue',
    'Legal Assistance',
    'Transportation',
    'Other'
  ]);

  // Form submission state
  isSubmitting = signal(false);
  showSuccess = signal(false);

  async submitRequest() {
    this.isSubmitting.set(true);

    try {
      // In a real app, this would call an API
      console.log('Form submitted:', this.requestForm);

      // Get current location if not already set
      if (!this.requestForm.location) {
        await this.getCurrentLocation();
      }

      // Add timestamp
      const submission = {
        ...this.requestForm,
        timestamp: new Date(),
        status: 'pending'
      };

      // In a real app: Send to backend
      // await this.helpService.submitRequest(submission);

      // Show success message
      this.showSuccess.set(true);

      // Reset form after delay
      setTimeout(() => {
        this.resetForm();
        this.isSubmitting.set(false);
      }, 3000);

    } catch (error) {
      console.error('Submission failed:', error);
      this.isSubmitting.set(false);
    }
  }

  async getCurrentLocation() {
    try {
      if (navigator.geolocation) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        this.requestForm.location =
          `Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`;
      } else {
        this.requestForm.location = 'Location not available';
      }
    } catch (error) {
      console.error('Geolocation error:', error);
      this.requestForm.location = 'Location access denied';
    }
  }

  resetForm() {
    this.requestForm = {
      ngo: '',
      helpType: '',
      name: '',
      contact: '',
      message: '',
      location: '',
      urgent: false
    };
    this.showSuccess.set(false);
  }

  detectLocation() {
    this.getCurrentLocation();
  }
}
