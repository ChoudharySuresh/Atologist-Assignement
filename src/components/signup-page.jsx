"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./signup-page.module.scss";
import Image from "next/image";
import Logo from "../../public/Images/logo.svg";
import Main from "../../public/Images/main.svg";
import GoogleLogo from "../../public/Icons/googleLogo.svg";
import Input from "./Input";
import Toast from "./Toast";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    dob: "",
    termsAccepted: false,
    privacyAccepted: false,
  });

  const [toast, setToast] = useState({ message: "", type: "" });

  const [errors, setErrors] = useState({});

  // Validation function
  const validate = (field, value) => {
    let message = "";

    switch (field) {
      case "firstName":
      case "lastName":
        if (!value.trim()) {
          message = `${
            field === "firstName" ? "First" : "Last"
          } name is required`;
        } else if (!/^[A-Za-z]+$/.test(value)) {
          message = "Only alphabets allowed";
        }
        break;

      case "email":
        if (!value.trim()) {
          message = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
          message = "Invalid email address";
        }
        break;

      case "password":
        if (!value) {
          message = "Password is required";
        } else if (value.length < 8) {
          message = "Password must be at least 8 characters";
        } else if (
          !/[A-Za-z]/.test(value) ||
          !/\d/.test(value) ||
          !/[^A-Za-z0-9]/.test(value)
        ) {
          message = "Password must include letter, number & special char";
        }
        break;

      case "mobile":
        if (!value.trim()) {
          message = "Mobile number is required";
        } else if (!/^\d+$/.test(value)) {
          message = "Only digits allowed";
        }
        break;

      case "dob":
        if (!value.trim()) {
          message = "DOB is required";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: message }));
    return message === "";
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validate(field, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    let valid = true;
    Object.keys(formData).forEach((field) => {
      if (["termsAccepted", "privacyAccepted"].includes(field)) return;
      const isValid = validate(field, formData[field]);
      if (!isValid) valid = false;
    });

    if (!valid) return;

    const payload = {
      data: {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        encryptpassword: formData.password,
        dob: formData.dob,
      },
    };

    try {
      const res = await fetch(
        "https://atologistinfotech.com/api/register.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log("API Response:", data);
      if (data.success) {
        setToast({
          message: data.message || "Account created successfully!",
          type: "success",
        });
      } else {
        setToast({
          message: data.message || "Something went wrong",
          type: "error",
        });
      }
      // alert("Account created successfully!");
    } catch (error) {
      console.error("API Error:", error);
      setToast({ message: "Network error, please try again", type: "error" });
      // alert("Something went wrong");
    }
  };

  return (
    <>
      <div className={styles.signupContainer}>
        {/* Left Side */}
        <div className={styles.leftContainer}>
          {/* Nav Component */}
          <nav className={styles.header}>
            <div>
              <Image src={Logo} alt="logo" />
            </div>
            <p>
              Already have an account?{" "}
              <span className={styles.sign_in_link}>Sign In</span>
            </p>
          </nav>

          {/* Form Component */}
          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
              <h2>Welcome to Atologist Infotech</h2>
              <p className={styles.formHeader_subheading}>
                Create your account
              </p>
              <button type="button" className={styles.formHeader_google_btn}>
                <Image src={GoogleLogo} alt="google_logo" />
              </button>
              <p className={styles.formHeader_heading2}>OR</p>
            </div>

            <div className={styles.input_fullname}>
              <Input
                label="First Name"
                placeholder="Enter your first name"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                error={errors.firstName}
              />
              <Input
                label="Last Name"
                placeholder="Enter your last name"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                error={errors.lastName}
              />
            </div>

            <div className={styles.input_lower}>
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                error={errors.email}
              />
              <Input
                label="Mobile"
                placeholder="Enter your mobile number"
                type="text"
                value={formData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                error={errors.mobile}
              />

              {/* Password with Eye Toggle */}
              <div className={styles.input_container}>
                <label>Password</label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                  />
                  <span
                    className={styles.eyeIcon}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>
                {errors.password && (
                  <p className={styles.error_text}>{errors.password}</p>
                )}
              </div>

              <Input
                label="DOB"
                placeholder="Enter your date of birth"
                type="text"
                value={formData.dob}
                onChange={(e) => handleInputChange("dob", e.target.value)}
                error={errors.dob}
              />
            </div>

            <p className={styles.agree_to_heading}>I agree to</p>
            <div className={styles.agree_to_container}>
              <label>
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      termsAccepted: e.target.checked,
                    }))
                  }
                />
                <span className={styles.input_checkbox}>Terms of Service</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      privacyAccepted: e.target.checked,
                    }))
                  }
                />
                <span className={styles.input_checkbox}>Privacy Policy</span>
              </label>
            </div>

            <button type="submit" className={styles.create_btn}>
              Create Account
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className={styles.mainContainer}>
          <Image src={Main} alt="main_image" />
        </div>
      </div>
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      )}
    </>
  );
}
