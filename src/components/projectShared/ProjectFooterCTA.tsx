import { Send, Phone } from "lucide-react";

const PHONE = "+79013325199";
const PHONE_DISPLAY = "+7 901 332 51 99";
const TELEGRAM_LINK = "https://t.me/@tttim_skl";

interface Props {
  onLead: () => void;
}

export function ProjectFooterCTA({ onLead }: Props) {
  return (
    <section className="py-24 bg-foreground text-white">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-6">
          Следующий шаг
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 max-w-2xl mx-auto leading-tight">
          Нужен точный расчёт под ваш участок?
        </h2>
        <p className="text-white/60 mb-12 max-w-lg mx-auto">
          Каждый участок уникален — грунт, рельеф, инфраструктура влияют на
          итоговую цену. Оставьте заявку и получите персональную смету.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onLead}
            className="bg-white text-foreground px-10 py-4 text-sm font-medium hover:bg-white/90 transition-colors w-full sm:w-auto"
          >
            Оставить заявку
          </button>
          <button
            onClick={onLead}
            className="border border-white/30 text-white px-10 py-4 text-sm hover:bg-white/10 transition-colors w-full sm:w-auto"
          >
            Получить расчёт
          </button>
        </div>
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-center gap-8 text-white/50 text-sm">
          <a
            href={`tel:${PHONE}`}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Send className="w-4 h-4" />
            Написать в Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
