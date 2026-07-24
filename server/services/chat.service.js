import { geminiClient } from "../config/gemini.js";
import { chatbotSystemPrompt } from "../config/chatbotPrompt.js";

const MODEL =
  process.env.GEMINI_MODEL || "gemini-3-flash-preview";

const MAX_MESSAGE_LENGTH = 1000;

export async function generateChatResponse({
  message,
  previousInteractionId,
}) {
  const cleanMessage = message.trim();

  if (!cleanMessage) {
    const error = new Error("Message is required.");
    error.statusCode = 400;
    throw error;
  }

  if (cleanMessage.length > MAX_MESSAGE_LENGTH) {
    const error = new Error(
      `Message must not exceed ${MAX_MESSAGE_LENGTH} characters.`
    );
    error.statusCode = 400;
    throw error;
  }

  const input = `
${chatbotSystemPrompt}

VISITOR MESSAGE:
${cleanMessage}

Answer the visitor now.
`;

  const request = {
    model: MODEL,
    input,
    generation_config: {
      thinking_level: "low",
    },
  };

  if (previousInteractionId) {
    request.previous_interaction_id = previousInteractionId;
  }

  const interaction =
    await geminiClient.interactions.create(request);

  const reply = interaction.output_text?.trim();

  if (!reply) {
    const error = new Error(
      "Gemini returned an empty response."
    );
    error.statusCode = 502;
    throw error;
  }

  return {
    reply,
    interactionId: interaction.id,
  };
}