import SectionHeader from "@/components/common/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/constants/data";

export default function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden">
      <div className="container py-16 md:py-24">
        <SectionHeader
          title="Pertanyaan Umum"
          description="Informasi seputar proses, domain, pemesanan, dan perubahan konten."
          align="center"
        />

        <div className="mt-8">
          <Accordion type="single" collapsible className="mx-auto max-w-2xl">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.question} value={`item-${i}`}>
                <AccordionTrigger>{f.question}</AccordionTrigger>
                <AccordionContent>{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
