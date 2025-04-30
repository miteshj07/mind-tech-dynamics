
// This file contains all the CMS data for the site
// In a real implementation, this would be loaded from an API

// Hero Section
export const heroSection = {
  headline: "Empowering Businesses with Smart Salesforce Solutions",
  subheadline: "Unlock new growth with customized CRM experiences tailored to your business needs. Leverage the power of Salesforce with expert guidance.",
  ctaPrimary: "Book a Free Consultation",
  ctaSecondary: "Explore Our Services",
  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  stats: {
    satisfaction: "98%",
    clients: "100+"
  }
};

// Services
export const servicesSection = {
  title: "Our Services",
  subtitle: "Comprehensive Salesforce solutions to power your business growth and digital transformation journey.",
  services: [
    {
      icon: "Database",
      title: "Salesforce Implementation",
      description: "End-to-end deployment of Salesforce CRM tailored to your specific business requirements."
    },
    {
      icon: "Code",
      title: "Customization",
      description: "Custom development to extend Salesforce functionality beyond out-of-the-box capabilities."
    },
    {
      icon: "Link",
      title: "Integration",
      description: "Seamless connectivity between Salesforce and your existing business systems."
    },
    {
      icon: "FileSearch",
      title: "Migration",
      description: "Risk-free data migration from legacy systems to Salesforce with zero data loss."
    },
    {
      icon: "ShieldCheck",
      title: "Support & Maintenance",
      description: "Ongoing assistance to ensure your Salesforce instance runs optimally and securely."
    },
    {
      icon: "Lightbulb",
      title: "Training",
      description: "Comprehensive training programs to empower your team to leverage Salesforce effectively."
    }
  ]
};

