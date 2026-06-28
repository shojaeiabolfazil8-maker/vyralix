import { ImageIcon, Tag, User, } from "lucide-react";
type HeaderProps = {
    user:any;
    setShowLogin: (value: boolean) => void;
};
export default function Header({
    user,
    setShowLogin,
 }: HeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "95%",
        marginBottom: "24px",
      }}
    >
     <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
    Vyralix AI
  </h1>
  
  <div style={{ display: "flex", gap: "8px", marginLeft: "auto"}}>

  <span
    style={{
      padding: "6px 14px",
      borderRadius: "16px",
      fontSize: "14px",
      background: "rgba(255,255,255,0.04)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.15)",
      cursor: "pointer",
      transition: "0.2s ease",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    }}
  >
    
    <ImageIcon size={12} />
    Gallery
  </span>

  <span
    style={{
      padding: "8px 16px",
      borderRadius: "12px",
      background: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(8px)",
      border: "1px solid rgba(255,255,255,0.15)",
      cursor: "pointer",
      transition: "0.2s ease",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    }}
  >
    
      <Tag size={12} />
      Pricing
    
  </span>

  <span
    onClick={() => setShowLogin(true)}
    style={{
      padding: "8px 16px",
      borderRadius: "12px",
      background: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(8px)",
      border: "1px solid rgba(255,255,255,0.15)",
      cursor: "pointer",
      transition: "0.2s ease",
       display: "flex",
      alignItems: "center",
      gap: "6px",
    }}
  >
    
      <User size={12} />
      {user ? `Hi, ${user.user_metadata?.first_name}` : "Login"}
    
  </span>

</div>
</div>
    
  );
}