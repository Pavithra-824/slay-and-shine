import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  ArrowRight, 
  RefreshCcw, 
  Check, 
  Sparkles, 
  Info,
  ChevronRight,
  Salad,
  Heart,
  Leaf
} from 'lucide-react';

// --- Mock Data & Logic ---

const QUESTIONS = [
  {
    id: 'skinType',
    title: "What's your skin type?",
    subtitle: "How does your skin feel 2 hours after washing?",
    options: [
      { value: 'oily', label: 'Oily / Shiny', icon: '💧' },
      { value: 'dry', label: 'Dry / Tight', icon: '🌵' },
      { value: 'combo', label: 'Combination', icon: '⚖️' },
      { value: 'normal', label: 'Normal / Balanced', icon: '✨' },
    ]
  },
  {
    id: 'concern',
    title: "Primary Concern",
    subtitle: "What do you want to tackle first?",
    options: [
      { value: 'acne', label: 'Acne & Blemishes', icon: '🔴' },
      { value: 'aging', label: 'Fine Lines & Aging', icon: '⏳' },
      { value: 'dullness', label: 'Dullness & Texture', icon: '☁️' },
      { value: 'sensitivity', label: 'Redness & Sensitivity', icon: '🌸' },
    ]
  }
];

const KNOWLEDGE_BASE = {
  baseRoutine: {
    oily: {
      cleanser: "Gel Salicylic Cleanser",
      moisturizer: "Oil-Free Water Gel",
      tip: "Don't skip moisturizer! Oily skin needs hydration to regulate sebum."
    },
    dry: {
      cleanser: "Creamy Hydrating Wash",
      moisturizer: "Ceramide Rich Cream",
      tip: "Layer your hydration. Use a mist before your moisturizer."
    },
    combo: {
      cleanser: "Gentle Foaming Cleanser",
      moisturizer: "Lightweight Lotion",
      tip: "Multimask: Clay mask on T-zone, hydrating mask on cheeks."
    },
    normal: {
      cleanser: "pH Balanced Gel",
      moisturizer: "Daily Peptide Cream",
      tip: "Focus on maintenance and SPF protection."
    }
  },
  treatments: {
    acne: {
      active: "Niacinamide + Zinc Serum",
      night: "BHA Exfoliant",
      diet: ["Low Glycemic Index foods", "Zinc-rich seeds (Pumpkin)", "Probiotics"],
      avoid: "Dairy and high sugar intake"
    },
    aging: {
      active: "Vitamin C Serum",
      night: "Retinol 0.5%",
      diet: ["Antioxidant berries", "Collagen-rich bone broth", "Omega-3 (Salmon)"],
      avoid: "Excessive alcohol and processed meats"
    },
    dullness: {
      active: "Glycolic Acid Toner",
      night: "Vitamin C + E Mask",
      diet: ["Citrus fruits", "Carrots (Beta Carotene)", "Green Tea"],
      avoid: "Dehydration and salty foods"
    },
    sensitivity: {
      active: "Centella Asiatica Ampoule",
      night: "Azelaic Acid Suspension",
      diet: ["Anti-inflammatory turmeric", "Leafy greens", "Healthy fats (Avocado)"],
      avoid: "Spicy foods and hot beverages"
    }
  }
};

// --- Components ---

