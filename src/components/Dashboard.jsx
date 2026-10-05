import React from 'react';
import { 
  Users, 
  Wallet, 
  CheckSquare, 
  Calendar, 
  MapPin, 
  Edit3, 
  Plus, 
  Sparkles,
  TrendingUp,
  Clock,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  Gift,
  Music,
  Layout
} from 'lucide-react';
import { getEventTheme } from '../utils/theme';

export default function Dashboard({ 
  event, 
  guests, 
  budget, 
  tasks, 
  vendors,
  timeline = [],
  playlist = [],
  wishlist = [],
  tables = [],
  setActiveTab,
  onOpenEditEventModal,
  onOpenAddGuestModal,
  onOpenAddBudgetModal,
  onOpenAddTaskModal,
  onToggleTask
}) {
  if (!event) return null;

  const eventTheme = getEventTheme(event.type);

  const eventGuests = guests.filter(g => g.eventId === event.id);
  const eventBudget = budget.filter(b => b.eventId === event.id);
  const eventTasks = tasks.filter(t => t.eventId === event.id);
  const eventVendors = vendors.filter(v => v.eventId === event.id);
  const eventTimeline = timeline.filter(t => t.eventId === event.id);
  const eventPlaylist = playlist.filter(p => p.eventId === event.id);
  const eventWishlist = wishlist.filter(w => w.eventId === event.id);
  const eventTables = tables.filter(t => t.eventId === event.id);

  // Guest calculations
  const confirmedGuests = eventGuests.filter(g => g.status === 'potvrdjeno');
  const totalAttendingSeats = confirmedGuests.reduce((sum, g) => sum + 1 + (Number(g.plusOne) || 0), 0);
  const totalInvitedGuests = eventGuests.reduce((sum, g) => sum + 1 + (Number(g.plusOne) || 0), 0);
  const pendingGuestsCount = eventGuests.filter(g => g.status === 'na_cekanju').length;

  // Budget calculations
  const totalPlannedBudget = eventBudget.reduce((sum, item) => sum + (Number(item.plannedCost) || 0), 0);
  const totalActualCost = eventBudget.reduce((sum, item) => sum + (Number(item.actualCost) || 0), 0);
  const totalPaidAmount = eventBudget.reduce((sum, item) => sum + (Number(item.paidAmount) || 0), 0);
  const targetBudget = Number(event.targetBudget) || 0;
  const budgetProgress = targetBudget > 0 ? Math.min(Math.round((totalActualCost / targetBudget) * 100), 100) : 0;

  // Tasks calculations
  const completedTasks = eventTasks.filter(t => t.completed);
  const taskProgress = eventTasks.length > 0 ? Math.round((completedTasks.length / eventTasks.length) * 100) : 0;
  const highPriorityPendingTasks = eventTasks.filter(t => !t.completed && t.priority === 'visok');

  // Days left calculation
  const calculateDaysLeft = (dateString) => {
    if (!dateString) return null;
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = eventDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  const daysLeft = calculateDaysLeft(event.date);

  const formatMoney = (val) => {
    return new Intl.NumberFormat('de-DE').format(val) + ' ' + (event.currency || '€');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Dynamic Theme Event Banner */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${eventTheme.bannerGradient} text-white p-6 sm:p-8 shadow-xl`}>
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${eventTheme.badgeBg} border`}>
                {eventTheme.icon} {eventTheme.label}
              </span>
              {event.location && (
                <span className="text-xs text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-300" />
                  {event.location}
                </span>
              )}
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-tight">
              {event.title}
            </h1>
            
            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl font-normal leading-relaxed">
              {event.notes || eventTheme.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenEditEventModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/15 transition-all backdrop-blur-xs"
            >
              <Edit3 className="w-4 h-4" />
              Uredi proslavu
            </button>
          </div>
        </div>
      </div>

      {/* 4 Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Stat 1: Odbrojavanje */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Odbrojavanje</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900 font-serif">
              {daysLeft !== null ? (daysLeft >= 0 ? daysLeft : 0) : '-'}
              <span className="text-sm font-sans font-normal text-slate-500 ml-1.5">dana</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Datum: {event.date ? new Date(event.date).toLocaleDateString('bs-BA') : 'Nije definisan'}
            </p>
          </div>
        </div>

        {/* Stat 2: Gosti */}
        <div 
          onClick={() => setActiveTab('guests')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Gosti & Potvrde</span>
            <div className={`p-2 rounded-xl bg-rose-50 ${eventTheme.accentText} group-hover:bg-rose-500 group-hover:text-white transition-colors`}>
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900 font-serif">
              {totalAttendingSeats}
              <span className="text-sm font-sans font-normal text-slate-500 ml-1.5">/ {totalInvitedGuests} osoba</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span className="text-emerald-600 font-semibold">{confirmedGuests.length} potvrđeno</span>
              <span className="text-amber-600 font-semibold">{pendingGuestsCount} čeka odgovor</span>
            </div>
          </div>
        </div>

        {/* Stat 3: Budžet */}
        <div 
          onClick={() => setActiveTab('budget')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Budžet proslave</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900 font-serif">
              {formatMoney(totalActualCost)}
            </div>
            <div className="mt-2 space-y-1">
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    totalActualCost > targetBudget ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${budgetProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Cilj: {formatMoney(targetBudget)}</span>
                <span className="font-semibold text-slate-700">Plaćeno: {formatMoney(totalPaidAmount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stat 4: Zadaci */}
        <div 
          onClick={() => setActiveTab('tasks')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pripreme & Zadaci</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900 font-serif">
              {taskProgress}%
            </div>
            <div className="mt-2 space-y-1">
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${taskProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Završeno {completedTasks.length} od {eventTasks.length}</span>
                <span className="font-semibold text-blue-600">{highPriorityPendingTasks.length} hitnih</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Brzi unos:</span>
        <button
          onClick={onOpenAddGuestModal}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Dodaj gosta
        </button>
        <button
          onClick={onOpenAddBudgetModal}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Dodaj trošak
        </button>
        <button
          onClick={onOpenAddTaskModal}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Dodaj zadatak
        </button>
      </div>

      {/* Two Column Section: Timeline Preview & Hitni Zadaci */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Satnica Preview */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Satnica & Protokol
              </h3>
              <button
                onClick={() => setActiveTab('timeline')}
                className="text-xs text-amber-600 font-semibold hover:underline"
              >
                Prikaži celu satnicu ({eventTimeline.length})
              </button>
            </div>

            {eventTimeline.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Clock className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <p className="text-sm">Satnica još nije kreirana.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {eventTimeline.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 rounded bg-amber-100 text-amber-800 text-xs font-bold">
                        {item.time} h
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{item.title}</div>
                        <div className="text-xs text-slate-400">{item.location || 'Lokacija nije uneta'}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Hitni Zadaci */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-500" />
                Hitni zadaci za rešavanje
              </h3>
              <button
                onClick={() => setActiveTab('tasks')}
                className="text-xs text-rose-600 font-semibold hover:underline"
              >
                Prikaži sve ({eventTasks.length})
              </button>
            </div>

            {eventTasks.filter(t => !t.completed).length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400 mb-2" />
                <p className="text-sm">Svi zadaci su uspešno završeni! Bravo!</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {eventTasks
                  .filter(t => !t.completed)
                  .slice(0, 4)
                  .map((task) => (
                    <div 
                      key={task.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => onToggleTask(task.id)}
                          className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300 cursor-pointer"
                        />
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{task.title}</p>
                          <span className="text-xs text-slate-400">{task.category}</span>
                        </div>
                      </div>
                      {task.priority === 'visok' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                          HITNO
                        </span>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
