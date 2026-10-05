import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  User, 
  DollarSign, 
  Tag,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function VendorsManager({ 
  event, 
  vendors, 
  onAddVendor, 
  onUpdateVendor, 
  onDeleteVendor 
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('sve');

  const [formData, setFormData] = useState({
    category: 'Restoran/Sala',
    name: '',
    contactName: '',
    phone: '',
    email: '',
    status: 'Kontaktiran',
    priceEstimate: '',
    notes: ''
  });

  if (!event) return null;

  const eventVendors = vendors.filter(v => v.eventId === event.id);

  const categories = [
    'Restoran/Sala',
    'Muzika',
    'Fotograf',
    'Dekorater',
    'Poslastičarnica',
    'Frizura & Šminka',
    'Prevoz',
    'Ostalo'
  ];

  const filteredVendors = selectedCategory === 'sve' 
    ? eventVendors 
    : eventVendors.filter(v => v.category === selectedCategory);

  const handleOpenAddModal = () => {
    setEditingVendor(null);
    setFormData({
      category: 'Restoran/Sala',
      name: '',
      contactName: '',
      phone: '',
      email: '',
      status: 'Kontaktiran',
      priceEstimate: '',
      notes: ''
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (vendor) => {
    setEditingVendor(vendor);
    setFormData({
      category: vendor.category || 'Restoran/Sala',
      name: vendor.name || '',
      contactName: vendor.contactName || '',
      phone: vendor.phone || '',
      email: vendor.email || '',
      status: vendor.status || 'Kontaktiran',
      priceEstimate: vendor.priceEstimate || '',
      notes: vendor.notes || ''
    });
    setModalOpen(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingVendor) {
      onUpdateVendor(editingVendor.id, formData);
    } else {
      onAddVendor({
        id: 'v-' + Date.now(),
        eventId: event.id,
        ...formData
      });
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-500" />
            Imenik Dobavljača & Servisa
          </h2>
          <p className="text-sm text-slate-500">
            Evidencija kontakata fotografa, muzike, restorana i dekoratera.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-200 transition-all"
        >
          <Plus className="w-4 h-4" />
          Dodaj dobavljača
        </button>
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
          Sve usluge ({eventVendors.length})
        </button>
        {categories.map((cat) => {
          const count = eventVendors.filter(v => v.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-xs' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat} {count > 0 && `(${count})`}
            </button>
          );
        })}
      </div>

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVendors.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400">
            <Briefcase className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-base font-semibold text-slate-700">Nema evidentiranih dobavljača</p>
            <p className="text-xs text-slate-500 mt-1">Dodajte novi kontakt klikom na dugme iznad.</p>
          </div>
        ) : (
          filteredVendors.map((vendor) => (
            <div 
              key={vendor.id} 
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-50 text-indigo-700 mb-1.5 border border-indigo-100">
                      {vendor.category}
                    </span>
                    <h3 className="font-bold text-lg text-slate-900 leading-tight">
                      {vendor.name}
                    </h3>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    vendor.status === 'Plaćena kapara' ? 'bg-emerald-100 text-emerald-800' :
                    vendor.status === 'Rezerviran' ? 'bg-blue-100 text-blue-800' :
                    vendor.status === 'Kontaktiran' ? 'bg-amber-100 text-amber-800' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {vendor.status}
                  </span>
                </div>

                <div className="space-y-2 mt-4 text-xs text-slate-600">
                  {vendor.contactName && (
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium text-slate-700">{vendor.contactName}</span>
                    </div>
                  )}

                  {vendor.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`tel:${vendor.phone}`} className="hover:text-indigo-600 font-medium">
                        {vendor.phone}
                      </a>
                    </div>
                  )}

                  {vendor.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`mailto:${vendor.email}`} className="hover:text-indigo-600 truncate">
                        {vendor.email}
                      </a>
                    </div>
                  )}

                  {vendor.priceEstimate && (
                    <div className="flex items-center gap-2 pt-1">
                      <Tag className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="font-bold text-slate-900">{vendor.priceEstimate}</span>
                    </div>
                  )}

                  {vendor.notes && (
                    <p className="mt-2 text-slate-500 italic bg-slate-50 p-2.5 rounded-xl text-[11px]">
                      "{vendor.notes}"
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-1 pt-4 mt-4 border-t border-slate-100">
                <button
                  onClick={() => handleOpenEditModal(vendor)}
                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Uredi"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteVendor(vendor.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Izbriši"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Vendor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-xl text-slate-900">
                {editingVendor ? 'Uredi dobavljača' : 'Dodaj novog dobavljača'}
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
                  Kategorija usluge
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Naziv firme / Bend / Osobe *
                </label>
                <input
                  type="text"
                  required
                  placeholder="npr. Studio Memoris ili Party Band"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Kontakt osoba
                  </label>
                  <input
                    type="text"
                    placeholder="npr. Edin M."
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Status aranžmana
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                  >
                    <option value="Potražnja">Potražnja</option>
                    <option value="Kontaktiran">Kontaktiran</option>
                    <option value="Rezerviran">Rezerviran</option>
                    <option value="Plaćena kapara">Plaćena kapara</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Telefon
                  </label>
                  <input
                    type="text"
                    placeholder="+387 61 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Procjena cene
                  </label>
                  <input
                    type="text"
                    placeholder="npr. 1200 €"
                    value={formData.priceEstimate}
                    onChange={(e) => setFormData({ ...formData, priceEstimate: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="kontakt@usluga.ba"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Napomena & Detalji ponude
                </label>
                <textarea
                  rows="2"
                  placeholder="npr. U cenu ulaze fotoknjige i video dronom..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md shadow-indigo-200 transition-all"
                >
                  {editingVendor ? 'Sačuvaj izmene' : 'Dodaj dobavljača'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
