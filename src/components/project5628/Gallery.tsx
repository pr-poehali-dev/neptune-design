import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const photos = [
  {
    url: "https://cdn.poehali.dev/projects/45e5dd28-acf9-4577-bd02-33b9654b7bee/bucket/ac9bf776-8edd-4df1-b694-28c9143977c6.jpg",
    label: "Вид с фасада (вечер)",
  },
  {
    url: "https://cdn.poehali.dev/projects/45e5dd28-acf9-4577-bd02-33b9654b7bee/bucket/c3799387-fb6f-4aff-a785-2efd2f2cec9d.jpg",
    label: "Вид спереди",
  },
]

const plans = [
  {
    url: "https://cdn.poehali.dev/projects/45e5dd28-acf9-4577-bd02-33b9654b7bee/bucket/63897117-0cc0-4292-b8c6-38dc48ce9c94.jpg",
    label: "План 1 этажа",
  },
]

const allItems = [...photos, ...plans]

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const prev = () => setLightbox((i) => (i === null ? 0 : (i - 1 + allItems.length) % allItems.length))
  const next = () => setLightbox((i) => (i === null ? 0 : (i + 1) % allItems.length))

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6 md:px-12">
        <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-6">Визуализация</p>
        <h2 className="text-3xl md:text-4xl font-medium mb-14">Фото и планировки</h2>

        {/* Gallery grid */}
        <div className="mb-14">
          <p className="text-sm text-muted-foreground mb-6 uppercase tracking-widest">Фотографии</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {photos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className="group relative aspect-[4/3] overflow-hidden"
              >
                <img
                  src={photo.url}
                  alt={photo.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white text-xs tracking-widest uppercase">
                    Открыть
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div>
          <p className="text-sm text-muted-foreground mb-6 uppercase tracking-widest">Планировки</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan, i) => (
              <button
                key={i}
                onClick={() => setLightbox(photos.length + i)}
                className="group relative bg-white border border-border overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={plan.url}
                    alt={plan.label}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-102"
                  />
                </div>
                <div className="p-4 text-left flex items-center justify-between border-t border-border">
                  <span className="text-sm font-medium">{plan.label}</span>
                  <span className="text-xs text-muted-foreground">Увеличить →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(null) }}
            className="absolute top-6 right-6 text-white/60 hover:text-white p-2"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 md:left-8 text-white/60 hover:text-white p-2"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <div className="max-w-5xl w-full px-16 md:px-20" onClick={(e) => e.stopPropagation()}>
            <img
              src={allItems[lightbox].url}
              alt={allItems[lightbox].label}
              className="w-full max-h-[80vh] object-contain"
            />
            <p className="text-white/50 text-sm text-center mt-4">{allItems[lightbox].label}</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 md:right-8 text-white/60 hover:text-white p-2"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </section>
  )
}
