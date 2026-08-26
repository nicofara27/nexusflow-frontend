import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { authService } from "@/services/auth.service";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/auth.store";
import { loginFormSchema, type LoginFormData } from "@/schemas/auth.schema";
import FormInput from "@/components/forms/FormInput";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    try {
      const response = await authService.login(data);
      setAuth(response);
      navigate("/");
    } catch (error) {
      form.setError("root", { message: "Email o contraseña incorrectos" });
    }
  }

  return (
    <div className="flex h-screen bg-muted">
      <div className="w-[55%] flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="font-bold text-4xl mb-1">¡Bienvenido de nuevo!</h1>
          <p className="text-lg">Ingresa tu correo electrónico y contraseña.</p>
          <form
            className="mt-8"
            id="login-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup className="gap-2">
              <FormInput
                {...form.register("email")}
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                error={form.formState.errors.email}
              />
              <FormInput
                {...form.register("password")}
                id="password"
                label="Contraseña"
                type="password"
                autoComplete="current-password"
                error={form.formState.errors.password}
              />
            </FieldGroup>
          </form>
          <div className="min-h-5 my-3">
            {form.formState.errors.root && (
              <p className="text-destructive text-sm">
                {form.formState.errors.root.message}
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <Button
              className="w-2/5"
              size="lg"
              type="submit"
              form="login-form"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Iniciando sesión..."
                : "Iniciar sesión"}
            </Button>
            <Button
              className="w-2/5"
              type="button"
              size="lg"
              variant="outline"
              onClick={() => navigate("/register")}
              disabled={form.formState.isSubmitting}
            >
              Crear cuenta
            </Button>
          </div>
        </div>
      </div>
      <div className="w-[45%] overflow-hidden flex justify-center">
        <img
          className="w-full h-full object-cover object-center"
          src="https://images.saatchiart.com/saatchi/61726/art/8889900/7953268-OUGIUZHS-7.jpg"
          alt="Ilustración"
        />
      </div>
    </div>
  );
}
