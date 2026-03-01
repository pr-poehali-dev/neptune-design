const specs = [
  { label: "Общая площадь", value: "248,1 м²" },
  { label: "Жилая площадь", value: "85,2 м²" },
  { label: "Размеры дома", value: "20,6 × 18,4 м" },
  { label: "Высота здания", value: "7,6 м" },
  { label: "Комнат", value: "5" },
  { label: "Спален", value: "3" },
  { label: "Гараж", value: "Встроенный" },
  { label: "Отделка фасада", value: "Керамогранит" },
  { label: "Материал стен", value: "Пеноблок / Газобетон" },
  { label: "Фундамент", value: "Ленточный" },
  { label: "Перекрытия", value: "Сборные плиты" },
]

export function ProjectSpecs() {
  return (
    <section className="py-20 bg-foreground text-white">
      <div className="container mx-auto px-6 md:px-12">
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-12">Ключевые параметры</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/10">
          {specs.map((spec) => (
            <div key={spec.label} className="bg-foreground px-6 py-7">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-2">{spec.label}</p>
              <p className="text-white font-medium text-lg leading-tight">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
