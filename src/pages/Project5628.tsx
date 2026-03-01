import { useState, useRef } from "react"
import { ProjectHero } from "@/components/project5628/ProjectHero"
import { ProjectSpecs } from "@/components/project5628/ProjectSpecs"
import { ProjectConstruct } from "@/components/project5628/ProjectConstruct"
import { Gallery } from "@/components/project5628/Gallery"
import { ProjectAdvantages } from "@/components/project5628/ProjectAdvantages"
import { CostCalculator } from "@/components/project5628/CostCalculator"
import { HowWeWork } from "@/components/project5628/HowWeWork"
import { ProjectFooterCTA } from "@/components/project5628/ProjectFooterCTA"
import { LeadModal } from "@/components/project5628/LeadModal"

export default function Project5628() {
  const [leadModalOpen, setLeadModalOpen] = useState(false)
  const [leadModalData, setLeadModalData] = useState<Record<string, string> | undefined>(undefined)
  const calcRef = useRef<HTMLDivElement>(null)

  const scrollToCalc = () => {
    calcRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const openLead = (data?: Record<string, string>) => {
    setLeadModalData(data)
    setLeadModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <ProjectHero onScrollToCalc={scrollToCalc} onConsult={() => openLead()} />
      <ProjectSpecs />
      <ProjectConstruct />
      <Gallery />
      <ProjectAdvantages />
      <div ref={calcRef}>
        <CostCalculator onSendEstimate={openLead} />
      </div>
      <HowWeWork />
      <ProjectFooterCTA onLead={() => openLead()} />
      <LeadModal open={leadModalOpen} onClose={() => setLeadModalOpen(false)} prefill={leadModalData} />
    </div>
  )
}
