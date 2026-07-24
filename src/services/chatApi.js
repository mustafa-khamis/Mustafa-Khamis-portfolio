export async function sendChatMessage({
  message,
  previousInteractionId,
}) {
  const cleanMessage = message?.trim();

  if (!cleanMessage) {
    throw new Error("Please enter a message.");
  }

  const requestBody = {
    message: cleanMessage,
  };

  if (
    typeof previousInteractionId === "string" &&
    previousInteractionId.trim()
  ) {
    requestBody.previousInteractionId =
      previousInteractionId.trim();
  }

  const response = await fetch("/api/chat", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(requestBody),
  });

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error(
      `The server returned an invalid response (${response.status}).`
    );
  }

  console.log("Chat API response:", result);

  if (!response.ok) {
    throw new Error(
      result.message ||
        `Chat request failed with status ${response.status}.`
    );
  }

  return result.data;
}