// About Us
export const aboutUsSection = {
  story: {
    title: "Our Story",
    content: [
      "Founded in 2015, Meet The Mind Technologies began with a simple mission: to help businesses harness the full potential of Salesforce through expert guidance and custom solutions.",
      "What started as a small team of passionate Salesforce consultants has grown into a comprehensive solutions provider trusted by companies across industries and continents.",
      "Our journey has been defined by our commitment to client success, technical excellence, and continuous innovation. As Salesforce has evolved, so have we—constantly expanding our expertise to deliver cutting-edge solutions that drive measurable business outcomes."
    ],
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  values: {
    title: "Our Values",
    values: [
      {
        icon: "Award",
        title: "Excellence",
        description: "We strive for excellence in everything we do, from solution design to implementation and support."
      },
      {
        icon: "CircleCheck",
        title: "Client Success",
        description: "Your success is our success. We measure our achievement through the tangible results we deliver."
      },
      {
        icon: "Users",
        title: "Collaboration",
        description: "We work as an extension of your team, with transparent communication every step of the way."
      },
      {
        icon: "Rocket",
        title: "Innovation",
        description: "We constantly explore new technologies and approaches to deliver cutting-edge solutions."
      },
      {
        icon: "Code",
        title: "Expertise",
        description: "Our team of certified professionals brings deep technical knowledge and industry best practices."
      }
    ]
  },
  team: {
    title: "Meet Our Leadership",
    members: [
      {
        name: "David Chen",
        role: "Founder & CEO",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        bio: "Former Salesforce exec with 15+ years in CRM consulting and implementation."
      },
      {
        name: "Sarah Johnson",
        role: "CTO",
        image: "https://randomuser.me/api/portraits/women/23.jpg",
        bio: "Technical innovator with expertise in complex Salesforce integrations and custom development."
      },
      {
        name: "Michael Rodriguez",
        role: "Head of Consulting",
        image: "https://randomuser.me/api/portraits/men/54.jpg",
        bio: "Certified Salesforce architect with experience across multiple industries."
      },
      {
        name: "Priya Sharma",
        role: "Lead Solution Architect",
        image: "https://randomuser.me/api/portraits/women/45.jpg",
        bio: "Expert in designing scalable Salesforce solutions for enterprise organizations."
      }
    ]
  }
};

// Case Studies
export const caseStudiesSection = {
  title: "Case Studies",
  subtitle: "Discover how Meet The Mind helped businesses unlock new growth with tailored Salesforce solutions.",
  studies: [
    {
      title: "40% Increase in Sales Efficiency",
      client: "Global Retail Corporation",
      industry: "Retail",
      challenge: "Managing a complex sales pipeline across 200+ locations with inconsistent processes and limited visibility into sales activities.",
      solution: "Implemented Sales Cloud with custom territory management and mobile-optimized dashboards for real-time insights.",
      results: [
        "40% increase in sales rep efficiency",
        "25% improvement in lead conversion rates",
        "Reduced sales cycle by 15 days on average",
        "Real-time visibility across all territories"
      ],
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Retail", "Sales Cloud", "Territory Management", "Analytics"]
    },
    {
      title: "Streamlined Customer Service Operations",
      client: "TechFirst Solutions",
      industry: "Technology",
      challenge: "Fragmented customer support processes across multiple channels leading to delayed response times and customer frustration.",
      solution: "Deployed Service Cloud with omnichannel routing, knowledge base integration, and automated case management workflows.",
      results: [
        "65% reduction in average response time",
        "89% improvement in first-call resolution",
        "32% decrease in operational costs",
        "Customer satisfaction score increased from 7.2 to 9.1"
      ],
      image: "https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Technology", "Service Cloud", "Automation", "Knowledge Base"]
    },
    {
      title: "Data Migration & CRM Transformation",
      client: "HealthPlus Medical Group",
      industry: "Healthcare",
      challenge: "Legacy systems with siloed patient data preventing coordinated care and efficient administrative operations.",
      solution: "Comprehensive migration to Health Cloud with custom patient journey mapping and integration with EHR systems.",
      results: [
        "Zero data loss during migration of 1M+ patient records",
        "45% improvement in appointment scheduling efficiency",
        "Reduced administrative workload by 30%",
        "Enhanced HIPAA compliance and data security"
      ],
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Healthcare", "Health Cloud", "Migration", "Integration"]
    },
    {
      title: "Marketing Automation Revolution",
      client: "Horizon Financial Services",
      industry: "Financial Services",
      challenge: "Manual marketing processes with limited personalization capabilities and inability to track campaign performance effectively.",
      solution: "Implemented Marketing Cloud with journey builder, predictive intelligence, and integrated analytics dashboards.",
      results: [
        "3x increase in qualified leads generated",
        "42% improvement in campaign ROI",
        "Personalized communication across 12 customer segments",
        "Real-time campaign performance tracking"
      ],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Financial Services", "Marketing Cloud", "Personalization", "Analytics"]
    },
    {
      title: "Field Service Transformation",
      client: "EnergySmart Utilities",
      industry: "Energy & Utilities",
      challenge: "Inefficient field service operations with paper-based processes and limited visibility into technician activities.",
      solution: "Deployed Field Service Lightning with mobile optimization, real-time scheduling, and inventory management.",
      results: [
        "28% increase in jobs completed per day",
        "60% reduction in paperwork and administrative tasks",
        "First-time fix rate improved from 65% to 92%",
        "Real-time visibility into field operations"
      ],
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Energy", "Field Service", "Mobile", "Scheduling"]
    },
    {
      title: "Non-Profit Donor Management",
      client: "Global Hope Foundation",
      industry: "Non-Profit",
      challenge: "Fragmented donor data and inability to track relationship history, leading to missed fundraising opportunities.",
      solution: "Implemented Nonprofit Cloud with donor journey mapping, engagement tracking, and integrated fundraising analytics.",
      results: [
        "35% increase in donor retention",
        "22% growth in average donation size",
        "Streamlined grant management process",
        "Comprehensive donor relationship tracking"
      ],
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Non-Profit", "Donor Management", "Fundraising", "Analytics"]
    }
  ]
};

