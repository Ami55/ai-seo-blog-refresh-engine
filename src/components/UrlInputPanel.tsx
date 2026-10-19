import React, { useState } from 'react';
import { Plus, ListPlus, Wand2, FileSpreadsheet, CheckCircle2, Globe, ArrowDown, Sparkles } from 'lucide-react';

interface UrlInputPanelProps {
  onAddUrls: (urls: string[], defaults: { targetKeyword: string; pageType: string }) => void;
  onUploadCsv: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

export default function UrlInputPanel({ onAddUrls, onUploadCsv, isLoading }: UrlInputPanelProps) {
  // Mode toggle: 'single' for instant single-URL adding, 'bulk' for multi-line paste
  const [inputMode, setInputMode] = useState<'single' | 'bulk'>('single');

  // Single URL input state
  const [singleUrl, setSingleUrl] = useState('');
  const [singleKeyword, setSingleKeyword] = useState('');
  const [singlePageType, setSinglePageType] = useState('Destination Guide');

  // Bulk input state
  const [bulkText, setBulkText] = useState('');
  const [bulkKeyword, setBulkKeyword] = useState('');
  const [bulkPageType, setBulkPageType] = useState('Blog Post');

  // Instant feedback toast/banner state
  const [addedBanner, setAddedBanner] = useState<{ count: number; sample: string } | null>(null);

  // Helper to process & add URLs
  const processAndAdd = (rawUrls: string[], keyword: string, pageType: string) => {
    // Split by newlines, commas, semicolons, or whitespace if multiple
    const cleanedList: string[] = [];
    rawUrls.forEach(item => {
      const parts = item
        .split(/[\r\n,;]+/)
        .map(u => u.trim().replace(/^["'<(\[]+|["'>)\]]+$/g, ''))
        .filter(u => u.length > 3);
      cleanedList.push(...parts);
    });

    if (cleanedList.length === 0) return;

    onAddUrls(cleanedList, {
      targetKeyword: keyword.trim(),
      pageType: pageType,
    });

    // Show instant success banner
    setAddedBanner({
      count: cleanedList.length,
      sample: cleanedList[0]
    });
    setTimeout(() => {
      setAddedBanner(null);
    }, 6000);
  };

  const handleSingleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleUrl.trim()) return;

    processAndAdd([singleUrl], singleKeyword, singlePageType);
    setSingleUrl('');
    setSingleKeyword('');
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkText.trim()) return;

    processAndAdd([bulkText], bulkKeyword, bulkPageType);
    setBulkText('');
    setBulkKeyword('');
  };

  const loadDemoBlogs = () => {
    const demoUrls = [
      'https://example.com/Rome-Tours',
      'https://example.com/Paris-Tours',
      'https://example.com/Tokyo-Tours',
    ];
    processAndAdd(demoUrls, 'private local tour guide', 'Destination Guide');
  };

  return (
    <div id="url-input-panel" className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <ListPlus className="w-5 h-5 text-indigo-600" />
            Add Travel URLs to Optimization Queue
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Enter a destination or blog link manually, paste a bulk list, or upload a CSV.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadDemoBlogs}
            disabled={isLoading}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 hover:bg-indigo-100/80 px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer border border-indigo-100"
          >
            <Wand2 className="w-3.5 h-3.5" />
            Load Fictional Sample URLs
          </button>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
        <button
          type="button"
          onClick={() => setInputMode('single')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            inputMode === 'single'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          Single URL Quick Add
        </button>

        <button
          type="button"
          onClick={() => setInputMode('bulk')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            inputMode === 'bulk'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
          }`}
        >
          <ListPlus className="w-3.5 h-3.5" />
          Bulk Paste Multiple URLs
        </button>

        <label className="ml-auto text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors">
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
          Upload CSV
          <input
            type="file"
            accept=".csv"
            onChange={onUploadCsv}
            disabled={isLoading}
            className="hidden"
          />
        </label>
      </div>

      {/* Success Notification Banner */}
      {addedBanner && (
        <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-3 text-emerald-900 animate-fade-in shadow-xs">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-xs">
              <span className="font-bold">
                Successfully added {addedBanner.count} URL{addedBanner.count > 1 ? 's' : ''} to the Queue!
              </span>{' '}
              <span className="text-emerald-700 font-mono text-[11px]">
                ({addedBanner.sample}
                {addedBanner.count > 1 ? ' and more...' : ''})
              </span>
            </div>
          </div>
          <a
            href="#editable-table-container"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline flex items-center gap-1 shrink-0"
          >
            View in Queue <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* 1. Single URL Mode Form */}
      {inputMode === 'single' && (
        <form onSubmit={handleSingleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            <div className="md:col-span-6">
              <label htmlFor="single-url-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Webpage / Blog URL <span className="text-rose-500">*</span>
              </label>
              <input
                id="single-url-input"
                type="text"
                value={singleUrl}
                onChange={(e) => setSingleUrl(e.target.value)}
                disabled={isLoading}
                placeholder="e.g. https://example.com/Barcelona-Tours"
                className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400 font-mono"
                required
              />
            </div>

            <div className="md:col-span-3">
              <label htmlFor="single-keyword-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Keyword <span className="text-[10px] text-slate-400 lowercase italic">(optional)</span>
              </label>
              <input
                id="single-keyword-input"
                type="text"
                value={singleKeyword}
                onChange={(e) => setSingleKeyword(e.target.value)}
                disabled={isLoading}
                placeholder="e.g. private gaudi tour"
                className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
            </div>

            <div className="md:col-span-3">
              <label htmlFor="single-type-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Page Type
              </label>
              <select
                id="single-type-input"
                value={singlePageType}
                onChange={(e) => setSinglePageType(e.target.value)}
                disabled={isLoading}
                className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
              >
                <option value="Destination Guide">Destination Guide</option>
                <option value="Blog Post">Blog Post</option>
                <option value="Category Page">Category Page</option>
                <option value="Landing Page">Landing Page</option>
                <option value="Activity Page">Activity Page</option>
                <option value="Hotel Review">Hotel Review</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-500">
              💡 Tip: You can paste full URLs or bare domains (e.g. <span className="font-mono text-[11px]">example.com/Tokyo-Tours</span>). Press Enter or click Add.
            </span>

            <button
              type="submit"
              disabled={isLoading || !singleUrl.trim()}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add URL to Queue
            </button>
          </div>
        </form>
      )}

      {/* 2. Bulk Paste Mode Form */}
      {inputMode === 'bulk' && (
        <form onSubmit={handleBulkSubmit} className="space-y-4">
          <div>
            <label htmlFor="bulk-urls-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Paste Multiple URLs (One per line or comma-separated) <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="bulk-urls-input"
              rows={4}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              disabled={isLoading}
              placeholder="https://example.com/Florence-Tours&#10;https://example.com/Venice-Tours&#10;https://example.com/Athens-Tours"
              className="w-full text-sm font-mono p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="bulk-default-keyword" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Default Target Keyword <span className="text-[10px] text-slate-400 lowercase italic">(optional)</span>
              </label>
              <input
                id="bulk-default-keyword"
                type="text"
                value={bulkKeyword}
                onChange={(e) => setBulkKeyword(e.target.value)}
                disabled={isLoading}
                placeholder="e.g. private local guide"
                className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label htmlFor="bulk-default-page-type" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Default Page Type
              </label>
              <select
                id="bulk-default-page-type"
                value={bulkPageType}
                onChange={(e) => setBulkPageType(e.target.value)}
                disabled={isLoading}
                className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
              >
                <option value="Blog Post">Blog Post</option>
                <option value="Destination Guide">Destination Guide</option>
                <option value="Category Page">Category Page</option>
                <option value="Landing Page">Landing Page</option>
                <option value="Activity Page">Activity Page</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end pt-1">
            <button
              type="submit"
              disabled={isLoading || !bulkText.trim()}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add All URLs to Queue
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
