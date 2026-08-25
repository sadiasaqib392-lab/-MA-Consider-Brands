import { Category } from '../types';
import regeneratedHammerDrillImg from '../assets/images/regenerated_image_1787646610870.jpg';
import regeneratedImpactDriverImg from '../assets/images/regenerated_image_1787646612504.jpg';
import regeneratedSawImg from '../assets/images/regenerated_image_1787645915064.avif';
import regeneratedGrinderImg from '../assets/images/regenerated_image_1787645916684.webp';
import regeneratedBatteryImg from '../assets/images/regenerated_image_1787646468544.jpg';
import regeneratedComboKitImg from '../assets/images/regenerated_image_1787646470529.jpg';

export const CATEGORIES: Category[] = [
  {
    id: 'power-tools',
    name: 'Power Tools',
    slug: 'power-tools',
    iconName: 'Zap',
    image: regeneratedHammerDrillImg,
    count: 24,
    description: 'High-performance brushless cordless drills, saws, grinders & rotary hammers.'
  },
  {
    id: 'drills-drivers',
    name: 'Drills & Drivers',
    slug: 'drills-drivers',
    iconName: 'Wrench',
    image: regeneratedHammerDrillImg,
    count: 16,
    description: 'High-torque compact drills, hammerdrills & drywall screwdrivers.'
  },
  {
    id: 'impact-drivers-wrenches',
    name: 'Impact Drivers & Wrenches',
    slug: 'impact-drivers-wrenches',
    iconName: 'Gauge',
    image: regeneratedImpactDriverImg,
    count: 12,
    description: 'Extreme breakaway torque impact wrenches and 3-speed brushless drivers.'
  },
  {
    id: 'saws',
    name: 'Saws & Cutting',
    slug: 'saws',
    iconName: 'Scissors',
    image: regeneratedSawImg,
    count: 18,
    description: 'Circular saws, reciprocating saws, miter saws & portable bandsaws.'
  },
  {
    id: 'grinders',
    name: 'Grinders & Sanders',
    slug: 'grinders',
    iconName: 'Disc',
    image: regeneratedGrinderImg,
    count: 9,
    description: 'Small angle grinders, die grinders & random orbit sanders with dust collection.'
  },
  {
    id: 'batteries-chargers',
    name: 'Batteries & Chargers',
    slug: 'batteries-chargers',
    iconName: 'BatteryCharging',
    image: regeneratedBatteryImg,
    count: 14,
    description: '20V MAX XR, 60V FLEXVOLT, and POWERSTACK compact battery packs & multi-port chargers.'
  },
  {
    id: 'hand-tools',
    name: 'Hand Tools',
    slug: 'hand-tools',
    iconName: 'Hammer',
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=600&q=80',
    count: 22,
    description: 'Contractor tape measures, magnetic levels, utility knives, pliers & claw hammers.'
  },
  {
    id: 'tool-accessories',
    name: 'Tool Accessories',
    slug: 'tool-accessories',
    iconName: 'Layers',
    image: 'https://images.unsplash.com/photo-1580983218765-f663bec07b37?auto=format&fit=crop&w=600&q=80',
    count: 35,
    description: 'Carbide drill bits, diamond saw blades, impact bit sets & socket sets.'
  },
  {
    id: 'combo-kits',
    name: 'Combo Kits',
    slug: 'combo-kits',
    iconName: 'Package',
    image: regeneratedComboKitImg,
    count: 8,
    description: '2-Piece to 6-Piece pro cordless tool kits with contractor bags and XR batteries.'
  },
  {
    id: 'outdoor-tools',
    name: 'Outdoor Power Equipment',
    slug: 'outdoor-tools',
    iconName: 'TreePine',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
    count: 10,
    description: 'Brushless string trimmers, blowers, chainsaws & hedge trimmers.'
  },
  {
    id: 'jobsite-tools',
    name: 'Jobsite Equipment',
    slug: 'jobsite-tools',
    iconName: 'HardHat',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80',
    count: 11,
    description: 'Jobsite LED work lights, self-leveling lasers, wet/dry vacuums & radios.'
  },
  {
    id: 'storage-organization',
    name: 'Storage & Organization',
    slug: 'storage-organization',
    iconName: 'Box',
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=600&q=80',
    count: 15,
    description: 'ToughSystem 2.0 modular toolboxes, rolling towers & jobsite organizers.'
  }
];
