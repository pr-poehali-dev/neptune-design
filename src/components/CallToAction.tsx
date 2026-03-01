import { useState } from "react";
import { ArrowRight, Send, Phone } from "lucide-react";
import { HighlightedText } from "./HighlightedText";
import { ContactModal } from "./ContactModal";

const PHONE = "+79013325199";
const PHONE_DISPLAY = "+7 901 332 51 99";
const TELEGRAM_LINK = "https://web.telegram.org/a/$0";

export function CallToAction() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="contact"
        className="py-32 md:py-29 bg-foreground text-primary-foreground"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-8">
              Получить консультацию
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-8 text-balance">
              Найдём дом,
              <br />
              который вам <HighlightedText>подойдёт</HighlightedText>
            </h2>

            <p className="text-primary-foreground/70 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
              Расскажите о своих пожеланиях — бюджет, площадь, регион. Мы
              подберём готовый вариант или составим план строительства.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-3 bg-primary-foreground text-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/90 transition-colors duration-300 group"
              >
                Оставить заявку
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-3 bg-primary-foreground text-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/90 transition-colors duration-300"
              >
                Получить расчёт
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-primary-foreground/60 text-sm">
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              >
                <Send className="w-4 h-4" />
                Написать в Telegram
              </a>
              <a
                href={`tel:${PHONE}`}
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContactModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Оставить заявку"
      />
    </>
  );
}
