const createKeyboard = () => {
  const RU_ALPH = "йцукенгшщзхъфывапролджэячсмитьбю".split("");
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
  backspace.textContent = "backspace";
  row.append(backspace)

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
