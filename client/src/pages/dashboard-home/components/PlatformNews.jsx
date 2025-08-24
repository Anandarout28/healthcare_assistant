import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PlatformNews = () => {
  const newsItems = [
    {
      id: 1,
      title: "New AI Symptom Checker Features",
      summary: "Enhanced diagnostic accuracy with our latest machine learning updates for better health assessments.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
      category: "Feature Update",
      publishedAt: "Dec 20, 2024",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "Winter Health Tips from Our Experts",
      summary: "Stay healthy during the cold season with expert advice on immunity, nutrition, and wellness practices.",
      image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?w=400&h=200&fit=crop",
      category: "Health Tips",
      publishedAt: "Dec 18, 2024",
      readTime: "5 min read"
    },
    {
      id: 3,
      title: "Prescription Scanner Accuracy Improved",
      summary: "Our OCR technology now recognizes 99.5% of prescription text with enhanced handwriting detection.",
      image: "https://images.pixabay.com/photo/2017/03/25/23/32/prescription-2174328_1280.jpg?w=400&h=200&fit=crop",
      category: "Technology",
      publishedAt: "Dec 15, 2024",
      readTime: "2 min read"
    }
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Feature Update':
        return 'bg-primary/10 text-primary';
      case 'Health Tips':
        return 'bg-success/10 text-success';
      case 'Technology':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted text-text-secondary';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-text-primary">Latest Updates</h2>
        <button className="text-sm text-primary hover:text-primary/80 healthcare-transition">
          View All News
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems?.map((item) => (
          <article
            key={item?.id}
            className="bg-surface border border-border rounded-xl overflow-hidden healthcare-shadow-sm hover:healthcare-shadow-md healthcare-transition cursor-pointer group"
          >
            <div className="relative overflow-hidden h-48">
              <Image
                src={item?.image}
                alt={item?.title}
                className="w-full h-full object-cover group-hover:scale-105 healthcare-transition"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item?.category)}`}>
                  {item?.category}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary healthcare-transition line-clamp-2">
                {item?.title}
              </h3>
              
              <p className="text-sm text-text-secondary mb-4 line-clamp-3 leading-relaxed">
                {item?.summary}
              </p>
              
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Icon name="Calendar" size={14} className="mr-1" />
                    {item?.publishedAt}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Clock" size={14} className="mr-1" />
                    {item?.readTime}
                  </span>
                </div>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="group-hover:translate-x-1 healthcare-transition" 
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PlatformNews;