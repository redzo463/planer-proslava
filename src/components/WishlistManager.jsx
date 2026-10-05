import React, { useState } from 'react';
import { 
  Gift, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  UserCheck, 
  Heart,
  Tag,
  ExternalLink
} from 'lucide-react';
import { getEventTheme } from '../utils/theme';

export default function WishlistManager({ 
  event, 
  wishlist, 
  onAddWishlistItem, 
  onUpdateWishlistItem, 
  onDeleteWishlistItem 
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Poklon',
    price: '',
    reservedBy: '',
    notes: ''
  });

  if (!event) return null;

  const eventTheme = getEventTheme(event.type);
  const eventWishlist = wishlist.filter(w => w.eventId === event.id);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Poklon',
      price: '',
      reservedBy: '',
      notes: ''
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      category: item.category || 'Poklon',
      price: item.price || '',
      reservedBy: item.reservedBy || '',
      notes: item.notes || ''
    });
    setModalOpen(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingItem) {
      onUpdateWishlistItem(editingItem.id, formData);
    } else {
      onAddWishlistItem({
        id: 'w-' + Date.now(),
        eventId: event.id,
        ...formData
      });
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
            <Gift className={`w-6 h-6 ${eventTheme.accentText}`} />
            Lista Želja & Registar Poklona
          </h2>
          <p className="text-sm text-slate-500">
            Vodite spisak željenih darova, fondova ili darova za slavljenike.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all ${eventTheme.accentClass}`}
        >
          <Plus className="w-4 h-4" />
          Dodaj želju / poklon
        </button>
      </div>

      {/* Grid of Wishlist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {eventWishlist.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400">
            <Gift className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-base font-semibold text-slate-700">Lista želja je prazna</p>
            <p className="text-xs text-slate-500 mt-1">Dodajte prvi poklon ili dar koji želi slavljenik.</p>
          </div>
        ) : (
          eventWishlist.map((item) => {
            const isReserved = Boolean(item.reservedBy && item.reservedBy.trim());

            return (
              <div 
                key={item.id}
                className={`bg-white rounded-2xl border p-5 shadow-xs transition-all flex flex-col justify-between ${
                  isReserved ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200/80 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 mb-1">
                      {item.category}
                    </span>

                    {isReserved ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Rezervisano
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/60">
                        Slobodno
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base text-slate-900 mt-1">
                    {item.title}
                  </h3>

                  {item.price && (
                    <div className="text-xs font-bold text-slate-700 mt-1 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-slate-400" />
                      {item.price}
                    </div>
                  )}

                  {isReserved && (
                    <div className="mt-2 text-xs font-semibold text-emerald-800 bg-emerald-100/70 p-2 rounded-xl flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                      Rezervisao/la: {item.reservedBy}
                    </div>
                  )}

                  {item.notes && (
                    <p className="mt-2 text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      "{item.notes}"
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-1 pt-3 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteWishlistItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Wishlist Item Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-xl text-slate-900">
                {editingItem ? 'Uredi stavku registra' : 'Dodaj na listu želja'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Naziv poklona / registra *
                </label>
                <input
                  type="text"
                  required
                  placeholder="npr. Espresso aparat ili Svadbeni fond"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Kategorija
                  </label>
                  <input
                    type="text"
                    placeholder="npr. Kućni aparati, Putovanje, Tehnologija"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Okvirna cena / Iznos
                  </label>
                  <input
                    type="text"
                    placeholder="npr. 300 € ili Doprinos po želji"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Rezervisao/la (Opciono)
                </label>
                <input
                  type="text"
                  placeholder="npr. Kuma Marija ili ostavite prazno ako je slobodno"
                  value={formData.reservedBy}
                  onChange={(e) => setFormData({ ...formData, reservedBy: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Napomene ili link do modela
                </label>
                <textarea
                  rows="2"
                  placeholder="npr. Model u crnoj boji sa linka..."
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
                  {editingItem ? 'Sačuvaj izmene' : 'Dodaj poklon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
