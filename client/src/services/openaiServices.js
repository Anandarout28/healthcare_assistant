import openai from './openaiClient';

/**
 * Generates a medical consultation response based on user symptoms.
 * Uses structured output to ensure consistent format.
 * @param {string} userMessage - The user's symptom description.
 * @returns {Promise<object>} Structured response with medical insights and condition suggestions.
 */
export async function generateMedicalConsultation(userMessage) {
  try {
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a helpful medical AI assistant. Provide general health information and guidance based on symptoms described. Always include disclaimers about seeking professional medical advice. Structure your responses to include possible conditions with severity levels, symptoms, and recommendations.

IMPORTANT: This is for general information only and cannot replace professional medical diagnosis or treatment.`
        },
        { role: 'user', content: userMessage },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'medical_consultation_response',
          schema: {
            type: 'object',
            properties: {
              response: { type: 'string' },
              conditionCards: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    severity: { 
                      type: 'string',
                      enum: ['Low', 'Medium', 'High']
                    },
                    matchPercentage: { type: 'number' },
                    onset: { type: 'string' },
                    symptoms: {
                      type: 'array',
                      items: { type: 'string' }
                    },
                    recommendations: {
                      type: 'array',
                      items: { type: 'string' }
                    }
                  },
                  required: ['name', 'description', 'severity', 'matchPercentage', 'onset', 'symptoms', 'recommendations'],
                  additionalProperties: false
                }
              }
            },
            required: ['response', 'conditionCards'],
            additionalProperties: false,
          },
        },
      },
      temperature: 0.7,
      max_tokens: 2000,
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('Error in medical consultation:', error);
    
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
}

/**
 * Analyzes a prescription image and extracts medication information.
 * Uses GPT-4 Vision to read and structure prescription data.
 * @param {File} imageFile - The prescription image file.
 * @returns {Promise<Array>} Array of extracted medication objects.
 */
export async function analyzePrescriptionImage(imageFile) {
  try {
    // Convert image to base64 for OpenAI Vision API
    const base64Image = await convertToBase64(imageFile);
    
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a medical OCR assistant that extracts medication information from prescription images. 
          
          Analyze the prescription image and extract all medications with their details. Structure the response as an array of medication objects.
          
          IMPORTANT: 
          - Only extract clearly visible and legible information
          - If text is unclear, indicate uncertainty
          - Include standard medical abbreviations interpretation
          - Provide general medication guidance when applicable`
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Please analyze this prescription image and extract all medication information in a structured format.'
            },
            {
              type: 'image_url',
              image_url: {
                url: base64Image
              }
            }
          ]
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'prescription_analysis',
          schema: {
            type: 'object',
            properties: {
              medications: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    dosage: { type: 'string' },
                    frequency: { type: 'string' },
                    duration: { type: 'string' },
                    instructions: { type: 'string' },
                    confidence: {
                      type: 'string',
                      enum: ['High', 'Medium', 'Low']
                    }
                  },
                  required: ['id', 'name', 'dosage', 'frequency', 'duration', 'instructions', 'confidence'],
                  additionalProperties: false
                }
              },
              extractionNotes: { type: 'string' }
            },
            required: ['medications', 'extractionNotes'],
            additionalProperties: false,
          },
        },
      },
      max_tokens: 2000,
    });

    const result = JSON.parse(response?.choices?.[0]?.message?.content);
    
    // Add placeholder images for medications
    const medicationsWithImages = result?.medications?.map((med, index) => ({
      ...med,
      image: `https://images.unsplash.com/photo-${getRandomImageId()}?w=100&h=100&fit=crop`
    }));

    return medicationsWithImages;
  } catch (error) {
    console.error('Error analyzing prescription image:', error);
    
    // Fallback for errors
    return [{
      id: 1,
      name: "Unable to Extract",
      dosage: "N/A",
      frequency: "N/A",
      duration: "N/A",
      instructions: "Image analysis failed. Please ensure the prescription is clear and well-lit, then try again.",
      confidence: "Low",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop"
    }];
  }
}

/**
 * Converts a File object to base64 data URL for OpenAI Vision API
 * @param {File} file - Image file to convert
 * @returns {Promise<string>} Base64 data URL
 */
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Returns a random image ID for placeholder medication images
 * @returns {string} Random image ID
 */
function getRandomImageId() {
  const imageIds = [
    '1584308666744-24d5c474f2ae',
    '1559757148-5c350d0d3c56',
    '1550572017-edd951aa8ca0',
    '1587854692-8356e88ac3bb',
    '1576670159805-fdcab9543ce0'
  ];
  return imageIds?.[Math.floor(Math.random() * imageIds?.length)];
}

/**
 * Streaming chat completion for real-time symptom analysis.
 * @param {string} userMessage - The user's input message.
 * @param {Function} onChunk - Callback to handle each streamed chunk.
 */
export async function streamMedicalConsultation(userMessage, onChunk) {
  try {
    const stream = await openai?.chat?.completions?.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful medical AI assistant. Provide health information and guidance based on symptoms. Always include medical disclaimers.'
        },
        { role: 'user', content: userMessage },
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 1500,
    });

    let fullResponse = '';
    for await (const chunk of stream) {
      const content = chunk?.choices?.[0]?.delta?.content || '';
      if (content) {
        fullResponse += content;
        onChunk(content);
      }
    }
    
    return fullResponse;
  } catch (error) {
    console.error('Error in streaming medical consultation:', error);
    onChunk("I apologize, but I'm currently unable to process your request. Please try again later or consult with a healthcare professional.");
  }
}