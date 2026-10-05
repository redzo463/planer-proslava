import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Layout, 
  CheckCircle2, 
  AlertCircle,
  UserCheck,
  UserX
} from 'lucide-react';
import { getEventTheme } from '../utils/theme';

export default function SeatingManager({ 
  event, 
  guests, 
  tables, 
  onAddTable, 
  onUpdateTable, 
  onDeleteTable 
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTable, setEditingTable] = useState(null);

  const [formData, setFormData] = useState({
    tableName: '',
    capacity: 10,
    notes: ''
  });

  if (!event) return null;

  const eventTheme = getEventTheme(event.type);
  const eventGuests = guests.filter(g => g.eventId === event.id);
  const eventTables = tables.filter(t => t.eventId === event.id);

  // Unassigned confirmed/pending guests
  const unassignedGuests = eventGuests.filter(g => !g.table || !g.table.trim());

  const handleOpenAddModal = () => {
    setEditingTable(null);
    setFormData({
      tableName: '',
      capacity: 10,
      notes: ''
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (table) => {
    setEditingTable(table);
    setFormData({
      tableName: table.tableName || '',
      capacity: table.capacity || 10,
      notes: table.notes || ''
    });
    setModalOpen(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.tableName.trim()) return;

    if (editingTable) {
      onUpdateTable(editingTable.id, {
        ...formData,
        capacity: Number(formData.capacity) || 10
      });
    } else {
      onAddTable({
        id: 'tab-' + Date.now(),
        eventId: event.id,
        ...formData,
        capacity: Number(formData.capacity) || 10
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
            <Layout className={`w-6 h-6 ${eventTheme.accentText}`} />
            Raspored Stolova & Sedenje
          </h2>
          <p className="text-sm text-slate-500">
            Definišite stolove u sali i organizujte sedenje gostiju.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all ${eventTheme.accentClass}`}
        >
          <Plus className="w-4 h-4" />
          Dodaj novi stol
        </button>
      </div>

      {/* Unassigned Guests Warning Card */}
      {unassignedGuests.length > 0 && (
        <div className="bg-amber-50 border border-amber-200/80 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-900 text-sm">
          <div className="flex items-center gap-2.5">
            <UserX className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <strong className="font-bold">{unassignedGuests.length} gostiju nema dodeljen stol!</strong>
              <p className="text-xs text-amber-700">Idite na tab "Gosti" da unesete tačan naziv stola u profilu gosta.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 max-w-md">
            {unassignedGuests.slice(0, 4).map(g => (
              <span key={g.id} className="px-2 py-0.5 rounded bg-white text-slate-800 text-xs font-medium border border-amber-200">
                {g.name}
              </span>
            ))}
            {unassignedGuests.length > 4 && (
              <span className="text-xs text-amber-800 font-semibold align-self-center">
                +{unassignedGuests.length - 4} više
              </span>
            )}
          </div>
        </div>
      )}

      {/* Grid of Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {eventTables.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400">
            <Layout className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-base font-semibold text-slate-700">Nema kreiranih stolova</p>
            <p className="text-xs text-slate-500 mt-1">Kliknite na "Dodaj novi stol" iznad da započnete raspored.</p>
          </div>
        ) : (
          eventTables.map((table) => {
            // Find guests assigned to this table
            const tableGuests = eventGuests.filter(g => g.table && g.table.toLowerCase().trim() === table.tableName.toLowerCase().trim());
            const totalAssignedSeats = tableGuests.reduce((sum, g) => sum + 1 + (Number(g.plusOne) || 0), 0);
            const isFull = totalAssignedSeats >= table.capacity;

            return (
              <div 
                key={table.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-lg text-slate-900 font-serif">
                      {table.tableName}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      isFull ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {totalAssignedSeats} / {table.capacity} stolica
                    </span>
                  </div>

                  {table.notes && (
                    <p className="text-xs text-slate-400 mt-0.5">{table.notes}</p>
                  )}

                  {/* Guests assigned tag list */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Gosti za ovim stolom ({tableGuests.length}):
                    </div>
                    {tableGuests.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">Nijedan gost još nije dodeljen.</p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {tableGuests.map(g => (
                          <span 
                            key={g.id} 
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/60 text-xs font-medium text-slate-800"
                          >
                            <UserCheck className="w-3 h-3 text-emerald-600" />
                            {g.name} {g.plusOne > 0 && `(+${g.plusOne})`}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-1 pt-3 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenEditModal(table)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteTable(table.id)}
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

      {/* Add / Edit Table Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-xl text-slate-900">
                {editingTable ? 'Uredi stol' : 'Dodaj novi stol'}
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
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Naziv / Oznaka stola *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="npr. Mladenački stol ili Stol 1"
                    value={formData.tableName}
                    onChange={(e) => setFormData({ ...formData, tableName: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Kapacitet stolica
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Opis / Lokacija u sali
                </label>
                <textarea
                  rows="2"
                  placeholder="npr. Pored bine, stol za rodbinu..."
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
                  {editingTable ? 'Sačuvaj izmene' : 'Dodaj stol'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
