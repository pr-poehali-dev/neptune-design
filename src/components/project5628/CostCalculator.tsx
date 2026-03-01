import { useState, useMemo } from "react"
import { OptionGroup } from "./OptionGroup"
import { SummaryPanel } from "./SummaryPanel"
import { calculatePrice, defaultState, CalcState, formatRub } from "./calcLogic"
import { exportEstimate } from "./ExportEstimate"

const AREAS = [100, 150, 200, 250, 300, 350, 400, 450, 500, 600]

interface Props {
  onSendEstimate: (data: Record<string, string>) => void
}

export function CostCalculator({ onSendEstimate }: Props) {
  const [s, setS] = useState<CalcState>(defaultState)

  const set = <K extends keyof CalcState>(key: K) => (val: CalcState[K]) =>
    setS((prev) => ({ ...prev, [key]: val }))

  const { total, perM2 } = useMemo(() => calculatePrice(s), [s])

  const handleSend = () => {
    onSendEstimate({
      estimate: `${formatRub(total)} (${s.area} м², ${s.type})`,
    })
  }

  const handleExport = () => exportEstimate(s, total, perM2)

  return (
    <section id="calculator" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6 md:px-12">
        <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-6">Онлайн-калькулятор</p>
        <h2 className="text-3xl md:text-4xl font-medium mb-4">Стоимость строительства</h2>
        <p className="text-muted-foreground mb-14">
          Выбирайте параметры — цена пересчитывается мгновенно.
        </p>

        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
          {/* Options */}
          <div>
            <OptionGroup
              label="Конфигурация этажности"
              options={Object.keys({ "1 этаж": 1, "1 этаж + мансарда": 1, "2 этажа": 1, "2 этажа + мансарда": 1, "Плоская кровля": 1 })}
              value={s.type}
              onChange={set("type")}
            />

            <OptionGroup
              label="Логистика / удалённость от города"
              options={["до 30 км", "30–70 км", "70–100 км", "100–120 км"]}
              value={s.distance}
              onChange={set("distance")}
            />

            {/* Площадь */}
            <div className="mb-8">
              <p className="text-sm font-medium mb-1">Площадь дома</p>
              <p className="text-xs text-muted-foreground mb-3">
                Если планируется подвал / цоколь — указывайте площадь без учёта подвального уровня.
              </p>
              <div className="flex flex-wrap gap-2">
                {AREAS.map((a) => (
                  <button
                    key={a}
                    onClick={() => set("area")(a)}
                    className={`px-4 py-2 text-sm border transition-all duration-150 ${
                      s.area === a
                        ? "bg-foreground text-white border-foreground"
                        : "bg-background text-foreground border-border hover:border-foreground/50"
                    }`}
                  >
                    {a} м²
                  </button>
                ))}
              </div>
            </div>

            {/* Фундамент + подвал */}
            <OptionGroup
              label="Основание дома"
              options={["Монолитная плита", "УШП плита", "Финский фундамент"]}
              value={s.foundation}
              onChange={set("foundation")}
            />
            <div className="mb-8 -mt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={s.basement}
                  onChange={(e) => set("basement")(e.target.checked)}
                  className="w-4 h-4 accent-foreground"
                />
                <span className="text-sm">Добавить подвальный / цокольный уровень</span>
              </label>
            </div>

            <OptionGroup
              label="Материал стен"
              options={["Газобетон"]}
              value={s.wall}
              onChange={set("wall")}
            />

            <OptionGroup
              label="Перекрытия"
              options={["Монолитные плиты перекрытия"]}
              value={s.slab}
              onChange={set("slab")}
            />

            <OptionGroup
              label="Кровельное покрытие"
              options={["Мягкая черепица"]}
              value={s.roof}
              onChange={set("roof")}
            />

            <OptionGroup
              label="Утепление кровли"
              options={["Без утепления", "Минплита 200 мм"]}
              value={s.roofInsulation}
              onChange={set("roofInsulation")}
            />

            <OptionGroup
              label="Утепление фасада"
              options={["Без утепления", "Пенополистирол 100 мм", "Фасадная минплита 100 мм"]}
              value={s.facadeInsulation}
              onChange={set("facadeInsulation")}
            />

            <OptionGroup
              label="Отделка фасада"
              options={["Облицовочный кирпич"]}
              value={s.facade}
              onChange={set("facade")}
            />

            <OptionGroup
              label="Остекление"
              options={["ПВХ-окна"]}
              value={s.windows}
              onChange={set("windows")}
            />

            <OptionGroup
              label="Лестница"
              options={["Не требуется", "Металлическая", "Деревянная", "Бетонная"]}
              value={s.stairs}
              onChange={set("stairs")}
            />

            <OptionGroup
              label="Инженерные системы"
              hint="Водоснабжение, отопление, электрика, канализация"
              options={["Без инженерии", "Эконом", "Стандарт", "Премиум"]}
              value={s.engineering}
              onChange={set("engineering")}
            />

            <OptionGroup
              label="Внутренняя отделка"
              options={["Без отделки", "Эконом", "Стандарт", "Премиум"]}
              value={s.finish}
              onChange={set("finish")}
            />
          </div>

          {/* Summary Panel */}
          <div>
            <SummaryPanel
              state={s}
              total={total}
              perM2={perM2}
              onExport={handleExport}
              onSend={handleSend}
            />
          </div>
        </div>

        {/* Mobile summary bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-foreground text-white px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-white/60">Итого</p>
            <p className="font-medium text-lg">{formatRub(total)}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleExport} className="border border-white/30 text-white px-4 py-2 text-sm">
              Скачать
            </button>
            <button onClick={handleSend} className="bg-white text-foreground px-4 py-2 text-sm font-medium">
              Отправить
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
