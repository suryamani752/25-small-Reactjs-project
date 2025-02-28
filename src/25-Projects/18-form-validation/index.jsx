import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import FloatingInput from "./FloatingInput";
import PasswordStrength from "./PasswordStrength";
import { schema } from "./validation";

export default function EnhancedForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-center mb-5">Create Your Account</h1>

        <FloatingInput
          icon={<FiUser />}
          label="Username"
          {...register("username")}
          error={errors.username}
          value={watch("username")}
        />

        <FloatingInput
          icon={<FiMail />}
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email}
          value={watch("email")}
        />

        <FloatingInput
          icon={<FiLock />}
          label="Password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          error={errors.password}
          value={watch("password")}
          showPassword={showPassword}
          toggleShow={() => setShowPassword(!showPassword)}
        />

        <PasswordStrength password={watch("password") || ""} />

        <motion.button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg cursor-pointer"
        >
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </motion.button>
      </motion.form>
    </div>
  );
}
