import { 
  Briefcase, GraduationCap, Code, Heart, MapPin, 
  Terminal, Zap, Globe, LucideIcon 
} from 'lucide-react';

export type TimelineEvent = {
  id: number;
  year: string;
  month: string;
  title: string;
  company: string;
  description: string;
  icon: LucideIcon;
  imageUrl: string;
};

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 1,
    year: "1997",
    month: "Jun",
    title: "The Beginning",
    company: "Hello World",
    description: "The journey started. A lifelong curiosity for how things work began here.",
    icon: Globe,
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 2,
    year: "2012",
    month: "Sep",
    title: "High School Sweethearts",
    company: "The Start of Us",
    description: "Met Anusha in high school. The beginning of a decade-long journey together.",
    icon: Heart,
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 3,
    year: "2018",
    month: "Aug",
    title: "Software Engineer",
    company: "Career Launch",
    description: "Started professionally as a software engineer, diving deep into technical analysis and full-stack development.",
    icon: Code,
    imageUrl: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 4,
    year: "2023",
    month: "Dec",
    title: "Bay Area Living",
    company: "Sunnyvale & San Jose",
    description: "Lived with close friends Ankith and Sindhu for two years in the heart of Silicon Valley.",
    icon: MapPin,
    imageUrl: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 5,
    year: "2025",
    month: "Nov",
    title: "The Wedding",
    company: "Anusha weds Vishnu",
    description: "Celebrated our union with Sangeet, Haldi, and Muhurtham ceremonies.",
    icon: Zap,
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000"
  }
];