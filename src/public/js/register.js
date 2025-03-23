document.addEventListener("DOMContentLoaded", () => {
    const formRegister = document.getElementById("register-form")

    formRegister.addEventListener("submit", async (e) => {
        e.preventDefault()

        const formData = new FormData(formRegister)
        
        const userData = Object.fromEntries(formData)
        
        try {
            const response = await fetch('http://localhost:8080/api/sessions/register', {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(userData)
            })
            const data = await response.json()
            
            if(data?.message == "User registered succesfully"){
                window.location.href = "http://localhost:8080/api/sessions/viewlogin"
            } else {
                console.error({message: "Write correct data"})
            }
        } catch (error) {
            throw error
        }
    })
})