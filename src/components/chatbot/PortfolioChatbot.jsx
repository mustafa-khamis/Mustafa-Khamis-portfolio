import { useEffect, useRef, useState } from "react";
import { sendChatMessage } from "../../services/chatApi";
import "./PortfolioChatbot.css";

const INITIAL_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm Mustafa AI. Ask me about Mustafa's services, projects, skills, or how to start a project with him.",
};

const SUGGESTED_QUESTIONS = [
  "Who is Mustafa?",
  "What services does he provide?",
  "Show me his skills",
  "How can I start a project?",
];

function createMessage(role, content) {
  return {
    id: crypto.randomUUID(),
    role,
    content,
  };
}

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    INITIAL_MESSAGE,
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [previousInteractionId, setPreviousInteractionId] =
    useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isSending]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  async function handleSend(customMessage) {
    const messageText =
      typeof customMessage === "string"
        ? customMessage.trim()
        : input.trim();

    if (!messageText || isSending) {
      return;
    }

    const userMessage = createMessage(
      "user",
      messageText
    );

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setInput("");
    setIsSending(true);

    try {
      const result = await sendChatMessage({
        message: messageText,
        previousInteractionId,
      });

      const assistantMessage = createMessage(
        "assistant",
        result.reply
      );

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);

      setPreviousInteractionId(result.interactionId);
    } catch (error) {
      const errorMessage = createMessage(
        "assistant",
        error.message ||
          "Sorry, I couldn't process that message."
      );

      setMessages((current) => [
        ...current,
        errorMessage,
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleSend();
  }

  function resetConversation() {
    setMessages([INITIAL_MESSAGE]);
    setPreviousInteractionId(null);
    setInput("");
  }

  return (
    <>
      <button
        className="chatbot-launcher"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={
          isOpen ? "Close AI assistant" : "Open AI assistant"
        }
      >
        {isOpen ? "×" : "AI"}
      </button>

      {isOpen && (
        <section
          className="chatbot-window"
          aria-label="Mustafa AI assistant"
        >
          <header className="chatbot-header">
            <div>
              <div className="chatbot-avatar">M</div>

              <div>
                <h2>Mustafa AI</h2>
                <p>
                  <span className="status-dot" />
                  Online
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={resetConversation}
              className="reset-button"
            >
              New chat
            </button>
          </header>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-row ${message.role}`}
              >
                <div className="message-bubble">
                  {message.content}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="suggestions">
                {SUGGESTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => handleSend(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {isSending && (
              <div className="message-row assistant">
                <div className="message-bubble typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            className="chatbot-form"
            onSubmit={handleSubmit}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              placeholder="Ask about Mustafa..."
              maxLength={1000}
              disabled={isSending}
              aria-label="Chat message"
            />

            <button
              type="submit"
              disabled={isSending || !input.trim()}
            >
              Send
            </button>
          </form>

          <small className="chatbot-disclaimer">
            AI responses may be incomplete. Contact Mustafa
            for final project details.
          </small>
        </section>
      )}
    </>
  );
}