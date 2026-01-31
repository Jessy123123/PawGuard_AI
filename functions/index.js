import { GoogleGenerativeAI } from "@google/generative-ai";
import * as functions from "firebase-functions";
import { defineString } from "firebase-functions/params";

// Define environment parameter
const GEMINI_API_KEY = defineString("GEMINI_API_KEY");

export const analyzeAnimal = functions.https.onRequest(
  async (req, res) => {
    try {
      const { imageBase64 } = req.body;

      if (!imageBase64) {
        return res.status(400).json({ error: "No image provided" });
      }

      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY.value());

      const model = genAI.getGenerativeModel({
        model: "gemini-3-flash",
      });

      const image = {
        inlineData: {
          data: imageBase64,
          mimeType: "image/jpeg",
        },
      };

      const prompt = `
Identify the animal in the image.
Determine whether the animal appears injured or in distress.

Respond ONLY in JSON with:
- animal_type
- breed (if identifiable)
- injured (yes or no)
- brief_description
`;

      const result = await model.generateContent([prompt, image]);
      res.json(JSON.parse(result.response.text()));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Gemini analysis failed" });
    }
  }
);
