import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Wallet, Sparkles, X } from 'lucide-react';

export default function EventModal({ 
  isOpen, 
  onClose, 
  onSave, 
  eventToEdit = null 
}) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'svadba',
    date: '',
    location: '',
    targetBudget: 10000,
    currency: '€',
    notes: ''
  });

  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        title: eventToEdit.title || '',
        type: eventToEdit.type || 'svadba',
        date: eventToEdit.date || '',
        location: eventToEdit.location || '',
        targetBudget: eventToEdit.targetBudget || 10000,
        currency: eventToEdit.currency || '€',
        notes: eventToEdit.notes || ''
      });
    } else {
      setFormData({
        title: '',
        type: 'svadba',
        date: '',
        location: '',
        targetBudget: 10000,
        currency: '€',
        notes: ''
      });
    }
  }, [eventToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSave({
      ...formData,
      targetBudget: Number(formData.targetBudget) || 0
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 space-y-5">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-xl text-slate-900">
              {eventToEdit ? 'Uredi proslavu' : 'Kreiraj novu proslavu'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 rounded-lg p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Naziv događaja / proslave *
            </label>
            <input
              type="text"
              required
              placeholder="npr. Svadba Ana & Marko ili 30. Rođendan Stefan"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Vrsta proslave
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white"
              >
                <option value="svadba">💍 Svadba / Venčanje</option>
                <option value="rodjendan">🎂 Rođendan</option>
                <option value="jubilej">🥂 Jubilej / Godišnjica</option>
                <option value="ostalo">🎉 Ostala proslava</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Datum proslave
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Lokacija / Mesto održavanja
            </label>
            <input
              type="text"
              placeholder="npr. Restoran Grand, Sarajevo"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Ciljani Budžet
              </label>
              <input
                type="number"
                min="0"
                step="50"
                value={formData.targetBudget}
                onChange={(e) => setFormData({ ...formData, targetBudget: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Valuta
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white"
              >
                <option value="€">EUR (€)</option>
                <option value="KM">BAM (KM)</option>
                <option value="RSD">RSD (din)</option>
                <option value="$">USD ($)</option>
                <option value="£">GBP (£)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Kratak opis / Napomene
            </label>
            <textarea
              rows="2"
              placeholder="npr. Očekuje se oko 100 gostiju..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors"
            >
              Odustani
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold shadow-md shadow-rose-200 transition-all"
            >
              {eventToEdit ? 'Sačuvaj izmene' : 'Kreiraj proslavu'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
