document.addEventListener("DOMContentLoaded", () => {
  const filePath = "defaultInput.txt";

  function loadFile() {
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((text) => {
        document.getElementById("input").value = text;
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  loadFile();
});
