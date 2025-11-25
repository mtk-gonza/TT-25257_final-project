const API_URL = "http://localhost:3000/api/auth";

document.getElementById("submit").addEventListener("click", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    if (!username || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error en el login");
        }
        const data = await response.json();
        console.log("✅ Login exitoso:", data);
        if (data.token) {
            localStorage.setItem("token", data.token);
        }
        alert("Inicio de sesión correcto.");
        window.location.href = '/';

    } catch (err) {
        console.error("❌ Error:", err.message);
        alert("Error al iniciar sesión: " + err.message);
    }
});