const Button = ({ children, onClick, variant = 'primary', className = '', icon: Icon }) => {
  const baseStyles = "flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-200 active:scale-95";
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200",
    outline: "border-2 border-emerald-100 text-emerald-700 hover:bg-emerald-50",
    ghost: "text-slate-500 hover:text-emerald-600 hover:bg-slate-100",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
      {Icon && <Icon className="ml-2 w-4 h-4" />}
    </button>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, color = 'emerald' }) => {
  const colors = {
    emerald: 'bg-emerald-100 text-emerald-800',
    blue: 'bg-blue-100 text-blue-800',
    rose: 'bg-rose-100 text-rose-800',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${colors[color] || colors.emerald}`}>
      {children}
    </span>
  );
};

const WelcomeScreen = ({ onStart }) => (
  <div className="flex flex-col items-center text-center justify-center h-full p-8 space-y-6 animate-fade-in">
    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
      <Sparkles className="w-10 h-10 text-emerald-600" />
    </div>
    <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
      Slay & <span className="text-emerald-600">Shine</span>
    </h1>
    <p className="text-slate-500 text-lg max-w-md leading-relaxed">
      Discover your perfect skincare routine and diet plan tailored to your unique skin profile in just 30 seconds.
    </p>
    <Button onClick={onStart} icon={ArrowRight} className="w-full max-w-xs mt-8">
      Start Analysis
    </Button>
  </div>
);

const QuestionScreen = ({ question, onAnswer, currentStep, totalSteps }) => (
  <div className="flex flex-col h-full p-6 animate-fade-in-up">
    <div className="w-full bg-slate-100 h-2 rounded-full mb-8">
      <div 
        className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
        style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
      />
    </div>

    <div className="flex-1">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{question.title}</h2>
      <p className="text-slate-500 mb-8">{question.subtitle}</p>

      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(question.id, option.value)}
            // UPDATED: Added 'bg-white' and 'shadow-sm' to force light theme card look
            className="group flex items-center p-4 bg-white border-2 border-slate-100 rounded-xl shadow-sm hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200 text-left"
          >
            <span className="text-3xl mr-4 group-hover:scale-110 transition-transform duration-200">
              {option.icon}
            </span>
            <div>
              {/* UPDATED: Added 'text-slate-800' to ensure text is dark */}
              <span className="font-semibold text-slate-800 block">{option.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 ml-auto group-hover:text-emerald-500" />
          </button>
        ))}
      </div>
    </div>
  </div>
);

const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center h-full p-8">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
    </div>
    <h3 className="mt-6 text-xl font-semibold text-slate-800">Analyzing Profile...</h3>
    <p className="text-slate-500 mt-2 text-center">Matching ingredients to your skin type.</p>
  </div>
);

const ResultScreen = ({ answers, onReset }) => {
  const [activeTab, setActiveTab] = useState('routine');
  const base = KNOWLEDGE_BASE.baseRoutine[answers.skinType];
  const treat = KNOWLEDGE_BASE.treatments[answers.concern];
  
  const getLabel = (qId, val) => QUESTIONS.find(q => q.id === qId).options.find(o => o.value === val).label;

  return (
    <div className="h-full overflow-y-auto bg-slate-50 animate-fade-in">
      <div className="bg-white p-6 shadow-sm sticky top-0 z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Your Plan</h2>
            <p className="text-slate-500 text-sm">Personalized for you</p>
          </div>
          <Button variant="ghost" onClick={onReset} className="!p-2">
            <RefreshCcw className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex gap-2 mb-6">
          <Badge color="blue">{getLabel('skinType', answers.skinType)}</Badge>
          <Badge color="rose">{getLabel('concern', answers.concern)}</Badge>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('routine')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'routine' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Skincare Routine
          </button>
          <button
            onClick={() => setActiveTab('diet')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'diet' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Diet & Lifestyle
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-24">
        {activeTab === 'routine' ? (
          <>
            <section>
              <div className="flex items-center gap-2 mb-3 text-slate-800 font-bold">
                <Sun className="w-5 h-5 text-orange-500" />
                <h3>Morning Routine</h3>
              </div>
              <Card className="divide-y divide-slate-100">
                <ProductItem step="Cleanser" product={base.cleanser} desc="Gently removes impurities." />
                <ProductItem step="Treatment" product={treat.active} desc="Targets your specific concern." highlight />
                <ProductItem step="Moisturizer" product={base.moisturizer} desc="Locks in hydration." />
                <ProductItem step="Protection" product="SPF 50+ Broad Spectrum" desc="Anti-aging protection." />
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3 text-slate-800 font-bold">
                <Moon className="w-5 h-5 text-indigo-500" />
                <h3>Evening Routine</h3>
              </div>
              <Card className="divide-y divide-slate-100">
                <ProductItem step="Cleanse" product={base.cleanser} desc="Wash away the day's pollution." />
                 <ProductItem step="Night Repair" product={treat.night} desc="Repairs cells while you sleep." highlight />
              </Card>
            </section>

            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex gap-3">
              <Info className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-emerald-800 text-sm mb-1">Dermatologist Tip</h4>
                <p className="text-emerald-700 text-sm leading-relaxed">{base.tip}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Salad className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Nutritional Balance</h3>
              <p className="text-slate-500 text-sm">Beauty starts from within.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-5 border-l-4 border-l-green-500">
                <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" /> Eat More
                </h4>
                <ul className="space-y-2">
                  {treat.diet.map((item, i) => (
                    <li key={i} className="text-slate-600 text-sm flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-5 border-l-4 border-l-rose-400">
                 <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-rose-400" /> Limit Intake
                </h4>
                <p className="text-slate-600 text-sm">{treat.avoid}</p>
              </Card>
            </div>
          </>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent pointer-events-none flex justify-center">
        <div className="w-full max-w-md pointer-events-auto">
           <Button className="w-full shadow-xl" icon={Heart}>Save Routine to Profile</Button>
        </div>
      </div>
    </div>
  );
};

const ProductItem = ({ step, product, desc, highlight = false }) => (
  <div className={`p-4 flex items-start gap-4 ${highlight ? 'bg-emerald-50/50' : ''}`}>
    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0 font-bold text-xs">
      {step.substring(0, 2).toUpperCase()}
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{step}</p>
      <h4 className="font-semibold text-slate-800">{product}</h4>
      <p className="text-sm text-slate-500 mt-1">{desc}</p>
    </div>
  </div>
);

// --- Main App Component ---

const App = () => {
  const [view, setView] = useState('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const startQuiz = () => {
    setView('question');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleAnswer = (questionId, answerValue) => {
    const newAnswers = { ...answers, [questionId]: answerValue };
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(curr => curr + 1);
    } else {
      setView('loading');
      setTimeout(() => setView('results'), 1500);
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'welcome': return <WelcomeScreen onStart={startQuiz} />;
      case 'question': 
        return <QuestionScreen question={QUESTIONS[currentQuestionIndex]} onAnswer={handleAnswer} currentStep={currentQuestionIndex} totalSteps={QUESTIONS.length} />;
      case 'loading': return <LoadingScreen />;
      case 'results': return <ResultScreen answers={answers} onReset={() => setView('welcome')} />;
      default: return <WelcomeScreen onStart={startQuiz} />;
    }
  };

  return (
    // UPDATED: Added 'w-full' to ensure full width centering and background
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center font-sans text-slate-900">
      <div className="w-full max-w-md h-[100dvh] md:h-[850px] bg-white md:rounded-3xl md:shadow-2xl overflow-hidden relative flex flex-col">
        {view !== 'welcome' && (
          <header className="h-14 border-b border-slate-100 flex items-center justify-center flex-shrink-0 bg-white z-20">
            <span className="font-bold text-slate-800 tracking-tight">
              Slay & <span className="text-emerald-600">Shine</span>
            </span>
          </header>
        )}
        <main className="flex-1 overflow-hidden relative">
          {renderContent()}
        </main>
      </div>
      
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.4s ease-out; }
      `}</style>
    </div>
  );
};

export default App;