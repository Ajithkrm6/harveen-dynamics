import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { apiPost } from "../lib/api";
import { apiErrorMessage } from "../lib/apiError";
import { PROGRAM_CHOICES } from "../lib/site";
import type { Enquiry } from "../lib/types";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EMPTY = { full_name: "", email: "", phone: "", message: "" };

export function EnquiryForm() {
  const [searchParams] = useSearchParams();
  const initialProgram = searchParams.get("program") ?? "";
  const [fields, setFields] = useState(EMPTY);
  const [programInterest, setProgramInterest] = useState(
    PROGRAM_CHOICES.some((c) => c.value === initialProgram) ? initialProgram : "",
  );
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: (body: typeof EMPTY & { program_interest: string }) =>
      apiPost<Enquiry>("/enquiries", body),
    onSuccess: () => {
      setSubmitted(true);
      setFields(EMPTY);
      toast.success("Enquiry received! Our team will reach out to you shortly.");
    },
    onError: (error) => {
      toast.error(
        apiErrorMessage(error, "Something went wrong. Please try again or reach us on WhatsApp."),
      );
    },
  });

  const set = (key: keyof typeof EMPTY) => (value: string) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!programInterest) {
      toast.error("Please choose a program of interest.");
      return;
    }
    mutation.mutate({ ...fields, program_interest: programInterest });
  };

  if (submitted) {
    return (
      <div
        data-testid="enquiry-success-panel"
        className="flex flex-col items-center rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-10 text-center"
      >
        <CheckCircle2 className="size-12 text-emerald-600" />
        <h3 className="mt-4 font-heading text-xl font-bold text-slate-900">
          Thank you, your enquiry has been received!
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
          Our team will reach out to you shortly on your email or phone. Want a faster answer? Chat
          with us directly on WhatsApp.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          data-testid="enquiry-another-button"
          onClick={() => setSubmitted(false)}
        >
          Submit another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form data-testid="enquiry-form" onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="enquiry-name">Full Name *</Label>
          <Input
            id="enquiry-name"
            data-testid="enquiry-name-input"
            value={fields.full_name}
            onChange={(e) => set("full_name")(e.target.value)}
            placeholder="Your full name"
            required
            minLength={2}
            maxLength={120}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="enquiry-email">Email *</Label>
          <Input
            id="enquiry-email"
            data-testid="enquiry-email-input"
            type="email"
            value={fields.email}
            onChange={(e) => set("email")(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="enquiry-phone">Phone / WhatsApp *</Label>
          <Input
            id="enquiry-phone"
            data-testid="enquiry-phone-input"
            type="tel"
            value={fields.phone}
            onChange={(e) => set("phone")(e.target.value)}
            placeholder="85008 10002"
            required
            minLength={7}
            maxLength={20}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="enquiry-program">Program of Interest *</Label>
          <Select value={programInterest} onValueChange={(value: string | null) => setProgramInterest(value || "")}>
            <SelectTrigger id="enquiry-program" data-testid="enquiry-program-select-trigger" className="w-full">
              <SelectValue>
                {(v: string) =>
                  PROGRAM_CHOICES.find((c) => c.value === v)?.label ?? "Select a program"
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {PROGRAM_CHOICES.map((choice) => (
                <SelectItem key={choice.value} value={choice.value}>
                  {choice.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="enquiry-message">Message</Label>
        <Textarea
          id="enquiry-message"
          data-testid="enquiry-message-textarea"
          value={fields.message}
          onChange={(e) => set("message")(e.target.value)}
          placeholder="Tell us a little about your background and what you'd like to learn…"
          rows={4}
          maxLength={2000}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={mutation.isPending}
        data-testid="enquiry-submit-button"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Submitting…
          </>
        ) : (
          <>
            <Send className="size-4" /> Submit Enquiry
          </>
        )}
      </Button>
    </form>
  );
}
