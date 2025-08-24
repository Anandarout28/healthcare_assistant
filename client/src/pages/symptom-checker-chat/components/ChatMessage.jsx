import React from 'react';
import Icon from '../../../components/AppIcon';

const ChatMessage = ({ message, isUser, timestamp, conditionCards = [] }) => {
  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Message Bubble */}
        <div
          className={`
            px-4 py-3 rounded-2xl shadow-sm
            ${isUser 
              ? 'bg-primary text-primary-foreground ml-4' 
              : 'bg-card text-card-foreground mr-4 border border-border'
            }
          `}
        >
          {!isUser && (
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center mr-2">
                <Icon name="Plus" size={14} color="white" />
              </div>
              <span className="text-xs font-medium text-text-secondary">HealthCare AI</span>
            </div>
          )}
          
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
          
          {/* Condition Cards for Bot Messages */}
          {!isUser && conditionCards?.length > 0 && (
            <div className="mt-4 space-y-3">
              {conditionCards?.map((condition, index) => (
                <ConditionCard key={index} condition={condition} />
              ))}
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div className={`text-xs text-text-secondary mt-1 ${isUser ? 'text-right mr-4' : 'text-left ml-4'}`}>
          {formatTime(timestamp)}
        </div>
      </div>
      {/* Avatar for non-user messages */}
      {!isUser && (
        <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center mr-3 mt-1 order-1">
          <Icon name="Bot" size={16} color="white" />
        </div>
      )}
    </div>
  );
};

const ConditionCard = ({ condition }) => {
  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-text-primary text-sm">{condition?.name}</h4>
          <p className="text-xs text-text-secondary mt-1">{condition?.description}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(condition?.severity)}`}>
          {condition?.severity} Risk
        </div>
      </div>
      <div className="flex items-center space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <Icon name="Target" size={14} className="text-primary" />
          <span className="text-text-secondary">Match: {condition?.matchPercentage}%</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={14} className="text-text-secondary" />
          <span className="text-text-secondary">Onset: {condition?.onset}</span>
        </div>
      </div>
      {condition?.symptoms && condition?.symptoms?.length > 0 && (
        <div>
          <p className="text-xs font-medium text-text-primary mb-2">Common Symptoms:</p>
          <div className="flex flex-wrap gap-1">
            {condition?.symptoms?.slice(0, 4)?.map((symptom, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
              >
                {symptom}
              </span>
            ))}
            {condition?.symptoms?.length > 4 && (
              <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
                +{condition?.symptoms?.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}
      {condition?.recommendations && condition?.recommendations?.length > 0 && (
        <div>
          <p className="text-xs font-medium text-text-primary mb-2">Recommendations:</p>
          <ul className="space-y-1">
            {condition?.recommendations?.slice(0, 2)?.map((rec, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="CheckCircle" size={12} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-xs text-text-secondary">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;