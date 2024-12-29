import "../styles/signupform.css";
import { useState } from "react";

export default function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (
      !firstName ||
      !lastName ||
        !email ||
      !password ||
      !phoneNumber

    ) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    try {
      // print the values to the console
      console.log(
        firstName,
        lastName,
          email,
        password,
        phoneNumber
      );
      const response = await fetch("http://localhost/Car_Rental_System-main/Backend/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          phoneNumber
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSuccessMessage("Account created successfully!");
          setErrorMessage("")
          // Perform additional actions on successful sign up
          // Reset the form
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setPhoneNumber("");

        } else {
          setErrorMessage(data.message || "Sign up failed. Please try again.");
        }
      }
    } catch (error) {
      setErrorMessage("Unable to connect to the server.");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Customer Sign Up</h2>
      {errorMessage && (
        <p className="text-sm text-red-500 mb-4">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="text-sm text-green-500 mb-4">{successMessage}</p>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
            placeholder="Enter your first name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
            placeholder="Enter your last name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
            placeholder="Enter your phone number"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-600 hover:bg-green-500 text-white rounded"
        >
          Sign Up
        </button>


      </form>
    </div>
  );
}
