const advantages = [
  {
    num: "01",
    title: "Подвал — скрытый резерв площади",
    text: "Технические помещения, кладовые и хранение выносятся в подвальный уровень, освобождая жилые этажи от лишнего.",
  },
  {
    num: "02",
    title: "Гараж внутри дома",
    text: "Встроенный гараж защищён от непогоды и напрямую соединён с жилыми зонами — никакой слякоти и мороза.",
  },
  {
    num: "03",
    title: "Чёткое зонирование",
    text: "Спальная зона изолирована от общей. Гости в гостиной не беспокоят тех, кто отдыхает в спальнях.",
  },
  {
    num: "04",
    title: "Рассчитан на большую семью",
    text: "5 жилых комнат, 3 спальни, большая кухня-гостиная — места достаточно для семьи с двумя детьми и гостями.",
  },
  {
    num: "05",
    title: "Фасад без хлопот",
    text: "Керамогранит не требует ежегодного ухода: устойчив к морозу, влаге и солнцу на протяжении десятков лет.",
  },
  {
    num: "06",
    title: "Готовая документация",
    text: "Полный пакет рабочих чертежей: строителям не нужно ничего «додумывать», всё прописано до деталей.",
  },
  {
    num: "07",
    title: "Тёплые стены, умный бюджет",
    text: "Газобетон хорошо держит тепло, снижает счета за отопление и позволяет сократить слой утеплителя.",
  },
  {
    num: "08",
    title: "Большая терраса",
    text: "Просторная открытая терраса — место для вечерних ужинов, отдыха и детских игр прямо у дома.",
  },
]

export function ProjectAdvantages() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-4 items-start mb-16">
          <div>
            <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-6">Преимущества</p>
            <h2 className="text-3xl md:text-4xl font-medium">Что делает<br />этот дом удобным</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed self-end">
            Продуманный проект — это не просто квадратные метры. Здесь каждое решение работает на комфорт и практичность жизни.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {advantages.map((adv) => (
            <div key={adv.num} className="bg-background p-8">
              <span className="text-muted-foreground/40 text-sm font-mono mb-6 block">{adv.num}</span>
              <h3 className="font-medium mb-3 leading-snug">{adv.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{adv.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
