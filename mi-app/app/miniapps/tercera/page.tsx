"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./styles.css";

type Pieza = {
  tipo: string;
  color: "blanco" | "negro";
};

export default function AjedrezApp() {
  const router = useRouter();

  const inicializarTablero = (): (Pieza | null)[][] => {
    const tablero: (Pieza | null)[][] = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));

    const piezas = ["torre", "caballo", "alfil", "reina", "rey", "alfil", "caballo", "torre"];

    // Piezas negras
    for (let i = 0; i < 8; i++) {
      tablero[0][i] = { tipo: piezas[i], color: "negro" };
      tablero[1][i] = { tipo: "peon", color: "negro" };
    }

    // Piezas blancas
    for (let i = 0; i < 8; i++) {
      tablero[6][i] = { tipo: "peon", color: "blanco" };
      tablero[7][i] = { tipo: piezas[i], color: "blanco" };
    }

    return tablero;
  };

  const [tablero, setTablero] = useState<(Pieza | null)[][]>(inicializarTablero);
  const [seleccionada, setSeleccionada] = useState<{ fila: number; col: number } | null>(null);

  const manejarClick = (fila: number, col: number) => {
    if (seleccionada) {
      const nuevoTablero = tablero.map((filaArr) => filaArr.slice());
      nuevoTablero[fila][col] = tablero[seleccionada.fila][seleccionada.col];
      nuevoTablero[seleccionada.fila][seleccionada.col] = null;
      setTablero(nuevoTablero);
      setSeleccionada(null);
    } else if (tablero[fila][col]) {
      setSeleccionada({ fila, col });
    }
  };

  const renderPieza = (pieza: Pieza | null) => {
    if (!pieza) return "";
    const simbolos: Record<string, { blanco: string; negro: string }> = {
      rey: { blanco: "♔", negro: "♚" },
      reina: { blanco: "♕", negro: "♛" },
      torre: { blanco: "♖", negro: "♜" },
      alfil: { blanco: "♗", negro: "♝" },
      caballo: { blanco: "♘", negro: "♞" },
      peon: { blanco: "♙", negro: "♟" },
    };
    return simbolos[pieza.tipo][pieza.color];
  };

  return (
    <main className="chess-container">
      <h1>♟️ Juego de Ajedrez</h1>
      <div className="chess-board">
        {tablero.map((fila, i) => (
          <div key={i} className="chess-row">
            {fila.map((pieza, j) => {
              const colorCasilla = (i + j) % 2 === 0 ? "blanca" : "negra";
              const estaSeleccionada = seleccionada?.fila === i && seleccionada?.col === j;
              return (
                <div
                  key={j}
                  className={`chess-cell ${colorCasilla} ${
                    estaSeleccionada ? "seleccionada" : ""
                  }`}
                  onClick={() => manejarClick(i, j)}
                >
                  <span className={`pieza ${pieza?.color || ""}`}>{renderPieza(pieza)}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="botones">
        <button onClick={() => setTablero(inicializarTablero())}>Reiniciar tablero</button>
        <button className="volver-btn" onClick={() => router.push("/")}>
          Volver al inicio
        </button>
      </div>
    </main>
  );
}
