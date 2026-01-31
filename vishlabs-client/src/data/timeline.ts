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
    imageUrl: "images/timeline/baby.jpg"
  },
  {
    id: 2,
    year: "2003",
    month: "Jun",
    title: "Started School",
    company: "St. Paul's High School",
    description: "Began formal education, laying the foundation for future learning and growth.",
    icon: Heart,
    imageUrl: "images/timeline/school.jpg"
  },
  {
    id: 3,
    year: "2010",
    month: "Oct",
    title: "Met the LOML",
    company: "❤️",
    description: "Met Anusha, my partner in crime and the love of my life.",
    icon: Code,
    imageUrl: "images/timeline/school2.png"
  },
  {
    id: 4,
    year: "2011",
    month: "Mar",
    title: "Got a puppy",
    company: "Sammy the Lab",
    description: "His name is Sammy and he's a Labrador Retriever",
    icon: MapPin,
    imageUrl: "images/timeline/sammy.jpg"
  },
    {
    id: 5,
    year: "2013",
    month: "May",
    title: "High School Grad",
    company: "Completed high school",
    description: "Graduated from St. Paul's High School with honors, ready for the next chapter.",
    icon: MapPin,
    imageUrl: "images/timeline/school1.jpg"
  },
    {
    id: 6,
    year: "2015",
    month: "May",
    title: "Completed Pre University",
    company: "At Deeksha Center for Learning",
    description: "Completed my Pre University course with a focus on science and computer science.",
    icon: MapPin,
    imageUrl: "images/timeline/deeksha.jpg"
  },
    {
    id: 7,
    year: "2019",
    month: "Dec",
    title: "Became an Engineering",
    company: "Bangalore Institute of Technology",
    description: "Graduated from Bangalore Institute of Technology with a degree in Computer Science.",
    icon: MapPin,
    imageUrl: "images/timeline/BIT.jpg"
  },
    {
    id: 8,
    year: "2019",
    month: "Aug",
    title: "Moved to USA",
    company: "To pursue Masters in CS at UTA",
    description: "Started my Master's degree in Computer Science at the University of Texas at Arlington.",
    icon: MapPin,
    imageUrl: "images/timeline/UTA.jpg"
  },
  {
    id: 9,
    year: "2021",
    month: "May",
    title: "Graduated with Masters",
    company: "Got my MS in CS from UTA",
    description: "Completed my Master's degree in Computer Science, specializing in Software Engineering.",
    icon: Zap,
    imageUrl: "images/timeline/UTAGrad.jpg"
  }
];