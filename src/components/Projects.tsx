import { useNavigate } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    slug: "/project/62",
    title: "Проект 62",
    subtitle: "Компактный дом с мансардой",
    category: "1 этаж + мансарда",
    area: "62,5 м²",
    rooms: "2 спальни",
    tags: ["Газобетон", "Монолитная плита", "Битумная черепица"],
    preview: "https://cdn.poehali.dev/projects/45e5dd28-acf9-4577-bd02-33b9654b7bee/bucket/7e0b2b28-45c2-4057-822b-238b64242a19.jpg",
  },
  {
    id: 2,
    slug: "/project/172",
    title: "Проект 172",
    subtitle: "Дом с мансардой и встроенным гаражом",
    category: "1 этаж + мансарда",
    area: "172,6 м²",
    rooms: "3 спальни",
    tags: ["Газобетон + кирпич", "Металлочерепица", "Гараж"],
    preview: "https://cdn.poehali.dev/projects/45e5dd28-acf9-4577-bd02-33b9654b7bee/bucket/c357a737-19ea-4ff9-bf35-eb06987483d9.jpg",
  },
  {
    id: 3,
    slug: "/project/5628",
    title: "Проект 5628",
    subtitle: "Дом с подвалом и гаражом",
    category: "1 этаж",
    area: "248,1 м²",
    rooms: "3 спальни",
    tags: ["Керамогранит", "Пеноблок", "Гараж + подвал"],
    preview: "https://cdn.poehali.dev/projects/45e5dd28-acf9-4577-bd02-33b9654b7bee/bucket/ac9bf776-8edd-4df1-b694-28c9143977c6.jpg",
  },
]

export function Projects() {
  const navigate = useNavigate()

  return (
    <section id="projects" className="py-32 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Каталог</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Наши проекты</h2>
          </div>
          <p className="text-sm text-muted-foreground">Нажмите на проект, чтобы открыть полную страницу с калькулятором</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onClick={() => navigate(project.slug)}
            >
              <div className="relative overflow-hidden aspect-[4/3] mb-5">
                <img
                  src={project.preview}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-foreground text-sm px-6 py-3 font-medium">
                    Открыть проект
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-foreground/80 backdrop-blur-sm text-white text-xs px-3 py-1.5 tracking-wide">
                    {project.area}
                  </span>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-lg font-medium mb-1 group-hover:underline underline-offset-4">{project.title}</h3>
                  <p className="text-muted-foreground text-sm font-light">{project.subtitle}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 mt-0.5" />
              </div>

              <p className="text-muted-foreground text-xs mb-3">{project.category} · {project.rooms}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs border border-border px-2.5 py-1 text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
