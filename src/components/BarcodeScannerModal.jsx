import { useEffect, useRef } from "react";
import Quagga from "quagga";
import { X } from "lucide-react";

export default function BarcodeScannerModal({
  showScanner,
  setShowScanner,
  handleBarcodeScan,
}) {
  const scannerRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!showScanner) return;

    // 🛑 Prevent double init
    if (startedRef.current) return;
    startedRef.current = true;

    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            facingMode: "environment", // mobile + mac
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
        },
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        decoder: {
          readers: [
            "ean_reader",
            "ean_8_reader",
            "upc_reader",
            "upc_e_reader",
            "code_128_reader",
          ],
        },
        locate: true,
      },
      (err) => {
        if (err) {
          console.error("Quagga init error:", err);
          closeScanner();
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected(onDetected);

    return () => {
      cleanup();
    };
  }, [showScanner]);

  const onDetected = (result) => {
    const code = result?.codeResult?.code;
    if (!code) return;

    console.log("✅ Barcode detected:", code);

    cleanup();
    handleBarcodeScan(code);
  };

  const cleanup = () => {
    try {
      Quagga.offDetected(onDetected);
      Quagga.stop();
    } catch {}
    startedRef.current = false;
  };

  const closeScanner = () => {
    cleanup();
    setShowScanner(false);
  };

  if (!showScanner) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-md bg-slate-900 rounded-lg overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h3 className="text-white font-semibold">Scan Barcode</h3>
          <button onClick={closeScanner}>
            <X className="text-white w-6 h-6" />
          </button>
        </div>

        {/* Camera */}
        <div
          ref={scannerRef}
          className="w-full h-64 bg-black"
        />

        {/* Hint */}
        <p className="text-center text-slate-400 text-sm py-3">
          Align barcode inside the frame
        </p>
      </div>
    </div>
  );
}
