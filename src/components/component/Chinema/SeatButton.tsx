interface SeatProps {
    seat: {
      id: string;
      reserved: boolean;
    };
    toggleReservation: (seatId: string) => void;
  }
  
  export default function SeatButton({ seat, toggleReservation }: SeatProps) {
    const handleClick = () => {
      toggleReservation(seat.id);
    };
  
    return (
      <button
        onClick={handleClick}
        aria-pressed={seat.reserved}
        style={{
          background: seat.reserved ? "red" : "green",
          color: seat.reserved ? "white" : "black",
          margin: "0.5rem",
 // パディングを追加
          fontSize: "1rem",     // フォントサイズを調整
          minWidth: "50px",     // 最小幅を設定
          minHeight: "50px",    // 最小高さを設定
          textAlign: "center",  // テキストを中央揃え
          border: "none",       // 枠線を削除
          borderRadius: "5px",  // 角を丸める
          cursor: "pointer",    // カーソルをポインタに
        }}
      >
        {seat.id}
      </button>
    );
  }
  