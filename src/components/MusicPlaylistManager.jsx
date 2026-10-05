import React, { useState } from 'react';
import { 
  Music, 
  Plus, 
  Edit, 
  Trash2, 
  Disc, 
  Volume2, 
  Ban, 
  Heart,
  Star
} from 'lucide-react';
import { getEventTheme } from '../utils/theme';

export default function MusicPlaylistManager({ 
  event, 
  playlist, 
  onAddPlaylistItem, 
  onUpdatePlaylistItem, 
  onDeletePlaylistItem 
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('sve');

  const [formData, setFormData] = useState({
    songTitle: '',
    artist: '',
    category: 'Omiljene pesme',
    priority: 'visok',
    notes: ''
  });

  if (!event) return null;

  const eventTheme = getEventTheme(event.type);
  const eventPlaylist = playlist.filter(p => p.eventId === event.id);

  const categories = [
    'Prvi ples',
    'Posebni trenuci',
    'Omiljene pesme',
    'Muzika u pozadini',
    'Zabranjeno svirati'
  ];

  const filteredPlaylist = selectedCategory === 'sve' 
    ? eventPlaylist 
    : eventPlaylist.filter(p => p.category === selectedCategory);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      songTitle: '',
      artist: '',
      category: 'Omiljene pesme',
      priority: 'visok',
      notes: ''
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      songTitle: item.songTitle || '',
      artist: item.artist || '',
      category: item.category || 'Omiljene pesme',
      priority: item.priority || 'visok',
      notes: item.notes || ''
    });
    setModalOpen(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.songTitle.trim()) return;

    if (editingItem) {
      onUpdatePlaylistItem(editingItem.id, formData);
    } else {
      onAddPlaylistItem({
        id: 'p-' + Date.now(),
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
            <Music className={`w-6 h-6 ${eventTheme.accentText}`} />
            Muzička Plejlista & Želje
          </h2>
          <p className="text-sm text-slate-500">
            Pripremite spisak pesama za prvi ples, omiljene hitove i pesme koje ne želite.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all ${eventTheme.accentClass}`}
        >
          <Plus className="w-4 h-4" />
          Dodaj pesmu na listu
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('sve')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === 'sve' 
              ? 'bg-slate-900 text-white' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          Sve pesme ({eventPlaylist.length})
        </button>
        {categories.map((cat) => {
          const count = eventPlaylist.filter(p => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-purple-600 text-white shadow-xs' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat} {count > 0 && `(${count})`}
            </button>
          );
        })}
      </div>

      {/* Playlist Grid */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {filteredPlaylist.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Music className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-base font-semibold text-slate-700">Plejlista je prazna</p>
            <p className="text-xs text-slate-500 mt-1">Dodajte prvu pesmu za bend ili DJ-a.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredPlaylist.map((item) => {
              const isBanned = item.category === 'Zabranjeno svirati';
              const isSpecial = item.category === 'Prvi ples' || item.category === 'Posebni trenuci';

              return (
                <div 
                  key={item.id}
                  className={`p-4 flex items-center justify-between gap-4 transition-colors ${
                    isBanned ? 'bg-rose-50/40 hover:bg-rose-50/70' :
                    isSpecial ? 'bg-amber-50/30 hover:bg-amber-50/60' :
                    'hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`p-2.5 rounded-xl flex items-center justify-center ${
                      isBanned ? 'bg-rose-100 text-rose-700' :
                      isSpecial ? 'bg-amber-100 text-amber-700' :
                      'bg-purple-50 text-purple-700'
                    }`}>
                      {isBanned ? <Ban className="w-5 h-5" /> : isSpecial ? <Heart className="w-5 h-5" /> : <Music className="w-5 h-5" />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-base truncate">
                          {item.songTitle}
                        </h3>
                        {item.artist && (
                          <span className="text-xs text-slate-500 font-medium">
                            — {item.artist}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          isBanned ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {item.category}
                        </span>
                        {item.notes && <span className="truncate italic">"{item.notes}"</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeletePlaylistItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add / Edit Playlist Item Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-xl text-slate-900">
                {editingItem ? 'Uredi pesmu' : 'Dodaj pesmu na listu'}
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
                  Naziv pesme *
                </label>
                <input
                  type="text"
                  required
                  placeholder="npr. Lutka ili Blinding Lights"
                  value={formData.songTitle}
                  onChange={(e) => setFormData({ ...formData, songTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Izvođač / Autor
                  </label>
                  <input
                    type="text"
                    placeholder="npr. S.A.R.S."
                    value={formData.artist}
                    onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Kategorija
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Napomena za bend / DJ-a
                </label>
                <textarea
                  rows="2"
                  placeholder="npr. Svirati prilikom prvog plesa..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
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
                  {editingItem ? 'Sačuvaj izmene' : 'Dodaj pesmu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
