import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface AIPricingResult {
  recommendedPremium: number;
  adjustmentReason: string;
  riskAnalysis: string;
  coverageSuggestions: string[];
}

export const geminiService = {
  async calculateDynamicPremium(
    basePremium: number,
    location: string,
    triggers: any[],
    userProfile: any
  ): Promise<AIPricingResult> {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `
          Analyze the following data for a gig worker insurance premium calculation.
          Base Weekly Premium: ₹${basePremium}
          Location: ${location}
          Active Risk Triggers: ${JSON.stringify(triggers)}
          User Profile: ${JSON.stringify(userProfile)}

          Hyper-local factors to consider:
          - Water logging history in ${location}
          - Real-time weather disruptions
          - Traffic safety patterns
          - Work type risks (${userProfile?.workType})

          Calculate a dynamic adjustment (can be negative for safe zones/behavior).
          Return the result in JSON format.
        `,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendedPremium: { type: Type.NUMBER, description: "The final adjusted weekly premium in ₹" },
              adjustmentReason: { type: Type.STRING, description: "A concise explanation of the adjustment (e.g., '₹2 discount for safe zone')" },
              riskAnalysis: { type: Type.STRING, description: "A brief analysis of the hyper-local risks" },
              coverageSuggestions: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Suggestions for additional coverage based on weather/risk"
              }
            },
            required: ["recommendedPremium", "adjustmentReason", "riskAnalysis", "coverageSuggestions"]
          }
        }
      });

      const result = JSON.parse(response.text || '{}');
      return result as AIPricingResult;
    } catch (error) {
      console.error("AI Pricing Error:", error);
      // Fallback to base premium if AI fails
      return {
        recommendedPremium: basePremium,
        adjustmentReason: "Standard dynamic rate applied (AI fallback)",
        riskAnalysis: "Unable to perform deep AI risk analysis at this moment.",
        coverageSuggestions: ["Maintain standard coverage"]
      };
    }
  }
};
