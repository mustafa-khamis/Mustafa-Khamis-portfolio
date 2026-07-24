import { generateChatResponse } from "../services/chat.service.js";

export async function chatController(req, res, next) {
  try {
    const { message, previousInteractionId } = req.body;

    if (typeof message !== "string") {
      return res.status(400).json({
        success: false,
        message: "A valid message is required.",
      });
    }

    if (
      previousInteractionId !== undefined &&
      typeof previousInteractionId !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid previous interaction ID.",
      });
    }

    const result = await generateChatResponse({
      message,
      previousInteractionId,
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}