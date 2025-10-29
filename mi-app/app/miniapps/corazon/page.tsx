"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./styles.css";

export default function CorazonApp() {
  const [nombre, setNombre] = useState("");
  const [mostrando, setMostrando] = useState(false);
  const [formando, setFormando] = useState(false);
  const [heartText, setHeartText] = useState("");
  const [loadingText, setLoadingText] = useState("");
  const router = useRouter();

  // Efecto "Formando corazón..." tipo animación de escritura
  useEffect(() => {
    if (formando) {
      const texto = "♥ Formando corazón... ♥";
      let i = 0;
      setLoadingText("");
      const intervalo = setInterval(() => {
        setLoadingText((prev) => prev + texto[i]);
        i++;
        if (i >= texto.length) clearInterval(intervalo);
      }, 100);
    }
  }, [formando]);

  const formarCorazon = async () => {
    if (!nombre.trim()) return;
    setFormando(true);
    setMostrando(false);
    await new Promise((r) => setTimeout(r, 2000));

    // Generar corazón redondo (matemático)
    const size = 20;
    const chars = (nombre + " ").repeat(10000);
    let index = 0;
    let heart = "";

    for (let y = size; y > -size; y--) {
      let line = "";
      for (let x = -2 * size; x < 2 * size; x++) {
        const formula =
          Math.pow(x * 0.04, 2) + Math.pow(y * 0.1 - Math.sqrt(Math.abs(x * 0.04)), 2);
        if (formula <= 1) {
          line += chars[index % chars.length];
          index++;
        } else {
          line += " ";
        }
      }
      heart += line + "\n";
    }

    setHeartText(heart);
    setFormando(false);
    setMostrando(true);
  };

  return (
    <main className="terminal">
      {!formando && !mostrando && (
        <div className="input-section">
          <h1>♥ Corazón con...</h1>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Escribe un nombre..."
          />
          <div className="botones">
            <button onClick={formarCorazon}>Formar corazón</button>
            <button className="volver-btn" onClick={() => router.push("/")}>
              Volver al inicio
            </button>
          </div>
        </div>
      )}

      {formando && (
        <div className="loading">
          <p>{loadingText}</p>
        </div>
      )}

      {mostrando && (
        <div className="heart-section">
          <pre className="heart">{heartText}</pre>
          <p className="mensaje">
            Te amo, <span className="nombre">{nombre}!</span> ♥
          </p>
          <div className="botones">
            <button
              onClick={() => {
                setMostrando(false);
                setNombre("");
              }}
            >
              Crear otro
            </button>
            <button className="volver-btn" onClick={() => router.push("/")}>
              Volver al inicio
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
