import React, { useState } from 'react';
import { Plus, Mic, MicOff } from 'lucide-react';
import { CATEGORIES, ExpenseFormData, Expense } from '../types';

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [formData, setFormData] = useState<ExpenseFormData>({
    amount: '',
    description: '',
    category: CATEGORIES[0],
    type: 'expense'
  });

  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.amount || !formData.description) {
      return;
    }

    const expense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
      date: new Date().toISOString().split('T')[0],
      type: formData.type
    };

    onAddExpense(expense);
    setFormData({
      amount: '',
      description: '',
      category: CATEGORIES[0],
      type: 'expense'
    });
  };

  const normalizeCategory = (spoken: string): string => {
  const spokenLower = spoken.toLowerCase();

  // Try exact match first
  let match = CATEGORIES.find(
    (cat) => cat.toLowerCase() === spokenLower
  );

  if (match) return match;

  // Try partial match (e.g., "healthcare" -> "Health")
  match = CATEGORIES.find(
    (cat) => spokenLower.includes(cat.toLowerCase()) || cat.toLowerCase().includes(spokenLower)
  );

  return match || CATEGORIES[0]; // fallback
};

  const parseVoiceInput = (transcript: string) => {
  try {
    const input = transcript.toLowerCase();

    // Extract type
    const type = input.includes("income") ? "income" : "expense";

    // Extract amount (first number)
    const amountMatch = input.match(/(?:rs\.?|₹)?\s?(\d+(\.\d+)?)/);
    const amount = amountMatch ? amountMatch[1] : "";

    // Extract category
    const categoryMatch = input.match(/(?:category|in|under)\s+([a-zA-Z &]+)/);
    const category = categoryMatch ? categoryMatch[1].trim() : "";
    

    // Extract description
    let description = "";
    const descMatch = input.match(/(?:into|for|on)\s+(.+?)(?:\s+(category|in|under)|$)/);
    if (descMatch && descMatch[1]) {
      description = descMatch[1].trim();
    }

    // Capitalize fields
    const cap = (str: string) =>
      str
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

    return {
      type,
      amount,
      description: cap(description),
      category: cap(category),
    };
  } catch (err) {
    console.error("Parsing failed:", err);
    return null;
  }
};


  const handleVoiceRecord = async () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Your browser does not support voice recognition.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  setIsRecording(true);
  setIsProcessing(false);

  recognition.start();

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    console.log("Transcript:", transcript);

    const parsed = parseVoiceInput(transcript);

    if (parsed) {
      setFormData((prev) => ({
        ...prev,
        type: parsed.type as 'expense' | 'income',
        amount: parsed.amount,
        description: parsed.description,
        category: normalizeCategory(parsed.category),
      }));
    }

    setIsRecording(false);
    setIsProcessing(false);
  };

  recognition.onerror = () => {
    setIsRecording(false);
    setIsProcessing(false);
    alert("Could not recognize your voice. Please try again.");
  };

  recognition.onend = () => {
    setIsRecording(false);
    setIsProcessing(false);
  };
};



  return (
    <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-6 mb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 via-transparent to-purple-500/5" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-purple-400 font-orbitron">ADD INCOME OR EXPENSE</h2>
          <button
            onClick={handleVoiceRecord}
            disabled={isProcessing}
            className={`relative p-3 rounded-full transition-all duration-300 ${
              isRecording 
                ? 'bg-red-500/20 text-red-400 animate-pulse border border-red-400/50' 
                : isProcessing
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/50'
                : 'bg-neon-green/10 text-neon-green border border-neon-green/30 hover:bg-neon-green/20 hover:scale-110'
            }`}
          >
            {isProcessing ? (
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-yellow-400 border-t-transparent" />
            ) : isRecording ? (
              <MicOff className="h-6 w-6" />
            ) : (
              <Mic className="h-6 w-6" />
            )}
            {!isProcessing && !isRecording && (
              <div className="absolute inset-0 bg-neon-green/20 rounded-full blur-md" />
            )}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2 font-poppins">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'expense' | 'income' }))}
                className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-3 text-purple-200 focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all duration-300"
              >
                <option className='bg-black/75 border border-purple-500/50 rounded-lg px-4 py-3 text-purple-200' value="expense">Expense</option>
                <option className='bg-black/75 border border-purple-500/50 rounded-lg px-4 py-3 text-purple-200' value="income">Income</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2 font-poppins">
                Amount (₹)
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-3 text-purple-200 focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all duration-300"
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-300 mb-2 font-poppins">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-3 text-purple-200 focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all duration-300"
              placeholder="Enter description..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-300 mb-2 font-poppins">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-3 text-purple-200 focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all duration-300"
            >
              {CATEGORIES.map(category => (
                <option className='bg-black/75 border border-purple-500/50 rounded-lg px-4 py-3 text-purple-200' key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-neon-green/10 border border-neon-green/30 text-neon-green px-6 py-3 rounded-lg font-semibold font-poppins hover:bg-neon-green/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-green/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Plus className="h-5 w-5" />
            Add {formData.type === 'expense' ? 'Expense' : 'Income'}
          </button>
          <label className="block text-sm font-medium text-purple-300 mb-2 font-poppins">
              Note: Try inputting voice commands like "Expense 1200 into gym membership category health".
          </label>
        </form>

        {isRecording && (
          <div className="mt-4 text-center">
            <p className="text-red-400 font-poppins animate-pulse">🎤 Recording... Speak now!</p>
          </div>
        )}

        {isProcessing && (
          <div className="mt-4 text-center">
            <p className="text-yellow-400 font-poppins">🔄 Processing voice input...</p>
          </div>
        )}
      </div>
    </div>
  );
};
