 "use client";
  import { useEffect, useRef, useState} from "react";
  import { ImageIcon, Tag, User, } from "lucide-react";
  import { supabase } from "../lib/supabase";
  import Header from "@/components/Header";
  import LoginModal from "@/components/LoginModal"; 
  
export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);

useEffect(() => {
  supabase.auth.getUser().then(({ data }) => {
    setUser(data.user);
  });
}, []);

 

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
  } else {
    await supabase.from("profiles").insert({
      id:data.user?.id,
      email: data.user?.email,
      credits: 2,
    });
    alert("Account created!");
  }
};
  return (
    <main
      style={{
        background: "#050505",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        textAlign: "center",
      }}
    >
   
    <Header
      user={user}
      setShowLogin={setShowLogin}
      /> 
      <h1 style={{ fontSize: "80px", marginBottom: "10px" }}>
        Vyralix
      </h1>

      <h2 style={{ color: "#60a5fa" }}>
        AI Video Studio
      </h2>

      <p style={{ maxWidth: "600px", marginTop: "20px" }}>
        Upload a photo and generate talking videos in seconds.
      </p>

       <div
  style={{
    marginTop: "30px",
    display: "flex",
    gap: "10px",
  }}
>
  <div
  style={{
    marginTop: "30px",
    padding: "40px",
    border: "1px solid #334155",
    borderRadius: "20px",
    background: "#111827",
    width: "900px",
    maxWidth: "95%"
  }}
>
  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    style={{ display: "none" }}
    onChange={(e) => {
      if (e.target.files?.[0]) {
        setFileName(e.target.files[0].name);
        setPreview(URL.createObjectURL(e.target.files[0]));
        setImageFile(e.target.files[0]);
    }
  }}
/>

<button
  onClick={() => fileInputRef.current?.click()}
  style={{
    width: "100%",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "12px",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "white",
    cursor: "pointer",
  }}
>
  Upload Image
</button>
{fileName && (
  <p
    style={{
      marginBottom: "15px",
      color:"#93c5fd",
      fontSize: "14px",
    }}
  >
    Selected:{fileName}
  </p>
)}
{preview && (
  <div
    style={{
      position: "relative",
      display: "inline-block",
      marginBottom: "15px",
    }}
  >
    <img
      src={preview}
      alt="preview"
      style={{
        width: "250px",
        borderRadius: "20px",
        objectFit: "cover",
      }}
    />

    <button
      onClick={() => {
        setPreview("");
        setImageFile(null);
        setFileName("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }}
        
      style={{
        position: "absolute",
        top: "-3px",
        right: "-45px",
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.35)",
        background: "white",
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 20px rgba(0,0,0,.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.25s ease",
        color: "#111827",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
  e.currentTarget.style.background = "#2563eb";
  e.currentTarget.style.color = "white";
  e.currentTarget.style.transform = "scale(1.08)";
      }}
      
     onMouseLeave={(e) => {
  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
  e.currentTarget.style.color = "#111827";
  e.currentTarget.style.transform = "scale(1)";
      }}
    >
    ✕
    </button>
  </div>
)}
<textarea
value={prompt}
onChange={(e) => setPrompt(e.target.value)}
  placeholder="Describe your video..."
  style={{
    width: "100%",
    height: "120px",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "12px",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "white",
    resize: "none",
  }}
/>
 <button
 onClick={async () => {
  try {
    if (!user) {
  const guestVideoCount = Number(localStorage.getItem("guestVideoCount") || "0");

  if (guestVideoCount >= 1) {
    alert("Free users can only generate one video. Please login.");
    setShowLogin(true);
    return;
  }
}
let profile = null;
if (user) {
  const { data } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", user.id)
      .single();
  profile = data;
    if (!profile || profile.credits <= 0) {
      alert("You don't have enough credits. upgrade your plan to continue.");
      return;
    }
}
    setLoading(true);
    let imageUrl = null;

if (imageFile) {
  const formData = new FormData();

  formData.append("file", imageFile);

  formData.append(
    "upload_preset",
    "vyralix_upload"
  );

  const uploadResponse = await fetch(
    "https://api.cloudinary.com/v1_1/ds7hse0vh/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const uploadData = await uploadResponse.json();

  imageUrl = uploadData.secure_url;

  console.log("Cloudinary URL:", imageUrl);
}
   
    const response = await fetch("/api/generate-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        image: imageUrl,
      }),
    });

    const data = await response.json();

    console.log(data);
    console.log("NEW VIDEO URL:", data.videoUrl);
    if (data.videoUrl) {
      setVideoUrl(data.videoUrl);
      console.log("STATE SHOULD UPDATE");
      if (user) {
        await supabase
        .from("profiles")
        .update({
            credits: profile!.credits -1,
        })
        .eq("id", user.id);
      }
      if(!user) {
        const guestVideoCount = Number(localStorage.getItem("guestVideoCount") || "0");
        localStorage.setItem(
            "guestVideoCount",
            String(guestVideoCount + 1)
        );
      }
    }
  } catch (error) {
    console.error(error);
    alert("Error");
  } finally {
    setLoading(false);
  }
}}
  style={{
    width: "100%",
    padding: "15px",
    borderRadius: "12px",
    border: "none",
    background: "#2563eb",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  }}
>
  {loading ? "Generating..." : "Generate Video"}
</button>
{videoUrl && (
  <>
  <video
    key={videoUrl}
    controls
    style={{
      width: "100%",
      marginTop: "20px",
      borderRadius: "12px",
    }}
  >
    <source src={videoUrl} type="video/mp4" />
  </video>
  <a
    href={videoUrl}
    download
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "block",
      marginTop: "15px",
      padding: "12px",
      background: "#16a34a",
      color: "white",
      textDecoration: "none",
      borderRadius: "12px",
      textAlign: "center",
    }}
  >
    Download Video
  </a>
</>)}
<div
  style={{
    display: "flex",
    gap: "20px",
    marginTop: "40px",
    flexWrap: "wrap",
    justifyContent: "center",
  }}
