import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "В каких регионах вы продаёте и строите дома?",
    answer:
      "Продаём готовые дома по всей России. Строительство под заказ ведём преимущественно в Центральном и Северо-Западном федеральных округах. Свяжитесь с нами — уточним возможности для вашего региона.",
  },
  {
    question: "Сколько времени занимает строительство дома под заказ?",
    answer:
      "В среднем от 6 до 12 месяцев — зависит от площади, сложности проекта и выбранных материалов. Сроки фиксируются в договоре, и мы их соблюдаем. На каждом этапе вы получаете отчёт о ходе работ.",
  },
  {
    question: "Можно ли изменить планировку или внешний вид готового проекта?",
    answer:
      "Да, мы адаптируем любой проект под ваши пожелания. Можем изменить планировку, фасад, отделочные материалы и инженерные решения. Стоимость доработок рассчитывается индивидуально.",
  },
  {
    question: "Что входит в сдачу дома «под ключ»?",
    answer:
      "Полная чистовая отделка, подключение всех коммуникаций (электричество, водоснабжение, отопление, канализация), установка окон и дверей, оформление документов на собственность. Вы получаете готовый дом — заезжаете и живёте.",
  },
  {
    question: "Есть ли у вас гарантия на построенный дом?",
    answer:
      "Да. Мы даём гарантию на конструктив и несущие элементы — 5 лет, на инженерные системы — 2 года, на отделочные работы — 1 год. Всё фиксируется в договоре.",
  },
  {
    question: "Как начать — купить или заказать строительство?",
    answer:
      "Просто позвоните или напишите нам. На первой бесплатной консультации обсудим ваши пожелания, бюджет и сроки. Если нужен готовый дом — покажем подходящие варианты. Если хотите построить — разработаем план и смету.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}