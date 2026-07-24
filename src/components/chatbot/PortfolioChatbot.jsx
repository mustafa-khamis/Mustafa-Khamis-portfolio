import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { sendChatMessage } from "../../services/chatApi";
import "./PortfolioChatbot.css";

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= breakpoint);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

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

const LAUNCHER_TEXTS = [
  "Ask Mustafa AI",
  "Ask about my work",
  "Explore my services",
  "Start a conversation",
  "Have a question?",
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
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [previousInteractionId, setPreviousInteractionId] =
    useState(null);
  const [launcherExpanded, setLauncherExpanded] = useState(false);
  const [launcherTextIndex, setLauncherTextIndex] = useState(0);
  const [launcherText, setLauncherText] = useState("");
  const isMobile = useIsMobile();

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isSending]);

  useEffect(() => {
    if (isOpen) {
      textareaRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setLauncherExpanded(true);
      setLauncherTextIndex(0);
      setLauncherText("");
      return undefined;
    }

    setLauncherExpanded(false);
    setLauncherText("");

    const expandTimer = window.setTimeout(() => {
      setLauncherExpanded(true);
      setLauncherTextIndex(0);
    }, 380);

    const collapseTimer = window.setTimeout(() => {
      setLauncherExpanded(false);
      setLauncherText("");
    }, 2400);

    const remountTimer = window.setTimeout(() => {
      setLauncherExpanded(true);
      setLauncherTextIndex(1);
    }, 3200);

    return () => {
      window.clearTimeout(expandTimer);
      window.clearTimeout(collapseTimer);
      window.clearTimeout(remountTimer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!launcherExpanded || isOpen) {
      setLauncherText("");
      return undefined;
    }

    const targetText = LAUNCHER_TEXTS[launcherTextIndex];
    setLauncherText("");

    let currentIndex = 0;
    const typingTimer = window.setInterval(() => {
      currentIndex += 1;
      setLauncherText(targetText.slice(0, currentIndex));

      if (currentIndex >= targetText.length) {
        window.clearInterval(typingTimer);
      }
    }, 38);

    return () => window.clearInterval(typingTimer);
  }, [launcherExpanded, launcherTextIndex, isOpen]);

  useEffect(() => {
    if (!launcherExpanded || isOpen) {
      return undefined;
    }

    const rotationTimer = window.setInterval(() => {
      setLauncherTextIndex((current) => (current + 1) % LAUNCHER_TEXTS.length);
    }, 2600);

    return () => window.clearInterval(rotationTimer);
  }, [launcherExpanded, isOpen]);

  async function handleSend(customMessage) {
    const messageText =
      typeof customMessage === "string"
        ? customMessage.trim()
        : input.trim();

    if (!messageText || isSending) {
      return;
    }

    const userMessage = createMessage("user", messageText);

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const result = await sendChatMessage({
        message: messageText,
        previousInteractionId,
      });

      const assistantMessage = createMessage("assistant", result.reply);

      setMessages((current) => [...current, assistantMessage]);
      setPreviousInteractionId(result.interactionId);
    } catch (error) {
      const errorMessage = createMessage(
        "assistant",
        error.message || "Sorry, I couldn't process that message."
      );

      setMessages((current) => [...current, errorMessage]);
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleSend();
  }

  function handleInputKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  function resetConversation() {
    setMessages([INITIAL_MESSAGE]);
    setPreviousInteractionId(null);
    setInput("");
  }

  return (
    <>
      <motion.button
        className={`chatbot-launcher ${launcherExpanded ? "is-expanded" : ""} ${isOpen ? "is-open" : ""}`}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{
          opacity: isMobile && isOpen ? 0 : 1,
          scale: 1,
          pointerEvents: isMobile && isOpen ? "none" : "auto",
        }}
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="launcher-icon-wrap" aria-hidden="true">
          <img src="/icons/chatbot.png" alt="" />
        </span>
        <span className="launcher-copy" aria-hidden="true">
          <span className="launcher-copy-inner">
            {launcherText}
          </span>
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            className="chatbot-window"
            aria-label="Mustafa AI assistant"
            initial={isMobile
              ? { opacity: 0, y: "100%" }
              : { opacity: 0, y: 14, scale: 0.98 }
            }
            animate={isMobile
              ? { opacity: 1, y: 0 }
              : { opacity: 1, y: 0, scale: 1 }
            }
            exit={isMobile
              ? { opacity: 0, y: "100%" }
              : { opacity: 0, y: 10, scale: 0.98 }
            }
            transition={isMobile
              ? { duration: 0.36, ease: [0.32, 0.72, 0, 1] }
              : { duration: 0.26, ease: [0.16, 1, 0.3, 1] }
            }
          >
            <header className="chatbot-header">
              <div className="chatbot-title-group">
                <div className="chatbot-avatar">
                  <img src="/icons/chatbot.png" alt="" />
                </div>

                <div className="chatbot-title-block">
                  <div className="chatbot-title-row">
                    <h2>Mustafa AI</h2>
                    <span className="availability-pill">
                      <span className="status-dot" />
                      Online
                    </span>
                  </div>
                  <p>Portfolio assistant</p>
                </div>
              </div>

              <div className="header-actions">
                <button
                  type="button"
                  onClick={resetConversation}
                  className="icon-button"
                  aria-label="Start a new conversation"
                >
                  ↺
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="icon-button"
                  aria-label="Close assistant"
                >
                  ×
                </button>
              </div>
            </header>

            <div className="chatbot-messages">
              {messages.map((message) => (
                <div key={message.id} className={`message-row ${message.role}`}>
                  <div className="message-bubble">{message.content}</div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="welcome-card">
                  <p className="welcome-eyebrow">Portfolio assistant</p>
                  <h3>Hi, I’m Mustafa’s portfolio assistant.</h3>
                  <p>
                    Ask me about his services, selected work, tools, or how to begin a project.
                  </p>
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
                </div>
              )}

              {isSending && (
                <div className="message-row assistant">
                  <div className="message-bubble typing" aria-label="Assistant is typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form className="chatbot-form" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="chatbot-input">
                Message the assistant
              </label>
              <textarea
                ref={textareaRef}
                id="chatbot-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Ask about Mustafa’s work..."
                maxLength={1000}
                disabled={isSending}
                aria-label="Chat message"
                rows={1}
              />

              <button type="submit" disabled={isSending || !input.trim()}>
                Send
              </button>
            </form>

            <small className="chatbot-disclaimer">
              AI responses may be incomplete. Contact Mustafa for final project details.
            </small>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}