const items = [
  {
    title: "Фундамент",
    detail: "Ленточный",
    text: "Надёжное основание, оптимальное для участков с умеренной нагрузкой и возможностью обустройства подвального этажа.",
  },
  {
    title: "Стены",
    detail: "Пеноблок / Газобетон",
    text: "Лёгкий и тёплый материал с хорошими тепло- и звукоизолирующими свойствами. Сокращает расходы на отопление.",
  },
  {
    title: "Перекрытия",
    detail: "Сборные плиты",
    text: "Заводские плиты перекрытий обеспечивают прочность и быстрый монтаж без потери в качестве.",
  },
  {
    title: "Фасад",
    detail: "Керамогранит",
    text: "Долговечное покрытие с минимальным уходом: устойчиво к морозам, влаге и выгоранию на солнце.",
  },
]

export function ProjectConstruct() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-6">Конструктив</p>
            <h2 className="text-3xl md:text-4xl font-medium mb-6">Материалы<br />и технологии</h2>
            <p className="text-muted-foreground leading-relaxed">
              Проект построен на проверенных решениях — практичных материалах с долгим сроком службы.
              Долговечный фасад из керамогранита не требует покраски и сохраняет вид десятилетиями.
            </p>
          </div>
          <div className="space-y-6">
            {items.map((item) => (
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
  )
}
