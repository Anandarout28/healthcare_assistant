import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActions from '../../components/ui/QuickActions';
import SessionStatus from '../../components/ui/SessionStatus';
import UploadArea from './components/UploadArea';
import ImagePreview from './components/ImagePreview';
import ProcessingIndicator from './components/ProcessingIndicator';
import PrescriptionResults from './components/PrescriptionResults';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { analyzePrescriptionImage } from '../../services/openaiServices';

const PrescriptionScanner = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Mock prescription data for demonstration
  const mockResults = [
    {
      id: 1,
      name: "Amoxicillin",
      dosage: "500mg",
      frequency: "Three times daily",
      duration: "7 days",
      instructions: "Take with food to avoid stomach upset. Complete the full course even if symptoms improve.",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "Ibuprofen",
      dosage: "400mg",
      frequency: "As needed",
      duration: "Up to 5 days",
      instructions: "Take with food or milk. Do not exceed 1200mg in 24 hours.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      name: "Vitamin D3",
      dosage: "1000 IU",
      frequency: "Once daily",
      duration: "30 days",
      instructions: "Take with largest meal of the day for better absorption.",
      image: "https://images.unsplash.com/photo-1550572017-edd951aa8ca0?w=100&h=100&fit=crop"
    }
  ];

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setResults(null);
    setShowResults(false);
    setProcessingProgress(0);
  };

  const handleProcessImage = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProcessingProgress(0);

    // Show progress updates
    const progressInterval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 90) {
          return 90; // Stop at 90% until API call completes
        }
        return prev + 15;
      });
    }, 1000);

    try {
      // Use OpenAI Vision to analyze the prescription image
      const extractedMedications = await analyzePrescriptionImage(selectedFile);
      
      // Complete progress and show results
      setProcessingProgress(100);
      clearInterval(progressInterval);
      
      setTimeout(() => {
        setIsProcessing(false);
        setResults(extractedMedications);
        setShowResults(true);
      }, 500);
      
    } catch (error) {
      console.error('Error processing prescription image:', error);
      clearInterval(progressInterval);
      
      // Show error state
      setProcessingProgress(100);
      setTimeout(() => {
        setIsProcessing(false);
        setResults([{
          id: 1,
          name: "Processing Failed",
          dosage: "N/A",
          frequency: "N/A",
          duration: "N/A",
          instructions: "Unable to process the prescription image. Please ensure the image is clear and try again.",
          confidence: "Low",
          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop"
        }]);
        setShowResults(true);
      }, 500);
    }
  };

  const handleEditMedicine = (index, editedMedicine) => {
    const updatedResults = [...results];
    updatedResults[index] = { ...updatedResults?.[index], ...editedMedicine };
    setResults(updatedResults);
  };

  const handleSaveResults = () => {
    // Simulate saving to user profile
    alert('Prescription saved to your health profile successfully!');
    
    // Reset state for new scan
    setSelectedFile(null);
    setResults(null);
    setShowResults(false);
    setProcessingProgress(0);
  };

  const handleRetry = () => {
    setSelectedFile(null);
    setResults(null);
    setShowResults(false);
    setProcessingProgress(0);
    setIsProcessing(false);
  };

  // Auto-process when file is selected (for demo purposes)
  useEffect(() => {
    if (selectedFile && !isProcessing && !showResults) {
      const timer = setTimeout(() => {
        handleProcessImage();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [selectedFile, isProcessing, showResults]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <QuickActions />
      
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <Breadcrumb />
            <div className="flex items-center justify-between mt-4">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Prescription Scanner
                </h1>
                <p className="text-text-secondary">
                  Upload your prescription image and let our AI extract medication details
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="ScanLine" size={32} className="text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Session Status */}
          <div className="mb-6">
            <SessionStatus 
              isProcessing={isProcessing}
              processingType="ocr"
              sessionTimeRemaining={45}
            />
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {!selectedFile && !showResults && (
              <UploadArea 
                onFileSelect={handleFileSelect}
                isProcessing={isProcessing}
                selectedFile={selectedFile}
              />
            )}

            {selectedFile && !isProcessing && !showResults && (
              <ImagePreview
                file={selectedFile}
                onRemove={() => setSelectedFile(null)}
                onProcess={handleProcessImage}
                isProcessing={isProcessing}
              />
            )}

            {isProcessing && (
              <ProcessingIndicator 
                isProcessing={isProcessing}
                progress={processingProgress}
              />
            )}

            {showResults && results && (
              <PrescriptionResults
                results={results}
                onEdit={handleEditMedicine}
                onSave={handleSaveResults}
                onRetry={handleRetry}
              />
            )}
          </div>

          {/* Help Section */}
          {!isProcessing && (
            <div className="mt-12 bg-surface border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="HelpCircle" size={20} className="mr-2" />
                Need Help?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-text-primary mb-2">
                    Supported Image Formats
                  </h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• JPEG (.jpg, .jpeg)</li>
                    <li>• PNG (.png)</li>
                    <li>• HEIC (.heic) - iPhone photos</li>
                    <li>• Maximum file size: 10MB</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-text-primary mb-2">
                    Best Practices
                  </h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Use good lighting conditions</li>
                    <li>• Keep prescription flat and straight</li>
                    <li>• Ensure all text is clearly visible</li>
                    <li>• Avoid shadows and reflections</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline"
                    iconName="MessageSquare"
                    iconPosition="left"
                  >
                    Contact Support
                  </Button>
                  <Button 
                    variant="outline"
                    iconName="FileText"
                    iconPosition="left"
                  >
                    View Tutorial
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PrescriptionScanner;