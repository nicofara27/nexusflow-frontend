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
import { ArrowLeft, X } from "lucide-react";
import BookingSuccessCard from "@/components/booking/BookingSuccesCard";
import BookingConfirmationStep from "@/components/booking/BookingConfirmationStep";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!businessId) {
      setError("No se encontró el negocio.");
      setIsLoading(false);
      return;
    }

    const loadBusiness = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await businessService.getPublicById(businessId);

        setBusiness(data);
      } catch {
        setError(
          "No se pudo cargar la información del negocio. Intentá nuevamente.",
        );
      } finally {
        setIsLoading(false);
      }
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

  if (isLoading) {
    return (
      <main className="min-h-screen bg-neutral-50">
        <div className="page-container flex min-h-[70vh] items-center justify-center">
          <p className="text-sm text-neutral-500">
            Cargando información del negocio...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-neutral-50">
        <div className="page-container flex min-h-[70vh] items-center justify-center">
          <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-6 text-center">
            <h1 className="text-xl font-semibold text-neutral-950">
              No pudimos cargar el negocio
            </h1>

            <p className="mt-2 text-sm text-neutral-600">{error}</p>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
            >
              Volver
            </button>
          </div>
        </div>
      </main>
    );
  }

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
        <BookingSuccessCard
          appointment={createdAppointment}
          onClose={handleClose}
        />
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
              <BookingConfirmationStep
                service={selectedService}
                employee={selectedEmployee}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
              />
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
