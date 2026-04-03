"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Sparkles } from "lucide-react";
import { useDiagnosticStore } from "@/lib/store";
import type { DiagnosticMessage } from "@/lib/store";

const MAX_QUESTIONS = 5;

export function ChatDiagnostic() {
  const { sectorId, messages, questionCount, addMessage, incrementQuestion, setStep, setResult } =
    useDiagnosticStore();
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [isGeneratingDiagnostic, setIsGeneratingDiagnostic] = useState(false);
  const [conversationDone, setConversationDone] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hasInitialized = useRef(false);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, scrollToBottom]);

  const askNextQuestion = useCallback(
    async (currentMessages: DiagnosticMessage[]) => {
      setIsStreaming(true);
      setStreamingContent("");

      try {
        const res = await fetch("/api/diagnostic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "question",
            sectorId,
            messages: currentMessages.map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        if (!res.ok || !res.body) throw new Error("API error");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let fullContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullContent += chunk;
          setStreamingContent(fullContent);
        }

        const assistantMsg: DiagnosticMessage = {
          id: `msg-${Date.now()}`,
          role: "assistant",
          content: fullContent,
        };
        addMessage(assistantMsg);
        setStreamingContent("");

        // Check if conversation is done (5 questions answered)
        const answeredCount = currentMessages.filter((m) => m.role === "user").length;
        if (answeredCount >= MAX_QUESTIONS) {
          setConversationDone(true);
        }
      } catch (err) {
        console.error("Stream error:", err);
        const errorMsg: DiagnosticMessage = {
          id: `msg-${Date.now()}`,
          role: "assistant",
          content: "Desolee, une erreur s'est produite. Veuillez reessayer.",
        };
        addMessage(errorMsg);
        setStreamingContent("");
      } finally {
        setIsStreaming(false);
      }
    },
    [sectorId, addMessage]
  );

  // Initialize conversation with first question
  useEffect(() => {
    if (!hasInitialized.current && messages.length === 0) {
      hasInitialized.current = true;
      askNextQuestion([]);
    }
  }, [messages.length, askNextQuestion]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    const userMsg: DiagnosticMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    addMessage(userMsg);
    incrementQuestion();
    setInput("");

    const updatedMessages = [...messages, userMsg];
    const answeredCount = updatedMessages.filter((m) => m.role === "user").length;

    if (answeredCount >= MAX_QUESTIONS) {
      // Ask final wrap-up question/statement, then mark done
      await askNextQuestion(updatedMessages);
      setConversationDone(true);
    } else {
      await askNextQuestion(updatedMessages);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const generateDiagnostic = async () => {
    setIsGeneratingDiagnostic(true);
    setStep("analyzing");

    const conversationHistory = messages
      .map((m) => `${m.role === "assistant" ? "Consultant" : "Client"}: ${m.content}`)
      .join("\n\n");

    try {
      const res = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "diagnostic",
          sectorId,
          conversationHistory,
        }),
      });

      if (!res.ok) throw new Error("Diagnostic API error");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Diagnostic error:", err);
      setIsGeneratingDiagnostic(false);
      setStep("conversation");
    }
  };

  const userAnsweredCount = messages.filter((m) => m.role === "user").length;
  const progressPercent = Math.min((userAnsweredCount / MAX_QUESTIONS) * 100, 100);

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-200px)] min-h-[500px]">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-zinc-500 font-[family-name:var(--font-geist-sans)] uppercase tracking-widest">
            Progression du diagnostic
          </span>
          <span className="text-xs text-amber-600 font-[family-name:var(--font-geist-sans)]">
            {userAnsweredCount}/{MAX_QUESTIONS} questions
          </span>
        </div>
        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #D97706, #FBBF24)" }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1"
                  style={{ background: "rgba(217,119,6,0.15)", border: "1px solid rgba(217,119,6,0.3)" }}>
                  <Sparkles className="w-4 h-4 text-amber-600" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 font-[family-name:var(--font-geist-sans)] text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "text-white rounded-br-sm"
                    : "text-zinc-200 rounded-bl-sm"
                }`}
                style={
                  msg.role === "user"
                    ? { background: "rgba(217,119,6,0.2)", border: "1px solid rgba(217,119,6,0.3)" }
                    : { background: "rgba(24,24,27,0.8)", border: "1px solid rgba(255,255,255,0.06)" }
                }
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Streaming assistant message */}
        {isStreaming && streamingContent && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1"
              style={{ background: "rgba(217,119,6,0.15)", border: "1px solid rgba(217,119,6,0.3)" }}>
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>
            <div
              className="max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-zinc-200 leading-relaxed font-[family-name:var(--font-geist-sans)]"
              style={{ background: "rgba(24,24,27,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {streamingContent}
              <span className="inline-block w-0.5 h-4 bg-amber-600 ml-0.5 animate-pulse" />
            </div>
          </motion.div>
        )}

        {/* Typing indicator */}
        {isStreaming && !streamingContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
              style={{ background: "rgba(217,119,6,0.15)", border: "1px solid rgba(217,119,6,0.3)" }}>
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>
            <div
              className="rounded-2xl rounded-bl-sm px-4 py-3"
              style={{ background: "rgba(24,24,27,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex gap-1 items-center h-4">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-amber-600"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Generate diagnostic button */}
      <AnimatePresence>
        {conversationDone && !isStreaming && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mb-4"
          >
            <button
              onClick={generateDiagnostic}
              disabled={isGeneratingDiagnostic}
              className="animated-border w-full py-4 px-6 rounded-xl font-[family-name:var(--font-syne)] font-bold text-sm text-white transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, rgba(217,119,6,0.3), rgba(251,191,36,0.2))" }}
            >
              {isGeneratingDiagnostic ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generation en cours...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Generer mon diagnostic personnalise
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input area */}
      {!conversationDone && (
        <div
          className="glass rounded-2xl p-3 flex items-end gap-3"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isStreaming || questionCount >= MAX_QUESTIONS}
            placeholder={isStreaming ? "L'IA reflechit..." : "Votre reponse..."}
            rows={1}
            className="flex-1 bg-transparent text-sm text-white placeholder-zinc-600 resize-none outline-none font-[family-name:var(--font-geist-sans)] leading-relaxed py-1"
            style={{ maxHeight: "120px" }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 active:scale-95 disabled:opacity-30"
            style={{ background: input.trim() && !isStreaming ? "rgba(217,119,6,0.3)" : "rgba(255,255,255,0.05)" }}
          >
            {isStreaming ? (
              <Loader2 className="w-4 h-4 text-amber-600 animate-spin" />
            ) : (
              <Send className="w-4 h-4 text-amber-600" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
