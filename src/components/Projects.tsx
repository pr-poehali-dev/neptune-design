import { useState } from "react"
import { ArrowUpRight, X, Phone, ChevronLeft, ChevronRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Проект «Уют»",
    category: "Одноэтажный дом",
    area: "79 м²",
    rooms: "2 спальни",
    preview: "https://cdn.poehali.dev/projects/45e5dd28-acf9-4577-bd02-33b9654b7bee/bucket/7e0b2b28-45c2-4057-822b-238b64242a19.jpg",
    photos: [
      "https://cdn.poehali.dev/projects/45e5dd28-acf9-4577-bd02-33b9654b7bee/bucket/7e0b2b28-45c2-4057-822b-238b64242a19.jpg",
      "https://cdn.poehali.dev/projects/45e5dd28-acf9-4577-bd02-33b9654b7bee/bucket/59e985ab-f2e4-499d-a5ab-e360ced49961.jpg",
      "https://cdn.poehali.dev/projects/45e5dd28-acf9-4577-bd02-33b9654b7bee/bucket/0bac3458-94eb-439b-b26c-9d1d1c95bedc.jpg",
    ],
    plan: "https://cdn.poehali.dev/projects/45e5dd28-acf9-4577-bd02-33b9654b7bee/bucket/0bac3458-94eb-439b-b26c-9d1d1c95bedc.jpg",
    description: "Компактный одноэтажный дом для небольшой семьи. Продуманная планировка с просторной кухней-гостиной и двумя спальнями.",
    specs: [
      { label: "Площадь", value: "79 м²" },
      { label: "Размер", value: "11700 × 8950 мм" },
      { label: "Спальни", value: "2" },
      { label: "Санузел", value: "1" },
      { label: "Терраса", value: "12 м²" },
      { label: "Этажность", value: "1 этаж" },
    ],
    rooms_list: "Кухня-гостиная 34,62 м² · Спальня 14,63 м² · Спальня 12,24 м² · Ванная 6,37 м² · Терраса 12 м²",
  },
  {
    id: 2,
    title: "Проект «Семейный»",
    category: "Одноэтажный дом",
    area: "96 м²",
    rooms: "3 спальни",
    preview: "https://cdn.poehali.dev/projects/45e5dd28-acf9-4577-bd02-33b9654b7bee/bucket/c357a737-19ea-4ff9-bf35-eb06987483d9.jpg",
    photos: [
      "https://cdn.poehali.dev/projects/45e5dd28-acf9-4577-bd02-33b9654b7bee/bucket/c357a737-19ea-4ff9-bf35-eb06987483d9.jpg",
      "https://cdn.poehali.dev/projects/45e5dd28-acf9-4577-bd02-33b9654b7bee/bucket/07a61063-0e2f-488a-960c-e9eba49f2672.jpg",
    ],
    plan: "https://cdn.poehali.dev/projects/45e5dd28-acf9-4577-bd02-33b9654b7bee/bucket/07a61063-0e2f-488a-960c-e9eba49f2672.jpg",
    description: "Просторный семейный дом с тремя спальнями и большой кухней-гостиной. Идеально для семьи с детьми.",
    specs: [
      { label: "Площадь", value: "96 м²" },
      { label: "Размер", value: "14550 × 9050 мм" },
      { label: "Спальни", value: "3" },
      { label: "Санузел", value: "2" },
      { label: "Детские", value: "2 комнаты" },
      { label: "Этажность", value: "1 этаж" },
    ],
    rooms_list: "Кухня-гостиная 44,96 м² · Спальня 11,32 м² · Детская 9,68 м² · Детская 10,04 м² · Ванная 4,95 м²",
  },
]

