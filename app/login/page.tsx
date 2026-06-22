export default function LoginPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        color: "white",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "30px",
          borderRadius: "20px",
          background: "#111827",
        }}
      >
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            borderRadius: "10px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            borderRadius: "10px",
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            borderRadius: "10px",
            background: "#2563eb",
            color: "white",
            border: "none",
          }}
        >
          Login
        </button>
        <p
  style={{
    marginTop: "15px",
    textAlign: "center",
    color: "#aaa",
    fontSize: "14px",
  }}
>
  Don't have an account?{" "}
  <span
    style={{
      color: "#60a5fa",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Register
  </span>
</p>
      </div>
    </main>
  );
}