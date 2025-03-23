document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("login-form")

    formLogin.addEventListener("submit", async (e) => {
        e.preventDefault()

        const formData = new FormData(formLogin)
        console.log(formData);
        
        const userData = Object.fromEntries(formData)
        console.log(userData);
        
        try {
            const response = await fetch('http://localhost:8080/api/sessions/login', {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(userData)
            })
            const data = await response.json()
            console.log(data);
            
            if(data?.message == "User logged succesfully"){
                window.location.href = "http://localhost:8080/api/products"
            } else {
                console.log(data);
                
            }
        } catch (error) {
            throw error
        }
    })
})