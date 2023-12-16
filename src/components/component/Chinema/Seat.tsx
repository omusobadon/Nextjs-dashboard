import React, { useEffect, useState } from "react";
import axios from "axios";
import SeatButton from "./SeatButton";

export default function Seat() {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/Seat");
        setSeats(response.data.seats);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    fetchSeats();
  }, []);

  // 行ごとに座席をグループ化する
  const groupedSeats = seats.reduce((acc, seat) => {
    acc[seat.row] = acc[seat.row] || [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(groupedSeats).map(row => (
        <div key={row} className="flex items-center mb-2">
          <div className="mr-2">{row}</div>
          {groupedSeats[row].map(seat => (
            <SeatButton
              key={seat.id}
              seat={seat}
              toggleReservation={() => console.log("Toggle reservation", seat.id)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
