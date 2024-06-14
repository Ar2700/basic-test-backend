document.addEventListener("DOMContentLoaded", () => {
  const btnLogout = document.getElementById("btnLogout");
  const btnUsers = document.getElementById("btnUsers");
  const url = "https://monster-gym-backend.onrender.com/";
  let tokenAccess = localStorage.getItem("accessToken");
  let UserId = localStorage.getItem("idUser");

  if (
    (tokenAccess === null || tokenAccess === "") &&
    (UserId === null || UserId === "")
  ) {
    window.location.href = "/index.html";
  }

  const userData = async (userId) => {
    const nameUserContaier = document.getElementById("nameUser");
    const membershipDataContainer = document.getElementById("membershipData");
    try {
      const req = await fetch(`${url}users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenAccess}`,
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();
      if (!req.ok) {
        throw new Error(res.message || "Error fetching users",res.message  );
      }

      //Llamar los datos del usuario en consola
      console.log(res);
      //Llamar un dato dentro de un contenedor
      nameUserContaier.innerHTML = `<span>${res.name}<span/>`;


      const reqMembership = await fetch(`${url}memberships/user/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenAccess}`,
          "Content-Type": "application/json",
        },
      });

      const resMembership = await reqMembership.json();
      if (!reqMembership.ok) {
        throw new Error(reqMembership.message || "Error fetching users");
      }

      //Llamar los datos de la membresia usuario en consola
      console.log(resMembership);
      //Llamar un dato dentro de un contenedor
  membershipData.innerHTML = `
      <p><span class="font-bold">Fecha de inicio: <span/> ${resMembership.start_date}<p/>
      <p><span class="font-bold">Fecha final: <span/>${resMembership.end_date}<p/>
      <p><span class="font-bold">Tipo de membresia: <span/>${resMembership.id_memberships_type.name}<p/>
      `;
  
    } catch (error) {
      console.error(error);
    }
  };
  const findAllUsers = async () => {
    const userContainer = document.getElementById("userContainer");
    try {
      const req = await fetch(`${url}users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenAccess}`,
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();

      if (!req.ok) {
        throw new Error(res.message || "Error fetching users");
      }

      userContainer.innerHTML = "";
      res.forEach((users) => {
        const userCard = `
     <div class="flex-wrap card  p-5 h-full relative border-2 border-blue-600 bg-gradient-to-b from-blue-600 from-[12%] via-[12%] via-white to-70% to-white shadow-lg rounded-xl w-72 flex justify-center items-center text-white">
       <span class="rounded-md bg-red-500 px-2 py-[.6em] absolute top-[2px] right-7 border border-white text-[.6em] mr-2 bg-gradient-to-b from-blue-800 via-blue-500 to-blue-800"> ▣ </span>
       <span class="rounded-md bg-red-500 px-2 py-[.6em] absolute top-[2px] right-14 border border-white text-[.6em] mr-3 bg-gradient-to-b from-blue-800 via-blue-500 to-blue-800"> — </span>
       <span class="rounded-md bg-red-500 px-2 py-[.6em] absolute top-[2px] right-0 border border-white text-[.6em] mr-1 bg-gradient-to-b from-red-800 via-red-500 to-red-800 font-bold"> ╳ </span>
       <div>
         <p class="text-black">
         ${users.id}</p>
        <p class="text-black">
         ${users.name}</p>
        <p class="text-black">
         ${users.lastname}</p>
        <p class="text-black">
         ${users.email}</p>
        <p class="text-black">
         ${users.height}</p>
        <p class="text-black">
         ${users.weight}</p>
       </div>
     </div>
            `;
        userContainer.innerHTML += userCard;
      });
    } catch (error) {
      console.error("Error fetching userssssssssss:", error);
    }
  };

  userData(UserId);
  btnUsers.addEventListener("click", findAllUsers);
  btnLogout.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
  });
});
