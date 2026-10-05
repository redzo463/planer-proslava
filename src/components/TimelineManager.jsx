import React, { useState } from 'react';
import { 
  Clock, 
  Plus, 
  Edit, 
  Trash2, 
  MapPin, 
  User, 
  Printer, 
  CheckCircle2, 
  Sparkles,
  Calendar
} from 'lucide-react';
import { getEventTheme } from '../utils/theme';

export default function TimelineManager({ 
  event, 
  timeline, 
  onAddTimelineItem, 
  onUpdateTimelineItem, 
  onDeleteTimelineItem, 
  onToggleTimelineItem 
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    time: '12:00',
    title: '',
    location: '',
    responsible: '',
    notes: '',
    completed: false
  });

  if (!event) return null;

  const eventTheme = getEventTheme(event.type);
  const eventTimeline = timeline.filter(t => t.eventId === event.id);

  // Sort timeline items by time
  const sortedTimeline = [...eventTimeline].sort((a, b) => a.time.localeCompare(b.time));

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      time: '12:00',
      title: '',
      location: event.location || '',
      responsible: '',
      notes: '',
      completed: false
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      time: item.time || '12:00',
      title: item.title || '',
      location: item.location || '',
      responsible: item.responsible || '',
      notes: item.notes || '',
      completed: item.completed || false
    });
    setModalOpen(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingItem) {
      onUpdateTimelineItem(editingItem.id, formData);
    } else {
      onAddTimelineItem({
        id: 'tl-' + Date.now(),
        eventId: event.id,
        ...formData
      });
    }
    setModalOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
            <Clock className={`w-6 h-6 ${eventTheme.accentText}`} />
            Satnica & Dnevni Protokol
          </h2>
          <p className="text-sm text-slate-500">
            Planirajte tok događaja iz sata u sat i podelite raspored sa protokolom.
          </p>
        </div>

        <div className="flex items-center gap-2 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm border border-slate-200/80 transition-all"
            title="Štampaj ili sačuvaj kao PDF raspored"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            Štampaj Satnicu
          </button>

          <button
            onClick={handleOpenAddModal}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all ${eventTheme.accentClass}`}
          >
            <Plus className="w-4 h-4" />
            Dodaj stavku u satnicu
          </button>
        </div>
      </div>

      {/* Timeline Visual Cards */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs relative">
        {sortedTimeline.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Clock className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-base font-semibold text-slate-700">Satnica je prazna</p>
            <p className="text-xs text-slate-500 mt-1">Kliknite na "Dodaj stavku u satnicu" da započnete kreiranje satnice.</p>
          </div>
        ) : (
          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {sortedTimeline.map((item) => (
              <div key={item.id} className="relative group">
                
                {/* Timeline Dot Badge */}
                <div 
                  onClick={() => onToggleTimelineItem(item.id)}
                  className={`absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full border-2 bg-white flex items-center justify-center cursor-pointer transition-all ${
                    item.completed ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-slate-300 text-slate-400 hover:border-slate-400'
                  }`}
                >
                  {item.completed ? <CheckCircle2 className="w-4 h-4" /> : <span className="w-2 h-2 rounded-full bg-slate-400"></span>}
                </div>

                {/* Timeline Card */}
                <div className={`p-4 rounded-xl border transition-all ${
                  item.completed ? 'bg-slate-50/70 border-slate-200 text-slate-400' : 'bg-slate-50/40 border-slate-200/80 hover:bg-white hover:shadow-xs'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        item.completed ? 'bg-slate-200 text-slate-600' : `${eventTheme.accentBgLight} ${eventTheme.accentText}`
                      }`}>
                        <Clock className="w-3 h-3 inline mr-1" />
                        {item.time} h
                      </span>
                      <h3 className={`font-bold text-base ${item.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {item.title}
                      </h3>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 print:hidden self-end sm:self-center">
                      <button
                        onClick={() => handleOpenEditModal(item)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteTimelineItem(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                  {/* Sub-info */}
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500">
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {item.location}
                      </span>
                    )}
                    {item.responsible && (
                      <span className="flex items-center gap-1 text-slate-700 font-medium">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        Odgovorni: {item.responsible}
                      </span>
                    )}
                  </div>

                  {item.notes && (
                    <p className="mt-2 text-xs text-slate-500 italic bg-white/80 p-2 rounded-lg border border-slate-100">
                      "{item.notes}"
                    </p>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-xl text-slate-900">
                {editingItem ? 'Uredi stavku satnice' : 'Dodaj stavku u satnicu'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Vreme (Čas) *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Naziv aktivnosti / dela protokola *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="npr. Ulazak u salu & Prvi ples"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mesto / Lokacija
                  </label>
                  <input
                    type="text"
                    placeholder="npr. Restoran Grand"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Odgovorna osoba / Služba
                  </label>
                  <input
                    type="text"
                    placeholder="npr. Kum i Bend"
                    value={formData.responsible}
                    onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Napomena za protokol
                </label>
                <textarea
                  rows="2"
                  placeholder="npr. Dim mašina i rasveta u boji zlata..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors"
                >
                  Odustani
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 rounded-xl font-semibold text-sm shadow-md transition-all ${eventTheme.accentClass}`}
                >
                  {editingItem ? 'Sačuvaj izmene' : 'Dodaj u satnicu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
