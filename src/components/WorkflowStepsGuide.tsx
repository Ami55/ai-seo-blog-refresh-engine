import React, { useState } from 'react';
import { 
  PlusCircle, 
  Play, 
  Sparkles, 
  FileEdit, 
  CheckCircle, 
  ChevronRight, 
  HelpCircle, 
  ArrowRight,
  Zap,
  Info
} from 'lucide-react';
import { BlogItem } from '../types';

interface WorkflowStepsGuideProps {
  items: BlogItem[];
  analyzedCount: number;
  readyToAnalyzeCount: number;
  isLoading: boolean;
  onTriggerAnalyze: () => void;
  onOpenFirstRewrite?: () => void;
  onOpenFullGuide?: () => void;
}

export default function WorkflowStepsGuide({
  items,
  analyzedCount,
  readyToAnalyzeCount,
  isLoading,
  onTriggerAnalyze,
  onOpenFirstRewrite,
  onOpenFullGuide
}: WorkflowStepsGuideProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Determine current active step (1 to 4)
  const currentStep = items.length === 0 
    ? 1 
    : readyToAnalyzeCount > 0 
      ? 2 
      : analyzedCount > 0 && !items.some(i => i.fullRewrite) 
        ? 3 
        : 4;

  const firstAnalyzedItem = items.find(i => i.status === 'Analyzed');

  return (
    <section 
      id="workflow-steps-guide" 
      aria-label="How to use this app"
      className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 mb-6 shadow-xs transition-all"
    >
      {/* Header bar of the guide */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
            <Zap className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              How It Works: 4-Step Travel SEO Refresh Workflow
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                Step {currentStep} of 4
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Follow these simple steps to audit stale travel content and generate 100% publication-ready rewrites.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {onOpenFullGuide && (
            <button
              onClick={onOpenFullGuide}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 px-3 py-1.5 rounded-lg bg-indigo-50/80 hover:bg-indigo-100/80 border border-indigo-200/60 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
              How It Works &amp; Tips
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold text-slate-500 hover:text-indigo-600 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
          >
            {isExpanded ? 'Hide Steps' : 'Show Steps'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* STEP 1 */}
          <div 
            className={`relative rounded-xl p-4 border transition-all flex flex-col justify-between ${
              currentStep === 1 
                ? 'bg-indigo-50/50 border-indigo-300 ring-2 ring-indigo-500/20' 
                : items.length > 0 
                  ? 'bg-emerald-50/20 border-emerald-200' 
                  : 'bg-slate-50/60 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  items.length > 0 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-indigo-600 text-white'
                }`}>
                  {items.length > 0 ? '✓' : '1'}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Step 1
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                <PlusCircle className="w-4 h-4 text-indigo-600" />
                Add Your URLs
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Paste destination/tour links into the box below or upload a CSV file with your blog URLs.
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between">
              <span className={`text-[11px] font-medium ${items.length > 0 ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                {items.length > 0 ? `✓ ${items.length} URLs in queue` : 'Queue is empty'}
              </span>
              <a 
                href="#url-input-panel" 
                className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-0.5"
              >
                Go to Input <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* STEP 2 */}
          <div 
            className={`relative rounded-xl p-4 border transition-all flex flex-col justify-between ${
              currentStep === 2 
                ? 'bg-indigo-50/50 border-indigo-300 ring-2 ring-indigo-500/20' 
                : analyzedCount > 0 
                  ? 'bg-emerald-50/20 border-emerald-200' 
                  : 'bg-slate-50/60 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  readyToAnalyzeCount === 0 && analyzedCount > 0
                    ? 'bg-emerald-500 text-white' 
                    : currentStep === 2 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-slate-200 text-slate-700'
                }`}>
                  {readyToAnalyzeCount === 0 && analyzedCount > 0 ? '✓' : '2'}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Step 2
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                Click 'Analyze Pages'
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Click the blue <strong>"Analyze Pages"</strong> button to run a 10-point E-E-A-T & semantic SEO audit with Gemini AI.
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between">
              <span className={`text-[11px] font-medium ${readyToAnalyzeCount > 0 ? 'text-amber-700 font-semibold' : 'text-slate-500'}`}>
                {isLoading ? 'Auditing in progress...' : readyToAnalyzeCount > 0 ? `⚡ ${readyToAnalyzeCount} ready to analyze` : 'All analyzed'}
              </span>
              {readyToAnalyzeCount > 0 && (
                <button 
                  onClick={onTriggerAnalyze}
                  disabled={isLoading}
                  className="text-[11px] bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-0.5 rounded font-semibold flex items-center gap-0.5 cursor-pointer disabled:opacity-50"
                >
                  Start Audit
                </button>
              )}
            </div>
          </div>

          {/* STEP 3 */}
          <div 
            className={`relative rounded-xl p-4 border transition-all flex flex-col justify-between ${
              currentStep === 3 
                ? 'bg-indigo-50/50 border-indigo-300 ring-2 ring-indigo-500/20' 
                : analyzedCount > 0 
                  ? 'bg-emerald-50/20 border-emerald-200' 
                  : 'bg-slate-50/60 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  analyzedCount > 0 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {analyzedCount > 0 ? '✓' : '3'}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Step 3
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4 text-purple-600" />
                Review SEO Audit
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inspect missing travel entities (landmarks, transit hubs), search intent, freshness warnings, and FAQ ideas.
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between">
              <span className={`text-[11px] font-medium ${analyzedCount > 0 ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                {analyzedCount > 0 ? `✓ ${analyzedCount} audits ready` : 'Waiting for audit'}
              </span>
              {analyzedCount > 0 && (
                <a 
                  href="#results-table-section" 
                  className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-0.5"
                >
                  View Reports <ChevronRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* STEP 4 */}
          <div 
            className={`relative rounded-xl p-4 border transition-all flex flex-col justify-between ${
              currentStep === 4 
                ? 'bg-indigo-50/50 border-indigo-300 ring-2 ring-indigo-500/20' 
                : items.some(i => i.fullRewrite) 
                  ? 'bg-emerald-50/20 border-emerald-200' 
                  : 'bg-slate-50/60 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  items.some(i => i.fullRewrite) 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {items.some(i => i.fullRewrite) ? '✓' : '4'}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Step 4
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                <FileEdit className="w-4 h-4 text-indigo-600" />
                Generate Full Rewrite
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Click <strong>"Generate Full Rewrite"</strong> to write complete publication-ready articles with H2/H3s, insider tips & FAQ schema.
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500">
                {items.filter(i => i.fullRewrite).length > 0 
                  ? `✓ ${items.filter(i => i.fullRewrite).length} written` 
                  : 'Click Rewrite on any row'}
              </span>
              {firstAnalyzedItem && onOpenFirstRewrite && (
                <button
                  onClick={onOpenFirstRewrite}
                  className="text-[11px] text-purple-700 hover:text-purple-900 font-semibold flex items-center gap-0.5 cursor-pointer"
                >
                  Open Rewrite <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

        </div>
      )}
    </section>
  );
}
