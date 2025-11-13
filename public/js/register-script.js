const API_URL = "http://localhost:3000/api/auth";

document.getElementById("submit").addEventListener("click", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const last_name = document.getElementById("last_name").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !last_name || !username || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, last_name, username, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error en el registro");
        }

        const data = await response.json();
        console.log("✅ register exitoso:", data);

        alert("Registrasado.");

    } catch (err) {
        console.error("❌ Error:", err.message);
        alert("Error al registrarse: " + err.message);
    }
});