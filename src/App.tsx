// App.tsx - NEXUS FRONTIER V3 (THE CLOSED LOOP)
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Globe,
  Video,
  Search,
  Home,
  Calendar,
  Users,
  TrendingUp,
  Loader2,
  Sun,
  Moon,
  Plus,
  Star,
  X,
  CheckCircle,
  VideoOff,
  Mic,
  MicOff,
  Lock,
  Shield,
  Zap,
  AlertTriangle,
  FileText,
  Smartphone,
  CreditCard,
  ChevronDown,
} from 'lucide-react';

// ==========================================
// 1. CONFIGURATION
// ==========================================

const SUPABASE_URL = 'https://lrzbdrjgjsrrggbofhxtw.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyemJkcmpnc3JyZ2Jib2ZoeHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNTg5MjUsImV4cCI6MjA3OTgzNDkyNX0.HN0odCvFHdq1AnmgOzEX_tQ1SyTW43DCLIBihXQGc4w';

// StackBlitz Safe Connection (No Session Persistence)
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

// ==========================================
// 2. MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [view, setView] = useState('landing');
  const [dark, setDark] = useState(false);
  const [experts, setExperts] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState('');

  useEffect(() => {
    // Refresh data whenever we change views
    if (view === 'client' || view === 'expert') {
      fetchData();
    }
  }, [view]);

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);

  async function fetchData() {
    setLoading(true);
    setErrorDetails('');

    try {
      // 1. Fetch Experts
      const { data: expertData, error: expertError } = await supabase
        .from('experts')
        .select('*')
        .order('id');
      if (expertError) throw expertError;
      setExperts(expertData || []);

      // 2. Fetch News
      const { data: newsData } = await supabase
        .from('news')
        .select('*')
        .limit(5);
      if (newsData && newsData.length > 0) {
        setNews(newsData);
      } else {
        // Fallback News
        setNews([
          {
            title: 'KES/USD gains 0.7% as diaspora inflows hit 3-year high',
            category: 'FOREX',
            sentiment: 'positive',
          },
          {
            title: 'New Finance Bill clause may impact foreign land ownership',
            category: 'REGULATION',
            sentiment: 'neutral',
          },
        ]);
      }
    } catch (err: any) {
      console.log('Demo Mode Activated');
      setErrorDetails(err.message);
      // Demo Data
      setExperts([
        {
          id: 1,
          name: 'Dr. Patricia M. (Demo)',
          role: 'Former CBK Director',
          rate: 45000,
          availability: ['Today 4PM'],
          initials: 'PM',
        },
        {
          id: 2,
          name: 'David O. (Demo)',
          role: 'Real Estate Tycoon',
          rate: 35000,
          availability: ['Tomorrow 10AM'],
          initials: 'DO',
        },
        {
          id: 3,
          name: 'Sarah K. (Demo)',
          role: 'Corporate Lawyer',
          rate: 25000,
          availability: ['Fri 9AM'],
          initials: 'SK',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`min-h-screen ${
        dark ? 'dark bg-slate-950 text-white' : 'bg-white text-slate-900'
      } font-sans`}
    >
      {view === 'landing' && (
        <Landing setView={setView} setDark={setDark} dark={dark} />
      )}
      {view === 'client' && (
        <ClientDashboard
          experts={experts}
          news={news}
          setView={setView}
          dark={dark}
          setDark={setDark}
          loading={loading}
          errorDetails={errorDetails}
        />
      )}
      {view === 'expert' && (
        <ExpertPortal
          experts={experts}
          setView={setView}
          dark={dark}
          refreshData={fetchData}
        />
      )}
    </div>
  );
}

// ==========================================
// 3. SUB-COMPONENTS
// ==========================================

// --- Landing Page ---
const Landing = ({ setView, setDark, dark }: any) => {
  const [showManifesto, setShowManifesto] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative">
      <nav className="max-w-7xl mx-auto w-full p-6 flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setView('expert')}
            className="font-bold text-sm hover:text-indigo-500 hidden md:block"
          >
            Expert Login
          </button>
          <button
            onClick={() => setView('client')}
            className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold shadow-lg hover:scale-105 transition"
          >
            Member Access
          </button>
        </div>
      </nav>
      <div className="flex-1 flex flex-col justify-center items-center px-6 text-center pb-20">
        <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full text-xs font-bold mb-8 border border-indigo-100 dark:border-indigo-800">
          <Globe size={14} /> Premier Frontier Intelligence
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
          The Ground Truth on <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">
            African Markets.
          </span>
        </h1>
        <p className="text-xl opacity-70 mb-10 max-w-2xl mx-auto leading-relaxed">
          Stop guessing with public data. Connect directly with the{' '}
          <span className="font-bold text-slate-900 dark:text-white">
            Former Regulators and CEOs
          </span>{' '}
          running the ecosystem.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => setView('client')}
            className="px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg shadow-xl hover:scale-105 transition"
          >
            Get Access
          </button>
          <button
            onClick={() => setShowManifesto(true)}
            className="px-10 py-4 border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            Read Manifesto
          </button>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 opacity-50 max-w-2xl w-full">
          <div className="flex flex-col items-center gap-2">
            <Shield size={24} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Verified Experts
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Lock size={24} />
            <span className="text-xs font-bold uppercase tracking-widest">
              E2E Encryption
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Zap size={24} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Live Intel
            </span>
          </div>
        </div>
      </div>

      {showManifesto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[80vh]">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-black text-2xl flex items-center gap-2">
                <FileText className="text-indigo-500" /> The Nexus Manifesto
              </h3>
              <button
                onClick={() => setShowManifesto(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-8 overflow-y-auto leading-relaxed text-lg opacity-80 space-y-6">
              <p>
                <strong>The Era of "Macro-Tourism" is Over.</strong>
              </p>
              <p>
                For the last decade, investing in Africa meant looking at GDP
                charts from the World Bank and reading TechCrunch articles about
                "Silicon Savannah." That data is public. That data is
                commoditized. If you are relying on Google, you are already
                late.
              </p>
              <p>
                <strong>The Real Market is Offline.</strong>
              </p>
              <p>
                In Frontier Markets, the alpha isn't in the spreadsheet. It's in
                the whispers. It’s knowing that a specific County Governor is
                delaying permits before the news breaks. It’s knowing the
                reputation of a local partner before you wire the funds.
              </p>
              <p>
                <strong>Enter Nexus Frontier.</strong>
              </p>
              <p>
                We are not a news agency. We are not a consulting firm that
                charges you $50k for a PDF. We are an encrypted gateway to the
                Ground Truth. We connect you directly to the people who actually
                run the market.
              </p>
            </div>
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => {
                  setShowManifesto(false);
                  setView('client');
                }}
                className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl"
              >
                Join the Network
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Client Dashboard ---
const ClientDashboard = ({
  experts,
  news,
  setView,
  dark,
  setDark,
  loading,
  errorDetails,
}: any) => {
  const [tab, setTab] = useState('experts');
  const [payment, setPayment] = useState<any>(null);

  const bookExpert = (expert: any, slot: string) => {
    setPayment({
      amount: expert.rate,
      item: `Consultation: ${expert.name} (${slot})`,
      expert,
      slot,
    });
  };

  const completePayment = async () => {
    try {
      const { error } = await supabase.from('bookings').insert({
        expert_name: payment.expert.name,
        slot: payment.slot,
        amount: payment.amount,
        client_email: 'demo@nexus.com',
      });
      if (error) throw error;
      alert(
        `Booking Confirmed! ${
          payment.amount * 0.7
        } KES transferred to Expert Escrow. ${
          payment.amount * 0.3
        } KES Platform Fee Processed.`
      );
    } catch (e) {
      alert('Booking Confirmed! (Demo Mode)');
    }
    setPayment(null);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hidden md:flex flex-col">
        <div onClick={() => setView('landing')} className="mb-8">
          <Logo />
        </div>
        <nav className="space-y-2 flex-1">
          <button
            onClick={() => setTab('experts')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg font-bold transition-all ${
              tab === 'experts'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500'
            }`}
          >
            <Search size={20} /> Find Expert
          </button>
          <button
            onClick={() => setTab('sessions')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg font-bold transition-all ${
              tab === 'sessions'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500'
            }`}
          >
            <Video size={20} /> My Briefings
          </button>
        </nav>
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center font-bold">
              JD
            </div>
            <div>
              <p className="text-sm font-bold">John Doe</p>
              <p className="text-xs opacity-50">Member</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950">
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0">
          <h2 className="font-bold text-lg uppercase tracking-wider flex items-center gap-2">
            <Globe size={18} className="text-indigo-500" /> Nexus Terminal
          </h2>
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-2 px-4 flex items-center gap-4 text-xs font-bold shadow-sm z-10 relative overflow-hidden shrink-0">
          <div className="flex items-center gap-2 animate-pulse shrink-0">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-red-500 uppercase tracking-wider">
              LIVE MARKET
            </span>
          </div>
          <div className="flex gap-8 whitespace-nowrap overflow-hidden w-full">
            {news.map((n: any, i: number) => (
              <span key={i} className="opacity-80 flex items-center gap-2">
                {n.title}{' '}
                <span
                  className={
                    n.sentiment === 'positive'
                      ? 'text-emerald-500'
                      : 'text-amber-500'
                  }
                >
                  ({n.category})
                </span>
              </span>
            ))}
          </div>
        </div>
        <main className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center opacity-50">
              <Loader2
                size={48}
                className="animate-spin text-indigo-500 mb-4"
              />
              <p>Connecting to Nexus Secure Database...</p>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              {errorDetails && (
                <div className="mb-6 bg-amber-50 text-amber-800 p-4 rounded-xl border border-amber-200 text-sm flex items-center gap-2">
                  <AlertTriangle size={16} />
                  <span>
                    <strong>Note:</strong> Database connection restricted by
                    browser settings. Showing Demo Mode.
                  </span>
                </div>
              )}
              {tab === 'experts' ? (
                <>
                  <div className="bg-indigo-900 text-white p-8 rounded-3xl mb-8 relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                      <h3 className="text-3xl font-black mb-2">
                        Market Alert: Kenya Finance Bill
                      </h3>
                      <p className="text-indigo-200 max-w-2xl text-lg">
                        We have 3 new former regulators available to discuss the
                        impact.
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {experts.map((expert: any) => (
                      <div
                        key={expert.id}
                        className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:border-indigo-500 transition-all group"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">
                            {expert.name.charAt(0)}
                          </div>
                          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-lg font-bold text-xs">
                            <Star fill="currentColor" size={12} /> 5.0
                          </div>
                        </div>
                        <h3 className="font-black text-xl mb-1">
                          {expert.name}
                        </h3>
                        <p className="text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-4">
                          {expert.role}
                        </p>
                        <div className="space-y-3 mb-6">
                          <p className="text-xs font-bold opacity-50 uppercase tracking-widest">
                            Available Slots
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {expert.availability &&
                              expert.availability.map((slot: string) => (
                                <button
                                  key={slot}
                                  onClick={() => bookExpert(expert, slot)}
                                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold hover:bg-indigo-600 hover:text-white transition"
                                >
                                  {slot}
                                </button>
                              ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                          <div>
                            <span className="font-black text-xl">
                              KES {expert.rate?.toLocaleString()}
                            </span>
                            <span className="text-[10px] uppercase font-bold opacity-50 block">
                              Per Hour
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              bookExpert(expert, expert.availability?.[0])
                            }
                            className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:scale-105 transition shadow-lg"
                          >
                            Book
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl mx-8 opacity-50">
                  <Calendar size={64} className="mb-4" />
                  <p className="text-xl font-bold">No Active Briefings</p>
                  <button
                    onClick={() => setTab('experts')}
                    className="text-indigo-500 font-bold mt-2 hover:underline"
                  >
                    Book an Expert
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
      {payment && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-sm w-full shadow-2xl relative">
            <button
              onClick={() => setPayment(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-black mb-2">Secure Checkout</h3>
            <p className="text-xs text-slate-500 mb-6">
              Nexus Frontier Escrow Service
            </p>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl mb-6 border border-slate-100 dark:border-slate-700">
              <p className="text-xs font-bold uppercase text-slate-500">
                Service
              </p>
              <p className="font-bold text-lg mb-2">{payment.item}</p>
              <div className="flex justify-between items-end mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <span className="text-sm font-bold text-slate-500">
                  Total Due
                </span>
                <span className="text-2xl font-black text-indigo-600">
                  KES {payment.amount.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50">
                <Smartphone size={20} className="text-emerald-600" />
                <span className="font-bold text-sm">M-PESA</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50">
                <CreditCard size={20} className="text-blue-600" />
                <span className="font-bold text-sm">Card</span>
              </button>
            </div>
            <button
              onClick={completePayment}
              className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl text-lg shadow-xl hover:bg-emerald-700 transition"
            >
              Pay KES {payment.amount.toLocaleString()}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Expert Portal (UPDATED) ---
const ExpertPortal = ({ experts, setView, dark, refreshData }: any) => {
  const [selectedExpertId, setSelectedExpertId] = useState<number>(
    experts[0]?.id || 1
  );
  const myProfile =
    experts.find((e: any) => e.id === selectedExpertId) || experts[0];
  const [slots, setSlots] = useState<string[]>(myProfile?.availability || []);
  const [myBookings, setMyBookings] = useState<any[]>([]);

  useEffect(() => {
    if (myProfile) {
      setSlots(myProfile.availability || []);
      fetchBookings();
    }
  }, [myProfile]);

  const fetchBookings = async () => {
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .eq('expert_name', myProfile.name);
    setMyBookings(data || []);
  };

  const toggleSlot = async (slot: string) => {
    const newSlots = slots.includes(slot)
      ? slots.filter((s) => s !== slot)
      : [...slots, slot];
    setSlots(newSlots);
    await supabase
      .from('experts')
      .update({ availability: newSlots })
      .eq('id', myProfile.id);
    refreshData(); // Update the main app state
  };

  return (
    <div className="min-h-screen p-6 md:p-12 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl relative">
        <button
          onClick={() => setView('landing')}
          className="absolute top-10 right-10 text-red-500 font-bold text-sm hover:underline"
        >
          Log Out
        </button>

        <div className="flex items-center gap-6 mb-10 pb-8 border-b border-slate-100 dark:border-slate-800">
          <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg">
            {myProfile?.name?.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-3xl font-black">{myProfile?.name}</h2>
              <div className="relative group">
                <ChevronDown className="cursor-pointer text-slate-400 hover:text-slate-600" />
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-800 shadow-xl rounded-xl p-2 hidden group-hover:block z-50 border border-slate-100 dark:border-slate-700">
                  {experts.map((e: any) => (
                    <button
                      key={e.id}
                      onClick={() => setSelectedExpertId(e.id)}
                      className="w-full text-left p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-sm font-bold"
                    >
                      {e.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-xs mt-1">
              {myProfile?.role} • Verified
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase font-bold opacity-50">
              Escrow Balance
            </p>
            <p className="text-3xl font-black text-emerald-500">
              KES {(myBookings.length * myProfile.rate * 0.7).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-black text-xl mb-6 flex items-center gap-2">
              <Calendar className="text-indigo-500" /> Manage Availability
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                'Today 4PM',
                'Tomorrow 10AM',
                'Tomorrow 2PM',
                'Thu 11AM',
                'Fri 9AM',
              ].map((slot) => (
                <button
                  key={slot}
                  onClick={() => toggleSlot(slot)}
                  className={`p-4 rounded-xl border-2 transition-all font-bold flex justify-between items-center ${
                    slots.includes(slot)
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600'
                      : 'border-slate-200 dark:border-slate-700 opacity-50'
                  }`}
                >
                  {slot} {slots.includes(slot) && <CheckCircle size={16} />}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-black text-xl mb-6 flex items-center gap-2">
              <Users className="text-indigo-500" /> Incoming Bookings
            </h3>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {myBookings.length === 0 ? (
                <div className="text-center p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl opacity-50">
                  <p>No bookings yet.</p>
                </div>
              ) : (
                myBookings.map((b: any, i: number) => (
                  <div
                    key={i}
                    className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700"
                  >
                    <p className="font-bold text-sm">{b.client_email}</p>
                    <p className="text-xs opacity-60 mb-2">{b.slot}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-600 font-bold text-xs">
                        PAID: KES {(b.amount * 0.7).toLocaleString()}
                      </span>
                      <button className="px-3 py-1 bg-indigo-600 text-white rounded text-xs font-bold">
                        Join Call
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Logo = () => (
  <div className="flex items-center gap-2 cursor-pointer select-none">
    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg hover:rotate-12 transition-transform">
      <Globe className="text-white" size={20} />
    </div>
    <span className="font-black text-xl tracking-tight">Nexus Frontier</span>
  </div>
);
