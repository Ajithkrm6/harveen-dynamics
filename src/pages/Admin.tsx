import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import { Loader2, LogOut, Pencil, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "@/lib/api";
import { apiErrorMessage } from "@/lib/apiError";
import { beginSession, endSession } from "@/lib/session";
import { programLabel } from "@/lib/site";
import type { AuthMe, Enquiry, EnquiryStatus, Testimonial } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

const STATUS_LABELS: Record<EnquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  enrolled: "Enrolled",
};

export const STATUS_BADGE: Record<EnquiryStatus, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  contacted: "bg-amber-100 text-amber-700 border-amber-200",
  enrolled: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const EMPTY_TESTIMONIAL = { name: "", role: "", quote: "", display_order: 0, published: true };

function LoginView() {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useMutation({
    mutationFn: (body: { email: string; password: string }) =>
      apiPost<AuthMe>("/auth/login", body),
    onSuccess: (data) => {
      // Cookie is set by the backend; clear any stale cache, then hard-redirect so the
      // auth/me observer remounts fresh and fetches the new session state.
      beginSession();
      queryClient.setQueryData<AuthMe>(["auth", "me"], data);
      window.location.assign("/admin");
    },
    onError: (error) => toast.error(apiErrorMessage(error, "Invalid email or password.")),
  });

  return (
    <div className="grid min-h-svh place-items-center bg-muted/50 px-4 pt-16">
      <Card className="w-full max-w-md" data-testid="admin-login-card">
        <CardHeader className="text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-xl bg-[#EFF6FF] text-[#0078D4]">
            <ShieldCheck className="size-6" />
          </span>
          <CardTitle className="font-heading text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Sign in to manage enquiries and testimonials for Harveen Dynamics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            data-testid="admin-login-form"
            onSubmit={(e) => {
              e.preventDefault();
              login.mutate({ email, password });
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="admin-email">Email</Label>
              <Input
                id="admin-email"
                data-testid="admin-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@harveendynamics.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                data-testid="admin-password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={login.isPending}
              data-testid="admin-login-button"
            >
              {login.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

interface TestimonialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial: Testimonial | null;
}

function TestimonialDialog({ open, onOpenChange, initial }: TestimonialDialogProps) {
  const queryClient = useQueryClient();
  const [fields, setFields] = useState(EMPTY_TESTIMONIAL);

  // Re-seed the form each time the dialog opens (add vs edit prefill).
  const seed = (t: Testimonial | null) =>
    setFields(
      t
        ? {
            name: t.name,
            role: t.role,
            quote: t.quote,
            display_order: t.display_order,
            published: t.published,
          }
        : EMPTY_TESTIMONIAL,
    );

  const save = useMutation({
    mutationFn: (payload: typeof EMPTY_TESTIMONIAL) =>
      initial
        ? apiPut<Testimonial>(`/testimonials/${initial.id}`, payload)
        : apiPost<Testimonial>("/testimonials", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success(initial ? "Testimonial updated." : "Testimonial added.");
      onOpenChange(false);
    },
    onError: (error) =>
      toast.error(apiErrorMessage(error, "Could not save the testimonial. Please try again.")),
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) seed(initial);
        onOpenChange(next);
      }}
    >
      <DialogContent data-testid="testimonial-dialog">
        <DialogHeader>
          <DialogTitle className="font-heading">
            {initial ? "Edit testimonial" : "Add testimonial"}
          </DialogTitle>
          <DialogDescription>
            {initial
              ? "Update the learner story and save your changes."
              : "Add a learner story to display on the public site."}
          </DialogDescription>
        </DialogHeader>
        <form
          data-testid="testimonial-form"
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate(fields);
          }}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="testimonial-name">Learner name *</Label>
              <Input
                id="testimonial-name"
                data-testid="testimonial-name-input"
                value={fields.name}
                onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
                required
                minLength={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testimonial-role">Role / context *</Label>
              <Input
                id="testimonial-role"
                data-testid="testimonial-role-input"
                value={fields.role}
                onChange={(e) => setFields((f) => ({ ...f, role: e.target.value }))}
                placeholder="e.g. Associate CRM Consultant, Bengaluru"
                required
                minLength={2}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="testimonial-quote">Quote *</Label>
            <Textarea
              id="testimonial-quote"
              data-testid="testimonial-quote-textarea"
              value={fields.quote}
              onChange={(e) => setFields((f) => ({ ...f, quote: e.target.value }))}
              rows={4}
              required
              minLength={10}
            />
          </div>
          <div className="flex items-end gap-6">
            <div className="space-y-2">
              <Label htmlFor="testimonial-order">Display order</Label>
              <Input
                id="testimonial-order"
                data-testid="testimonial-order-input"
                type="number"
                value={fields.display_order}
                onChange={(e) =>
                  setFields((f) => ({ ...f, display_order: Number(e.target.value) || 0 }))
                }
                className="w-28"
              />
            </div>
            <label className="flex items-center gap-2 pb-2 text-sm font-medium text-slate-700">
              <Checkbox
                data-testid="testimonial-published-checkbox"
                checked={fields.published}
                onCheckedChange={(checked: boolean) =>
                  setFields((f) => ({ ...f, published: checked === true }))
                }
              />
              Published
            </label>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              data-testid="testimonial-form-cancel-button"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={save.isPending} data-testid="testimonial-form-submit-button">
              {save.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Saving…
                </>
              ) : initial ? (
                "Save changes"
              ) : (
                "Add testimonial"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EnquiriesPanel() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<"all" | EnquiryStatus>("all");

  const { data: enquiries, isLoading } = useQuery({
    queryKey: ["enquiries"],
    queryFn: () => apiGet<Enquiry[]>("/enquiries"),
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: EnquiryStatus }) =>
      apiPatch<Enquiry>(`/enquiries/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      toast.success("Enquiry status updated.");
    },
    onError: (error) => toast.error(apiErrorMessage(error, "Could not update the status.")),
  });

  const all = enquiries ?? [];
  const counts: Record<"all" | EnquiryStatus, number> = {
    all: all.length,
    new: all.filter((e) => e.status === "new").length,
    contacted: all.filter((e) => e.status === "contacted").length,
    enrolled: all.filter((e) => e.status === "enrolled").length,
  };
  const visible = filter === "all" ? all : all.filter((e) => e.status === filter);

  return (
    <div>
      <Tabs
        value={filter}
        onValueChange={(value: string) => setFilter(value as "all" | EnquiryStatus)}
        className="mb-4"
      >
        <TabsList data-testid="enquiry-filter-tabs">
          {(["all", "new", "contacted", "enrolled"] as const).map((key) => (
            <TabsTrigger key={key} value={key} data-testid={`enquiry-filter-${key}`}>
              {key === "all" ? "All" : STATUS_LABELS[key]} ({counts[key]})
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="rounded-xl border border-slate-200 bg-white" data-testid="enquiries-table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-sm text-slate-500">
                  Loading enquiries…
                </TableCell>
              </TableRow>
            ) : visible.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-sm text-slate-500" data-testid="enquiries-empty">
                  No enquiries yet. New leads from the site will appear here.
                </TableCell>
              </TableRow>
            ) : (
              visible.map((enquiry) => (
                <TableRow key={enquiry.id} data-testid={`enquiry-row-${enquiry.id}`}>
                  <TableCell className="font-medium text-slate-900">{enquiry.full_name}</TableCell>
                  <TableCell>
                    <span className="block text-xs text-slate-600">{enquiry.email}</span>
                    <span className="block text-xs text-slate-500">{enquiry.phone}</span>
                  </TableCell>
                  <TableCell className="max-w-48 text-xs text-slate-600">
                    {programLabel(enquiry.program_interest)}
                  </TableCell>
                  <TableCell className="max-w-56">
                    <span className="block truncate text-xs text-slate-600" title={enquiry.message}>
                      {enquiry.message || "—"}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap text-slate-500">
                    {format(new Date(enquiry.created_at), "dd MMM yyyy, hh:mm a")}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={enquiry.status}
                      onValueChange={(value: string | null) => {
                        if (!value) return;
                        updateStatus.mutate({ id: enquiry.id, status: value as EnquiryStatus })
                      }}
                    >
                      <SelectTrigger
                        size="sm"
                        data-testid={`enquiry-status-select-${enquiry.id}`}
                        aria-label={`Update status for ${enquiry.full_name}`}
                      >
                        <SelectValue>
                          {(v: string) => STATUS_LABELS[v as EnquiryStatus] ?? v}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.keys(STATUS_LABELS) as EnquiryStatus[]).map((status) => (
                          <SelectItem key={status} value={status}>
                            {STATUS_LABELS[status]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function TestimonialsPanel() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["testimonials", "manage"],
    queryFn: () => apiGet<Testimonial[]>("/testimonials/manage"),
  });

  const remove = useMutation({
    mutationFn: (id: string) => apiDelete<void>(`/testimonials/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial deleted.");
    },
    onError: (error) => toast.error(apiErrorMessage(error, "Could not delete the testimonial.")),
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Learner stories shown in the public Testimonials section.
        </p>
        <Button
          size="sm"
          data-testid="add-testimonial-button"
          onClick={() => {
            setEditing(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="size-4" /> Add testimonial
        </Button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white" data-testid="testimonials-table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Learner</TableHead>
              <TableHead>Quote</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-sm text-slate-500">
                  Loading testimonials…
                </TableCell>
              </TableRow>
            ) : (testimonials ?? []).length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-sm text-slate-500" data-testid="testimonials-manage-empty">
                  No testimonials yet. Add one to display it on the site.
                </TableCell>
              </TableRow>
            ) : (
              (testimonials ?? []).map((t) => (
                <TableRow key={t.id} data-testid={`testimonial-row-${t.id}`}>
                  <TableCell>
                    <span className="block font-medium text-slate-900">{t.name}</span>
                    <span className="block text-xs text-slate-500">{t.role}</span>
                  </TableCell>
                  <TableCell className="max-w-80">
                    <span className="block truncate text-xs text-slate-600" title={t.quote}>
                      {t.quote}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-slate-500">{t.display_order}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        t.published ? "border-emerald-200 bg-emerald-100 text-emerald-700" : "border-slate-200 bg-slate-100 text-slate-600"
                      }
                    >
                      {t.published ? "Published" : "Hidden"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Edit testimonial by ${t.name}`}
                        data-testid={`testimonial-edit-button-${t.id}`}
                        onClick={() => {
                          setEditing(t);
                          setDialogOpen(true);
                        }}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Delete testimonial by ${t.name}`}
                        data-testid={`testimonial-delete-button-${t.id}`}
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        disabled={remove.isPending}
                        onClick={() => {
                          if (window.confirm(`Delete the testimonial by ${t.name}?`)) {
                            remove.mutate(t.id);
                          }
                        }}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <TestimonialDialog open={dialogOpen} onOpenChange={setDialogOpen} initial={editing} />
    </div>
  );
}

function Dashboard({ email }: { email: string }) {
  const { data: enquiries } = useQuery({
    queryKey: ["enquiries"],
    queryFn: () => apiGet<Enquiry[]>("/enquiries"),
  });

  const all = enquiries ?? [];
  const count = (status: EnquiryStatus) => all.filter((e) => e.status === status).length;

  const metrics = [
    { label: "Total Enquiries", value: all.length, testid: "metric-total-enquiries" },
    { label: "New Leads", value: count("new"), testid: "metric-new-leads" },
    { label: "Contacted", value: count("contacted"), testid: "metric-contacted" },
    { label: "Enrolled", value: count("enrolled"), testid: "metric-enrolled" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-600" data-testid="admin-email-display">
            Signed in as {email}
          </p>
        </div>
        <Button
          variant="outline"
          data-testid="admin-logout-button"
          onClick={() => void endSession("/admin")}
        >
          <LogOut className="size-4" /> Log out
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4" data-testid="admin-metric-cards">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="p-5">
              <p className="font-heading text-3xl font-bold text-[#0078D4]" data-testid={metric.testid}>
                {metric.value}
              </p>
              <p className="mt-1 text-sm text-slate-600">{metric.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="enquiries" className="mt-8">
        <TabsList>
          <TabsTrigger value="enquiries" data-testid="admin-tab-enquiries">
            Enquiries
          </TabsTrigger>
          <TabsTrigger value="testimonials" data-testid="admin-tab-testimonials">
            Testimonials
          </TabsTrigger>
        </TabsList>
        <TabsContent value="enquiries" className="mt-6">
          <EnquiriesPanel />
        </TabsContent>
        <TabsContent value="testimonials" className="mt-6">
          <TestimonialsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function Admin() {
  const meQuery = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => apiGet<AuthMe>("/auth/me"),
    staleTime: 60_000,
  });

  if (meQuery.isPending) {
    return (
      <div className="grid min-h-svh place-items-center" data-testid="admin-loading">
        <Loader2 className="size-8 animate-spin text-[#0078D4]" />
      </div>
    );
  }

  return (
    <div data-testid="page-admin" className="min-h-svh pt-16">
      {meQuery.data?.authenticated && meQuery.data.email ? (
        <Dashboard email={meQuery.data.email} />
      ) : (
        <LoginView />
      )}
    </div>
  );
}
