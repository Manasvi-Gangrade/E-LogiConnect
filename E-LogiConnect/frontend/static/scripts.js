document.getElementById("transport-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const mode = document.getElementById("mode").value;
    const weight = document.getElementById("weight").value;
    const distance = document.getElementById("distance").value;

    const response = await fetch("/calculate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ mode, weight, distance })
    });

    const data = await response.json();
    document.getElementById("result").textContent = `Best Mode: ${data.result}`;
});
