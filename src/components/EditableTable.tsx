import React, { useState } from 'react';
import { Trash2, FileText, Globe, CheckCircle, AlertTriangle, RefreshCw, X, Sparkles, Plus, Play } from 'lucide-react';
import { BlogItem } from '../types';

interface EditableTableProps {
  items: BlogItem[];
  onUpdateItem: (id: string, updatedFields: Partial<BlogItem>) => void;
  onRemoveItem: (id: string) => void;
  onClearQueue: () => void;
  onPreScrapeRow: (id: string) => void;
  onAnalyzeSingleItem?: (id: string) => void;
  isLoading: boolean;
  onOpenRewriteModal?: (item: BlogItem) => void;
  onAddNewRow?: () => void;
  onQuickAddUrl?: (url: string) => void;
}

export default function EditableTable({
  items,
  onUpdateItem,
  onRemoveItem,
  onClearQueue,
  onPreScrapeRow,
  onAnalyzeSingleItem,
  isLoading,
  onOpenRewriteModal,
  onAddNewRow,
  onQuickAddUrl
}: EditableTableProps) {
  // Modal for manual page content overrides
  const [activeManualContentId, setActiveManualContentId] = useState<string | null>(null);
  const [manualText, setManualText] = useState('');
  const [quickInput, setQuickInput] = useState('');

  const openManualContentModal = (item: BlogItem) => {
    setActiveManualContentId(item.id);
    setManualText(item.pageContent || '');
  };

  const saveManualContent = () => {
    if (activeManualContentId) {
      onUpdateItem(activeManualContentId, {
        pageContent: manualText,
        status: manualText.trim() ? 'Fetched' : 'Ready'
      });
      setActiveManualContentId(null);
      setManualText('');
    }
  };

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim() || !onQuickAddUrl) return;
    onQuickAddUrl(quickInput.trim());
    setQuickInput('');
  };

  if (items.length === 0) {
    return (
      <div id="editable-table-container" className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm mb-6">
        <div className="max-w-md mx-auto text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Your analysis queue is empty</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Type or paste a destination URL below to add it directly to your queue.
          </p>

          {onQuickAddUrl && (
            <form onSubmit={handleQuickAdd} className="flex items-center gap-2">
              <input
                type="text"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                placeholder="https://example.com/Tokyo-Tours"
                className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800 font-mono"
              />
              <button
                type="submit"
                disabled={!quickInput.trim() || isLoading}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Plus className="w-3.5 h-3.5" />
                Add URL
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div id="editable-table-container" className="bg-white border border-slate-200 rounded-xl shadow-sm mb-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            Analysis Queue
            <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full font-mono">
              {items.length} {items.length === 1 ? 'URL' : 'URLs'}
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Review or modify URLs, target keywords, and page types before triggering SEO audits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onAddNewRow && (
            <button
              onClick={onAddNewRow}
              disabled={isLoading}
              className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 border border-indigo-200"
            >
              <Plus className="w-3.5 h-3.5" />
              + Add Custom Row
            </button>
          )}

          <button
            onClick={onClearQueue}
            disabled={isLoading}
            className="text-xs font-semibold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100/80 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Clear Queue
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-[11px] uppercase tracking-wider font-semibold">
              <th className="py-3 px-4 w-[30%]">Webpage / Destination URL</th>
              <th className="py-3 px-4 w-[20%]">Target Keyword</th>
              <th className="py-3 px-4 w-[20%]">Current Title</th>
              <th className="py-3 px-4 w-[15%]">Page Type</th>
              <th className="py-3 px-4 w-[10%] text-center">Status / Content</th>
              <th className="py-3 px-4 w-[5%] text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {items.map((item) => {
              return (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* URL */}
                  <td className="py-2.5 px-4">
                    <input
                      type="text"
                      value={item.url}
                      onChange={(e) => onUpdateItem(item.id, { url: e.target.value })}
                      disabled={isLoading}
                      placeholder="https://example.com/destinations/tokyo"
                      className="w-full text-xs font-mono bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none transition-colors py-1 text-slate-800"
                    />
                  </td>

                  {/* Target Keyword */}
                  <td className="py-2.5 px-4">
                    <input
                      type="text"
                      value={item.targetKeyword}
                      onChange={(e) => onUpdateItem(item.id, { targetKeyword: e.target.value })}
                      disabled={isLoading}
                      placeholder="e.g. tokyo private guide"
                      className="w-full text-xs bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none transition-colors py-1 text-slate-850"
                    />
                  </td>

                  {/* Current Title */}
                  <td className="py-2.5 px-4">
                    <input
                      type="text"
                      value={item.currentTitle}
                      onChange={(e) => onUpdateItem(item.id, { currentTitle: e.target.value })}
                      disabled={isLoading}
                      placeholder="Auto-detected or custom title"
                      className="w-full text-xs bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none transition-colors py-1 text-slate-850"
                    />
                  </td>

                  {/* Page Type */}
                  <td className="py-2.5 px-4 text-xs">
                    <select
                      value={item.pageType}
                      onChange={(e) => onUpdateItem(item.id, { pageType: e.target.value })}
                      disabled={isLoading}
                      className="w-full text-xs bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none transition-colors py-1 text-slate-800"
                    >
                      <option value="Destination Guide">Destination Guide</option>
                      <option value="Blog Post">Blog Post</option>
                      <option value="Category Page">Category Page</option>
                      <option value="Landing Page">Landing Page</option>
                      <option value="Activity Page">Activity Page</option>
                      <option value="Hotel Review">Hotel Review</option>
                    </select>
                  </td>

                  {/* Status & Content Override button */}
                  <td className="py-2.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 flex-wrap">
                      {item.status === 'Ready' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                          Ready
                        </span>
                      )}
                      {item.status === 'Fetching' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          Crawling...
                        </span>
                      )}
                      {item.status === 'Analyzing' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          Auditing...
                        </span>
                      )}
                      {item.status === 'Fetched' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-sky-50 text-sky-700">
                          <CheckCircle className="w-3 h-3 text-sky-500" />
                          Crawled
                        </span>
                      )}
                      {item.status === 'Analyzed' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle className="w-3 h-3 text-emerald-500" />
                          Optimized
                        </span>
                      )}
                      {(item.status === 'Failed' || item.status === 'Fetch Failed') && (
                        <div className="flex items-center gap-1">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
                            <AlertTriangle className="w-3 h-3 text-rose-500" />
                            Failed
                          </span>
                          {onAnalyzeSingleItem && (
                            <button
                              onClick={() => onAnalyzeSingleItem(item.id)}
                              disabled={isLoading}
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded text-[10px] font-semibold transition-colors cursor-pointer border border-indigo-200"
                              title="Retry Analysis for this row"
                            >
                              <RefreshCw className="w-2.5 h-2.5" />
                              Retry
                            </button>
                          )}
                        </div>
                      )}

                      {/* Manual content edit modal trigger */}
                      <button
                        onClick={() => openManualContentModal(item)}
                        className={`text-[11px] px-1.5 py-0.5 rounded border transition-colors cursor-pointer flex items-center gap-1 ${
                          item.pageContent
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                        }`}
                        title="View or edit scraped body text"
                      >
                        <FileText className="w-3 h-3" />
                        {item.pageContent ? 'Custom Text' : 'Add Text'}
                      </button>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-2.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {item.status === 'Analyzed' && onOpenRewriteModal && (
                        <button
                          onClick={() => onOpenRewriteModal(item)}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded text-[11px] font-semibold transition-colors cursor-pointer border border-indigo-200"
                          title="Generate or view Full Article Rewrite"
                        >
                          <Sparkles className="w-3 h-3 text-indigo-600" />
                          {item.fullRewrite ? 'View Rewrite' : 'Rewrite'}
                        </button>
                      )}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        disabled={isLoading}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors disabled:opacity-40 cursor-pointer"
                        title="Remove from queue"
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

      {/* Manual Content Modal Overlay */}
      {activeManualContentId && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  Manual Webpage Content Editor
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Paste or edit the webpage text below. Used by the optimization engine if live scraping is blocked.
                </p>
              </div>
              <button
                onClick={() => setActiveManualContentId(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Webpage Text Content (Raw Text or Markdown)
                </label>
                <textarea
                  rows={12}
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  placeholder="Paste article body here (headings, paragraphs, FAQ section, seasonal year metadata...)"
                  className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800"
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveManualContentId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={saveManualContent}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm cursor-pointer"
              >
                Save Page Content
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
