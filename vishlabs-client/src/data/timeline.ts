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
    title: "Initial Commit",
    company: "System Startup",
    description: "The journey started. A lifelong curiosity for how things work began here, marking the first spark of a passion that would eventually lead to a career in engineering and a love for solving complex puzzles.",
    icon: Globe,
    imageUrl: "/images/timeline/baby.jpg"
  },
  {
    id: 2,
    year: "2003",
    month: "Jun",
    title: "Bootstrapping Education",
    company: "St. Paul's High School",
    description: "Began formal education, laying the foundation for future learning and growth. Those early years in the classroom were where the basic logic and social skills that define me today first began to take shape.",
    icon: Heart,
    imageUrl: "/images/timeline/school.jpg"
  },
  {
    id: 3,
    year: "2010",
    month: "Oct",
    title: "The Ultimate Pair Program",
    company: "Life Partnership",
    description: "Met Anusha, my partner in crime and the love of my life. From school halls to building a life together in California, she has been the most consistent and supportive variable in my life's equation.",
    icon: Code,
    imageUrl: "/images/timeline/school2.png"
  },
  {
    id: 4,
    year: "2011",
    month: "Mar",
    title: "New Team Member",
    company: "The Lab Life",
    description: "Expanded the household with a furry addition. Sammy the Labrador Retriever joined the crew, bringing a whole lot of energy and a constant reminder that the best things in life often have four legs and a wagging tail.",
    icon: MapPin,
    imageUrl: "/images/timeline/sammy.jpg"
  },
  {
    id: 5,
    year: "2013",
    month: "May",
    title: "V1.0 Released",
    company: "High School Alumni",
    description: "Graduated from St. Paul's High School with honors, ready for the next chapter. It was the end of a formative era and the beginning of a much more focused pursuit of science and technology.",
    icon: MapPin,
    imageUrl: "/images/timeline/school1.jpg"
  },
  {
    id: 6,
    year: "2015",
    month: "May",
    title: "Defining My Logic",
    company: "Deeksha Learning",
    description: "Completed my Pre-University course with a focus on science and computer science. This was the moment I realized that technology wasn't just a subject, but the lens through which I wanted to see the world.",
    icon: MapPin,
    imageUrl: "/images/timeline/deeksha.jpg"
  },
  {
    id: 7,
    year: "2019",
    month: "Dec",
    title: "Engineer.exe Loaded",
    company: "BIT Bangalore",
    description: "Graduated from Bangalore Institute of Technology with a degree in Computer Science. Years of late-night coding and intense exams culminated in a solid engineering foundation in the heart of India's tech hub.",
    icon: MapPin,
    imageUrl: "/images/timeline/BIT.jpg"
  },
  {
    id: 8,
    year: "2019",
    month: "Aug",
    title: "Going Global",
    company: "UT Arlington",
    description: "Packed my life into a couple of suitcases and moved to the USA to pursue my Master's degree in Computer Science at UTA. A massive leap of faith that opened doors to new cultures, challenges, and opportunities.",
    icon: MapPin,
    imageUrl: "/images/timeline/UTA.jpg"
  },
  {
    id: 9,
    year: "2021",
    month: "May",
    title: "Mastering the Stack",
    company: "Advanced Degrees",
    description: "Completed my Master's degree in Computer Science, specializing in Software Engineering. With a deeper understanding of architecture and design, I was finally ready to transition from a student to a professional building real-world solutions.",
    icon: Zap,
    imageUrl: "/images/timeline/UTAGrad.jpg"
  },
  {
    id: 10,
    year: "2021",
    month: "Jul",
    title: "Production Environment Initialized",
    company: "Cepheid (Danaher)",
    description: "Launched my professional career as a Software Engineer at Cepheid. Transitioning into the med-tech space allowed me to apply my skills to impactful software that helps save lives, all while navigating the complexities of a global enterprise under Danaher.",
    icon: Zap,
    imageUrl: "/images/timeline/cepheid.jpg"
  },
  {
    id: 11,
    year: "2024",
    month: "May",
    title: "Migrating to the Hub",
    company: "Relocated to San Jose",
    description: "Packed up the apartment in Sunnyvale and moved into the heart of Silicon Valley. San Jose became the new home base, offering the perfect proximity to tech innovation and a great community of friends.",
    icon: MapPin,
    imageUrl: "/gallery/009.jpg"
  },
  {
    id: 12,
    year: "2024",
    month: "Oct",
    title: "Life in the Fast Lane",
    company: "F1 Austin GP",
    description: "Checked a major item off the bucket list by attending the United States Grand Prix in Austin. There’s nothing like hearing the roar of the engines in person and witnessing the pinnacle of engineering performance on the track.",
    icon: Globe,
    imageUrl: "/images/timeline/f1.jpg"
  },
  {
    id: 13,
    year: "2024",
    month: "Nov",
    title: "The Engagement Protocol",
    company: "A Lifelong Commitment",
    description: "Asked the biggest question of my life in San Francisco, and she said yes! Starting the formal journey toward marriage with Anusha was the highlight of the year, surrounded by the beauty of the Bay Area.",
    icon: Heart,
    imageUrl: "/gallery/016.jpg"
  },
  {
    id: 14,
    year: "2025",
    month: "Dec",
    title: "The Big Merge",
    company: "Married Anusha",
    description: "Celebrated our wedding with family and friends. It was a beautiful culmination of our journey together since 2010—merging our lives officially and starting our next chapter as a married couple.",
    icon: Heart,
    imageUrl: "/images/timeline/wedding.jpg"
  },
  {
    id: 15,
    year: "2026",
    month: "Jan",
    title: "Honeymoon.deploy()",
    company: "Dubai Adventures",
    description: "Kicked off the new year in Dubai for our honeymoon. From the top of the Burj Khalifa to the desert dunes and Ferrari World, it was the ultimate celebration of our new life together.",
    icon: Globe,
    imageUrl: "/images/timeline/dubai.jpg"
  }
];