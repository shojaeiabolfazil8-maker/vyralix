 "use client";
  import { useRef, useState} from "react";
export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  return (
    <main
      style={{
        background: "#050505",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
    <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    width: "1200px",
    maxWidth: "95%",
    marginBottom: "30px",
  }}
>
  <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
    Vyralix AI
  </h1>

  <div style={{ display: "flex", gap: "20px" }}>
    <span>Gallery</span>
    <span>Pricing</span>
    <span>Login</span>
  </div>
</div>
      <h1 style={{ fontSize: "60px", marginBottom: "10px" }}>
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
    width: "1200px",
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
  <img
   src={preview}
   alt="preview"
   style={{
    width: "250px",
    borderRadius:"12px",
    marginBottom:"15px",
    objectFit:"cover",
   }}
  />
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
    if (data.videoUrl) {
      setVideoUrl(data.videoUrl);
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
    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    style={{
      width: "220px",
      height: "320px",
      objectFit: "cover",
      borderRadius: "20px",
    }}
  />

  <img
    src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61"
    style={{
      width: "220px",
      height: "320px",
      objectFit: "cover",
      borderRadius: "20px",
    }}
  />

  <img
    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
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
      
    </main>
  );
}