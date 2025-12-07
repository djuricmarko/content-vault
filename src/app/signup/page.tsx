"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to register.");
      }
      // Auto sign-in after successful registration
      const login = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });
      if (login?.error) {
        router.push(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
        return;
      }
      router.push(callbackUrl);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "80px auto", padding: 24 }}>
      <h1>Create your account</h1>
      <button
        onClick={() => signIn("google", { callbackUrl })}
        style={{ width: "100%", padding: 10, marginBottom: 16 }}
      >
        Continue with Google
      </button>
      <div style={{ textAlign: "center", margin: "12px 0", color: "#888" }}>or</div>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Optional"
          style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 12 }}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 12 }}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
          style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 12 }}
        />
        {error && (
          <div style={{ color: "#b00020", marginBottom: 12 }}>{error}</div>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: 10 }}
        >
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
      <p style={{ marginTop: 16 }}>
        Already have an account? <a href="/signin">Sign in</a>
      </p>
    </div>
  );
}