// Blog Posts
export const blogSection = {
  title: "Blog & Insights",
  subtitle: "Insights, strategies, and tips for CRM excellence from our team of Salesforce experts.",
  featuredPost: {
    title: "Top 5 Salesforce Trends Shaping 2025",
    excerpt: "Discover the latest innovations and trends in the Salesforce ecosystem that will transform how businesses operate and engage with customers.",
    date: "April 15, 2025",
    readTime: "8 min read",
    author: "David Chen",
    image: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Trends", "Innovation"]
  },
  posts: [
    {
      title: "Why Salesforce Customization Matters for SMEs",
      excerpt: "Small and medium enterprises often overlook the power of tailored CRM solutions. Learn how customization can drive growth for businesses of all sizes.",
      date: "April 10, 2025",
      readTime: "6 min read",
      author: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1664574654529-b60630f33fdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["SME", "Customization"]
    },
    {
      title: "CRM Integration Mistakes to Avoid",
      excerpt: "Integration challenges can derail your Salesforce implementation. Discover the common pitfalls and how to navigate them successfully.",
      date: "April 5, 2025",
      readTime: "7 min read",
      author: "Michael Rodriguez",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Integration", "Best Practices"]
    },
    {
      title: "Maximizing ROI from Your Salesforce Investment",
      excerpt: "Are you getting the most from your Salesforce platform? Learn proven strategies to increase your return on investment.",
      date: "March 28, 2025",
      readTime: "5 min read",
      author: "Priya Sharma",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["ROI", "Strategy"]
    },
    {
      title: "The Future of AI in Salesforce Einstein",
      excerpt: "Artificial intelligence is revolutionizing CRM capabilities. Explore how Einstein is evolving and what it means for your business.",
      date: "March 20, 2025",
      readTime: "9 min read",
      author: "David Chen",
      image: "https://images.unsplash.com/photo-1677442135136-760c813029fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["AI", "Einstein"]
    },
    {
      title: "Building a Data-Driven Sales Strategy with Salesforce",
      excerpt: "Learn how to leverage Salesforce analytics to create a sales approach based on real insights rather than intuition.",
      date: "March 15, 2025",
      readTime: "7 min read",
      author: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Sales", "Analytics"]
    },
    {
      title: "Salesforce Security Best Practices",
      excerpt: "Protecting your customer data is paramount. Discover essential security measures every Salesforce admin should implement.",
      date: "March 8, 2025",
      readTime: "6 min read",
      author: "Michael Rodriguez",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Security", "Best Practices"]
    }
  ],
  newsletterSignup: {
    title: "Stay Updated with CRM Insights",
    description: "Subscribe to our newsletter to receive the latest Salesforce tips, trends, and best practices directly in your inbox."
  }
};

