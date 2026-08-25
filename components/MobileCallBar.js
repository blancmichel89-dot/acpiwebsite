import Link from "next/link";
import { PhoneIcon, MailIcon } from "./Icons";
import { CONTACT_PHONE_HREF } from "@/lib/site";

export default function MobileCallBar() {
  return (
    <div className="mobile-call-bar">
      <a href={`tel:${CONTACT_PHONE_HREF}`} className="mobile-call-btn mobile-call-btn-primary">
        <PhoneIcon style={{ width: 18, height: 18 }} />
        Appeler
      </a>
      <Link href="/contact" className="mobile-call-btn mobile-call-btn-outline">
        <MailIcon style={{ width: 18, height: 18 }} />
        Devis
      </Link>
    </div>
  );
}
