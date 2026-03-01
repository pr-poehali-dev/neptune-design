import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import { ContactModal } from "./ContactModal"

export function FloatingCTA() {
  const [visible, setVisible] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2.5 bg-foreground text-white px-5 py-3.5 shadow-lg hover:bg-foreground/90 active:scale-95 transition-all duration-150 text-sm font-medium"
        >
          <MessageCircle className="w-4 h-4" />
          Связаться
        </button>
      </div>

      <ContactModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Связаться с нами"
      />
    </>
  )
}