// Career Opportunities
export const careersSection = {
  title: "Join Our Team",
  subtitle: "Build a future in innovative tech solutions with a company that values growth, collaboration, and excellence.",
  intro: {
    title: "Life at Meet The Mind",
    description: [
      "At Meet The Mind Technologies, we're building a team of passionate Salesforce experts who are committed to delivering exceptional solutions for our clients. We believe in fostering an environment where innovation thrives, learning is continuous, and work-life balance is respected.",
      "Our culture is built on collaboration, technical excellence, and putting people first—both our team members and our clients. If you're looking to grow your career in the Salesforce ecosystem while working on impactful projects with a supportive team, we'd love to hear from you."
    ],
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    ]
  },
  benefits: {
    title: "Why Work With Us",
    items: [
      {
        icon: "Laptop",
        title: "Remote-First Culture",
        description: "Work from anywhere with flexible hours and a focus on outcomes rather than hours logged."
      },
      {
        icon: "BookOpen",
        title: "Continuous Learning",
        description: "We cover certification costs and provide dedicated time for professional development."
      },
      {
        icon: "Rocket",
        title: "Career Growth",
        description: "Clear advancement paths and mentorship from industry leaders in the Salesforce ecosystem."
      },
      {
        icon: "Award",
        title: "Competitive Compensation",
        description: "Above-market salary, performance bonuses, and comprehensive healthcare benefits."
      },
      {
        icon: "Users",
        title: "Collaborative Environment",
        description: "Work alongside passionate experts who are committed to client success and innovation."
      }
    ]
  },
  openings: {
    title: "Open Positions",
    jobs: [
      {
        title: "Salesforce Consultant",
        location: "Remote / San Francisco",
        type: "Full-time",
        description: "Join our consulting team to help clients implement and optimize their Salesforce solutions. You'll work directly with clients to understand their business needs and translate them into effective CRM strategies.",
        requirements: [
          "3+ years of experience with Salesforce implementation projects",
          "At least one Salesforce certification (Admin, Developer, or Consultant)",
          "Strong problem-solving skills and attention to detail",
          "Excellent communication and client management abilities",
          "Experience in one or more industries: retail, healthcare, financial services, or technology"
        ]
      },
      {
        title: "Senior Salesforce Developer",
        location: "Remote / New York",
        type: "Full-time",
        description: "We're looking for an experienced Salesforce Developer to join our technical team. In this role, you'll design and build custom solutions, integrations, and extensions using Apex, Visualforce, Lightning Components, and APIs.",
        requirements: [
          "5+ years of experience in Salesforce development",
          "Strong proficiency in Apex, SOQL, Lightning Components, and API integrations",
          "Salesforce Platform Developer I & II certifications",
          "Experience with JavaScript frameworks and web development",
          "Ability to mentor junior developers and contribute to technical architecture"
        ]
      },
      {
        title: "Salesforce Administrator",
        location: "Remote / Chicago",
        type: "Full-time",
        description: "Support our clients' Salesforce environments with day-to-day administration, user management, and system optimization. You'll ensure Salesforce runs smoothly and efficiently to meet business needs.",
        requirements: [
          "2+ years as a Salesforce Administrator",
          "Salesforce Administrator certification",
          "Experience with Sales Cloud and Service Cloud",
          "Knowledge of data management, reports, and dashboards",
          "Strong troubleshooting and problem-solving skills"
        ]
      },
      {
        title: "Marketing Automation Specialist",
        location: "Remote / Austin",
        type: "Full-time",
        description: "Help our clients leverage Salesforce Marketing Cloud to create personalized, data-driven marketing campaigns. You'll implement and optimize marketing automation solutions to drive engagement and conversion.",
        requirements: [
          "3+ years of experience with Salesforce Marketing Cloud",
          "Marketing Cloud Email Specialist certification preferred",
          "Experience with Journey Builder, Automation Studio, and AMPscript",
          "Understanding of email marketing best practices and compliance",
          "Analytics skills to measure campaign performance and ROI"
        ]
      }
    ],
    fallback: {
      title: "Don't See a Perfect Match?",
      description: "We're always looking for talented individuals to join our team. Send us your resume, and we'll keep you in mind for future opportunities."
    }
  }
};

// Contact Information
export const contactSection = {
  title: "Contact Us",
  subtitle: "Have questions or ready to start your Salesforce journey? Reach out to our team today.",
  intro: {
    title: "Get In Touch", 
    description: "Whether you're looking to implement Salesforce, optimize your current setup, or just have questions about our services, our team is here to help."
  },
  contactInfo: {
    email: {
      title: "Email Us",
      value: "info@meetthemind.tech"
    },
    phone: {
      title: "Call Us",
      value: "(415) 555-1234"
    },
    address: {
      title: "Visit Us",
      value: "1234 Tech Boulevard, Suite 500\nSan Francisco, CA 94107",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.95133083794!2d-122.43913249016922!3d37.77054771385948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858082235da2e7%3A0xb67dd9edf81992a4!2sSan%20Francisco%2C%20CA%2094107!5e0!3m2!1sen!2sus!4v1683044897106!5m2!1sen!2sus"
    }
  },
  form: {
    title: "Send Us a Message",
    successTitle: "Thank You!",
    successMessage: "Your message has been received. Our team will get back to you shortly.",
    services: [
      "Salesforce Implementation",
      "Customization",
      "Integration",
      "Migration",
      "Support & Maintenance",
      "Training",
      "Other"
    ]
  },
  consultation: {
    title: "Schedule a Consultation",
    description: "Prefer to talk directly? Schedule a free 30-minute consultation with one of our Salesforce experts."
  }
};

