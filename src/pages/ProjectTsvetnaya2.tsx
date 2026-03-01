import { useState, useRef, useMemo } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { OptionGroup } from "@/components/projectShared/OptionGroup"
import { SummaryPanel } from "@/components/projectShared/SummaryPanel"
import { LeadModal } from "@/components/projectShared/LeadModal"
import { HowWeWork } from "@/components/projectShared/HowWeWork"
import { ProjectFooterCTA } from "@/components/projectShared/ProjectFooterCTA"
import { calculatePrice, formatRub, defaultState, CalcState } from "@/components/projectTsvetnaya2/calcLogic"

const PHOTOS = [
  { url: "https://cdn.poehali.dev/projects/45e5dd28-acf9-4577-bd02-33b9654b7bee/bucket/5eeae2f4-60fc-41ec-84c3-8ad19a376dad.jpg", label: "Вид с фасада" },
  { url: "https://cdn.poehali.dev/projects/45e5dd28-acf9-4577-bd02-33b9654b7bee/bucket/0887d7e0-c78c-4f6d-abdf-2280a0e14198.jpg", label: "Вид сбоку" },
]

const FLOOR_PLAN = "https://cdn.poehali.dev/projects/45e5dd28-acf9-4577-bd02-33b9654b7bee/bucket/3cd8b7b1-8274-444b-833a-7ba2ca7b2efe.jpg"

const AREAS = [150, 180, 204, 220, 250, 300]

const SPECS = [
  { label: "Общая площадь", value: "204 м²" },
  { label: "Этажность", value: "1 этаж" },
  { label: "Срок строительства", value: "от 3 мес." },
  { label: "Стоимость", value: "от 8 216 043 ₽" },
  { label: "Спален", value: "3" },
  { label: "Санузлов", value: "2" },
  { label: "Терраса", value: "69,37 м²" },
  { label: "Сауна", value: "Есть" },
  { label: "Гараж", value: "Нет" },
  { label: "Стены", value: "Газобетон / Кирпич" },
  { label: "Кровля", value: "Металлочерепица" },
]

const ADVANTAGES = [
  { num: "01", title: "Просторная терраса", text: "69 м² открытого пространства — идеально для отдыха, барбекю и летнего досуга всей семьи." },
  { num: "02", title: "Три изолированные спальни", text: "Каждый член семьи получает личное пространство — ни одна спальня не проходная." },
  { num: "03", title: "Сауна прямо в доме", text: "Не нужна отдельная постройка — сауна интегрирована в жилую зону, рядом с санузлом." },
  { num: "04", title: "Большая кухня-гостиная", text: "31,49 м² объединённого пространства — сердце дома для семейных ужинов и приёма гостей." },
  { num: "05", title: "Удобная логистика", text: "Продуманное зонирование: спальни отделены от зоны гостиной, постирочная и кладовая под рукой." },
  { num: "06", title: "Под ключ за 3 месяца", text: "Фиксированная смета и прозрачные этапы: от проекта до ключей в руках — быстро и без сюрпризов." },
]

