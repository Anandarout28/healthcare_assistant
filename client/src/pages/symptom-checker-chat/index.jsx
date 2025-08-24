import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActions from '../../components/ui/QuickActions';
import SessionStatus from '../../components/ui/SessionStatus';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ChatHistory from './components/ChatHistory';
import QuickActionPanel from './components/QuickActionPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { generateMedicalConsultation } from '../../services/openaiServices';

const SymptomCheckerChat = () => {
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [savedAssessments, setSavedAssessments] = useState([]);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: 1,
      message: `Hello! I'm your AI health assistant. I can help you understand your symptoms and provide general health guidance.\n\nPlease describe your symptoms in detail, including:\n• When they started\n• How severe they are\n• Any triggers you've noticed\n• Other related symptoms\n\nRemember, I provide general information only and cannot replace professional medical advice.`,
      isUser: false,
      timestamp: new Date(),
      conditionCards: []
    };
    setMessages([welcomeMessage]);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update current assessment
  useEffect(() => {
    if (messages?.length > 1) {
      const userMessages = messages?.filter(msg => msg?.isUser);
      const botMessages = messages?.filter(msg => !msg?.isUser);
      const conditionsDiscussed = botMessages?.reduce((count, msg) => count + (msg?.conditionCards?.length || 0), 0);
      
      setCurrentAssessment({
        messageCount: messages?.length - 1, // Exclude welcome message
        duration: calculateDuration(),
        conditionsCount: conditionsDiscussed
      });
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const calculateDuration = () => {
    if (messages?.length < 2) return '0m';
    const firstMessage = messages?.[1]; // Skip welcome message
    const lastMessage = messages?.[messages?.length - 1];
    const diffMinutes = Math.floor((lastMessage?.timestamp - firstMessage?.timestamp) / (1000 * 60));
    return diffMinutes > 0 ? `${diffMinutes}m` : '<1m';
  };

  const generateBotResponse = async (userMessage) => {
    try {
      // Use OpenAI for actual medical consultation
      const result = await generateMedicalConsultation(userMessage);
      return {
        response: result?.response,
        conditionCards: result?.conditionCards
      };
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Fallback response for errors
      return {
        response: "I apologize, but I'm currently unable to process your request. Please try again later or consult with a healthcare professional for immediate concerns.",
        conditionCards: [{
          name: "Technical Issue",
          description: "Unable to analyze symptoms at this time. Please consult a healthcare provider.",
          severity: "Medium",
          matchPercentage: 0,
          onset: "Immediate",
          symptoms: ["System temporarily unavailable"],
          recommendations: ["Contact healthcare provider", "Try again later", "Seek immediate care if urgent"]
        }]
      };
    }
  };

  const handleSendMessage = async (messageText) => {
    // Add user message
    const userMessage = {
      id: messages?.length + 1,
      message: messageText,
      isUser: true,
      timestamp: new Date(),
      conditionCards: []
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      // Use OpenAI for actual response generation
      const { response, conditionCards } = await generateBotResponse(messageText);
      
      const botMessage = {
        id: messages?.length + 2,
        message: response,
        isUser: false,
        timestamp: new Date(),
        conditionCards: conditionCards
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in message handling:', error);
      
      // Add error message
      const errorMessage = {
        id: messages?.length + 2,
        message: "I apologize, but I'm currently unable to process your request. Please try again later.",
        isUser: false,
        timestamp: new Date(),
        conditionCards: []
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveAssessment = () => {
    if (currentAssessment && messages?.length > 1) {
      const assessment = {
        id: Date.now(),
        title: `Assessment - ${new Date()?.toLocaleDateString()}`,
        condition: messages?.find(msg => msg?.conditionCards?.length > 0)?.conditionCards?.[0]?.name || 'General Consultation',
        date: new Date(),
        messages: messages,
        ...currentAssessment
      };
      
      setSavedAssessments(prev => [assessment, ...prev]);
      
      // Show success message
      const successMessage = {
        id: messages?.length + 1,
        message: "✅ Assessment saved successfully! You can find it in your chat history.",
        isUser: false,
        timestamp: new Date(),
        conditionCards: []
      };
      
      setMessages(prev => [...prev, successMessage]);
    }
  };

  const handleLoadAssessment = (assessmentId) => {
    const assessment = savedAssessments?.find(a => a?.id === assessmentId);
    if (assessment) {
      setMessages(assessment?.messages);
      setCurrentAssessment({
        messageCount: assessment?.messageCount,
        duration: assessment?.duration,
        conditionsCount: assessment?.conditionsCount
      });
      setShowHistory(false);
    }
  };

  const scrollToTop = () => {
    if (chatContainerRef?.current) {
      chatContainerRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Symptom Checker Chat - HealthCare Assistant</title>
        <meta name="description" content="AI-powered symptom checker providing personalized health guidance through interactive chat interface" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="flex h-[calc(100vh-4rem)]">
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="border-b border-border bg-surface p-4">
                <div className="max-w-4xl mx-auto">
                  <Breadcrumb />
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                        <Icon name="MessageSquare" size={20} color="white" />
                      </div>
                      <div>
                        <h1 className="text-xl font-semibold text-text-primary">Symptom Checker</h1>
                        <p className="text-sm text-text-secondary">AI-powered health assessment</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <SessionStatus 
                        isProcessing={isProcessing}
                        processingType="chat"
                        sessionTimeRemaining={45}
                      />
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowHistory(!showHistory)}
                        className="hidden lg:flex"
                        aria-label="Toggle chat history"
                      >
                        <Icon name="History" size={20} />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowQuickActions(!showQuickActions)}
                        className="hidden lg:flex"
                        aria-label="Toggle quick actions"
                      >
                        <Icon name="Zap" size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages Container */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
              >
                <div className="max-w-4xl mx-auto">
                  {messages?.map((message) => (
                    <ChatMessage
                      key={message?.id}
                      message={message?.message}
                      isUser={message?.isUser}
                      timestamp={message?.timestamp}
                      conditionCards={message?.conditionCards}
                    />
                  ))}
                  
                  {isProcessing && (
                    <div className="flex justify-start mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                          <Icon name="Bot" size={16} color="white" />
                        </div>
                        <div className="bg-card border border-border rounded-2xl px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            <span className="text-sm text-text-secondary">AI is analyzing your symptoms...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Scroll to Top Button */}
              {messages?.length > 5 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={scrollToTop}
                  className="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full healthcare-shadow-md z-50"
                  aria-label="Scroll to top"
                >
                  <Icon name="ArrowUp" size={20} />
                </Button>
              )}

              {/* Chat Input */}
              <ChatInput 
                onSendMessage={handleSendMessage}
                isProcessing={isProcessing}
              />
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-80 border-l border-border bg-surface">
              <div className="h-full flex flex-col">
                {/* Sidebar Tabs */}
                <div className="flex border-b border-border">
                  <button
                    onClick={() => setShowHistory(true)}
                    className={`
                      flex-1 px-4 py-3 text-sm font-medium healthcare-transition
                      ${showHistory
                        ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary'
                      }
                    `}
                  >
                    History
                  </button>
                  <button
                    onClick={() => setShowQuickActions(true)}
                    className={`
                      flex-1 px-4 py-3 text-sm font-medium healthcare-transition
                      ${showQuickActions
                        ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary'
                      }
                    `}
                  >
                    Actions
                  </button>
                </div>

                {/* Sidebar Content */}
                <div className="flex-1 overflow-y-auto">
                  {showHistory ? (
                    <ChatHistory
                      isVisible={true}
                      onToggle={() => setShowHistory(false)}
                      savedAssessments={savedAssessments}
                      onLoadAssessment={handleLoadAssessment}
                    />
                  ) : (
                    <div className="p-4">
                      <QuickActionPanel
                        currentAssessment={currentAssessment}
                        onSaveAssessment={handleSaveAssessment}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Mobile Components */}
        <ChatHistory
          isVisible={showHistory && window.innerWidth < 1024}
          onToggle={() => setShowHistory(!showHistory)}
          savedAssessments={savedAssessments}
          onLoadAssessment={handleLoadAssessment}
        />

        <QuickActions />
      </div>
    </>
  );
};

export default SymptomCheckerChat;