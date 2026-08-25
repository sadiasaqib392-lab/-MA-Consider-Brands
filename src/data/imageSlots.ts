import { ImageSlot } from '../types';
import regeneratedHammerDrillImg from '../assets/images/regenerated_image_1787646610870.jpg';
import regeneratedImpactDriverImg from '../assets/images/regenerated_image_1787646612504.jpg';
import regeneratedSawImg from '../assets/images/regenerated_image_1787645915064.avif';
import regeneratedGrinderImg from '../assets/images/regenerated_image_1787645916684.webp';
import regeneratedBatteryImg from '../assets/images/regenerated_image_1787646468544.jpg';
import regeneratedComboKitImg from '../assets/images/regenerated_image_1787646470529.jpg';
import regeneratedTableSawImg from '../assets/images/regenerated_image_1787646471744.jpg';
import regeneratedStorageBoxImg from '../assets/images/regenerated_image_1787646472502.jpg';

export const INITIAL_IMAGE_SLOTS: ImageSlot[] = [
  {
    id: 1,
    title: 'Slot 1: Main Hero Banner Background',
    location: 'Homepage Top Hero Section',
    description: 'Cinematic wide contractor / MA CONSIDER jobsite backdrop image.',
    defaultUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
    customUrl: ''
  },
  {
    id: 2,
    title: 'Slot 2: Featured Cordless Hammer Drill',
    location: 'Product Showcase - DCD996B 20V MAX XR',
    description: 'High-resolution photo of cordless hammer drill / driver.',
    defaultUrl: regeneratedHammerDrillImg,
    customUrl: ''
  },
  {
    id: 3,
    title: 'Slot 3: Featured Impact Driver',
    location: 'Product Showcase - DCF887B 3-Speed Impact',
    description: 'High-torque impact driver on worksite or white backdrop.',
    defaultUrl: regeneratedImpactDriverImg,
    customUrl: ''
  },
  {
    id: 4,
    title: 'Slot 4: Featured Circular Saw',
    location: 'Product Showcase - DCS570B 7-1/4" Saw',
    description: 'Brushless cordless circular saw cutting wood or tool display.',
    defaultUrl: regeneratedSawImg,
    customUrl: ''
  },
  {
    id: 5,
    title: 'Slot 5: Featured Angle Grinder',
    location: 'Product Showcase - DCG413B 4-1/2" Grinder',
    description: 'Heavy duty metal angle grinder with safety guard.',
    defaultUrl: regeneratedGrinderImg,
    customUrl: ''
  },
  {
    id: 6,
    title: 'Slot 6: Featured High-Capacity Battery Pack',
    location: 'Batteries Showcase - DCB205-2 5Ah 2-Pack',
    description: 'Lithium-ion XR battery packs and dual fast charger.',
    defaultUrl: regeneratedBatteryImg,
    customUrl: ''
  },
  {
    id: 7,
    title: 'Slot 7: 2-Tool Cordless Combo Kit',
    location: 'Product Showcase - DCK280C2 Power Combo',
    description: 'Contractor drill and driver kit with storage bag and charger.',
    defaultUrl: regeneratedComboKitImg,
    customUrl: ''
  },
  {
    id: 8,
    title: 'Slot 8: Jobsite Table Saw & Rolling Stand',
    location: 'Pro Equipment Showcase - DWE7491RS 10" Saw',
    description: 'Jobsite table saw on heavy-duty foldable rolling stand.',
    defaultUrl: regeneratedTableSawImg,
    customUrl: ''
  },
  {
    id: 9,
    title: 'Slot 9: Pro Contractor Work Section Banner',
    location: 'Contractor Section "Tools for the Work That Matters"',
    description: 'Commercial construction tradesperson operating power equipment.',
    defaultUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1400&q=80',
    customUrl: ''
  },
  {
    id: 10,
    title: 'Slot 10: ToughSystem Modular Storage Box',
    location: 'Storage & Organization Showcase - DWST08165',
    description: 'Heavy duty waterproof rolling toolbox stack.',
    defaultUrl: regeneratedStorageBoxImg,
    customUrl: ''
  }
];