// SEO Metadata for all pages
export const seoMetadata = {
  home: {
    title: "Meet The Mind - Salesforce Solutions & Implementation Experts",
    description: "Transform your business with expert Salesforce implementation, customization and integration services. Boost efficiency and growth with our tailored CRM solutions."
  },
  services: {
    title: "Salesforce Services - Implementation, Customization & Support | Meet The Mind",
    description: "Comprehensive Salesforce services including implementation, customization, integration, migration, training and ongoing support. Tailored solutions for businesses of all sizes."
  },
  aboutUs: {
    title: "About Meet The Mind | Salesforce Experts & CRM Consultants",
    description: "Learn about our team of Salesforce experts and our mission to transform how businesses leverage technology through innovative CRM solutions and expert guidance."
  },
  caseStudies: {
    title: "Salesforce Success Stories & Case Studies | Meet The Mind",
    description: "Discover how our Salesforce solutions helped businesses across industries improve efficiency, boost sales, enhance customer service and drive measurable growth."
  },
  blog: {
    title: "Salesforce Tips, Trends & Insights | Meet The Mind Blog",
    description: "Expert insights, tips and trends on Salesforce implementation, CRM strategy, digital transformation and maximizing your technology investment."
  },
  careers: {
    title: "Careers at Meet The Mind | Join Our Salesforce Expert Team",
    description: "Join our team of Salesforce experts and grow your career in a collaborative, innovative environment with competitive benefits and continuous learning opportunities."
  },
  contactUs: {
    title: "Contact Meet The Mind | Salesforce Consulting & Implementation",
    description: "Get in touch with our Salesforce experts to discuss your CRM needs, request a consultation, or learn more about our services and solutions."
  }
};

// Shared components across pages (CTAs, etc)
export const sharedComponents = {
  contactCTA: {
    home: {
      heading: "Join Us on the Journey to Smarter Business Growth",
      subheading: "Let's work together to unlock the full potential of your Salesforce investment.",
      buttonText: "Get Started Today",
      buttonLink: "/contact-us"
    },
    services: {
      heading: "Ready to Transform Your Salesforce Experience?",
      subheading: "Let our experts help you get the most out of your Salesforce investment.",
      buttonText: "Schedule a Consultation",
      buttonLink: "/contact-us"
    },
    aboutUs: {
      heading: "Join Us on the Journey to Smarter Business Growth",
      subheading: "Let's work together to unlock the full potential of your Salesforce investment.",
      buttonText: "Get Started",
      buttonLink: "/contact-us"
    },
    caseStudies: {
      heading: "Ready for Your Success Story?",
      subheading: "Let's work together to create your own Salesforce success story.",
      buttonText: "Let's Begin",
      buttonLink: "/contact-us"
    },
    blog: {
      heading: "Want to Learn More About Our Salesforce Solutions?",
      subheading: "Explore how our expertise can help your business grow.",
      buttonText: "Get in Touch",
      buttonLink: "/contact-us"
    },
    careers: {
      heading: "Have Questions About Working With Us?",
      subheading: "We'd love to tell you more about our company culture and opportunities.",
      buttonText: "Contact Our Recruitment Team",
      buttonLink: "/contact-us?dept=careers"
    }
  }
};
