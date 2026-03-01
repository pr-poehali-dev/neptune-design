import { useState, useRef, useMemo } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { OptionGroup } from "@/components/projectShared/OptionGroup"
import { SummaryPanel } from "@/components/projectShared/SummaryPanel"
import { ContactModal } from "@/components/ContactModal"
import { FloatingCTA } from "@/components/FloatingCTA"
import { HowWeWork } from "@/components/projectShared/HowWeWork"
import { ProjectFooterCTA } from "@/components/projectShared/ProjectFooterCTA"
import { calculatePrice, formatRub, defaultState, CalcState } from "@/components/projectVyatlina/calcLogic"

const PHOTOS = [
  { url: "https://cdn.poehali.dev/projects/45e5dd28-acf9-4577-bd02-33b9654b7bee/bucket/64c28452-9155-4b56-a6ef-522ad1652bb2.jpg", label: "Вид с фасада" },
  { url: "https://cdn.poehali.dev/projects/45e5dd28-acf9-4577-bd02-33b9654b7bee/bucket/a27da797-71c8-4d74-a09a-6f859c33e6a8.jpg", label: "Вид сбоку" },
]

const AREAS = [180, 200, 220, 236, 260, 300]

const SPECS = [
  { label: "Площадь застройки", value: "235,81 м²" },
  { label: "Этажность", value: "2 этажа" },
  { label: "Стоимость", value: "от 12 774 668 ₽" },
  { label: "Кровля", value: "Плоская" },
  { label: "Спален", value: "3" },
  { label: "Ванных", value: "2" },
  { label: "Гараж", value: "Есть" },
  { label: "Терраса", value: "Есть" },
  { label: "Кабинет", value: "Есть" },
  { label: "Второй свет", value: "Есть" },
  { label: "Стены", value: "Газобетон / Кирпич" },
]

const ADVANTAGES = [
  { num: "01", title: "Гараж в доме", text: "Встроенный гараж — заходите прямо с улицы, не выходя под дождь. Удобно и безопасно." },
  { num: "02", title: "Второй свет", text: "Двухсветное пространство делает дом визуально больше и наполняет его естественным светом." },
  { num: "03", title: "Три гардеробные", text: "У каждой спальни — своя гардеробная. Порядок и хранение продуманы с нуля." },
  { num: "04", title: "Терраса для отдыха", text: "Просторная открытая терраса — продолжение жилого пространства в тёплое время года." },
  { num: "05", title: "Кабинет для работы", text: "Отдельный кабинет на 1 этаже — работайте из дома без помех и шума." },
  { num: "06", title: "Современная архитектура", text: "Плоская кровля и чистые фасады — актуальный стиль, который не устаревает десятилетиями." },
]

