import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHistory = ({ isVisible, onToggle, savedAssessments = [], onLoadAssessment }) => {
  const [activeTab, setActiveTab] = useState('recent');

  const recentChats = [
    {
      id: 1,
      title: "Headache and Fatigue",
      date: new Date(Date.now() - 86400000),
      summary: "Discussed tension headache symptoms",
      messageCount: 8
    },
    {
      id: 2,
      title: "Chest Pain Inquiry",
      date: new Date(Date.now() - 172800000),
      summary: "Evaluated chest discomfort after exercise",
      messageCount: 12
    },
    {
      id: 3,
      title: "Digestive Issues",
      date: new Date(Date.now() - 259200000),
      summary: "Stomach pain and nausea assessment",
      messageCount: 6
    }
  ];

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleLoadChat = (chatId) => {
    if (onLoadAssessment) {
      onLoadAssessment(chatId);
    }
  };

  if (!isVisible) {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={onToggle}
        className="fixed top-20 right-4 z-50 lg:hidden w-12 h-12 rounded-full healthcare-shadow-md"
        aria-label="Show chat history"
      >
        <Icon name="History" size={20} />
      </Button>
    );
  }

  return (
    <>
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-1000" onClick={onToggle} />
      {/* History Panel */}
      <div className="fixed top-16 right-0 bottom-0 w-80 bg-surface border-l border-border z-1100 lg:relative lg:top-0 lg:w-full lg:border-l-0 lg:border-r">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-text-primary">Chat History</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="lg:hidden"
              aria-label="Close history"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab('recent')}
              className={`
                flex-1 px-4 py-3 text-sm font-medium healthcare-transition
                ${activeTab === 'recent' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary'
                }
              `}
            >
              Recent Chats
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`
                flex-1 px-4 py-3 text-sm font-medium healthcare-transition
                ${activeTab === 'saved' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary'
                }
              `}
            >
              Saved
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'recent' && (
              <div className="p-4 space-y-3">
                {recentChats?.map((chat) => (
                  <div
                    key={chat?.id}
                    className="p-3 bg-card border border-border rounded-lg cursor-pointer hover:bg-muted healthcare-transition"
                    onClick={() => handleLoadChat(chat?.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-text-primary text-sm line-clamp-1">
                        {chat?.title}
                      </h4>
                      <span className="text-xs text-text-secondary flex-shrink-0 ml-2">
                        {formatDate(chat?.date)}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary line-clamp-2 mb-2">
                      {chat?.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">
                        {chat?.messageCount} messages
                      </span>
                      <Icon name="ChevronRight" size={14} className="text-text-secondary" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="p-4 space-y-3">
                {savedAssessments?.length > 0 ? (
                  savedAssessments?.map((assessment) => (
                    <div
                      key={assessment?.id}
                      className="p-3 bg-card border border-border rounded-lg cursor-pointer hover:bg-muted healthcare-transition"
                      onClick={() => handleLoadChat(assessment?.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-text-primary text-sm">
                          {assessment?.title}
                        </h4>
                        <Icon name="Bookmark" size={14} className="text-primary" />
                      </div>
                      <p className="text-xs text-text-secondary mb-2">
                        {assessment?.condition}
                      </p>
                      <span className="text-xs text-text-secondary">
                        {formatDate(assessment?.date)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Icon name="Bookmark" size={48} className="text-text-secondary/30 mx-auto mb-3" />
                    <p className="text-sm text-text-secondary">No saved assessments</p>
                    <p className="text-xs text-text-secondary mt-1">
                      Save important conversations for future reference
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-border space-y-2">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="Download"
              iconPosition="left"
            >
              Export History
            </Button>
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              iconName="Trash2"
              iconPosition="left"
              className="text-error hover:text-error"
            >
              Clear All History
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHistory;