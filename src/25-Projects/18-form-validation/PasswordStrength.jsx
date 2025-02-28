import React from "react";
import { motion } from "framer-motion";

const PasswordStrength = ({ password = "" }) => {
  const strength = Math.min(
    (password.match(/[A-Z]/) ? 1 : 0) +
      (password.match(/[0-9]/) ? 1 : 0) +
      (password.match(/[^A-Za-z0-9]/) ? 1 : 0) +
      (password.length >= 8 ? 1 : 0),
    4
  );

  const colors = ["red-400", "orange-400", "yellow-400", "green-400"];
  const labels = ["Weak", "Fair", "Good", "Strong"];

  return (
    <div className="my-4">
      <div className="flex gap-1 h-3 rounded-full bg-gray-200">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`h-3 flex-1 ${
              i < strength ? `bg-${colors[strength - 1]}` : "bg-transparent"
            }`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
          />
        ))}
      </div>
      <div className="text-sm flex justify-between">
        <span>Password Strength:</span>
        <span className={`text-${colors[strength - 1]}`}>
          {labels[strength - 1] || "None"}
        </span>
      </div>
    </div>
  );
};

export default PasswordStrength;
