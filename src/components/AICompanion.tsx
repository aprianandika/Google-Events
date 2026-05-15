import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Sparkles, Send, User, Bot, Loader2 } from 'lucide-react';
import { startGeminiChat } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export const AICompanion = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current = startGeminiChat();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: text });
      const botMessage: Message = { role: 'bot', text: response.text || 'Maaf, saya sedang mengalami gangguan.' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: 'Maaf, sepertinya ada masalah koneksi. Coba lagi nanti ya!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 pt-24 pb-48 flex flex-col">
      {/* Header Area */}
      <div className="flex flex-col items-center mb-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 relative mb-4"
        >
          <div className="absolute inset-0 bg-cyber-lime/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-14 h-14 glass rounded-full flex items-center justify-center border-cyber-lime/30 shadow-[0_0_30px_rgba(255, 49, 49, 0.2)]">
                <Sparkles className="text-cyber-lime" size={24} />
             </div>
          </div>
        </motion.div>

        <div className="text-center">
          <h2 className="text-2xl font-display font-black text-white mb-1 tracking-tighter">LOCALPRIDE AI</h2>
          <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Pendamping Kota Masa Depan</p>
        </div>
      </div>

      {/* Chat History */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 mb-8 pr-2 scrollbar-hide"
      >
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="text-center py-8">
                <p className="text-white/30 text-sm italic mb-8">Tanyakan apa saja tentang peluang di kotamu...</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  "Ada apa di SCBD malam ini?",
                  "Cari lowongan teknologi di Jakarta.",
                  "Siapa perajin lokal di sekitar sini?",
                  "Tunjukkan komunitas lokal yang sedang tren."
                ].map((prompt, i) => (
                  <motion.button
                    key={prompt}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleSend(prompt)}
                    className="w-full p-4 glass-dark rounded-2xl text-left text-xs text-white/60 hover:bg-white/10 hover:text-white transition-all border border-white/5 flex justify-between items-center group"
                  >
                    {prompt}
                    <Send size={12} className="text-white/10 group-hover:text-cyber-lime transition-colors" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border ${msg.role === 'user' ? 'bg-cyber-lime text-obsidian border-cyber-lime' : 'bg-white/5 text-white/40 border-white/10'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-cyber-lime/10 text-white border border-cyber-lime/20 rounded-tr-none' : 'bg-white/5 text-white/80 border border-white/10 rounded-tl-none'}`}>
                    <div className="markdown-content">
                      <ReactMarkdown>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 text-white/40 border border-white/10 flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl rounded-tl-none flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-cyber-lime animate-spin" />
                  <span className="text-xs text-white/40 font-mono uppercase tracking-widest">Sedang Berpikir...</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-32 left-1/2 -translate-x-1/2 w-[90%] max-w-md">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative group pb-4"
        >
          <div className="absolute inset-x-0 bottom-full mb-4 flex justify-center">
             <div className="px-4 py-2 bg-obsidian/80 backdrop-blur-md rounded-full border border-white/10 shadow-2xl flex items-center gap-2">
                <div className="w-2 h-2 bg-cyber-lime rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest leading-none">Smart Mode Aktif</span>
             </div>
          </div>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanya LokalPride apa saja..." 
            className="w-full bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[28px] py-5 px-8 outline-none focus:border-cyber-lime/50 focus:bg-white/10 transition-all text-white placeholder:text-white/30 text-sm shadow-2xl"
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 w-11 h-11 bg-cyber-lime rounded-full flex items-center justify-center text-obsidian shadow-[0_0_20px_rgba(255,49,49,0.3)] hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