export function Projects() {
  const [selected, setSelected] = useState<typeof projects[0] | null>(null)
  const [activePhoto, setActivePhoto] = useState(0)
  const [showPlan, setShowPlan] = useState(false)

  const openProject = (project: typeof projects[0]) => {
    setSelected(project)
    setActivePhoto(0)
    setShowPlan(false)
    document.body.style.overflow = "hidden"
  }

  const closeProject = () => {
    setSelected(null)
    document.body.style.overflow = ""
  }

  const prevPhoto = () => {
    if (!selected) return
    setActivePhoto((p) => (p - 1 + selected.photos.length) % selected.photos.length)
  }

  const nextPhoto = () => {
    if (!selected) return
    setActivePhoto((p) => (p + 1) % selected.photos.length)
  }

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Предварительный просмотр</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Наши проекты</h2>
          </div>
          <p className="text-sm text-muted-foreground">Нажмите на проект, чтобы посмотреть детали</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onClick={() => openProject(project)}
            >
              <div className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.preview}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-foreground text-sm px-6 py-3 font-medium">
                    Смотреть проект
                  </span>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category} · {project.area} · {project.rooms}
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 mt-1" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 md:p-8"
          onClick={closeProject}
        >
          <div
            className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-xl font-medium">{selected.title}</h3>
                <p className="text-muted-foreground text-sm">{selected.category} · {selected.area}</p>
              </div>
              <button onClick={closeProject} className="p-2 hover:bg-secondary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              {/* Toggle фото/план */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setShowPlan(false)}
                  className={`text-sm px-5 py-2 transition-colors ${!showPlan ? "bg-foreground text-white" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
                >
                  Фото
                </button>
                <button
                  onClick={() => setShowPlan(true)}
                  className={`text-sm px-5 py-2 transition-colors ${showPlan ? "bg-foreground text-white" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
                >
                  Планировка
                </button>
              </div>

              {/* Gallery / Plan */}
              {!showPlan ? (
                <div className="mb-8">
                  <div className="relative aspect-[16/9] overflow-hidden mb-4">
                    <img
                      src={selected.photos[activePhoto]}
                      alt={`${selected.title} фото ${activePhoto + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {selected.photos.length > 1 && (
                      <>
                        <button
                          onClick={prevPhoto}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextPhoto}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {selected.photos.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setActivePhoto(i)}
                              className={`w-2 h-2 transition-colors ${i === activePhoto ? "bg-white" : "bg-white/50"}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  {/* Thumbnails */}
                  {selected.photos.length > 1 && (
                    <div className="flex gap-3">
                      {selected.photos.map((photo, i) => (
                        <button
                          key={i}
                          onClick={() => setActivePhoto(i)}
                          className={`w-20 h-14 overflow-hidden flex-shrink-0 transition-opacity ${i === activePhoto ? "opacity-100 ring-2 ring-foreground" : "opacity-60 hover:opacity-100"}`}
                        >
                          <img src={photo} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="mb-8">
                  <div className="bg-secondary/30 p-4">
                    <img
                      src={selected.plan}
                      alt={`Планировка ${selected.title}`}
                      className="w-full object-contain max-h-[500px]"
                    />
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-medium mb-3">О проекте</h4>
                  <p className="text-muted-foreground leading-relaxed mb-4">{selected.description}</p>
                  <p className="text-sm text-muted-foreground">{selected.rooms_list}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Характеристики</h4>
                  <div className="space-y-2">
                    {selected.specs.map((spec) => (
                      <div key={spec.label} className="flex justify-between text-sm border-b border-border pb-2">
                        <span className="text-muted-foreground">{spec.label}</span>
                        <span className="font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-foreground text-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-medium mb-1">Заинтересовал этот проект?</p>
                  <p className="text-white/70 text-sm">Свяжитесь с нами — обсудим детали и стоимость</p>
                </div>
                <a
                  href="tel:+74951234567"
                  className="inline-flex items-center gap-2 bg-white text-foreground px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors flex-shrink-0"
                >
                  <Phone className="w-4 h-4" />
                  Позвонить нам
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