>
  <img
    src="/IMG_3902.JPG"
    style={{
      width: "220px",
      height: "320px",
      objectFit: "cover",
      borderRadius: "20px",
    }}
  />

  <img
    src="/IMG_3904.JPG"
    style={{
      width: "220px",
      height: "320px",
      objectFit: "cover",
      borderRadius: "20px",
    }}
  />

  <img
    src="/IMG_3907.JPG"
    style={{
      width: "220px",
      height: "320px",
      objectFit: "cover",
      borderRadius: "20px",
    }}
  />
</div>
</div>
    
</div>
      
{showRegister && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        background: "#111827",
        padding: "30px",
        borderRadius: "20px",
        width: "600px",
        maxWidth: "95%",
        position: "relative",
      }}
    >
      <button
        onClick={() => setShowRegister(false)}
        style={{
          position: "absolute",
          top: "10px",
          right: "15px",
          background: "none",
          border: "none",
          color: "white",
          fontSize: "22px",
          cursor: "pointer",
        }}
      >
        ×
      </button>

      <h2>Register</h2>

      <input
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "15px",
          borderRadius: "10px",
        }}
      />

<input
  placeholder="Last Name"
  value={lastName}
   onChange={(e) => setLastName(e.target.value)}
   style={{
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "10px",
  }}
/>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "10px",
          borderRadius: "10px",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "10px",
          borderRadius: "10px",
        }}
      />

      <button
        onClick={handleRegister}
        style={{
          width: "100%",
          marginTop: "20px",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          background:
            "linear-gradient(90deg,#60a5fa,#2563eb)",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Create Account
      </button>
    </div>
  </div>
)}
<LoginModal
  showLogin={showLogin}
  setShowLogin={setShowLogin}
  showRegister={showRegister}
  setShowRegister={setShowRegister}
/>
    </main>
  );
}