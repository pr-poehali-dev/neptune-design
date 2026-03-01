interface Props {
  onLead: () => void
}

export function ProjectFooterCTA({ onLead }: Props) {
  return (
    <section className="py-24 bg-foreground text-white">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-6">Следующий шаг</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 max-w-2xl mx-auto leading-tight">
          Нужен точный расчёт под ваш участок?
        </h2>
        <p className="text-white/60 mb-12 max-w-lg mx-auto">
          Каждый участок уникален — грунт, рельеф, инфраструктура влияют на итоговую цену. Оставьте заявку и получите персональную смету.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button onClick={onLead} className="bg-white text-foreground px-10 py-4 text-sm font-medium hover:bg-white/90 transition-colors w-full sm:w-auto">
            Оставить заявку
          </button>
          <a href="https://t.me/example" target="_blank" rel="noopener noreferrer" className="border border-white/30 text-white px-10 py-4 text-sm hover:bg-white/10 transition-colors w-full sm:w-auto text-center">
            Написать в мессенджер
          </a>
        </div>
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-center gap-8 text-white/50 text-sm">
          <a href="tel:+70000000000" className="hover:text-white transition-colors">+7 (000) 000-00-00</a>
          <a href="https://t.me/example" className="hover:text-white transition-colors">Telegram</a>
          <a href="https://wa.me/70000000000" className="hover:text-white transition-colors">WhatsApp</a>
          <a href="mailto:info@example.com" className="hover:text-white transition-colors">info@example.com</a>
        </div>
      </div>
    </section>
  )
}
