import React, { useState } from 'react';
import { 
  Wallet, 
  Plus, 
  Edit, 
  Trash2, 
  TrendingUp, 
  PieChart, 
  CheckCircle2, 
  AlertCircle,
  CreditCard,
  DollarSign
} from 'lucide-react';

export default function BudgetManager({ 
  event, 
  budget, 
  onAddBudgetItem, 
  onUpdateBudgetItem, 
  onDeleteBudgetItem 
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('sve');

  const [formData, setFormData] = useState({
    category: 'Sala & Hrana',
    title: '',
    plannedCost: 0,
    actualCost: 0,
    paidAmount: 0,
    notes: ''
  });

  if (!event) return null;

  const eventBudget = budget.filter(b => b.eventId === event.id);
  const currency = event.currency || '€';

  // Statistics
  const targetBudget = Number(event.targetBudget) || 0;
  const totalPlannedCost = eventBudget.reduce((sum, item) => sum + (Number(item.plannedCost) || 0), 0);
  const totalActualCost = eventBudget.reduce((sum, item) => sum + (Number(item.actualCost) || 0), 0);
  const totalPaidAmount = eventBudget.reduce((sum, item) => sum + (Number(item.paidAmount) || 0), 0);
  const remainingPaidBalance = totalActualCost - totalPaidAmount;
  const targetDiff = targetBudget - totalActualCost;

  const filteredBudget = selectedCategory === 'sve' 
    ? eventBudget 
    : eventBudget.filter(item => item.category === selectedCategory);

  const categories = [
    'Sala & Hrana',
    'Muzika',
    'Fotograf & Video',
    'Dekoracija',
    'Odeća & Lepota',
    'Torta & Slatkiši',
    'Prevoz & Smeštaj',
    'Ostalo'
  ];

  const formatMoney = (val) => {
    return new Intl.NumberFormat('de-DE').format(val) + ' ' + currency;
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      category: 'Sala & Hrana',
      title: '',
      plannedCost: 0,
      actualCost: 0,
      paidAmount: 0,
      notes: ''
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      category: item.category || 'Sala & Hrana',
      title: item.title || '',
      plannedCost: item.plannedCost || 0,
      actualCost: item.actualCost || 0,
      paidAmount: item.paidAmount || 0,
      notes: item.notes || ''
    });
    setModalOpen(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const payload = {
      ...formData,
      plannedCost: Number(formData.plannedCost) || 0,
      actualCost: Number(formData.actualCost) || 0,
      paidAmount: Number(formData.paidAmount) || 0,
    };

    if (editingItem) {
      onUpdateBudgetItem(editingItem.id, payload);
    } else {
      onAddBudgetItem({
        id: 'b-' + Date.now(),
        eventId: event.id,
        ...payload
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
            <Wallet className="w-6 h-6 text-emerald-500" />
            Praćenje Budžeta
          </h2>
          <p className="text-sm text-slate-500">
            Evidentirajte planirane i stvarne troškove, plaćene kapare i preostali iznos.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-200 transition-all"
        >
          <Plus className="w-4 h-4" />
          Dodaj novi trošak
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Planirani Budžet (Cilj)</span>
          <div className="text-2xl font-bold text-slate-900 font-serif mt-2">
            {formatMoney(targetBudget)}
          </div>
          <p className="text-xs text-slate-500 mt-1">Zadana granica potrošnje</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Ukupni Stvarni Trošak</span>
          <div className={`text-2xl font-bold font-serif mt-2 ${totalActualCost > targetBudget ? 'text-rose-600' : 'text-slate-900'}`}>
            {formatMoney(totalActualCost)}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {targetDiff >= 0 ? (
              <span className="text-emerald-600 font-semibold">U okviru budžeta ({formatMoney(targetDiff)} preostalo)</span>
            ) : (
              <span className="text-rose-600 font-semibold">Prekoračenje za {formatMoney(Math.abs(targetDiff))}</span>
            )}
          </p>
        </div>

        <div className="bg-emerald-50/80 border border-emerald-200/80 p-5 rounded-2xl shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Već Plaćen Iznos (Kapara)</span>
          <div className="text-2xl font-bold text-emerald-950 font-serif mt-2">
            {formatMoney(totalPaidAmount)}
          </div>
          <p className="text-xs text-emerald-700 mt-1">Evidentirane uplate</p>
        </div>

        <div className="bg-amber-50/80 border border-amber-200/80 p-5 rounded-2xl shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Preostalo za Isplatu</span>
          <div className="text-2xl font-bold text-amber-950 font-serif mt-2">
            {formatMoney(remainingPaidBalance)}
          </div>
          <p className="text-xs text-amber-700 mt-1">Dugovanja prema dobavljačima</p>
        </div>

      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('sve')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === 'sve' 
              ? 'bg-slate-900 text-white' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          Sve kategorije ({eventBudget.length})
        </button>
        {categories.map((cat) => {
          const count = eventBudget.filter(i => i.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat} {count > 0 && `(${count})`}
            </button>
          );
        })}
      </div>

      {/* Budget Items Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {filteredBudget.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Wallet className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-base font-semibold text-slate-700">Nema evidentiranih troškova</p>
            <p className="text-xs text-slate-500 mt-1">Kliknite na "Dodaj novi trošak" iznad da unesete stavku u budžet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Naziv stavke & Kategorija</th>
                  <th className="py-3.5 px-4 text-right">Planirano</th>
                  <th className="py-3.5 px-4 text-right">Stvarni Trošak</th>
                  <th className="py-3.5 px-4 text-right">Plaćeno (Kapara)</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Akcije</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredBudget.map((item) => {
                  const actual = Number(item.actualCost) || 0;
                  const paid = Number(item.paidAmount) || 0;
                  const isFullyPaid = paid >= actual && actual > 0;
                  const isPartiallyPaid = paid > 0 && paid < actual;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{item.title}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{item.category} {item.notes && `• ${item.notes}`}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-500 font-medium">
                        {formatMoney(item.plannedCost)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                        {formatMoney(item.actualCost)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-semibold text-emerald-700">
                        {formatMoney(item.paidAmount)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {isFullyPaid ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                            Plaćeno u celosti
                          </span>
                        ) : isPartiallyPaid ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                            Plaćena kapara
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
                            Nije plaćeno
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Uredi"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteBudgetItem(item.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Izbriši"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Budget Item Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-xl text-slate-900">
                {editingItem ? 'Uredi stavku budžeta' : 'Dodaj novi trošak'}
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
                  Kategorija
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Naziv troška / usluge *
                </label>
                <input
                  type="text"
                  required
                  placeholder="npr. Restoran Grand ili Bend za svadbu"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Planirano ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={formData.plannedCost}
                    onChange={(e) => setFormData({ ...formData, plannedCost: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Stvarno ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={formData.actualCost}
                    onChange={(e) => setFormData({ ...formData, actualCost: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Plaćeno ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={formData.paidAmount}
                    onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Napomena
                </label>
                <textarea
                  rows="2"
                  placeholder="npr. Rok za uplatu ostatka je 3 dana pre proslave..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-md shadow-emerald-200 transition-all"
                >
                  {editingItem ? 'Sačuvaj izmene' : 'Dodaj trošak'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
