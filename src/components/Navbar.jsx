import React, { useState } from 'react';
import { 
  PartyPopper, 
  Calendar, 
  Users, 
  Wallet, 
  CheckSquare, 
  Briefcase, 
  Plus, 
  ChevronDown, 
  Download, 
  Upload, 
  Sparkles,
  Clock,
  Gift,
  Music,
  Layout,
  Printer
} from 'lucide-react';
import { getEventTheme } from '../utils/theme';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  events, 
  activeEvent, 
  setActiveEventId, 
  onOpenNewEventModal, 
  onExportData, 
  onImportData 
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const eventTheme = activeEvent ? getEventTheme(activeEvent.type) : getEventTheme('svadba');

  // Calculate days remaining
  const calculateDaysLeft = (dateString) => {
    if (!dateString) return null;
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = eventDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysLeft = activeEvent ? calculateDaysLeft(activeEvent.date) : null;

  // Tab definitions
  const allTabs = [
    { id: 'dashboard', label: 'Pregled', icon: Sparkles },
    { id: 'guests', label: 'Gosti', icon: Users, moduleKey: 'guests' },
    { id: 'budget', label: 'Budžet', icon: Wallet, moduleKey: 'budget' },
    { id: 'tasks', label: 'Zadaci', icon: CheckSquare, moduleKey: 'tasks' },
    { id: 'timeline', label: 'Satnica', icon: Clock, moduleKey: 'timeline' },
    { id: 'seating', label: 'Stolovi', icon: Layout, moduleKey: 'seating' },
    { id: 'playlist', label: 'Plejlista', icon: Music, moduleKey: 'playlist' },
    { id: 'wishlist', label: 'Pokloni / Želje', icon: Gift, moduleKey: 'wishlist' },
    { id: 'vendors', label: 'Dobavljači', icon: Briefcase, moduleKey: 'vendors' },
  ];

  // Filter tabs enabled for active event
  const visibleTabs = allTabs.filter(tab => {
    if (!tab.moduleKey) return true;
    return eventTheme.modules.includes(tab.moduleKey);
  });

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Event Switcher */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 via-rose-600 to-amber-400 flex items-center justify-center shadow-md text-white text-lg font-bold">
                {eventTheme.icon}
              </div>
              <div className="hidden sm:block">
                <span className="font-serif text-xl font-bold tracking-tight text-slate-900 block leading-tight">
                  Planer Proslava
                </span>
                <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">
                  {eventTheme.label}
                </span>
              </div>
            </div>

            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

            {/* Event Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 transition-all text-slate-800 text-sm font-semibold border border-slate-200/60"
              >
                <span className="truncate max-w-[140px] sm:max-w-[200px]">
                  {activeEvent ? activeEvent.title : 'Izaberi događaj'}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>

              {dropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setDropdownOpen(false)}
                  ></div>
                  <div className="absolute left-0 mt-2 w-72 rounded-xl bg-white shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Vaše proslave
                    </div>
                    {events.map((evt) => {
                      const theme = getEventTheme(evt.type);
                      return (
                        <button
                          key={evt.id}
                          onClick={() => {
                            setActiveEventId(evt.id);
                            setDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 text-sm flex items-center justify-between hover:bg-slate-50 transition-colors ${
                            evt.id === activeEvent?.id ? 'bg-slate-50 text-slate-900 font-semibold' : 'text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{theme.icon}</span>
                            <div>
                              <div className="font-medium">{evt.title}</div>
                              <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                                <Calendar className="w-3 h-3" />
                                {evt.date || 'Bez datuma'}
                              </div>
                            </div>
                          </div>
                          {evt.id === activeEvent?.id && (
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                          )}
                        </button>
                      );
                    })}
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        onOpenNewEventModal();
                      }}
                      className="w-full text-left px-3.5 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Kreiraj novu proslavu
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Days Countdown & Data Actions */}
          <div className="flex items-center gap-3">
            {activeEvent && daysLeft !== null && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80 text-xs font-semibold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span>
                  {daysLeft > 0 ? (
                    <>Još <strong className="text-amber-950 font-bold">{daysLeft}</strong> {daysLeft === 1 ? 'dan' : 'dana'} do proslave!</>
                  ) : daysLeft === 0 ? (
                    <strong className="text-emerald-700 font-bold">Danas je dan proslave! 🎉</strong>
                  ) : (
                    <>Proslava je održana pre {Math.abs(daysLeft)} dana</>
                  )}
                </span>
              </div>
            )}

            {/* Print & Export / Import */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/60">
              <button
                onClick={() => window.print()}
                title="Štampaj stranicu"
                className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded-md transition-all"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                onClick={onExportData}
                title="Sačuvaj bekup podataka (JSON)"
                className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded-md transition-all"
              >
                <Download className="w-4 h-4" />
              </button>
              <label
                title="Učitaj bekup podataka (JSON)"
                className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded-md transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <input 
                  type="file" 
                  accept=".json" 
                  onChange={onImportData} 
                  className="hidden" 
                />
              </label>
            </div>
          </div>

        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 border-t border-slate-100 overflow-x-auto py-2 no-scrollbar">
          {visibleTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-xs sm:text-sm whitespace-nowrap transition-all ${
                  isActive
                    ? `${eventTheme.accentClass} shadow-xs`
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
