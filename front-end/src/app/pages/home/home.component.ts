import { Component } from '@angular/core';
import { NgxAuroraComponent } from '@omnedia/ngx-aurora';
import {NgxTypewriterComponent} from '@omnedia/ngx-typewriter';
import { NgxGlobeComponent } from '@omnedia/ngx-globe';
import {NgxTimelineComponent} from "@omnedia/ngx-timeline"
@Component({
  selector: 'app-home',
  standalone:true,
  imports: [NgxAuroraComponent,NgxTypewriterComponent,NgxGlobeComponent, NgxTimelineComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Current war zones with lat/lng coordinates (simplified)
  conflictDetails = [
    {
      "title": '<h2 class="text-3xl">Israel-Palestine War (Gaza Conflict)</h2>',
      "yearStart": 2023,
      "yearEnd": "ongoing",
      "content": "<div class='w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300  bg-grey-200 shadow-amber-50'><div class='bg-gradient-to-r from-red-600 to-red-800 px-6 py-4'><h3 class='text-xl font-bold text-white'>Israel-Palestine War (Gaza Conflict)</h3></div><div class='p-6'><div class='grid grid-cols-2 gap-4'><div><p class='font-medium text-white'>Deaths:</p><p class='text-red-600 font-bold'>38,000+ (as of June 2024)</p></div><div><p class='font-medium text-white'>Injured:</p><p class='font-bold'>87,000+</p></div><div><p class='font-medium text-white'>Damages:</p><p class='text-red-600 font-bold'>$50 billion+</p></div></div></div><div class='px-6 py-3 bg-gray-50 text-sm text-gray-500 border-t border-gray-200'>Source: UN OCHA, WHO</div></div>"
    },
    {
      "title": '<h2 class="text-3xl">Russia-Ukraine War',
      "yearStart": 2022,
      "yearEnd": "ongoing",
      "content": "<div class='w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300  bg-grey-200 shadow-amber-50'><div class='bg-gradient-to-r from-red-600 to-red-800 px-6 py-4'><h3 class='text-xl font-bold text-white'>Russia-Ukraine War</h3></div><div class='p-6'><div class='grid grid-cols-2 gap-4'><div><p class='font-medium text-white'>Deaths:</p><p class='text-red-600 font-bold'>500,000+</p></div><div><p class='font-medium text-white'>Injured:</p><p class='font-bold'>1,000,000+</p></div><div><p class='font-medium text-white'>Damages:</p><p class='text-red-600 font-bold'>$150 billion+</p></div></div></div><div class='px-6 py-3 bg-gray-50 text-sm text-gray-500 border-t border-gray-200'>Source: UN, World Bank</div></div>"
    },
    {
      "title": '<h2 class="text-3xl">Second Ethiopian Civil War (Tigray War)',
      "yearStart": 2020,
      "yearEnd": 2022,
      "content": "<div class='w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300  bg-grey-200 shadow-amber-50'><div class='bg-gradient-to-r from-red-600 to-red-800 px-6 py-4'><h3 class='text-xl font-bold text-white'>Second Ethiopian Civil War (Tigray War)</h3></div><div class='p-6'><div class='grid grid-cols-2 gap-4'><div><p class='font-medium text-white'>Deaths:</p><p class='text-red-600 font-bold'>600,000+</p></div><div><p class='font-medium text-white'>Injured:</p><p class='font-bold'>2,000,000+</p></div><div><p class='font-medium text-white'>Damages:</p><p class='text-red-600 font-bold'>$20 billion+</p></div></div></div><div class='px-6 py-3 bg-gray-50 text-sm text-gray-500 border-t border-gray-200'>Source: AU, EHRC</div></div>"
    },
    {
      "title": '<h2 class="text-3xl">Syrian Civil War',
      "yearStart": 2011,
      "yearEnd": "ongoing",
      "content": "<div class='w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300  bg-grey-200 shadow-amber-50'><div class='bg-gradient-to-r from-red-600 to-red-800 px-6 py-4'><h3 class='text-xl font-bold text-white'>Syrian Civil War</h3></div><div class='p-6'><div class='grid grid-cols-2 gap-4'><div><p class='font-medium text-white'>Deaths:</p><p class='text-red-600 font-bold'>500,000+</p></div><div><p class='font-medium text-white'>Injured:</p><p class='font-bold'>2,100,000+</p></div><div><p class='font-medium text-white'>Damages:</p><p class='text-red-600 font-bold'>$1.2 trillion+</p></div></div></div><div class='px-6 py-3 bg-gray-50 text-sm text-gray-500 border-t border-gray-200'>Source: UNHCR, SOHR</div></div>"
    },
    {
      "title": '<h2 class="text-3xl">Yemeni Civil War',
      "yearStart": 2014,
      "yearEnd": "ongoing",
      "content": "<div class='w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-grey-100 shadow-amber-50'><div class='bg-gradient-to-r from-red-600 to-red-800 px-6 py-4'><h3 class='text-xl font-bold text-white'>Yemeni Civil War</h3></div><div class='p-6'><div class='grid grid-cols-2 gap-4'><div><p class='font-medium text-white'>Deaths:</p><p class='text-red-600 font-bold'>377,000+</p></div><div><p class='font-medium text-white'>Injured:</p><p class='font-bold'>1,500,000+</p></div><div><p class='font-medium text-white'>Damages:</p><p class='text-red-600 font-bold'>$150 billion+</p></div></div></div><div class='px-6 py-3 bg-gray-50 text-sm text-gray-500 border-t border-gray-200'>Source: UNOCHA, WHO</div></div>"
    }
  ]
}