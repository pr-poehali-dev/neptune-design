interface Props {
  onScrollToCalc: () => void
  onConsult: () => void
}

export function ProjectHero({ onScrollToCalc, onConsult }: Props) {
  return (
    <section className="relative min-h-[92vh] flex items-end">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.poehali.dev/projects/45e5dd28-acf9-4577-bd02-33b9654b7bee/bucket/ac9bf776-8edd-4df1-b694-28c9143977c6.jpg"
          alt="Проект 5628"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      </div>

      {/* Badge */}
      <div className="absolute top-8 left-8 z-10">
        <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs tracking-[0.2em] uppercase px-4 py-2">
          Проект № 5628
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
        <div className="max-w-3xl">
          <p className="text-white/60 text-sm tracking-[0.3em] uppercase mb-5">Готовый проект</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6">
            Дом с подвалом<br />и гаражом
          </h1>
          <p className="text-white/75 text-lg mb-10">
            248,1 м² · 20,6 × 18,4 м · 3 спальни · 5 жилых комнат
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onScrollToCalc}
              className="bg-white text-foreground px-8 py-4 text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Рассчитать стоимость
            </button>
            <button
              onClick={onConsult}
              className="border border-white/60 text-white px-8 py-4 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Получить консультацию
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
