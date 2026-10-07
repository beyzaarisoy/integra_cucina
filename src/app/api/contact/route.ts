import { NextResponse } from "next/server";

/**
 * Consultation requests from the contact page.
 *
 * Connect this to the studio's inbox or CRM (e.g. Resend, Postmark, HubSpot)
 * by forwarding `lead` below. Until then requests are logged on the server.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim().slice(0, 2000) : "");
  const lead = {
    firstName: str("firstName"),
    lastName: str("lastName"),
    email: str("email"),
    phone: str("phone"),
    zip: str("zip"),
    city: str("city"),
    showroom: str("showroom"),
    project: str("project"),
    budget: str("budget"),
    message: str("message"),
    receivedAt: new Date().toISOString(),
  };

  if (!lead.firstName || !lead.lastName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return NextResponse.json({ ok: false, error: "Please provide your name and a valid email." }, { status: 422 });
  }

  console.info("[consultation request]", lead);
  return NextResponse.json({ ok: true });
}
