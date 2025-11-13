"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./styles.css";

type Piece = {
  id: number;
  correctX: number;
  correctY: number;
  currentX: number;
  currentY: number;
};

export default function RompecabezasApp() {
  const router = useRouter();
  const [nivel, setNivel] = useState(1);
  const [piezas, setPiezas] = useState<Piece[]>([]);
  const [ganado, setGanado] = useState(false);
  const [movimientos, setMovimientos] = useState(0);

  // Crear piezas según el nivel
  useEffect(() => {
    const n = nivel + 2; // nivel 1 = 3x3, nivel 2 = 4x4, etc.
    const lista: Piece[] = [];
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        lista.push({
          id: y * n + x,
          correctX: x,
          correctY: y,
          currentX: x,
          currentY: y,
        });
      }
    }
    // Mezclar posiciones iniciales
    const mezclado = lista.map((p) => ({ ...p }));
    for (let i = mezclado.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mezclado[i].currentX, mezclado[j].currentX] = [mezclado[j].currentX, mezclado[i].currentX];
      [mezclado[i].currentY, mezclado[j].currentY] = [mezclado[j].currentY, mezclado[i].currentY];
    }
    setPiezas(mezclado);
    setGanado(false);
    setMovimientos(0);
  }, [nivel]);

  // Verificar si se completó el rompecabezas
  useEffect(() => {
    if (
      piezas.length > 0 &&
      piezas.every((p) => p.correctX === p.currentX && p.correctY === p.currentY)
    ) {
      setGanado(true);
    }
  }, [piezas]);

  const moverPieza = (id: number) => {
    if (ganado) return;
    setPiezas((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, currentX: (p.currentX + 1) % (nivel + 2) }
          : p
      )
    );
    setMovimientos((m) => m + 1);
  };

  return (
    <main className="juego-container">
      <h1>🧩 Rompecabezas - Nivel {nivel}</h1>

      {!ganado ? (
        <div
          className="rompecabezas"
          style={{
            gridTemplateColumns: `repeat(${nivel + 2}, 1fr)`,
            gridTemplateRows: `repeat(${nivel + 2}, 1fr)`,
          }}
        >
          {piezas.map((p) => (
            <div
              key={p.id}
              className="pieza"
              onClick={() => moverPieza(p.id)}
              style={{
                gridColumnStart: p.currentX + 1,
                gridRowStart: p.currentY + 1,
              }}
            >
              {p.id + 1}
            </div>
          ))}
        </div>
      ) : (
        <div className="ganado">
          <h2>🎉 ¡Completaste el nivel {nivel}!</h2>
          <p>Movimientos: {movimientos}</p>
          <div className="botones">
            <button onClick={() => setNivel(nivel + 1)}>Siguiente nivel ➡</button>
            <button onClick={() => setNivel(1)}>Reiniciar</button>
            <button className="volver-btn" onClick={() => router.push("/")}>
              Volver al inicio
            </button>
          </div>
        </div>
      )}

      {!ganado && (
        <div className="botones">
          <button className="volver-btn" onClick={() => router.push("/")}>
            Volver al inicio
          </button>
        </div>
      )}
    </main>
  );
}
