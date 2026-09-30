import { businessService } from "@/services/business.service";
import { appointmentService } from "@/services/appointment.service";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type {
  BusinessPublicDetailsResponse,
  ServiceResponse,
} from "@/types/business.types";
import type { AppointmentResponse } from "@/types/booking.types";
import BookingProfessionalSelector from "@/components/booking/BookingProfessionalSelector";
import BookingServiceSelector from "@/components/booking/BookingServiceSelector";
import BookingSteps from "@/components/booking/BookingSteps";
import BookingSummary from "@/components/booking/BookingSummary";
import BookingDateTimeSelector from "@/components/booking/BookingDateTimeSelector";
import { ArrowLeft, Check, X } from "lucide-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

type BookingStep = "services" | "professional" | "hour" | "confirm";

export default function BookAppointmentPage() {
  const navigate = useNavigate();

  const { businessId, serviceId } = useParams<{
    businessId: string;
    serviceId?: string;
  }>();

  const [business, setBusiness] =
    useState<BusinessPublicDetailsResponse | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState(serviceId ?? "");
  const [step, setStep] = useState<BookingStep>("services");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [createdAppointment, setCreatedAppointment] =
    useState<AppointmentResponse | null>(null);

  useEffect(() => {
    if (!businessId) {
      return;
    }

    const loadBusiness = async () => {
      const data = await businessService.getPublicById(businessId);
      setBusiness(data);
    };

    loadBusiness();
  }, [businessId]);

  useEffect(() => {
    if (!business) {
      return;
    }

    if (selectedServiceId) {
      const categoryWithService = business.serviceCategories.find((category) =>
        category.services.some((service) => service.id === selectedServiceId),
      );

      if (categoryWithService) {
        setSelectedCategoryId(categoryWithService.id);
        return;
      }
    }

    setSelectedCategoryId(business.serviceCategories[0]?.id ?? "");
  }, [business, selectedServiceId]);

  const selectedService: ServiceResponse | null =
    business?.services.find((service) => service.id === selectedServiceId) ??
    business?.serviceCategories
      .flatMap((category) => category.services)
      .find((service) => service.id === selectedServiceId) ??
    null;

  const selectedEmployee =
    business?.employees.find(
      (employee) => employee.id === selectedEmployeeId,
    ) ?? null;

  const handleServiceSelect = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setSelectedEmployeeId("");
    setSelectedDate("");
    setSelectedTime("");
    setSubmitError("");
  };

  const handleEmployeeSelect = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setSelectedDate("");
    setSelectedTime("");
    setSubmitError("");
  };

  const handleClose = () => {
    if (businessId) {
      navigate(`/businesses/${businessId}`);
    }
  };

  const handleContinue = async () => {
    if (step === "services" && selectedService) {
      setStep("professional");
      return;
    }

    if (step === "professional" && selectedEmployee) {
      setStep("hour");
      return;
    }

    if (step === "hour" && selectedDate && selectedTime) {
      setStep("confirm");
      return;
    }

    if (
      step !== "confirm" ||
      !selectedService ||
      !selectedEmployee ||
      !selectedDate ||
      !selectedTime
    ) {
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError("");

      const appointment = await appointmentService.createAppointment({
        employeeId: selectedEmployee.id,
        serviceId: selectedService.id,
        startDate: `${selectedDate}T${selectedTime}`,
      });

      setCreatedAppointment(appointment);
    } catch {
      setSubmitError(
        "No se pudo crear la reserva. El horario puede haber dejado de estar disponible.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const canContinue =
    (step === "services" && !!selectedService) ||
    (step === "professional" && !!selectedEmployee) ||
    (step === "hour" && !!selectedDate && !!selectedTime) ||
    (step === "confirm" &&
      !!selectedService &&
      !!selectedEmployee &&
      !!selectedDate &&
      !!selectedTime);

  if (!business) {
    return null;
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="page-container flex items-center justify-between py-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Volver"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={handleClose}
          aria-label="Cerrar reserva"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-red-900"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {createdAppointment ? (
  <div className="page-container pb-12">
    <section className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Check className="h-6 w-6" />
      </div>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-neutral-950">
        Reserva creada
      </h1>

      <p className="mt-2 text-neutral-600">
        Tu turno fue registrado correctamente.
      </p>

      <div className="mt-8 divide-y divide-neutral-200 rounded-xl border border-neutral-200">
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <span className="text-sm text-neutral-500">Servicio</span>

          <span className="text-right font-medium text-neutral-950">
            {createdAppointment.serviceName}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <span className="text-sm text-neutral-500">Profesional</span>

          <span className="text-right font-medium text-neutral-950">
            {createdAppointment.employeeName}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <span className="text-sm text-neutral-500">Fecha</span>

          <span className="text-right font-medium text-neutral-950">
            {format(
              parseISO(createdAppointment.startDate),
              "d 'de' MMMM 'de' yyyy",
              { locale: es },
            )}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <span className="text-sm text-neutral-500">Hora</span>

          <span className="text-right font-medium text-neutral-950">
            {format(
              parseISO(createdAppointment.startDate),
              "HH:mm",
            )}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <span className="text-sm text-neutral-500">Total</span>

          <span className="text-right font-semibold text-neutral-950">
            ${createdAppointment.price}
          </span>
        </div>
      </div>

      <p className="mt-5 text-sm text-neutral-500">
        La reserva quedó pendiente de confirmación.
      </p>

      <button
        type="button"
        onClick={handleClose}
        className="mt-8 cursor-pointer rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Volver al negocio
      </button>
    </section>
  </div>
) : (
  <div className="page-container grid gap-10 pb-12 lg:grid-cols-[minmax(0,1fr)_360px]">
    <div className="min-w-0">
      <BookingSteps currentStep={step} onStepChange={setStep} />

      {step === "services" && (
        <BookingServiceSelector
          services={business.services}
          serviceCategories={business.serviceCategories}
          selectedServiceId={selectedServiceId}
          selectedCategoryId={selectedCategoryId}
          onServiceSelect={handleServiceSelect}
          onCategoryChange={setSelectedCategoryId}
        />
      )}

      {step === "professional" && (
        <BookingProfessionalSelector
          employees={business.employees}
          selectedEmployeeId={selectedEmployeeId}
          onEmployeeSelect={handleEmployeeSelect}
        />
      )}

      {step === "hour" && selectedEmployee && selectedService && (
        <BookingDateTimeSelector
          userBusinessId={selectedEmployee.id}
          serviceId={selectedService.id}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onDateChange={(date) => {
            setSelectedDate(date);
            setSelectedTime("");
            setSubmitError("");
          }}
          onTimeSelect={(time) => {
            setSelectedTime(time);
            setSubmitError("");
          }}
        />
      )}

      {step === "confirm" && selectedService && selectedEmployee && (
        <section className="mt-8">
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-950">
            Confirmar reserva
          </h1>

          <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-5">
            <div>
              <p className="text-sm text-neutral-500">Servicio</p>

              <p className="mt-1 font-medium text-neutral-950">
                {selectedService.name}
              </p>
            </div>

            <div className="mt-5">
              <p className="text-sm text-neutral-500">Profesional</p>

              <p className="mt-1 font-medium text-neutral-950">
                {selectedEmployee.firstName} {selectedEmployee.lastName}
              </p>
            </div>

            <div className="mt-5">
              <p className="text-sm text-neutral-500">Fecha</p>

              <p className="mt-1 font-medium text-neutral-950">
                {format(
                  parseISO(selectedDate),
                  "EEEE d 'de' MMMM",
                  { locale: es },
                )}
              </p>
            </div>

            <div className="mt-5">
              <p className="text-sm text-neutral-500">Hora</p>

              <p className="mt-1 font-medium text-neutral-950">
                {selectedTime.slice(0, 5)}
              </p>
            </div>

            <div className="mt-5">
              <p className="text-sm text-neutral-500">Precio</p>

              <p className="mt-1 font-medium text-neutral-950">
                ${selectedService.price}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>

    <BookingSummary
      business={business}
      selectedService={selectedService}
      selectedEmployee={selectedEmployee}
      step={step}
      canContinue={canContinue}
      isSubmitting={isSubmitting}
      submitError={submitError}
      onContinue={handleContinue}
    />
  </div>
)}
    </main>
  );
}
