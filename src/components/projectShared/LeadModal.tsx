import { useState } from "react"
import { X, CheckCircle } from "lucide-react"

interface Props {
  open: boolean
  onClose: () => void
  projectName: string
  prefill?: Record<string, string>
}

const CONTACT_WAYS = ["Телефон", "Telegram", "WhatsApp"]

export function LeadModal({ open, onClose, projectName, prefill }: Props) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [contactWay, setContactWay] = useState("Телефон")
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) {
      setError("Пожалуйста, заполните имя и телефон.")
      return
    }
    setError("")
    setLoading(true)
    try {
      await fetch("https://functions.poehali.dev/224b976f-276f-46b9-a317-78cbf9185917", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          contact_way: contactWay,
          comment,
          estimate: prefill?.estimate ?? "",
          project: projectName,
        }),
      })
    } catch {
      // silent
    } finally {
      setDone(true)
      setLoading(false)
    }
  }

  const handleClose = () => {
    setDone(false)
    setName("")
    setPhone("")
    setContactWay("Телефон")
    setComment("")
    setError("")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={handleClose}>
      <div className="bg-white w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1">
          <X className="w-5 h-5" />
        </button>
        {done ? (
          <div className="p-10 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Заявка отправлена</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Мы свяжемся с вами по <strong>{contactWay.toLowerCase()}</strong> в ближайшее время.
            </p>
            <button onClick={handleClose} className="mt-8 bg-foreground text-white px-8 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors">
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8">
            <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase mb-2">{projectName}</p>
            <h3 className="text-xl font-medium mb-2">Отправить расчёт</h3>
            {prefill?.estimate && (
              <p className="text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
                Расчёт: <span className="font-medium text-foreground">{prefill.estimate}</span>
              </p>
            )}
            {!prefill?.estimate && <div className="mb-6" />}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">Имя *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Как к вам обращаться?" className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground transition-colors bg-background" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Телефон *</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 (000) 000-00-00" className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground transition-colors bg-background" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">Удобный способ связи</label>
                <div className="flex gap-2">
                  {CONTACT_WAYS.map((w) => (
                    <button key={w} type="button" onClick={() => setContactWay(w)} className={`flex-1 py-2 text-sm border transition-all ${contactWay === w ? "bg-foreground text-white border-foreground" : "border-border hover:border-foreground/50"}`}>
                      {w}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Комментарий</label>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Ваши пожелания, вопросы (необязательно)" rows={3} className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground transition-colors resize-none bg-background" />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            <button type="submit" disabled={loading} className="mt-6 w-full bg-foreground text-white py-4 text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-60">
              {loading ? "Отправляем..." : "Отправить заявку"}
            </button>
            <p className="text-xs text-muted-foreground mt-3 text-center">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>
          </form>
        )}
      </div>
    </div>
  )
}
