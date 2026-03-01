const steps = [
  { num: "01", title: "Заявка", text: "Оставляете контакт — менеджер связывается в течение дня, уточняет задачу и параметры участка." },
  { num: "02", title: "Смета", text: "Готовим детальный расчёт под ваш проект и участок: материалы, сроки, стоимость по каждому этапу." },
  { num: "03", title: "Договор", text: "Фиксируем все условия в договоре: сроки, гарантии, цену. Без скрытых платежей." },
  { num: "04", title: "Строительство и сдача", text: "Ведём стройку под контролем прораба. Сдаём объект с актом приёмки и гарантийными обязательствами." },
]

export function HowWeWork() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-6">Процесс</p>
        <h2 className="text-3xl md:text-4xl font-medium mb-16">Как мы работаем</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {steps.map((step) => (
            <div key={step.num} className="bg-background p-8">
              <span className="text-5xl font-light text-foreground/10 mb-6 block">{step.num}</span>
              <h3 className="font-medium text-lg mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
