import React, { useState, useMemo } from 'react';
import { 
  FileDown, 
  Copy, 
  Download, 
  Filter, 
  Search, 
  ArrowUpDown, 
  ChevronRight, 
  Layers, 
  AlertCircle, 
  Sparkles, 
  Check, 
  HelpCircle,
  FileText,
  Link,
  Clock,
  ThumbsUp,
  SlidersHorizontal,
  X,
  Edit2
} from 'lucide-react';
import { BlogItem, SEORecommendations } from '../types';

interface ResultsTableProps {
  items: BlogItem[];
  onUpdateRecommendations: (id: string, updatedRecs: Partial<SEORecommendations>) => void;
  onOpenRewriteModal: (item: BlogItem) => void;
}

export default function ResultsTable({ items, onUpdateRecommendations, onOpenRewriteModal }: ResultsTableProps) {
  // Only display items that have an active analysis result
  const analyzedItems = useMemo(() => {
    return items.filter(item => item.recommendations);
  }, [items]);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all'); // 'all', 'high' (7-10), 'medium' (4-6), 'low' (1-3)
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Editing state for active detail panel
  const [isEditingPanel, setIsEditingPanel] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [globalCopied, setGlobalCopied] = useState(false);

  // Retrieve unique recommended actions for filter dropdown
  const uniqueActions = useMemo(() => {
    const actions = new Set<string>();
    analyzedItems.forEach(item => {
      if (item.recommendations?.recommendedAction) {
        actions.add(item.recommendations.recommendedAction);
      }
    });
    return Array.from(actions);
  }, [analyzedItems]);

  // Filter and Search logic
  const filteredItems = useMemo(() => {
    return analyzedItems.filter(item => {
      const recs = item.recommendations;
      if (!recs) return false;

      // 1. Text Search matching URL, Title, Keyword, or recommendations text
      const matchesSearch = 
        item.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.targetKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.currentTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recs.improvedMetaTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recs.recommendedAction.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Priority Filter
      let matchesPriority = true;
      if (priorityFilter === 'high') {
        matchesPriority = recs.priorityScore >= 7;
      } else if (priorityFilter === 'medium') {
        matchesPriority = recs.priorityScore >= 4 && recs.priorityScore <= 6;
      } else if (priorityFilter === 'low') {
        matchesPriority = recs.priorityScore >= 1 && recs.priorityScore <= 3;
      }

      // 3. Recommended Action Filter
      let matchesAction = true;
      if (actionFilter !== 'all') {
        matchesAction = recs.recommendedAction === actionFilter;
      }

      return matchesSearch && matchesPriority && matchesAction;
    });
  }, [analyzedItems, searchQuery, priorityFilter, actionFilter]);

  // Active item in detailed sidebar
  const activeItem = useMemo(() => {
    return items.find(item => item.id === selectedItemId) || null;
  }, [items, selectedItemId]);

  // Initialize detailed sidebar if none selected and results exist
  React.useEffect(() => {
    if (filteredItems.length > 0 && !selectedItemId) {
      setSelectedItemId(filteredItems[0].id);
    }
  }, [filteredItems, selectedItemId]);

  // Trigger brief copy feedback
  const triggerCopyFeedback = (id: string) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // CSV Exporter
  const handleExportCSV = () => {
    if (analyzedItems.length === 0) return;

    const headers = [
      'URL',
      'Target Keyword',
      'Current Title',
      'Page Type',
      'Priority Score',
      'Recommended Action',
      'Search Intent',
      'Improved Meta Title',
      'Improved Meta Description',
      'Missing Topics',
      'Missing Entities',
      'FAQ Q&As',
      'Internal Link Ideas',
      'Freshness Issues'
    ];

    const rows = analyzedItems.map(item => {
      const recs = item.recommendations!;
      return [
        item.url,
        item.targetKeyword,
        item.currentTitle,
        item.pageType,
        recs.priorityScore,
        recs.recommendedAction,
        recs.searchIntent,
        recs.improvedMetaTitle,
        recs.improvedMetaDescription,
        (recs.missingTopics || []).join('; '),
        (recs.missingEntities || []).join('; '),
        (recs.faqIdeas || []).map(f => `Q: ${f.question} | A: ${f.answer}`).join(' ;; '),
        (recs.internalLinks || []).join('; '),
        recs.freshnessIssues
      ].map(val => `"${String(val).replace(/"/g, '""')}"`);
    });

    const csvContent = [headers.join(','), ...rows.join('\n')].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `AI_SEO_Recommendations_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // JSON Exporter
  const handleExportJSON = () => {
    if (analyzedItems.length === 0) return;
    const jsonString = JSON.stringify(analyzedItems, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `AI_SEO_Full_Audit_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy plain text report to Clipboard
  const handleCopyTableClipboard = () => {
    if (analyzedItems.length === 0) return;

    let content = "AI SEO REFRESH RECOMMENDATIONS REPORT\n";
    content += "Generated: " + new Date().toLocaleDateString() + "\n";
    content += "===================================================================\n\n";

    analyzedItems.forEach((item, index) => {
      const recs = item.recommendations!;
      content += `[${index + 1}] URL: ${item.url}\n`;
      content += `Keyword: ${item.targetKeyword || 'None'} | Type: ${item.pageType}\n`;
      content += `Priority Score: ${recs.priorityScore}/10 | Recommended Action: ${recs.recommendedAction}\n`;
      content += `Search Intent Context: ${recs.searchIntent}\n`;
      content += `Current Title: ${item.currentTitle || 'N/A'}\n`;
      content += `Suggested Title: ${recs.improvedMetaTitle}\n`;
      content += `Suggested Description: ${recs.improvedMetaDescription}\n`;
      content += `Missing Seminar Topics: ${(recs.missingTopics || []).join(', ')}\n`;
      content += `Missing E-E-A-T Entities: ${(recs.missingEntities || []).join(', ')}\n`;
      content += `Stale Content/Freshness Issues: ${recs.freshnessIssues}\n`;
      content += `Internal Linking Strategies: ${(recs.internalLinks || []).join(', ')}\n`;
      content += `FAQ Content:\n`;
      (recs.faqIdeas || []).forEach(f => {
        content += `  - Q: ${f.question}\n    A: ${f.answer}\n`;
      });
      content += "\n-------------------------------------------------------------------\n\n";
    });

    navigator.clipboard.writeText(content).then(() => {
      setGlobalCopied(true);
      setTimeout(() => setGlobalCopied(false), 2000);
    });
  };

  if (analyzedItems.length === 0) {
    return null; // Don't show results block if none are available yet
  }

  return (
    <div id="results-table-section" className="space-y-6">
      {/* Visual Separator */}
      <div className="flex items-center gap-4 py-2">
        <div className="h-px bg-slate-200 flex-1"></div>
        <div className="flex items-center gap-2 text-indigo-600 font-semibold tracking-wider text-xs uppercase bg-white px-3 py-1 border border-indigo-100 rounded-full shadow-xs">
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
          SEO Optimization Recommendations
        </div>
        <div className="h-px bg-slate-200 flex-1"></div>
      </div>

      {/* Control panel and Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Filters Inputs */}
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search outputs (URLs, keywords, actions...)"
                className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
              />
            </div>

            {/* Scale Filter */}
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">Priority: All</option>
                <option value="high">🌋 High Priority (7-10)</option>
                <option value="medium">⚖️ Medium Priority (4-6)</option>
                <option value="low">🌱 Low Priority (1-3)</option>
              </select>
            </div>

            {/* Action Filter */}
            {uniqueActions.length > 0 && (
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="text-xs max-w-[200px] bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">Action: All ({uniqueActions.length})</option>
                {uniqueActions.map(act => (
                  <option key={act} value={act}>{act}</option>
                ))}
              </select>
            )}
          </div>

          {/* Export Suite */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <button
              onClick={handleCopyTableClipboard}
              className="px-3.5 py-2 hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
              title="Copy reports as structured text layout"
            >
              {globalCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              {globalCopied ? 'Copied Report!' : 'Copy Audit Report'}
            </button>

            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2 hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Download results in JSON structure format"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              Export JSON
            </button>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-indigo-650 lg:bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              title="Download report optimized for Google Sheets or Microsoft Excel"
            >
              <FileDown className="w-3.5 h-3.5" />
              Download CSV for Sheets
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-column Explorer Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Results List Left Column (Compact Card view) */}
        <div className="lg:col-span-5 space-y-3 max-h-[680px] overflow-y-auto pr-1">
          <div className="text-xs font-semibold text-slate-450 uppercase tracking-widest px-1">
            Displaying {filteredItems.length} of {analyzedItems.length} optimization profiles
          </div>

          {filteredItems.map(item => {
            const recs = item.recommendations!;
            const isSelected = item.id === selectedItemId;

            // Compute priority pill color
            let pColor = "bg-green-50 text-green-700 border-green-250";
            if (recs.priorityScore >= 7) pColor = "bg-rose-50 text-rose-700 border-rose-250";
            else if (recs.priorityScore >= 4) pColor = "bg-amber-50 text-amber-700 border-amber-250";

            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedItemId(item.id);
                  setIsEditingPanel(false);
                }}
                className={`group border rounded-xl p-4 transition-all text-left cursor-pointer hover:shadow-md relative ${
                  isSelected 
                    ? 'border-indigo-500 bg-indigo-50/20 shadow-sm' 
                    : 'border-slate-200 bg-white hover:border-slate-350'
                }`}
              >
                {/* Accent indicator line */}
                {isSelected && (
                  <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-indigo-500 rounded-r-md"></div>
                )}

                <div className="flex items-start justify-between gap-2 pl-1">
                  <span className="text-[10px] font-bold text-slate-400 font-mono tracking-tight truncate max-w-[70%]" title={item.url}>
                    {item.url.replace(/^https?:\/\/(www\.)?/, '')}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold border ${pColor}`}>
                    Score: {recs.priorityScore}/10
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 mt-1 lines-clamp-2 leading-relaxed">
                  {recs.improvedMetaTitle || item.currentTitle}
                </h4>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px]">
                  <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded truncate max-w-[140px]" title={recs.recommendedAction}>
                    ⚡ {recs.recommendedAction}
                  </span>
                  
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenRewriteModal(item);
                      }}
                      className="px-2 py-0.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-medium text-[10px] flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                      title="Open full content rewrite"
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      {item.fullRewrite ? 'Rewrite Ready' : 'Rewrite'}
                    </button>

                    <span className="text-slate-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform text-[10px]">
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="text-center py-12 bg-white border border-slate-200 rounded-xl text-slate-400">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-semibold">No filter matches found.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setPriorityFilter('all');
                  setActionFilter('all');
                }}
                className="text-xs text-indigo-650 hover:underline mt-2 font-semibold"
              >
                Reset active filters
              </button>
            </div>
          )}
        </div>

        {/* Detailed Audit & Review Workspace Right Column */}
        <div id="seo-audit-workplace" className="lg:col-span-7 bg-white border border-slate-250 lg:border-slate-200 rounded-xl shadow-md p-6 relative min-h-[600px] flex flex-col justify-between">
          {activeItem && activeItem.recommendations ? (
            <div>
              {/* Detailed workspace header */}
              <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {activeItem.pageType} Refresh Audit
                    </span>
                    <span className="text-xs font-mono text-slate-500 max-w-xs truncate" title={activeItem.url}>
                      {activeItem.url}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-2">
                    {activeItem.recommendations.improvedMetaTitle}
                  </h3>
                </div>

                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <button
                    onClick={() => onOpenRewriteModal(activeItem)}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    title="Generate full article rewrite using Gemini AI"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                    {activeItem.fullRewrite ? 'View Full Rewrite' : 'Generate Full Rewrite'}
                  </button>

                  <button
                    onClick={() => setIsEditingPanel(!isEditingPanel)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                      isEditingPanel 
                        ? 'bg-amber-100 border border-amber-300 text-amber-800' 
                        : 'bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700'
                    }`}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    {isEditingPanel ? 'Reviewing' : 'Modify Recs'}
                  </button>
                </div>
              </div>

              {/* Editable form mode vs Professional presentation mode */}
              {isEditingPanel ? (
                /* Editable layout */
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Priority Score (1-10)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={activeItem.recommendations.priorityScore}
                        onChange={(e) => onUpdateRecommendations(activeItem.id, { priorityScore: Math.min(10, Math.max(1, parseInt(e.target.value) || 1)) })}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Recommended Action Plan
                      </label>
                      <input
                        type="text"
                        value={activeItem.recommendations.recommendedAction}
                        onChange={(e) => onUpdateRecommendations(activeItem.id, { recommendedAction: e.target.value })}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded bg-slate-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Search Intent Analysis
                    </label>
                    <textarea
                      rows={2}
                      value={activeItem.recommendations.searchIntent}
                      onChange={(e) => onUpdateRecommendations(activeItem.id, { searchIntent: e.target.value })}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded bg-slate-50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Optimized H1 / Meta Title
                      </label>
                      <input
                        type="text"
                        value={activeItem.recommendations.improvedMetaTitle}
                        onChange={(e) => onUpdateRecommendations(activeItem.id, { improvedMetaTitle: e.target.value })}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Optimized Description
                      </label>
                      <textarea
                        rows={2}
                        value={activeItem.recommendations.improvedMetaDescription}
                        onChange={(e) => onUpdateRecommendations(activeItem.id, { improvedMetaDescription: e.target.value })}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded bg-slate-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Freshness & Stale Travel Seasons (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={activeItem.recommendations.freshnessIssues}
                      onChange={(e) => onUpdateRecommendations(activeItem.id, { freshnessIssues: e.target.value })}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded bg-slate-50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Missing Semantic Topics (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={activeItem.recommendations.missingTopics.join('\n')}
                        onChange={(e) => onUpdateRecommendations(activeItem.id, { missingTopics: e.target.value.split('\n').filter(Boolean) })}
                        className="w-full text-xs font-mono p-2 border border-slate-300 rounded bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Missing Travel Entities (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={activeItem.recommendations.missingEntities.join('\n')}
                        onChange={(e) => onUpdateRecommendations(activeItem.id, { missingEntities: e.target.value.split('\n').filter(Boolean) })}
                        className="w-full text-xs font-mono p-2 border border-slate-300 rounded bg-slate-50"
                      />
                    </div>
                  </div>

                  <div className="pt-2 text-right">
                    <button
                      onClick={() => setIsEditingPanel(false)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold cursor-pointer"
                    >
                      Finish Modifying & Close Editor
                    </button>
                  </div>
                </div>
              ) : (
                /* Dynamic Interactive audit presentation display components */
                <div className="space-y-5 max-h-[500px] overflow-y-auto pr-1">
                  
                  {/* Row 1: Search Intent & Freshness */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-2">
                        <ThumbsUp className="w-3.5 h-3.5 text-indigo-500" />
                        Decoded Search Intent
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed italic">
                        "{activeItem.recommendations.searchIntent}"
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-2">
                        <Clock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                        Freshness & Seasonality Issues
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {activeItem.recommendations.freshnessIssues || "No critical freshness metadata issues detected. Up to date."}
                      </p>
                    </div>
                  </div>

                  {/* Row 2: Current Title Optimization vs Improved Title */}
                  <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-3">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Meta Tag Content Optimization (Target Keyword: "{activeItem.targetKeyword || 'No keyword provided'}")
                    </h4>

                    {/* Meta Title comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div className="bg-white/80 border border-slate-200 rounded-lg p-2.5">
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Current Title Tag</div>
                        <div className="text-xs font-medium text-slate-600 truncate mt-1">
                          {activeItem.currentTitle || "None provided / Empty Tag"}
                        </div>
                      </div>

                      <div className="bg-indigo-50/50 border border-indigo-150 rounded-lg p-2.5 relative group">
                        <div className="text-[9px] font-bold text-indigo-600 uppercase tracking-wide flex items-center justify-between">
                          <span>Optimized Meta Title</span>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(activeItem.recommendations!.improvedMetaTitle);
                              triggerCopyFeedback('meta-title');
                            }} 
                            className="text-slate-400 hover:text-indigo-600"
                            title="Copy to clipboard"
                          >
                            {copiedId === 'meta-title' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                        <div className="text-xs font-bold text-slate-900 mt-1 lines-clamp-2">
                          {activeItem.recommendations.improvedMetaTitle}
                        </div>
                      </div>
                    </div>

                    {/* Meta Description comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-white/80 border border-slate-200 rounded-lg p-2.5">
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wide font-mono">Current Description</div>
                        <div className="text-xs font-medium text-slate-500 mt-1 italic line-clamp-3">
                          {activeItem.fetchedDescription || "No current meta description parsed from scrape sample."}
                        </div>
                      </div>

                      <div className="bg-indigo-50/50 border border-indigo-150 rounded-lg p-2.5 relative">
                        <div className="text-[9px] font-bold text-indigo-600 uppercase tracking-wide flex items-center justify-between">
                          <span>Optimized Meta Description</span>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(activeItem.recommendations!.improvedMetaDescription);
                              triggerCopyFeedback('meta-desc');
                            }} 
                            className="text-slate-400 hover:text-indigo-600"
                            title="Copy to clipboard"
                          >
                            {copiedId === 'meta-desc' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                        <div className="text-xs font-medium text-slate-800 mt-1 leading-relaxed line-clamp-3">
                          {activeItem.recommendations.improvedMetaDescription}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Semantic Audit Topics & Local Entities */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-slate-200 rounded-xl p-4">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-3">
                        <FileText className="w-3.5 h-3.5 text-indigo-500" />
                        Recommend Missing Topics (Semantic Audit)
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeItem.recommendations.missingTopics?.map((t, idx) => (
                          <span key={idx} className="text-[11px] bg-slate-100 hover:bg-slate-200/80 text-slate-800 px-2.5 py-1 rounded-md border border-slate-200 font-medium select-none">
                            {t}
                          </span>
                        )) || <span className="text-xs text-slate-400">None recommended.</span>}
                      </div>
                    </div>

                    <div className="border border-slate-200 rounded-xl p-4">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-3">
                        <HelpCircle className="w-3.5 h-3.5 text-purple-500" />
                        Travel Entities to Inject (E-E-A-T Authority)
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeItem.recommendations.missingEntities?.map((ent, idx) => (
                          <span key={idx} className="text-[11px] bg-indigo-50/50 hover:bg-indigo-50 text-indigo-900 px-2.5 py-1 rounded-md border border-indigo-100 font-medium select-none">
                            📍 {ent}
                          </span>
                        )) || <span className="text-xs text-slate-400">None recommended.</span>}
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Travel User FAQ Questions ideas with Answers */}
                  <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                      <Layers className="w-3.5 h-3.5 text-indigo-500" />
                      Travel FAQ Ideas (Accordion Rich Results Snippets)
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {activeItem.recommendations.faqIdeas?.map((faq, idx) => (
                        <div key={idx} className="bg-slate-50/50 border border-slate-150 rounded-lg p-3">
                          <div className="text-xs font-semibold text-slate-900 flex items-start gap-1">
                            <span className="text-[10px] text-indigo-600 bg-indigo-50 py-0.5 px-1.5 rounded font-mono uppercase shrink-0">FAQ {idx + 1}</span>
                            <span>{faq.question}</span>
                          </div>
                          <div className="text-xs text-slate-650 mt-1.5 pl-[54px] leading-relaxed relative">
                            <div className="absolute left-6 top-1 font-mono text-[9px] text-slate-450 uppercase">Ans:</div>
                            {faq.answer}
                          </div>
                        </div>
                      )) || <div className="text-xs text-slate-400">No FAQs suggested.</div>}
                    </div>
                  </div>

                  {/* Row 5: Local Internal link suggestions */}
                  <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-2">
                      <Link className="w-3.5 h-3.5 text-indigo-500" />
                      Suggested Internal Linking Interventions
                    </h4>
                    <ul className="text-xs text-slate-700 leading-relaxed space-y-1.5 pl-5 list-disc">
                      {activeItem.recommendations.internalLinks?.map((lnk, idx) => (
                        <li key={idx} className="marker:text-indigo-500">{lnk}</li>
                      )) || <li className="text-slate-400">No link ideas found.</li>}
                    </ul>
                  </div>

                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <Sparkles className="w-12 h-12 text-indigo-200 mb-3 animate-bounce" />
              <p className="text-sm font-semibold max-w-xs text-center">Select an audited article profile from the list to preview actionable SEO guidelines.</p>
            </div>
          )}

          {/* Quick status line at the bottom */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>AI SEO Blog Freshness Workspace</span>
            <span>Travel Marketplace Expert System</span>
          </div>
        </div>

      </div>
    </div>
  );
}
