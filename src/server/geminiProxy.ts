import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

export async function handleLegalAiRequest(body: {
  action: 'simplify' | 'ask' | 'compare' | 'generate_dossier';
  prompt: string;
  documentText?: string;
  context?: string;
}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return {
      success: true,
      mode: 'heuristic_offline',
      text: null,
      message: 'Running in offline heuristic mode. Set GEMINI_API_KEY in Secrets for live generative responses.'
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const systemInstruction = `You are LexiClarity AI, an expert legal intelligence and accessibility assistant designed to help everyday people, tenants, freelancers, and small businesses understand and navigate legal documents.
IMPORTANT ETHICAL BOUNDARY: You provide informative, educational legal information and risk analysis, NOT formal legal advice. Never state that an attorney-client relationship is formed.

Keep explanations clear, direct, and written at an accessible 8th-grade reading level. Break down legalese into plain English, highlight practical consequences, and cite specific clause references where applicable.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${systemInstruction}\n\nTask: ${body.action.toUpperCase()}\nDocument Excerpt:\n${body.documentText || body.context || 'General Legal Query'}\n\nUser Question/Instruction:\n${body.prompt}`
            }
          ]
        }
      ]
    });

    return {
      success: true,
      mode: 'live_gemini',
      text: response.text || '',
    };
  } catch (error: any) {
    console.error('Gemini API Error in proxy handler:', error);
    return {
      success: false,
      mode: 'error_fallback',
      error: error.message || 'Gemini processing error',
      text: null
    };
  }
}
