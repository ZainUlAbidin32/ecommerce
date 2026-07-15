import { Suspense } from "react";
import VerifyOtpForm from "./VerifyOtpForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpForm />
    </Suspense>
  );
}