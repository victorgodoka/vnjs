
const fileInput = document.getElementById("file-input") as HTMLInputElement;
const jsonInput = document.getElementById("json-input") as HTMLTextAreaElement;
const previewBtn = document.getElementById("preview-btn") as HTMLButtonElement;

fileInput.addEventListener("change", async () => {
  const file = fileInput.files?.[0];
  if (!file) return;

  const text = await file.text();
  jsonInput.value = text;
});

previewBtn.addEventListener("click", () => {
  const json = jsonInput.value;
  try {
    const parsed = JSON.parse(json);
    localStorage.setItem("vn-scene-preview", JSON.stringify(parsed));
    window.location.href = "/preview.html";
  } catch (e) {
    alert("Invalid JSON: " + e);
  }
});