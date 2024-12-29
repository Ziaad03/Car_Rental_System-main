import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // change this according to the backend
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (!email || !password) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }
    if (role === "Admin") {
      if (email === "zeyade01@gmail.com" && password === "123456") {
        navigate("/admin");

        return;
      }
      try {
        console.log("here")
        const response = await fetch("http://localhost/Car_Rental_System-main/Backend/login.php", {
          // change the url
          // change this URL

          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: role.toLowerCase(),
            email,
            password,
          }),
        });

        if (response.ok) {

          const data = await response.json();
          console.log(data)
          if (data.success) {
            console.log("in data,sucess")

            navigate("/admin");

            // Perform additional actions on successful login
          } else {
            setErrorMessage(data.message || "Login failed. Please try again.");
          }
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      } catch (error) {
        setErrorMessage("Unable to connect to the server.");
      }
    }

    if (role === "Customer") {
      if (email === "johndoe@gmail.com" && password === "123456") {
        navigate("/customer");
        return;
      }
      try {
        const response = await fetch("http://localhost/Car_Rental_System-main/Backend/login.php", {
          // change the url
          // change this URL
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: role.toLowerCase(),
            email,
            password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            navigate("/customer");
            // Perform additional actions on successful login
          } else {
            setErrorMessage(data.message || "Login failed. Please try again.");
          }
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      } catch (error) {
        setErrorMessage("Unable to connect to the server.");
      }
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{role} Log In</h2>
      {errorMessage && (
        <p className="text-sm text-red-500 mb-4">{errorMessage}</p>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
            placeholder="Enter your email"
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
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