function exportEstimate(s: CalcState, total: number, perM2: number) {
  const now = new Date()
  const dateStr = now.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
  const labels: Record<keyof CalcState, string> = { type: "Этажность", distance: "Удалённость", area: "Площадь", foundation: "Фундамент", basement: "Подвал", wall: "Стены", slab: "Перекрытия", roof: "Кровля", roofInsulation: "Утепление кровли", facadeInsulation: "Утепление фасада", facade: "Фасад", windows: "Окна", stairs: "Лестница", engineering: "Инженерия", finish: "Отделка" }
  const rows = (Object.keys(labels) as Array<keyof CalcState>).map((k) => {
    const v = k === "area" ? `${s[k]} м²` : k === "basement" ? (s[k] ? "Да" : "Нет") : String(s[k])
    return `<tr><td style="padding:5px 10px;color:#666;border-bottom:1px solid #eee;">${labels[k]}</td><td style="padding:5px 10px;border-bottom:1px solid #eee;font-weight:500;">${v}</td></tr>`
  }).join("")
  const html = `<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><title>Расчёт — Цветочная 2</title><style>body{font-family:Arial,sans-serif;max-width:700px;margin:40px auto;color:#1a1a1a}.price{font-size:36px;font-weight:700;margin:20px 0 4px}.perm2{color:#666;font-size:15px;margin-bottom:28px}table{width:100%;border-collapse:collapse;font-size:14px}.disc{margin-top:28px;padding:14px;background:#f5f5f5;font-size:13px;color:#666;border-left:3px solid #ccc}</style></head><body><h1>Цветочная 2 — Расчёт стоимости</h1><p style="color:#888;font-size:13px">Сформировано: ${dateStr}</p><div class="price">${formatRub(total)}</div><div class="perm2">${formatRub(perM2)} за м²</div><table>${rows}</table><div class="disc">Расчёт предварительный. Итог — после изучения участка и согласования ТЗ.</div></body></html>`
  const blob = new Blob([html], { type: "text/html;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url; a.download = `raschet-tsvetnaya2-${now.toISOString().slice(0, 10)}.html`; a.click()
  URL.revokeObjectURL(url)
}

export default function ProjectTsvetnaya2() {
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
          <img src={PHOTOS[0].url} alt="Цветочная 2" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>
        <div className="absolute top-8 left-8 z-10">
          <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs tracking-[0.2em] uppercase px-4 py-2">Цветочная 2</span>
        </div>
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <p className="text-white/60 text-sm tracking-[0.3em] uppercase mb-5">Готовый проект</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6">Просторный<br />одноэтажный дом</h1>
            <p className="text-white/75 text-lg mb-10">204 м² · 1 этаж · 3 спальни · сауна · терраса 69 м²</p>
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
              <p className="text-muted-foreground leading-relaxed">Каменный одноэтажный дом — максимум комфорта для семьи: просторная терраса, сауна, три изолированные спальни и большая кухня-гостиная.</p>
            </div>
            <div className="space-y-6">
              {[
                { title: "Фундамент", detail: "Монолитная плита", text: "Надёжное основание для большого одноэтажного дома — равномерная нагрузка и защита от влаги." },
                { title: "Стены", detail: "Газобетон / Кирпич / Бетон", text: "Каменный дом — долговечность, тепло и пожаробезопасность. Хорошая теплоизоляция без лишних затрат." },
                { title: "Перекрытия", detail: "Деревянные балки", text: "Лёгкое и экономичное решение для одноэтажного дома с тёплым чердаком." },
                { title: "Кровля", detail: "Металлочерепица", text: "Долговечное покрытие с широкой цветовой гаммой. Хорошо держит снеговую нагрузку." },
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

      {/* Floor plan */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-6">Планировка</p>
          <h2 className="text-3xl md:text-4xl font-medium mb-12">Планировка 1 этажа</h2>
          <div className="bg-secondary/20 overflow-hidden">
            <img src={FLOOR_PLAN} alt="Планировка Цветочная 2" className="w-full object-contain max-h-[600px]" />
          </div>
          <div className="mt-6 p-4 bg-secondary/40 text-sm text-muted-foreground text-center">
            Кухня 12,08 м² · Гостиная-столовая 31,49 м² · Прихожая 7,15 м² · Холл 8,24 м²<br />
            Спальня 17,10 м² · Спальня 12,09 м² · Спальня 9,74 м² · Сауна 3,74 м² · Терраса 69,37 м²<br />
            Постирочная 6,54 м² · Кладовая 2,95 м² · Тех. помещение 3,97 м² · Крыльцо 3,57 м²
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
            <p className="text-muted-foreground leading-relaxed self-end">Одноэтажный формат — удобство для всей семьи, включая пожилых и детей. Всё на одном уровне.</p>
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
              <p className="text-3xl font-medium mb-2">от 8 216 043 ₽</p>
              <p className="text-muted-foreground text-sm">Срок: от 3 месяцев</p>
            </div>
            <div className="bg-foreground text-white p-8">
              <p className="text-white/60 text-sm mb-2">Строительство под ключ</p>
              <p className="text-3xl font-medium mb-2">по договору</p>
              <p className="text-white/60 text-sm">С отделкой, инженерией и благоустройством</p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">Дополнительно можно заказать: дизайн интерьера, изменения проекта, смету, контроль этапов.</p>
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
                <OptionGroup label="Конфигурация этажности" options={["1 этаж", "1 этаж + мансарда", "2 этажа", "2 этажа + мансарда", "Плоская кровля"]} value={s.type} onChange={set("type")} />
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
                <OptionGroup label="Перекрытия" options={["Деревянные балки", "Монолитные плиты"]} value={s.slab} onChange={set("slab")} />
                <OptionGroup label="Кровельное покрытие" options={["Металлочерепица", "Битумная черепица", "Мягкая черепица"]} value={s.roof} onChange={set("roof")} />
                <OptionGroup label="Утепление кровли" options={["Без утепления", "Минплита 200 мм"]} value={s.roofInsulation} onChange={set("roofInsulation")} />
                <OptionGroup label="Утепление фасада" options={["Без утепления", "Пенополистирол 100 мм", "Фасадная минплита 100 мм"]} value={s.facadeInsulation} onChange={set("facadeInsulation")} />
                <OptionGroup label="Отделка фасада" options={["Штукатурка", "Облицовочный кирпич", "Сайдинг"]} value={s.facade} onChange={set("facade")} />
                <OptionGroup label="Остекление" options={["Металлопластиковые", "Алюминиевые", "Деревянные"]} value={s.windows} onChange={set("windows")} />
                <OptionGroup label="Лестница" options={["Нет (одноэтажный)", "Деревянная", "Металлическая"]} value={s.stairs} onChange={set("stairs")} />
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
      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} projectName="Цветочная 2" prefill={leadData} />
    </div>
  )
}
