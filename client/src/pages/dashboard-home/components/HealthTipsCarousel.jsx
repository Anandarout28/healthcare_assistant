import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HealthTipsCarousel = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const healthTips = [
    {
      id: 1,
      title: "Stay Hydrated",
      content: "Drink at least 8 glasses of water daily to maintain optimal body function and support your immune system.",
      icon: "Droplets",
      category: "Wellness"
    },
    {
      id: 2,
      title: "Regular Exercise",
      content: "Aim for 30 minutes of moderate exercise daily. Even a brisk walk can significantly improve your cardiovascular health.",
      icon: "Activity",
      category: "Fitness"
    },
    {
      id: 3,
      title: "Medication Adherence",
      content: "Take medications as prescribed and at the same time each day. Set reminders to avoid missing doses.",
      icon: "Pill",
      category: "Treatment"
    },
    {
      id: 4,
      title: "Quality Sleep",
      content: "Maintain 7-9 hours of quality sleep nightly. Good sleep hygiene supports mental health and immune function.",
      icon: "Moon",
      category: "Rest"
    },
    {
      id: 5,
      title: "Regular Check-ups",
      content: "Schedule routine health screenings and follow up with your healthcare provider for preventive care.",
      icon: "Stethoscope",
      category: "Prevention"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % healthTips?.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [healthTips?.length]);

  const handlePrevious = () => {
    setCurrentTip((prev) => (prev - 1 + healthTips?.length) % healthTips?.length);
  };

  const handleNext = () => {
    setCurrentTip((prev) => (prev + 1) % healthTips?.length);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Wellness':
        return 'bg-primary/10 text-primary';
      case 'Fitness':
        return 'bg-success/10 text-success';
      case 'Treatment':
        return 'bg-warning/10 text-warning';
      case 'Rest':
        return 'bg-accent/10 text-accent';
      case 'Prevention':
        return 'bg-secondary/10 text-secondary';
      default:
        return 'bg-muted text-text-secondary';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-text-primary">Health Tips</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            className="w-8 h-8"
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="w-8 h-8"
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
      <div className="bg-surface border border-border rounded-xl p-6 healthcare-shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
            <Icon 
              name={healthTips?.[currentTip]?.icon} 
              size={24} 
              className="text-primary" 
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-text-primary">
                {healthTips?.[currentTip]?.title}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(healthTips?.[currentTip]?.category)}`}>
                {healthTips?.[currentTip]?.category}
              </span>
            </div>
            
            <p className="text-text-secondary leading-relaxed">
              {healthTips?.[currentTip]?.content}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center mt-6 space-x-2">
          {healthTips?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTip(index)}
              className={`w-2 h-2 rounded-full healthcare-transition ${
                index === currentTip ? 'bg-primary' : 'bg-border'
              }`}
              aria-label={`Go to tip ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthTipsCarousel;