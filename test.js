  const mainButton = document.getElementById("mainButton");
        const secondaryButton = document.getElementById("secondaryButton");

        mainButton.addEventListener("click", () => {
            mainButton.style.display = "none";
            secondaryButton.style.display = "block";
        });

        secondaryButton.addEventListener("click", () => {
            secondaryButton.style.display = "none";
            mainButton.style.display = "block";
        });
