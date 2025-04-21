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

const defaultScene: Scene = {
  background: "assets/mainbg.png",
  textBox: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    textColor: "#ffffff",
    speakerColor: "#ffc0cb"
  },
  dialogue: []
};

let scene: Scene = JSON.parse(JSON.stringify(defaultScene));

function updateOutput() {
  const output = document.getElementById("output") as HTMLTextAreaElement;
  output.value = JSON.stringify(scene, null, 2);
}

function updateMeta() {
  scene.background = (document.getElementById("background") as HTMLInputElement).value;
  scene.textBox.backgroundColor = (document.getElementById("textbox-bg") as HTMLInputElement).value;
  scene.textBox.textColor = (document.getElementById("textbox-text") as HTMLInputElement).value;
  scene.textBox.speakerColor = (document.getElementById("textbox-speaker") as HTMLInputElement).value;
  updateOutput();
}

function addDialogue() {
  const speaker = (document.getElementById("speaker") as HTMLInputElement).value;
  const text = (document.getElementById("text") as HTMLInputElement).value;
  const avatar = (document.getElementById("avatar") as HTMLSelectElement).value;
  const position = (document.querySelector("input[name='position']:checked") as HTMLInputElement).value as "left" | "right";
  const other = (document.getElementById("others") as HTMLSelectElement).value;
  const node: DialogueNode = { speaker, text, avatar, position, others: other === "" ? [] : [other] };

  scene.dialogue.push(node);
  updateOutput();
  (document.getElementById("dialogue-form") as HTMLFormElement).reset();
  (document.getElementById("avatar-preview") as HTMLImageElement).src = "";
  (document.getElementById("other-preview") as HTMLImageElement).src = "";
}

function resetScene() {
  scene = JSON.parse(JSON.stringify(defaultScene));
  updateOutput();
}

function setupBackgroundSelector() {
  const backgroundImports = import.meta.glob('/public/assets/backgrounds/**/*.{png,jpg,jpeg}', { eager: true, query: '?url', import: 'default' });
  const backgroundOptions: string[] = Object.values(backgroundImports).map(src => `${src}`.replace("/public", ""));

  const backgroundSelect = document.getElementById('background') as HTMLSelectElement;
  backgroundSelect.innerHTML = '';
  const backgroundPreview = document.getElementById('background-preview') as HTMLImageElement;
  backgroundPreview.src = backgroundOptions[0];

  for (const path of backgroundOptions) {
    const label = path.split('/').slice(-2).join('/');
    const opt = new Option(label, path);
    backgroundSelect.appendChild(opt);
  }

  backgroundSelect.addEventListener('change', () => {
    backgroundPreview.src = backgroundSelect.value;
    backgroundPreview.onerror = () => {
      backgroundPreview.src = 'https://placehold.co/200?text=Background';
    };
  });
}

function setupAvatarSelector() {
  const avatarImports = import.meta.glob('/public/assets/chars/**/*.{png,jpg,jpeg}', { eager: true, query: '?url', import: 'default' });
  const avatarOptions: string[] = Object.values(avatarImports).map(src => `${src}`.replace("/public", ""));

  const avatarSelect = document.getElementById('avatar') as HTMLSelectElement;
  const avatarPreview = document.getElementById('avatar-preview') as HTMLImageElement;
  avatarPreview.src = avatarOptions[0];
  const otherSelect = document.getElementById('others') as HTMLSelectElement;
  const otherPreview = document.getElementById('other-preview') as HTMLImageElement;

  avatarSelect.innerHTML = '';
  otherSelect.innerHTML = '';
  const none = new Option("None", "");
  otherSelect.appendChild(none);

  for (const path of avatarOptions) {
    const label = path.split('/').slice(-2).join('/');
    const opt1 = new Option(label, path);
    const opt2 = new Option(label, path);
    avatarSelect.appendChild(opt1);
    otherSelect.appendChild(opt2);
  }

  avatarSelect.addEventListener('change', () => {
    avatarPreview.src = avatarSelect.value;
    avatarPreview.onerror = () => {
      avatarPreview.src = 'https://placehold.co/200?text=Avatar';
    };
  });

  otherSelect.addEventListener('change', () => {
    otherPreview.src = otherSelect.value;
    otherPreview.onerror = () => {
      otherPreview.src = 'https://placehold.co/200?text=Avatar';
    };
  });
}

window.addEventListener("DOMContentLoaded", () => {
  setupAvatarSelector();
  setupBackgroundSelector();
  document.getElementById("meta-form")?.addEventListener("change", updateMeta);
  document.getElementById("add-dialogue")?.addEventListener("click", addDialogue);
  document.getElementById("reset-scene")?.addEventListener("click", resetScene);
  updateOutput();
  
  document.getElementById("download-json")?.addEventListener("click", () => {
    const output = document.getElementById("output") as HTMLTextAreaElement;
    const blob = new Blob([output.value], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = "scene.json";
    link.click();
  
    URL.revokeObjectURL(url);
  });
});
