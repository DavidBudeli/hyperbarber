import { hyperAssistantInsights } from "@/src/modules/ai/hyper-assistant"

const HyperAssistantPanel = () => {
  return (
    <div className="rounded-[8px] border border-cyan-300/15 bg-white/[0.035] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase text-cyan-100/60">Hyper Assistant</p>
          <h3 className="mt-1 text-lg font-semibold text-white">
            Inteligência operacional
          </h3>
        </div>
        <div className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.7)]" />
      </div>

      <div className="space-y-3">
        {hyperAssistantInsights.slice(0, 3).map((insight) => {
          const Icon = insight.icon
          return (
            <div
              key={insight.title}
              className="flex gap-3 rounded-[8px] border border-white/10 bg-black/20 p-3"
            >
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-cyan-300/10 text-cyan-100">
                <Icon size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {insight.title}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-300">
                  {insight.message}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HyperAssistantPanel
