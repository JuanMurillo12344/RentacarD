import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

const faqs = [
  {
    question: "¿Qué documentos necesito para rentar un vehículo?",
    answer:
      "Necesitas una licencia de conducir válida, una tarjeta de crédito a tu nombre y una identificación oficial (DPI o pasaporte). Los conductores deben tener al menos 21 años de edad.",
  },
  {
    question: "¿El seguro está incluido en el precio?",
    answer:
      "Sí, todos nuestros vehículos incluyen seguro básico. También ofrecemos opciones de seguro adicional para mayor cobertura y tranquilidad durante tu viaje.",
  },
  {
    question: "¿Puedo devolver el vehículo en una ubicación diferente?",
    answer:
      "Sí, ofrecemos servicio de devolución en ubicaciones diferentes. Este servicio puede tener un cargo adicional dependiendo de la distancia entre las ubicaciones.",
  },
  {
    question: "¿Qué pasa si tengo un problema con el vehículo?",
    answer:
      "Contamos con asistencia en carretera 24/7. Si tienes algún problema, llámanos inmediatamente y te enviaremos ayuda o un vehículo de reemplazo según sea necesario.",
  },
  {
    question: "¿Puedo cancelar o modificar mi reserva?",
    answer:
      "Sí, puedes cancelar o modificar tu reserva hasta 24 horas antes de la fecha de recogida sin cargo alguno. Las cancelaciones con menos de 24 horas pueden estar sujetas a cargos.",
  },
  {
    question: "¿Qué tipo de combustible usan los vehículos?",
    answer:
      "La mayoría de nuestros vehículos usan gasolina regular. Te entregaremos el vehículo con el tanque lleno y deberás devolverlo con el tanque lleno también.",
  },
  {
    question: "¿Hay límite de kilometraje?",
    answer:
      "Nuestras rentas incluyen kilometraje ilimitado dentro de Guatemala. Para viajes internacionales, consulta nuestras políticas especiales.",
  },
  {
    question: "¿Puedo agregar conductores adicionales?",
    answer:
      "Sí, puedes agregar conductores adicionales por un cargo diario. Todos los conductores deben cumplir con los requisitos de edad y documentación.",
  },
  {
    question: "¿Aceptan tarjetas de débito?",
    answer:
      "Preferimos tarjetas de crédito para el depósito de seguridad. En algunos casos aceptamos tarjetas de débito, pero pueden aplicar restricciones adicionales.",
  },
  {
    question: "¿Qué hago en caso de accidente?",
    answer:
      "En caso de accidente, primero asegúrate de que todos estén seguros. Luego contacta a las autoridades locales y a nuestro servicio de emergencia 24/7. No admitas culpabilidad y documenta todo con fotos.",
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Preguntas Frecuentes</h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
              Encuentra respuestas a las preguntas más comunes sobre nuestro servicio de renta de vehículos
            </p>
          </div>

          {/* FAQ Accordion */}
          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8 text-center space-y-4">
              <h2 className="text-2xl font-bold">¿No encontraste lo que buscabas?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nuestro equipo está disponible 24/7 para ayudarte con cualquier pregunta
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+50212345678"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  Llamar Ahora
                </a>
                <a
                  href="/contacto"
                  className="inline-flex items-center justify-center rounded-lg bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground hover:bg-secondary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  Enviar Mensaje
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
