import { CalcState, formatRub } from "./calcLogic"

const optionLabels: Record<keyof CalcState, string> = {
  type: "Этажность",
  distance: "Удалённость",
  area: "Площадь дома",
  foundation: "Фундамент",
  basement: "Подвал/цоколь",
  wall: "Материал стен",
  slab: "Перекрытия",
  roof: "Кровельное покрытие",
  roofInsulation: "Утепление кровли",
  facadeInsulation: "Утепление фасада",
  facade: "Отделка фасада",
  windows: "Окна",
  stairs: "Лестница",
  engineering: "Инженерные системы",
  finish: "Внутренняя отделка",
}

export function exportEstimate(state: CalcState, total: number, perM2: number) {
  const now = new Date()
  const dateStr = now.toLocaleDateString("ru-RU", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  })

  const rows = (Object.keys(optionLabels) as Array<keyof CalcState>).map((key) => {
    const val = state[key]
    let display = ""
    if (key === "area") display = `${val} м²`
    else if (key === "basement") display = val ? "Да" : "Нет"
    else display = String(val)
    return `<tr><td style="padding:6px 12px;color:#666;border-bottom:1px solid #eee;">${optionLabels[key]}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;font-weight:500;">${display}</td></tr>`
  }).join("")

  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Расчёт стоимости — Проект 5628</title>
<style>
  body { font-family: Arial, sans-serif; max-width: 700px; margin: 40px auto; color: #1a1a1a; }
  h1 { font-size: 22px; margin-bottom: 4px; }
  .meta { color: #888; font-size: 13px; margin-bottom: 32px; }
  .price { font-size: 36px; font-weight: 700; margin: 24px 0 4px; }
  .perm2 { color: #666; font-size: 15px; margin-bottom: 32px; }
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  .disclaimer { margin-top: 32px; padding: 16px; background: #f5f5f5; font-size: 13px; color: #666; border-left: 3px solid #ccc; }
  .contacts { margin-top: 24px; font-size: 13px; color: #888; }
  @media print { body { margin: 20px; } }
</style>
</head>
<body>
<h1>Проект 5628 — Расчёт стоимости</h1>
<div class="meta">Сформировано: ${dateStr}</div>

<div class="price">${formatRub(total)}</div>
<div class="perm2">${formatRub(perM2)} за м²</div>

<h2 style="font-size:15px;color:#666;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:12px;">Выбранные параметры</h2>
<table>
${rows}
</table>

<div class="disclaimer">
  Данный расчёт является предварительным. Итоговая стоимость определяется после изучения участка, 
  технического задания и согласования всех деталей с менеджером.
</div>

<div class="contacts">
  <strong>Контакты:</strong><br>
  Телефон: +7 (000) 000-00-00 &nbsp;|&nbsp; Email: info@example.com &nbsp;|&nbsp; Telegram: @example
</div>
</body>
</html>`

  const blob = new Blob([html], { type: "text/html;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `raschet-project-5628-${now.toISOString().slice(0, 10)}.html`
  a.click()
  URL.revokeObjectURL(url)
}
