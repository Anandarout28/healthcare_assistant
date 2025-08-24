import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, isProcessing = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const quickSymptoms = [
    { label: 'Headache', icon: 'Brain' },
    { label: 'Fever', icon: 'Thermometer' },
    { label: 'Cough', icon: 'Wind' },
    { label: 'Fatigue', icon: 'Battery' },
    { label: 'Nausea', icon: 'AlertCircle' },
    { label: 'Chest Pain', icon: 'Heart' }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !isProcessing) {
      onSendMessage(message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleQuickSymptom = (symptom) => {
    if (!isProcessing) {
      onSendMessage(`I'm experiencing ${symptom?.toLowerCase()}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e?.target?.value);
    
    // Auto-resize textarea
    const textarea = e?.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea?.scrollHeight, 120) + 'px';
  };

  return (
    <div className="border-t border-border bg-surface p-4 space-y-4">
      {/* Quick Symptom Buttons */}
      <div className="flex flex-wrap gap-2">
        {quickSymptoms?.map((symptom, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => handleQuickSymptom(symptom?.label)}
            disabled={isProcessing}
            iconName={symptom?.icon}
            iconPosition="left"
            iconSize={16}
            className="text-xs"
          >
            {symptom?.label}
          </Button>
        ))}
      </div>
      {/* Message Input Form */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Describe your symptoms in detail..."
            disabled={isProcessing}
            className="
              w-full px-4 py-3 pr-12 bg-background border border-border rounded-2xl
              text-sm text-text-primary placeholder-text-secondary
              resize-none overflow-hidden min-h-[48px] max-h-[120px]
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed
              healthcare-transition
            "
            rows={1}
          />
          
          {/* Character count */}
          <div className="absolute bottom-2 right-3 text-xs text-text-secondary">
            {message?.length}/500
          </div>
        </div>

        <Button
          type="submit"
          variant="default"
          size="icon"
          disabled={!message?.trim() || isProcessing || message?.length > 500}
          loading={isProcessing}
          iconName="Send"
          iconSize={20}
          className="w-12 h-12 rounded-full flex-shrink-0"
          aria-label="Send message"
        />
      </form>
      {/* Medical Disclaimer */}
      <div className="flex items-start space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
        <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
        <div className="text-xs text-text-secondary">
          <p className="font-medium text-warning mb-1">Medical Disclaimer</p>
          <p>
            This AI assistant provides general health information only and is not a substitute for professional medical advice. 
            Always consult healthcare providers for medical concerns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;