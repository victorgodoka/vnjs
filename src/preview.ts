interface DialogueNode {
  speaker: string;
  text: string;
  avatar?: string;
  position: "left" | "right";
  others?: string[];
  font?: {
    speaker?: string;
    text?: string;
  };
}

interface Scene {
  background: string;
  textBox: {
    backgroundColor: string;
    textColor: string;
    speakerColor: string;
  };
  dialogue: DialogueNode[];
}

let scene: Scene;
let currentIndex = 0;

export async function loadScene() {
  const data = localStorage.getItem("vn-scene-preview");
  scene = JSON.parse(data || "{}") as Scene;
  applySceneStyle();
  renderDialogue();
}

function applySceneStyle() {
  const body = document.getElementById("scene-body")!;
  body.style.backgroundImage = `url(${scene.background})`;

  const textBox = document.getElementById("text-box")!;
  textBox.style.backgroundColor = scene.textBox.backgroundColor;

  const text = document.getElementById("text")!;
  text.style.color = scene.textBox.textColor;

  const speakerLeft = document.getElementById("speaker-left")!;
  const speakerRight = document.getElementById("speaker-right")!;
  speakerLeft.style.color = scene.textBox.speakerColor;
  speakerRight.style.color = scene.textBox.speakerColor;
}

function renderDialogue() {
  const node = scene.dialogue[currentIndex];
  if (!node) return;

  const speakerLeft = document.getElementById("speaker-left")!;
  const speakerRight = document.getElementById("speaker-right")!;
  const text = document.getElementById("text")!;
  const imgLeft = document.getElementById("img-left") as HTMLImageElement;
  const imgRight = document.getElementById("img-right") as HTMLImageElement;

  // Reset visibility
  speakerLeft.classList.add("hidden");
  speakerRight.classList.add("hidden");
  imgLeft.style.opacity = "0.25";
  imgRight.style.opacity = "0.25";

  if (node.position === "left") {
    speakerLeft.textContent = node.speaker;
    speakerLeft.classList.remove("hidden");
    if (node.avatar) imgLeft.src = node.avatar;
    imgLeft.style.opacity = "1";
  } else {
    speakerRight.textContent = node.speaker;
    speakerRight.classList.remove("hidden");
    if (node.avatar) imgRight.src = node.avatar;
    imgRight.style.opacity = "1";
  }

  text.textContent = node.text;

  if (node.font) {
    if (node.font.speaker) {
      (node.position === "left"
        ? speakerLeft
        : speakerRight
      ).style.fontFamily = node.font.speaker;
    }
    if (node.font.text) {
      text.style.fontFamily = node.font.text;
    }
  }
}

document.body.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex >= scene.dialogue.length) {
    console.log("End of scene");
    return;
  }
  renderDialogue();
});

loadScene()