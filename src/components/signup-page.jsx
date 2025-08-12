"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./signup-page.module.scss";
import Image from "next/image";
import Logo from "../../public/Images/logo.svg";
import Main from "../../public/Images/main.svg";
import GoogleLogo from "../../public/Icons/googleLogo.svg";
import Input from "./Input";

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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  return (
    // <div className={styles.signupContainer}>
    //   {/* Left Side */}
    //   <div className={styles.leftContainer}>
    //     {/* Nav Component */}
    //     <nav className={styles.header}>
    //       <div>
    //         <Image src={Logo} alt="logo" />
    //       </div>
    //       <p>
    //         Already have an account?{" "}
    //         <span className={styles.sign_in_link}>Sign In</span>
    //       </p>
    //     </nav>
    //     {/* Form Component */}
    //     <form className={styles.formContainer}>
    //       <div className={styles.formHeader}>
    //         <h2>Welcome to Atologist Infotech</h2>
    //         <p className={styles.formHeader_subheading}>Create your account</p>
    //         <button type="button" className={styles.formHeader_google_btn}>
    //           <Image src={GoogleLogo} alt="google_logo" />
    //         </button>
    //         <p>OR</p>
    //       </div>
    //       <div className={styles.input_fullname}>
    //         <Input
    //           label="First Name"
    //           placeholder="Enter your first name"
    //           type="text"
    //         />
    //         <Input
    //           label="Last Name"
    //           placeholder="Enter your last name"
    //           type="text"
    //         />
    //       </div>
    //       <div className={styles.input_lower}>
    //         <Input label="Email" placeholder="Enter your email" type="email" />
    //         <Input
    //           label="Mobile"
    //           placeholder="Enter your mobile number"
    //           type="text"
    //         />
    //         <Input
    //           label="Password"
    //           placeholder="Enter your password"
    //           type="text"
    //         />
    //         <Input
    //           label="DOB"
    //           placeholder="Enter your dateofbirth"
    //           type="text"
    //         />
    //       </div>

    //       <p className={styles.agree_to_heading}>I agree to </p>
    //       <div className={styles.agree_to_container}>
    //         <div>
    //           <label>
    //             <input type="checkbox" name="" id="" />
    //             <span className={styles.input_checkbox}>Terms of Service</span>
    //           </label>
    //         </div>
    //         <div>
    //           <label>
    //             <input type="checkbox" name="" id="" />
    //             <span className={styles.input_checkbox}>Privacy Policy</span>
    //           </label>
    //         </div>
    //       </div>
    //       <button className={styles.create_btn}>Create Account</button>
    //     </form>
    //   </div>
    //   {/* right Side */}
    //   <div className={styles.mainContainer}>
    //     <Image src={Main} alt="main_image" />
    //   </div>
    // </div>

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
            <p className={styles.formHeader_subheading}>Create your account</p>
            <button type="button" className={styles.formHeader_google_btn}>
              <Image src={GoogleLogo} alt="google_logo" />
            </button>
            <p>OR</p>
          </div>

          <div className={styles.input_fullname}>
            <Input
              label="First Name"
              placeholder="Enter your first name"
              type="text"
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
            <Input
              label="Last Name"
              placeholder="Enter your last name"
              type="text"
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
          </div>

          <div className={styles.input_lower}>
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <Input
              label="Mobile"
              placeholder="Enter your mobile number"
              type="text"
              onChange={(e) => handleInputChange("mobile", e.target.value)}
            />

            {/* Password with Eye Toggle */}
            <div className={styles.input_container}>
              <label>Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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
            </div>

            <Input
              label="DOB"
              placeholder="Enter your date of birth"
              type="text"
              onChange={(e) => handleInputChange("dob", e.target.value)}
            />
          </div>

          <p className={styles.agree_to_heading}>I agree to</p>
          <div className={styles.agree_to_container}>
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  handleInputChange("termsAccepted", e.target.checked)
                }
              />
              <span className={styles.input_checkbox}>Terms of Service</span>
            </label>
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  handleInputChange("privacyAccepted", e.target.checked)
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
  );
}
