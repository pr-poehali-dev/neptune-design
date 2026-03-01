import { useState, useEffect } from "react";
import { X, Phone, Send } from "lucide-react";

const PHONE = "+79013325199";
const PHONE_DISPLAY = "+7 901 332 51 99";
const TELEGRAM_LINK = "https://t.me/@tttim_skl";
const LEADS_URL =
  "https://functions.poehali.dev/224b976f-276f-46b9-a317-78cbf9185917";

interface Props {
  open: boolean;
  onClose: () => void;
  projectName?: string;
  prefill?: Record<string, string>;
  title?: string;
}

export function ContactModal({
  open,
  onClose,
  projectName = "",
  prefill,
  title,
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Пожалуйста, заполните имя и телефон.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await fetch(LEADS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          telegram: telegram.trim(),
          contact_way: telegram.trim() ? "Telegram" : "Телефон",
          estimate: prefill?.estimate ?? "",
          project: projectName,
        }),
      });
    } catch {
      // silent
    } finally {
      setDone(true);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setDone(false);
    setName("");
    setPhone("");
    setTelegram("");
    setError("");
    onClose();
  };

  const modalTitle =
    title ?? (prefill?.estimate ? "Отправить расчёт" : "Оставить заявку");

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="bg-white w-full max-w-md relative shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {done ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-medium mb-3">
              Спасибо, что выбрали нас!
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Мы свяжемся с вами в ближайшее время.
            </p>
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#229ED9] text-white py-4 text-sm font-medium hover:bg-[#1e8fc4] transition-colors mb-3"
            >
              <Send className="w-4 h-4" />
              Написать в Telegram
            </a>
            <button
              onClick={handleClose}
              className="w-full border border-border text-foreground py-3 text-sm hover:bg-secondary transition-colors"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8">
            {projectName && (
              <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase mb-2">
                {projectName}
              </p>
            )}
            <h3 className="text-2xl font-medium mb-2">{modalTitle}</h3>
            {prefill?.estimate && (
              <p className="text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
                Расчёт:{" "}
                <span className="font-medium text-foreground">
                  {prefill.estimate}
                </span>
              </p>
            )}
            {!prefill?.estimate && <div className="mb-6" />}

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-medium block mb-1.5">
                  Имя <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как к вам обращаться?"
                  className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground transition-colors bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">
                  Телефон <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (000) 000-00-00"
                  className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground transition-colors bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">
                  Telegram{" "}
                  <span className="text-muted-foreground font-normal text-xs">
                    (необязательно)
                  </span>
                </label>
                <input
                  type="text"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  placeholder="@username"
                  className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground transition-colors bg-background"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-foreground text-white py-4 text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-60 mb-3"
            >
              {loading ? "Отправляем..." : "Отправить заявку"}
            </button>
            <p className="text-xs text-muted-foreground text-center mb-6">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных
            </p>

            <div className="border-t border-border pt-6">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4 text-center">
                Или свяжитесь напрямую
              </p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#229ED9] text-white py-3 text-sm font-medium hover:bg-[#1e8fc4] transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Telegram
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="flex items-center justify-center gap-2 border border-border text-foreground py-3 text-sm font-medium hover:bg-secondary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Позвонить
                </a>
              </div>
              <p className="text-center text-muted-foreground text-sm mt-3">
                {PHONE_DISPLAY}
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
