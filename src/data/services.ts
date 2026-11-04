export type Service = {
  id: number
  title: string
  provider: string
  category: string
  description: string
  price: string
  rating: number
}

export const categories = [
  'All',
  'Art & Beauty',
  'Media & Content',
  'Academic & Tech',
  'Creative & Craft',
]

export const services: Service[] = [
  {
    id: 1,
    title: 'Logo and Poster Design',
    provider: 'Nadia Rahman',
    category: 'Art & Beauty',
    description: 'Clean logos, posters and event banners for clubs and campus events.',
    price: 'From ₵60',
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Bridal and Party Makeup',
    provider: 'Tania Akter',
    category: 'Art & Beauty',
    description: 'Professional makeup and styling for events, photoshoots and parties.',
    price: 'From ₵80',
    rating: 4.9,
  },
  {
    id: 3,
    title: 'Portrait Photography',
    provider: 'Rafiq Hasan',
    category: 'Art & Beauty',
    description: 'Portrait and event photography with edited photos in 48 hours.',
    price: 'From ₵70',
    rating: 4.7,
  },
  {
    id: 4,
    title: 'Video Editing for YouTube',
    provider: 'Kofi Mensah',
    category: 'Media & Content',
    description: 'Cuts, captions, colour correction and sound for short and long videos.',
    price: 'From ₵50',
    rating: 4.9,
  },
  {
    id: 5,
    title: 'Podcast Editing',
    provider: 'Sadia Islam',
    category: 'Media & Content',
    description: 'Noise removal, mixing and intro/outro music for your podcast episodes.',
    price: 'From ₵40',
    rating: 4.6,
  },
  {
    id: 6,
    title: 'Content Writing',
    provider: 'Imran Hossain',
    category: 'Media & Content',
    description: 'Blog posts, social media captions and short articles in clear English.',
    price: 'From ₵30',
    rating: 4.5,
  },
  {
    id: 7,
    title: 'Python Tutoring',
    provider: 'Amara Diallo',
    category: 'Academic & Tech',
    description: 'One-to-one lessons for beginners, assignments and exam preparation.',
    price: 'From ₵35',
    rating: 4.9,
  },
  {
    id: 8,
    title: 'UI Design Mentoring',
    provider: 'Farhan Ahmed',
    category: 'Academic & Tech',
    description: 'Learn Figma, wireframes and design basics for your project work.',
    price: 'From ₵45',
    rating: 4.8,
  },
  {
    id: 9,
    title: 'Data Analysis with Excel',
    provider: 'Mim Chowdhury',
    category: 'Academic & Tech',
    description: 'Cleaning data, charts and basic statistics for lab and research reports.',
    price: 'From ₵30',
    rating: 4.6,
  },
  {
    id: 10,
    title: 'Custom Fashion Design',
    provider: 'Lamia Sultana',
    category: 'Creative & Craft',
    description: 'Custom outfits, alterations and sketches for your own style.',
    price: 'From ₵90',
    rating: 4.7,
  },
  {
    id: 11,
    title: 'Handmade Jewelry',
    provider: 'Priya Das',
    category: 'Creative & Craft',
    description: 'Handmade jewelry and gift sets made to order.',
    price: 'From ₵25',
    rating: 4.8,
  },
  {
    id: 12,
    title: 'Room and Event Decor',
    provider: 'Tanvir Alam',
    category: 'Creative & Craft',
    description: 'Simple and affordable decor ideas for rooms, stages and campus events.',
    price: 'From ₵55',
    rating: 4.5,
  },
]