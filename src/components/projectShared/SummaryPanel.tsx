import { Download, Send } from "lucide-react"

interface CalcState {
  type: string
  distance: string
  area: number
  foundation: string
  basement: boolean
  wall: string
  slab: string
  roof: string
  roofInsulation: string
  facadeInsulation: string
  facade: string
  windows: string
  stairs: string
  engineering: string
  finish: string
}

interface Props {
  state: CalcState
  total: number
  perM2: number
  formatRub: (n: number) => string
  onExport: () => void
  onSend: () => void
}

const labels: Record<keyof CalcState, string> = {
  type: "Этажность",
  distance: "Удалённость",
  area: "Площадь дома",
  foundation: "Фундамент",
  basement: "Подвал/цоколь",
  wall: "Стены",
  slab: "Перекрытия",
  roof: "Кровля",
  roofInsulation: "Утепление кровли",
  facadeInsulation: "Утепление фасада",
  facade: "Отделка фасада",
  windows: "Окна",
  stairs: "Лестница",
  engineering: "Инженерные системы",
  finish: "Внутренняя отделка",
}

export function SummaryPanel({ state, total, perM2, formatRub, onExport, onSend }: Props) {
  return (
    <div className="bg-foreground text-white p-8 sticky top-6">
      <p className="text-white/50 text-xs tracking-[0.2em] uppercase mb-6">Предварительный расчёт</p>
      <p className="text-4xl font-medium mb-1">{formatRub(total)}</p>
      <p className="text-white/60 text-sm mb-8">{formatRub(perM2)} за м²</p>
      <div className="border-t border-white/10 pt-6 mb-8">
        <p className="text-white/50 text-xs uppercase tracking-widest mb-4">Выбранные параметры</p>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1 text-sm">
          {(Object.keys(labels) as Array<keyof CalcState>).map((key) => {
            const val = state[key]
            if (key === "basement") {
              return (
                <div key={key} className="flex justify-between gap-2">
                  <span className="text-white/50 flex-shrink-0">{labels[key]}</span>
                  <span className="text-right text-white/80">{val ? "Да" : "Нет"}</span>
                </div>
              )
            }
            return (
              <div key={key} className="flex justify-between gap-2">
                <span className="text-white/50 flex-shrink-0">{labels[key]}</span>
                <span className="text-right text-white/80">
                  {key === "area" ? `${val} м²` : String(val)}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <p className="text-white/40 text-xs mb-6 leading-relaxed">
        Цена предварительная. Итог — после уточнения участка и технического задания.
      </p>
      <div className="space-y-3">
        <button
          onClick={onExport}
          className="w-full flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 text-sm hover:bg-white/10 transition-colors"
        >
          <Download className="w-4 h-4" />
          Выгрузить расчёт
        </button>
        <button
          onClick={onSend}
          className="w-full flex items-center justify-center gap-2 bg-white text-foreground px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors"
        >
          <Send className="w-4 h-4" />
          Отправить расчёт
        </button>
      </div>
    </div>
  )
}
