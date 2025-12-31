// pages/success.js
import { useRouter } from "next/router";
export default function Success() {
  const router = useRouter();
  return (
    <h1>
      Payment Successful! 🎉
      <button onClick={() => router.back()}>Back to dashboard</button>
    </h1>
  );
}