function exportEstimate(s: CalcState, total: number, perM2: number) {
  const now = new Date()
  const dateStr = now.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
  const labels: Record<keyof CalcState, string> = { type: "Этажность", distance: "Удалённость", area: "Площадь", foundation: "Фундамент", basement: "Подвал", wall: "Стены", slab: "Перекрытия", roof: "Кровля", roofInsulation: "Утепление кровли", facadeInsulation: "Утепление фасада", facade: "Фасад", windows: "Окна", stairs: "Лестница", engineering: "Инженерия", finish: "Отделка" }
  const rows = (Object.keys(labels) as Array<keyof CalcState>).map((k) => {
    const v = k === "area" ? `${s[k]} м²` : k === "basement" ? (s[k] ? "Да" : "Нет") : String(s[k])
    return `<tr><td style="padding:5px 10px;color:#666;border-bottom:1px solid #eee;">${labels[k]}</td><td style="padding:5px 10px;border-bottom:1px solid #eee;font-weight:500;">${v}</td></tr>`
  }).join("")
  const html = `<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><title>Расчёт — Вятлина</title><style>body{font-family:Arial,sans-serif;max-width:700px;margin:40px auto;color:#1a1a1a}.price{font-size:36px;font-weight:700;margin:20px 0 4px}.perm2{color:#666;font-size:15px;margin-bottom:28px}table{width:100%;border-collapse:collapse;font-size:14px}.disc{margin-top:28px;padding:14px;background:#f5f5f5;font-size:13px;color:#666;border-left:3px solid #ccc}</style></head><body><h1>Вятлина — Расчёт стоимости</h1><p style="color:#888;font-size:13px">Сформировано: ${dateStr}</p><div class="price">${formatRub(total)}</div><div class="perm2">${formatRub(perM2)} за м²</div><table>${rows}</table><div class="disc">Расчёт предварительный. Итог — после изучения участка и согласования ТЗ.</div></body></html>`
  const blob = new Blob([html], { type: "text/html;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url; a.download = `raschet-vyatlina-${now.toISOString().slice(0, 10)}.html`; a.click()
  URL.revokeObjectURL(url)
}

export default function ProjectVyatlina() {
  const [leadOpen, setLeadOpen] = useState(false)
  const [leadData, setLeadData] = useState<Record<string, string> | undefined>()
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [s, setS] = useState<CalcState>(defaultState)
  const calcRef = useRef<HTMLDivElement>(null)

  const set = <K extends keyof CalcState>(key: K) => (val: CalcState[K]) => setS((p) => ({ ...p, [key]: val }))
  const { total, perM2 } = useMemo(() => calculatePrice(s), [s])

  const openLead = (data?: Record<string, string>) => { setLeadData(data); setLeadOpen(true) }
  const scrollToCalc = () => calcRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  const prevPhoto = () => setLightbox((i) => (i === null ? 0 : (i - 1 + PHOTOS.length) % PHOTOS.length))
  const nextPhoto = () => setLightbox((i) => (i === null ? 0 : (i + 1) % PHOTOS.length))

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <img src={PHOTOS[0].url} alt="Вятлина" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>
        <div className="absolute top-8 left-8 z-10">
          <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs tracking-[0.2em] uppercase px-4 py-2">Вятлина</span>
        </div>
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <p className="text-white/60 text-sm tracking-[0.3em] uppercase mb-5">Готовый проект</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6">Двухэтажный дом<br />с гаражом и террасой</h1>
            <p className="text-white/75 text-lg mb-10">235,81 м² · 2 этажа · 3 спальни · гараж · плоская кровля</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={scrollToCalc} className="bg-white text-foreground px-8 py-4 text-sm font-medium hover:bg-white/90 transition-colors">Рассчитать стоимость</button>
              <button onClick={() => openLead()} className="border border-white/60 text-white px-8 py-4 text-sm font-medium hover:bg-white/10 transition-colors">Получить консультацию</button>
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-20 bg-foreground text-white">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-12">Ключевые параметры</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/10">
            {SPECS.map((spec) => (
              <div key={spec.label} className="bg-foreground px-6 py-7">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-2">{spec.label}</p>
                <p className="text-white font-medium text-lg leading-tight">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Construct */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-6">Конструктив</p>
              <h2 className="text-3xl md:text-4xl font-medium mb-6">Материалы<br />и технологии</h2>
              <p className="text-muted-foreground leading-relaxed">Современный двухэтажный дом с плоской кровлей — максимум пространства, встроенный гараж, кабинет и второй свет. Построен для постоянного проживания большой семьи.</p>
            </div>
            <div className="space-y-6">
              {[
                { title: "Фундамент", detail: "Монолитная плита", text: "Надёжное основание для двухэтажного тяжёлого дома — полная защита от грунтовых вод и просадок." },
                { title: "Стены", detail: "Газобетон / Кирпич / Бетон", text: "Каменный дом — долговечность десятилетий, пожаробезопасность и высокая теплоизоляция." },
                { title: "Перекрытия", detail: "Монолитные плиты", text: "Жёсткая конструкция для двухэтажного дома — надёжно передаёт нагрузку и снижает вибрации." },
                { title: "Кровля", detail: "Плоская, с инверсионным утеплением", text: "Современное решение: минимум стыков, удобное обслуживание, возможность создать эксплуатируемую кровлю." },
              ].map((item) => (
                <div key={item.title} className="border-b border-border pb-6 last:border-0 last:pb-0">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-medium">{item.title}</h3>
                    <span className="text-sm text-muted-foreground">{item.detail}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-6">Визуализация</p>
          <h2 className="text-3xl md:text-4xl font-medium mb-12">Как выглядит дом</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {PHOTOS.map((photo, i) => (
              <button key={i} onClick={() => setLightbox(i)} className="group relative overflow-hidden aspect-[4/3] bg-secondary block w-full text-left">
                <img src={photo.url} alt={photo.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <span className="absolute bottom-4 left-4 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">{photo.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Floor plan (rooms list) */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-6">Планировка</p>
          <h2 className="text-3xl md:text-4xl font-medium mb-12">Состав помещений</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4">1 этаж</p>
              <div className="space-y-2">
                {[
                  ["Терраса", ""],
                  ["Тамбур", ""],
                  ["Гардероб", ""],
                  ["Кухня-гостиная", ""],
                  ["Кабинет", ""],
                  ["Техническое помещение", ""],
                  ["Санузел", ""],
                  ["Гараж", ""],
                ].map(([room]) => (
                  <div key={room} className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm">{room}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4">2 этаж</p>
              <div className="space-y-2">
                {[
                  ["Холл", ""],
                  ["Спальня 1", ""],
                  ["Спальня 2", ""],
                  ["Спальня 3", ""],
                  ["Гардеробная 1", ""],
                  ["Гардеробная 2", ""],
                  ["Гардеробная 3", ""],
                  ["Ванная комната 1", ""],
                  ["Ванная комната 2", ""],
                  ["Постирочная", ""],
                  ["Второй свет", ""],
                ].map(([room]) => (
                  <div key={room} className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm">{room}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button onClick={(e) => { e.stopPropagation(); setLightbox(null) }} className="absolute top-6 right-6 text-white/60 hover:text-white p-2"><X className="w-6 h-6" /></button>
          <button onClick={(e) => { e.stopPropagation(); prevPhoto() }} className="absolute left-4 md:left-8 text-white/60 hover:text-white p-2"><ChevronLeft className="w-8 h-8" /></button>
          <div className="max-w-5xl w-full px-16" onClick={(e) => e.stopPropagation()}>
            <img src={PHOTOS[lightbox].url} alt={PHOTOS[lightbox].label} className="w-full max-h-[80vh] object-contain" />
            <p className="text-white/50 text-sm text-center mt-4">{PHOTOS[lightbox].label}</p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); nextPhoto() }} className="absolute right-4 md:right-8 text-white/60 hover:text-white p-2"><ChevronRight className="w-8 h-8" /></button>
        </div>
      )}

      {/* Advantages */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-4 items-start mb-16">
            <div>
              <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-6">Преимущества</p>
              <h2 className="text-3xl md:text-4xl font-medium">Что делает<br />этот дом удобным</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed self-end">Двухэтажный дом с гаражом — полноценное решение для большой семьи с высокими требованиями к комфорту.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {ADVANTAGES.map((adv) => (
              <div key={adv.num} className="bg-background p-8">
                <span className="text-muted-foreground/40 text-sm font-mono mb-6 block">{adv.num}</span>
                <h3 className="font-medium mb-3 leading-snug">{adv.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{adv.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Стоимость проекта */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-6">Стоимость строительства</p>
          <h2 className="text-3xl font-medium mb-10">Цена проекта</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-border p-8">
              <p className="text-muted-foreground text-sm mb-2">Базовая стоимость строительства</p>
              <p className="text-3xl font-medium mb-2">от 12 774 668 ₽</p>
              <p className="text-muted-foreground text-sm">235,81 м² · 2 этажа · гараж</p>
            </div>
            <div className="bg-foreground text-white p-8">
              <p className="text-white/60 text-sm mb-2">Строительство под ключ</p>
              <p className="text-3xl font-medium mb-2">по договору</p>
              <p className="text-white/60 text-sm">С отделкой, инженерией и доработкой проекта</p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">Дополнительно можно заказать: дизайн интерьера, изменения проекта, смету, контроль этапов строительства.</p>
        </div>
      </section>

      {/* Calculator */}
      <div ref={calcRef}>
        <section id="calculator" className="py-24 bg-secondary/20">
          <div className="container mx-auto px-6 md:px-12">
            <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-6">Онлайн-калькулятор</p>
            <h2 className="text-3xl md:text-4xl font-medium mb-4">Стоимость строительства</h2>
            <p className="text-muted-foreground mb-14">Выбирайте параметры — цена пересчитывается мгновенно.</p>
            <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
              <div>
                <OptionGroup label="Конфигурация этажности" options={["1 этаж", "2 этажа", "2 этажа + гараж", "Плоская кровля"]} value={s.type} onChange={set("type")} />
                <OptionGroup label="Логистика / удалённость" options={["до 30 км", "30–70 км", "70–100 км", "100–120 км"]} value={s.distance} onChange={set("distance")} />
                <div className="mb-8">
                  <p className="text-sm font-medium mb-1">Площадь дома</p>
                  <p className="text-xs text-muted-foreground mb-3">Если планируется подвал — указывайте площадь без него.</p>
                  <div className="flex flex-wrap gap-2">
                    {AREAS.map((a) => (
                      <button key={a} onClick={() => set("area")(a)} className={`px-4 py-2 text-sm border transition-all duration-150 ${s.area === a ? "bg-foreground text-white border-foreground" : "bg-background text-foreground border-border hover:border-foreground/50"}`}>{a} м²</button>
                    ))}
                  </div>
                </div>
                <OptionGroup label="Основание дома" options={["Монолитная плита", "УШП плита", "Финский фундамент", "Ленточный фундамент"]} value={s.foundation} onChange={set("foundation")} />
                <div className="mb-8 -mt-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={s.basement} onChange={(e) => set("basement")(e.target.checked)} className="w-4 h-4 accent-foreground" />
                    <span className="text-sm">Добавить подвальный / цокольный уровень</span>
                  </label>
                </div>
                <OptionGroup label="Материал стен" options={["Газобетон / Пеноблок", "Кирпич", "Каркас"]} value={s.wall} onChange={set("wall")} />
                <OptionGroup label="Перекрытия" options={["Монолитные плиты", "Деревянные балки"]} value={s.slab} onChange={set("slab")} />
                <OptionGroup label="Кровельное покрытие" options={["Плоская кровля", "Металлочерепица", "Битумная черепица"]} value={s.roof} onChange={set("roof")} />
                <OptionGroup label="Утепление кровли" options={["Без утепления", "Минплита 200 мм"]} value={s.roofInsulation} onChange={set("roofInsulation")} />
                <OptionGroup label="Утепление фасада" options={["Без утепления", "Пенополистирол 100 мм", "Фасадная минплита 100 мм"]} value={s.facadeInsulation} onChange={set("facadeInsulation")} />
                <OptionGroup label="Отделка фасада" options={["Штукатурка", "Облицовочный кирпич", "Комбо (штукатурка + дерево)"]} value={s.facade} onChange={set("facade")} />
                <OptionGroup label="Остекление" options={["Металлопластиковые", "Алюминиевые", "Деревянные"]} value={s.windows} onChange={set("windows")} />
                <OptionGroup label="Лестница" options={["Деревянная", "Металлическая", "Бетонная"]} value={s.stairs} onChange={set("stairs")} />
                <OptionGroup label="Инженерные системы" hint="Водоснабжение, отопление, электрика, канализация" options={["Без инженерии", "Эконом", "Стандарт", "Премиум"]} value={s.engineering} onChange={set("engineering")} />
                <OptionGroup label="Внутренняя отделка" options={["Без отделки", "Эконом", "Стандарт", "Премиум"]} value={s.finish} onChange={set("finish")} />
              </div>
              <SummaryPanel state={s} total={total} perM2={perM2} formatRub={formatRub} onExport={() => exportEstimate(s, total, perM2)} onSend={() => openLead({ estimate: `${formatRub(total)} (${s.area} м², ${s.type})` })} />
            </div>
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-foreground text-white px-6 py-4 flex items-center justify-between">
              <div><p className="text-xs text-white/60">Итого</p><p className="font-medium text-lg">{formatRub(total)}</p></div>
              <div className="flex gap-3">
                <button onClick={() => exportEstimate(s, total, perM2)} className="border border-white/30 text-white px-4 py-2 text-sm">Скачать</button>
                <button onClick={() => openLead({ estimate: `${formatRub(total)} (${s.area} м², ${s.type})` })} className="bg-white text-foreground px-4 py-2 text-sm font-medium">Отправить</button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <HowWeWork />
      <ProjectFooterCTA onLead={() => openLead()} />
      <ContactModal open={leadOpen} onClose={() => setLeadOpen(false)} projectName="Вятлина" prefill={leadData} />
      <FloatingCTA />
    </div>
  )
}