/** Hand-written mirrors of the backend Pydantic models — keep in sync in the same edit. */

export type EnquiryStatus = "new" | "contacted" | "enrolled";

// Mirror of backend/models/enquiry.py :: Enquiry
export interface Enquiry {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  program_interest: string;
  message: string;
  status: EnquiryStatus;
  created_at: string;
  updated_at: string | null;
}

// Mirror of backend/models/testimonial.py :: Testimonial
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  display_order: number;
  published: boolean;
  created_at: string;
}

// Mirror of backend/models/auth.py :: AuthMe
export interface AuthMe {
  authenticated: boolean;
  email: string | null;
}
