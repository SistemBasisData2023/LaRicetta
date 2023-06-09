import "./listitem.css";
import food from "../assets/nasigoreng.jpg"
import { useState } from "react";

export default function Listitem({ index }) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className="listitem"
            style={{ left: isHovered && index * 260 - 0 + index * 20 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={food} alt="nasigoreng" />

            {isHovered && (
                <>
                    <div className="overlay">
                        <div className="overlayContent">
                            <span>Nasi Goreng</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}