import React from 'react';
import { Sparkles, CheckCircle2, History, Layers, HelpCircle, BookOpen } from 'lucide-react';

interface HeaderProps {
  totalItems: number;
  analyzedCount: number;
  readyToAnalyzeCount: number;
  onOpenHowItWorks?: () => void;
}

export default function Header({ 
  totalItems, 
  analyzedCount, 
  readyToAnalyzeCount,
  onOpenHowItWorks 
}: HeaderProps) {
  return (
    <header id="app-header" className="bg-white border-b border-slate-200 py-6 px-6 sm:px-8 mb-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  TravelSEO Refresher
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
                  AI Travel Blog Engine
                </span>
              </div>
            </div>
          </div>
          <p className="mt-1.5 text-sm text-slate-600 max-w-xl">
            Semantic SEO audit and content refresh engine by TravelSEO Refresher Inc. Automate travel entity mapping, intent gap diagnosis, FAQ schema generation, and E-E-A-T rewrites.
          </p>
        </div>

        {/* Quick KPI stats bento indicators + How it works button */}
        <div className="flex flex-wrap items-center gap-3">
          {onOpenHowItWorks && (
            <button
              onClick={onOpenHowItWorks}
              id="how-it-works-header-btn"
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 rounded-xl px-3.5 py-2.5 flex items-center gap-2 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              title="Open full step-by-step user guide"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>How It Works</span>
            </button>
          )}

          <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 flex items-center gap-3">
            <Layers className="w-5 h-5 text-indigo-500" />
            <div>
              <div className="text-xs font-medium text-slate-600">Total Audit Queue</div>
              <div className="text-lg font-bold text-slate-900 font-mono">{totalItems}</div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <div>
              <div className="text-xs font-medium text-slate-600">Optimized Suggestions</div>
              <div className="text-lg font-bold text-emerald-600 font-mono">{analyzedCount}</div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 flex items-center gap-3">
            <History className="w-5 h-5 text-amber-500 animate-pulse" />
            <div>
              <div className="text-xs font-medium text-slate-600">Pending Refreshes</div>
              <div className="text-lg font-bold text-amber-600 font-mono">{readyToAnalyzeCount}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
