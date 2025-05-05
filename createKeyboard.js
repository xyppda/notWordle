const createKeyboard = () => {
  // const RU_ALPH = "йцукенгшщзхъфывапролджэячсмитьбю".split("");
  // const EN_ALPH = "qwertyuiopasdfghjklzxcvbnm".split("")

  const lang = document.documentElement.getAttribute("lang");

  const keys = [];

  if (lang === "ru") {
    keys.push("ЙЦУКЕНГШЩЗХЪ".split(""));
    keys.push("ФЫВАПРОЛДЖЭ".split(""));
    keys.push("ЯЧСМИТЬБЮ".split(""));
  } else if (lang === "en") {
    keys.push("QWERTYUIOP".split(""));
    keys.push("ASDFGHJKL".split(""));
    keys.push("ZXCVBNM".split(""));
  }

  const keyboard = document.querySelector(".keyboard");

  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.className = "keyboard-row";

    keys[i].forEach((key) => {
      const button = document.createElement("button");
      button.className = "key";
      button.textContent = key;
      row.append(button);
    });

    keyboard.append(row);
  }

  const row = document.createElement("div");
  row.className = "keyboard-row";

  const backspace = document.createElement("button");
  backspace.className = "backspace-button";

  const backspaceSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="backspace-icon">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
    </svg>
  `;

  backspace.insertAdjacentHTML("beforeend", backspaceSvg)

  row.append(backspace);

  keys[2].forEach((key) => {
    const button = document.createElement("button");
    button.className = "key";
    button.textContent = key;
    row.append(button);
  });

  const enter = document.createElement("button");
  enter.className = "enter-button";
  enter.textContent = "Enter";
  row.append(enter);

  keyboard.append(row);
};

export default createKeyboard;
