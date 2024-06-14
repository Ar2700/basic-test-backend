document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  let tokenAccess = localStorage.getItem("accessToken");
  let UserId = localStorage.getItem("idUser");

  if (tokenAccess && UserId) {
    window.location.href = "/home.html";
  }

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("Email: ", emailInput.value);
    console.log("Password: ", passwordInput.value);
    const url = "https://monster-gym-backend.onrender.com/";
    try {
      const req = await fetch(`${url}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput.value,
          password: passwordInput.value,
        }),
      });
      const res = await req.json();
      if (res.status === 200) {
        localStorage.setItem("accessToken", res.access_token);
        localStorage.setItem("idUser", res.user.id);
        console.log(res);
        window.location.href = "/home.html";
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const form = document.getElementById("form");
  form.addEventListener("submit", submitForm);
});
