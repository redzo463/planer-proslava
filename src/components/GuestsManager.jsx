import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Edit, 
  Trash2, 
  Plus, 
  Utensils, 
  Phone,
  Tag
} from 'lucide-react';

export default function GuestsManager({ 
  event, 
  guests, 
  onAddGuest, 
  onUpdateGuest, 
  onDeleteGuest 
}) {
  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('sve');
  const [selectedStatus, setSelectedStatus] = useState('svi');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    group: 'Porodica',
    status: 'potvrdjeno',
    plusOne: 0,
    phone: '',
    table: '',
    notes: ''
  });

  if (!event) return null;

  const eventGuests = guests.filter(g => g.eventId === event.id);

  // Statistics
  const confirmedList = eventGuests.filter(g => g.status === 'potvrdjeno');
  const pendingList = eventGuests.filter(g => g.status === 'na_cekanju');
  const declinedList = eventGuests.filter(g => g.status === 'odbijeno');

  const totalConfirmedChairs = confirmedList.reduce((sum, g) => sum + 1 + (Number(g.plusOne) || 0), 0);
  const totalInvitedChairs = eventGuests.reduce((sum, g) => sum + 1 + (Number(g.plusOne) || 0), 0);

  // Filtering
  const filteredGuests = eventGuests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(search.toLowerCase()) ||
                          (guest.phone && guest.phone.includes(search)) ||
                          (guest.table && guest.table.toLowerCase().includes(search.toLowerCase()));
    const matchesGroup = selectedGroup === 'sve' || guest.group === selectedGroup;
    const matchesStatus = selectedStatus === 'svi' || guest.status === selectedStatus;
    return matchesSearch && matchesGroup && matchesStatus;
  });

  const handleOpenAddModal = () => {
    setEditingGuest(null);
    setFormData({
      name: '',
      group: 'Porodica',
      status: 'potvrdjeno',
      plusOne: 0,
      phone: '',
      table: '',
      notes: ''
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (guest) => {
    setEditingGuest(guest);
    setFormData({
      name: guest.name || '',
      group: guest.group || 'Porodica',
      status: guest.status || 'potvrdjeno',
      plusOne: guest.plusOne || 0,
      phone: guest.phone || '',
      table: guest.table || '',
      notes: guest.notes || ''
    });
    setModalOpen(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingGuest) {
      onUpdateGuest(editingGuest.id, {
        ...formData,
        plusOne: Number(formData.plusOne) || 0
      });
    } else {
      onAddGuest({
        id: 'g-' + Date.now(),
        eventId: event.id,
        ...formData,
        plusOne: Number(formData.plusOne) || 0
      });
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header & Quick Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-rose-500" />
            Lista Gostiju
          </h2>
          <p className="text-sm text-slate-500">
            Upravljajte pozivnicama, potvrdama dolaska i rasporedom sedenja.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm shadow-md shadow-rose-200 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          Dodaj novog gosta
        </button>
      </div>

      {/* Guest Stats Counter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-emerald-50/80 border border-emerald-200/80 p-3.5 rounded-xl">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Potvrđeno
          </div>
          <div className="text-xl sm:text-2xl font-bold text-emerald-900 mt-1">
            {confirmedList.length} <span className="text-xs font-normal text-emerald-700">({totalConfirmedChairs} stolica)</span>
          </div>
        </div>

        <div className="bg-amber-50/80 border border-amber-200/80 p-3.5 rounded-xl">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800">
            <Clock className="w-4 h-4 text-amber-600" />
            Na čekanju
          </div>
          <div className="text-xl sm:text-2xl font-bold text-amber-900 mt-1">
            {pendingList.length} <span className="text-xs font-normal text-amber-700">gostiju</span>
          </div>
        </div>

        <div className="bg-rose-50/80 border border-rose-200/80 p-3.5 rounded-xl">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-800">
            <XCircle className="w-4 h-4 text-rose-600" />
            Odbijeno
          </div>
          <div className="text-xl sm:text-2xl font-bold text-rose-900 mt-1">
            {declinedList.length} <span className="text-xs font-normal text-rose-700">gostiju</span>
          </div>
        </div>

        <div className="bg-slate-100 border border-slate-200 p-3.5 rounded-xl">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <Users className="w-4 h-4 text-slate-500" />
            Ukupno planirano
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {totalInvitedChairs} <span className="text-xs font-normal text-slate-500">osoba (+1)</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Pretraži gosta po imenu, telefonu ili stolu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
          />
        </div>

        {/* Group Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="sve">Sve grupe</option>
            <option value="Porodica">Porodica</option>
            <option value="Prijatelji">Prijatelji</option>
            <option value="Kumovi">Kumovi</option>
            <option value="Posao">Posao</option>
            <option value="Ostalo">Ostalo</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="svi">Svi statusi</option>
            <option value="potvrdjeno">Potvrđeno</option>
            <option value="na_cekanju">Na čekanju</option>
            <option value="odbijeno">Odbijeno</option>
          </select>
        </div>
      </div>

      {/* Guest Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {filteredGuests.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Users className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-base font-semibold text-slate-700">Nema pronađenih gostiju</p>
            <p className="text-xs text-slate-500 mt-1">Pokušajte sa drugim parametrima pretrage ili dodajte novog gosta.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Ime i Prezime</th>
                  <th className="py-3.5 px-4">Grupa</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">+1 Pratnja</th>
                  <th className="py-3.5 px-4">Stol / Sedenje</th>
                  <th className="py-3.5 px-4">Kontakt & Napomena</th>
                  <th className="py-3.5 px-4 text-right">Akcije</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredGuests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {guest.name}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60">
                        <Tag className="w-3 h-3 text-slate-400" />
                        {guest.group}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {guest.status === 'potvrdjeno' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Potvrđeno
                        </span>
                      )}
                      {guest.status === 'na_cekanju' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          Na čekanju
                        </span>
                      )}
                      {guest.status === 'odbijeno' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          Odbijeno
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {guest.plusOne > 0 ? (
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-xs">
                          +{guest.plusOne} osoba
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">Samostalno</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 text-xs">
                      {guest.table ? (
                        <span className="font-medium text-slate-800">{guest.table}</span>
                      ) : (
                        <span className="text-slate-400 italic">Nije dodijeljeno</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500 max-w-xs truncate">
                      {guest.phone && (
                        <div className="flex items-center gap-1 text-slate-700 mb-0.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          {guest.phone}
                        </div>
                      )}
                      {guest.notes && (
                        <div className="flex items-center gap-1 text-slate-500 italic">
                          <Utensils className="w-3 h-3 text-rose-400" />
                          {guest.notes}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEditModal(guest)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Uredi"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteGuest(guest.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Izbriši"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Guest Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-xl text-slate-900">
                {editingGuest ? 'Uredi podate gosta' : 'Dodaj novog gosta'}
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
                  Ime i prezime *
                </label>
                <input
                  type="text"
                  required
                  placeholder="npr. Ana Horvat"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Grupa
                  </label>
                  <select
                    value={formData.group}
                    onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white"
                  >
                    <option value="Porodica">Porodica</option>
                    <option value="Prijatelji">Prijatelji</option>
                    <option value="Kumovi">Kumovi</option>
                    <option value="Posao">Posao</option>
                    <option value="Ostalo">Ostalo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Status dolaska
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white"
                  >
                    <option value="potvrdjeno">Potvrđeno</option>
                    <option value="na_cekanju">Na čekanju</option>
                    <option value="odbijeno">Odbijeno</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Broj pratećih osobi (+1)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.plusOne}
                    onChange={(e) => setFormData({ ...formData, plusOne: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Stol / Oznaka mesta
                  </label>
                  <input
                    type="text"
                    placeholder="npr. Stol 3"
                    value={formData.table}
                    onChange={(e) => setFormData({ ...formData, table: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Broj telefona
                </label>
                <input
                  type="text"
                  placeholder="+387 61 ..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Napomene (npr. Hrana/Alergije)
                </label>
                <textarea
                  rows="2"
                  placeholder="npr. Vegetarijanski meni, gluten-free ili dečija stolica..."
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
                  className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold shadow-md shadow-rose-200 transition-all"
                >
                  {editingGuest ? 'Sačuvaj izmene' : 'Dodaj gosta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
