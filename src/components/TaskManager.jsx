import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2,
  Clock,
  Wand2
} from 'lucide-react';
import { getDefaultTasksForEventType } from '../utils/storage';

export default function TaskManager({ 
  event, 
  tasks, 
  onAddTask, 
  onUpdateTask, 
  onDeleteTask, 
  onToggleTask,
  onBulkAddTasks
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('sve');
  const [selectedPriority, setSelectedPriority] = useState('svi');

  const [formData, setFormData] = useState({
    category: 'Pre događaja',
    title: '',
    dueDate: '',
    priority: 'srednji',
    completed: false
  });

  if (!event) return null;

  const eventTasks = tasks.filter(t => t.eventId === event.id);

  // Stats
  const completedCount = eventTasks.filter(t => t.completed).length;
  const progress = eventTasks.length > 0 ? Math.round((completedCount / eventTasks.length) * 100) : 0;

  const categories = ['Rane pripreme', 'Pre događaja', 'Sedmica proslave', 'Na dan proslave'];

  const filteredTasks = eventTasks.filter(task => {
    const matchesCategory = selectedCategory === 'sve' || task.category === selectedCategory;
    const matchesPriority = selectedPriority === 'svi' || task.priority === selectedPriority;
    return matchesCategory && matchesPriority;
  });

  const handleOpenAddModal = () => {
    setEditingTask(null);
    setFormData({
      category: 'Pre događaja',
      title: '',
      dueDate: '',
      priority: 'srednji',
      completed: false
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setFormData({
      category: task.category || 'Pre događaja',
      title: task.title || '',
      dueDate: task.dueDate || '',
      priority: task.priority || 'srednji',
      completed: task.completed || false
    });
    setModalOpen(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingTask) {
      onUpdateTask(editingTask.id, formData);
    } else {
      onAddTask({
        id: 't-' + Date.now(),
        eventId: event.id,
        ...formData
      });
    }
    setModalOpen(false);
  };

  const handleLoadDefaultTasks = () => {
    const defaultList = getDefaultTasksForEventType(event.type);
    const newTasks = defaultList.map((t, idx) => ({
      id: 't-def-' + Date.now() + '-' + idx,
      eventId: event.id,
      category: t.category,
      title: t.title,
      dueDate: '',
      priority: t.priority,
      completed: false
    }));
    onBulkAddTasks(newTasks);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-blue-500" />
            Lista Zadataka & Podsetnik
          </h2>
          <p className="text-sm text-slate-500">
            Pratite sve obaveze i pripreme po fazama proslave.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLoadDefaultTasks}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 font-semibold text-sm border border-purple-200/60 transition-colors"
            title="Dodaj preporučene zadatke za ovaj tip proslave"
          >
            <Wand2 className="w-4 h-4 text-purple-600" />
            Generiši šablon zadataka
          </button>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-200 transition-all"
          >
            <Plus className="w-4 h-4" />
            Dodaj zadatak
          </button>
        </div>
      </div>

      {/* Progress Bar Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between text-sm font-semibold mb-2">
            <span className="text-slate-700">Napredak realizacije zadataka</span>
            <span className="text-blue-600 font-bold">{progress}% completed</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="text-xs text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200/60 font-medium">
          Završeno <strong className="text-slate-900">{completedCount}</strong> od <strong className="text-slate-900">{eventTasks.length}</strong> zadataka
        </div>
      </div>

      {/* Category & Priority Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('sve')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'sve' 
                ? 'bg-slate-900 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Sve faze
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="svi">Svi prioriteti</option>
          <option value="visok">Samo Visok prioritet</option>
          <option value="srednji">Srednji prioritet</option>
          <option value="nizak">Nizak prioritet</option>
        </select>
      </div>

      {/* Task Checklist Items */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400">
            <CheckSquare className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-base font-semibold text-slate-700">Nema zadataka za prikaz</p>
            <p className="text-xs text-slate-500 mt-1">Kliknite na "Dodaj zadatak" ili generišite automatski šablon.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div 
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                task.completed 
                  ? 'bg-slate-50/60 border-slate-200/60 text-slate-400' 
                  : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleTask(task.id)}
                  className="w-5 h-5 rounded-md text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                />
                <div className="min-w-0 flex-1">
                  <p className={`text-sm sm:text-base font-semibold truncate ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                    {task.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400">{task.category}</span>
                    {task.dueDate && (
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        Rok: {task.dueDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 ml-4">
                {task.priority === 'visok' && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-700 uppercase tracking-wider">
                    Hitno
                  </span>
                )}
                {task.priority === 'srednji' && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700">
                    Srednji
                  </span>
                )}
                {task.priority === 'nizak' && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600">
                    Nizak
                  </span>
                )}

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditModal(task)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Task Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-xl text-slate-900">
                {editingTask ? 'Uredi zadatak' : 'Dodaj novi zadatak'}
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
                  Naziv zadatka *
                </label>
                <input
                  type="text"
                  required
                  placeholder="npr. Potvrda muzičkog benda ili Slanje pozivnica"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Faza proslave
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Prioritet
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="visok">Visok (Hitno)</option>
                    <option value="srednji">Srednji</option>
                    <option value="nizak">Nizak</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Rok za završetak (Opciono)
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
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
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-200 transition-all"
                >
                  {editingTask ? 'Sačuvaj izmene' : 'Dodaj zadatak'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
