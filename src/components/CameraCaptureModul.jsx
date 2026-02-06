import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function CameraCaptureModal({
  showCamera,
  setShowCamera,
  handleImageCapture, // ← gets base64
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (!showCamera) return;

    async function startCamera() {
      console.log("📷 Starting camera...");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      streamRef.current = stream;
      videoRef.current.srcObject = stream;
    }

    startCamera();

    return () => stopCamera();
  }, [showCamera]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    // ✅ Base64 image
    const base64Image = canvas.toDataURL("image/jpeg", 0.8).split(",")[1]; // 🔑 remove data:image/... prefix

    stopCamera();
    setShowCamera(false);

    handleImageCapture(base64Image);
  };

  if (!showCamera) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-md bg-slate-900 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h3 className="text-white font-semibold">Capture Image</h3>
          <button
            onClick={() => {
              stopCamera();
              setShowCamera(false);
            }}
          >
            <X className="text-white w-6 h-6" />
          </button>
        </div>

        {/* Camera */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-64 object-cover bg-black"
        />

        <canvas ref={canvasRef} className="hidden" />

        {/* Capture Button */}
        <div className="p-4">
          <button
            onClick={captureImage}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Capture
          </button>
        </div>
      </div>
    </div>
  );
}
