import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import GuestsManager from './components/GuestsManager';
import BudgetManager from './components/BudgetManager';
import TaskManager from './components/TaskManager';
import VendorsManager from './components/VendorsManager';
import TimelineManager from './components/TimelineManager';
import WishlistManager from './components/WishlistManager';
import MusicPlaylistManager from './components/MusicPlaylistManager';
import SeatingManager from './components/SeatingManager';
import EventModal from './components/EventModal';
import { loadStoredData, saveStoredData, exportDataAsJSON } from './utils/storage';

export default function App() {
  const [db, setDb] = useState(() => loadStoredData());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  // Sync state to LocalStorage
  useEffect(() => {
    saveStoredData(db);
  }, [db]);

  const activeEvent = db.events.find(e => e.id === db.activeEventId) || db.events[0];

  const setActiveEventId = (id) => {
    setDb(prev => ({ ...prev, activeEventId: id }));
  };

  // Event handlers
  const handleSaveEvent = (eventData) => {
    if (eventToEdit) {
      setDb(prev => ({
        ...prev,
        events: prev.events.map(e => e.id === eventToEdit.id ? { ...e, ...eventData } : e)
      }));
    } else {
      const newId = 'evt-' + Date.now();
      const newEvent = { id: newId, ...eventData };
      setDb(prev => ({
        ...prev,
        activeEventId: newId,
        events: [...prev.events, newEvent]
      }));
    }
  };

  // Guest Handlers
  const handleAddGuest = (guest) => {
    setDb(prev => ({ ...prev, guests: [...prev.guests, guest] }));
  };
  const handleUpdateGuest = (id, updatedFields) => {
    setDb(prev => ({
      ...prev,
      guests: prev.guests.map(g => g.id === id ? { ...g, ...updatedFields } : g)
    }));
  };
  const handleDeleteGuest = (id) => {
    setDb(prev => ({ ...prev, guests: prev.guests.filter(g => g.id !== id) }));
  };

  // Budget Handlers
  const handleAddBudgetItem = (item) => {
    setDb(prev => ({ ...prev, budget: [...prev.budget, item] }));
  };
  const handleUpdateBudgetItem = (id, updatedFields) => {
    setDb(prev => ({
      ...prev,
      budget: prev.budget.map(b => b.id === id ? { ...b, ...updatedFields } : b)
    }));
  };
  const handleDeleteBudgetItem = (id) => {
    setDb(prev => ({ ...prev, budget: prev.budget.filter(b => b.id !== id) }));
  };

  // Task Handlers
  const handleAddTask = (task) => {
    setDb(prev => ({ ...prev, tasks: [...prev.tasks, task] }));
  };
  const handleBulkAddTasks = (newTasks) => {
    setDb(prev => ({ ...prev, tasks: [...prev.tasks, ...newTasks] }));
  };
  const handleUpdateTask = (id, updatedFields) => {
    setDb(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, ...updatedFields } : t)
    }));
  };
  const handleToggleTask = (id) => {
    setDb(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    }));
  };
  const handleDeleteTask = (id) => {
    setDb(prev => ({ ...prev, tasks: prev.tasks.filter(t => t.id !== id) }));
  };

  // Vendor Handlers
  const handleAddVendor = (vendor) => {
    setDb(prev => ({ ...prev, vendors: [...prev.vendors, vendor] }));
  };
  const handleUpdateVendor = (id, updatedFields) => {
    setDb(prev => ({
      ...prev,
      vendors: prev.vendors.map(v => v.id === id ? { ...v, ...updatedFields } : v)
    }));
  };
  const handleDeleteVendor = (id) => {
    setDb(prev => ({ ...prev, vendors: prev.vendors.filter(v => v.id !== id) }));
  };

  // Timeline Handlers
  const handleAddTimelineItem = (item) => {
    setDb(prev => ({ ...prev, timeline: [...(prev.timeline || []), item] }));
  };
  const handleUpdateTimelineItem = (id, updatedFields) => {
    setDb(prev => ({
      ...prev,
      timeline: (prev.timeline || []).map(t => t.id === id ? { ...t, ...updatedFields } : t)
    }));
  };
  const handleToggleTimelineItem = (id) => {
    setDb(prev => ({
      ...prev,
      timeline: (prev.timeline || []).map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    }));
  };
  const handleDeleteTimelineItem = (id) => {
    setDb(prev => ({ ...prev, timeline: (prev.timeline || []).filter(t => t.id !== id) }));
  };

  // Wishlist Handlers
  const handleAddWishlistItem = (item) => {
    setDb(prev => ({ ...prev, wishlist: [...(prev.wishlist || []), item] }));
  };
  const handleUpdateWishlistItem = (id, updatedFields) => {
    setDb(prev => ({
      ...prev,
      wishlist: (prev.wishlist || []).map(w => w.id === id ? { ...w, ...updatedFields } : w)
    }));
  };
  const handleDeleteWishlistItem = (id) => {
    setDb(prev => ({ ...prev, wishlist: (prev.wishlist || []).filter(w => w.id !== id) }));
  };

  // Playlist Handlers
  const handleAddPlaylistItem = (item) => {
    setDb(prev => ({ ...prev, playlist: [...(prev.playlist || []), item] }));
  };
  const handleUpdatePlaylistItem = (id, updatedFields) => {
    setDb(prev => ({
      ...prev,
      playlist: (prev.playlist || []).map(p => p.id === id ? { ...p, ...updatedFields } : p)
    }));
  };
  const handleDeletePlaylistItem = (id) => {
    setDb(prev => ({ ...prev, playlist: (prev.playlist || []).filter(p => p.id !== id) }));
  };

  // Table Handlers
  const handleAddTable = (tableItem) => {
    setDb(prev => ({ ...prev, tables: [...(prev.tables || []), tableItem] }));
  };
  const handleUpdateTable = (id, updatedFields) => {
    setDb(prev => ({
      ...prev,
      tables: (prev.tables || []).map(t => t.id === id ? { ...t, ...updatedFields } : t)
    }));
  };
  const handleDeleteTable = (id) => {
    setDb(prev => ({ ...prev, tables: (prev.tables || []).filter(t => t.id !== id) }));
  };

  // Export / Import
  const handleExportData = () => {
    exportDataAsJSON(db);
  };
  const handleImportData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed && Array.isArray(parsed.events)) {
          setDb(parsed);
          alert('Podaci su uspešno uvezeni!');
        } else {
          alert('Neispravan format JSON fajla.');
        }
      } catch (err) {
        alert('Greška pri čitanju fajla.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-rose-500 selection:text-white pb-12">
      
      {/* Navigation & Event Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        events={db.events}
        activeEvent={activeEvent}
        setActiveEventId={setActiveEventId}
        onOpenNewEventModal={() => {
          setEventToEdit(null);
          setEventModalOpen(true);
        }}
        onExportData={handleExportData}
        onImportData={handleImportData}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        {activeTab === 'dashboard' && (
          <Dashboard
            event={activeEvent}
            guests={db.guests}
            budget={db.budget}
            tasks={db.tasks}
            vendors={db.vendors}
            timeline={db.timeline || []}
            playlist={db.playlist || []}
            wishlist={db.wishlist || []}
            tables={db.tables || []}
            setActiveTab={setActiveTab}
            onOpenEditEventModal={() => {
              setEventToEdit(activeEvent);
              setEventModalOpen(true);
            }}
            onOpenAddGuestModal={() => setActiveTab('guests')}
            onOpenAddBudgetModal={() => setActiveTab('budget')}
            onOpenAddTaskModal={() => setActiveTab('tasks')}
            onToggleTask={handleToggleTask}
          />
        )}

        {activeTab === 'guests' && (
          <GuestsManager
            event={activeEvent}
            guests={db.guests}
            onAddGuest={handleAddGuest}
            onUpdateGuest={handleUpdateGuest}
            onDeleteGuest={handleDeleteGuest}
          />
        )}

        {activeTab === 'budget' && (
          <BudgetManager
            event={activeEvent}
            budget={db.budget}
            onAddBudgetItem={handleAddBudgetItem}
            onUpdateBudgetItem={handleUpdateBudgetItem}
            onDeleteBudgetItem={handleDeleteBudgetItem}
          />
        )}

        {activeTab === 'tasks' && (
          <TaskManager
            event={activeEvent}
            tasks={db.tasks}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onToggleTask={handleToggleTask}
            onBulkAddTasks={handleBulkAddTasks}
          />
        )}

        {activeTab === 'vendors' && (
          <VendorsManager
            event={activeEvent}
            vendors={db.vendors}
            onAddVendor={handleAddVendor}
            onUpdateVendor={handleUpdateVendor}
            onDeleteVendor={handleDeleteVendor}
          />
        )}

        {activeTab === 'timeline' && (
          <TimelineManager
            event={activeEvent}
            timeline={db.timeline || []}
            onAddTimelineItem={handleAddTimelineItem}
            onUpdateTimelineItem={handleUpdateTimelineItem}
            onDeleteTimelineItem={handleDeleteTimelineItem}
            onToggleTimelineItem={handleToggleTimelineItem}
          />
        )}

        {activeTab === 'wishlist' && (
          <WishlistManager
            event={activeEvent}
            wishlist={db.wishlist || []}
            onAddWishlistItem={handleAddWishlistItem}
            onUpdateWishlistItem={handleUpdateWishlistItem}
            onDeleteWishlistItem={handleDeleteWishlistItem}
          />
        )}

        {activeTab === 'playlist' && (
          <MusicPlaylistManager
            event={activeEvent}
            playlist={db.playlist || []}
            onAddPlaylistItem={handleAddPlaylistItem}
            onUpdatePlaylistItem={handleUpdatePlaylistItem}
            onDeletePlaylistItem={handleDeletePlaylistItem}
          />
        )}

        {activeTab === 'seating' && (
          <SeatingManager
            event={activeEvent}
            guests={db.guests}
            tables={db.tables || []}
            onAddTable={handleAddTable}
            onUpdateTable={handleUpdateTable}
            onDeleteTable={handleDeleteTable}
          />
        )}

      </main>

      {/* Event Create / Edit Modal */}
      <EventModal
        isOpen={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
        onSave={handleSaveEvent}
        eventToEdit={eventToEdit}
      />

    </div>
  );
}
