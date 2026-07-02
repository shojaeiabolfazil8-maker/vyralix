import{ useState } from "react";
import { supabase } from "../lib/supabase";
type LoginModalProps = {
  showLogin: boolean;
  setShowLogin: (value: boolean) => void;
  showRegister: boolean;
  setShowRegister: (value: boolean) => void;
};
export default function LoginModal ({
  showLogin,
  setShowLogin,
  showRegister,
  setShowRegister,
}: LoginModalProps) {
  const [email, setEmail,] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
   const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else {
    setShowLogin(false);
    window.location.reload();
  }
};
const handleRegister = async () => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },

  });
  if (error) {
    alert(error.message);
    return;
  }
  if (data.user) {
    await supabase.from("profiles").insert({
      id:data.user.id,
      email:data.user.email,
      credits: 2,
    });
  }
  alert("Account created!");
  setShowRegister(false);
};
  return (
    <>
{showLogin && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        background: "#111827",
        padding: "30px",
        borderRadius: "20px",
        width: "600px",
        position: "relative",
      }}
    >
      <h2>Login</h2>
      <button
  onClick={() => setShowLogin(false)}
  onMouseEnter={(e) => {
  e.currentTarget.style.transform = "scale(1.2) translateY(-2px)";
}}

onMouseLeave={(e) => {
  e.currentTarget.style.transform = "scale(1)";
}}
  style={{
    position: "absolute",
    top: "5px",
    right: "15px",
    background: "none",
    border: "none",
    color: "white",
    fontSize: "22px",
    cursor: "pointer",
    transition: "0.2s ease",
  }}
>
  ×
</button>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
  width: "100%",
  padding: "14px 16px",
  marginTop: "10px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(255,255,255,0.08)",
  color: "white",
  outline: "none",
  fontSize: "15px",
       }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
  width: "100%",
  padding: "14px 16px",
  marginTop: "10px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(255,255,255,0.08)",
  color: "white",
  outline: "none",
  fontSize: "15px",
       }}
       />

      <button
      onClick={handleLogin}
        style={{
  width: "100%",
  marginTop: "20px",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(90deg,#60a5fa,#2563eb)",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
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
    onClick={() => setShowRegister(true)}
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
  </div>
)}
    </>
  );
}