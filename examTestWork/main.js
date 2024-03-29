class Combinatorics {
  static combine = (() => {
    let res = null;
    const combinations = (arr, k, start, idx, current) => {
      if (idx === k) {
        res.push([...current]);
        return;
      }
      for (let i = start; i < arr.length; i += 1) {
        current[idx] = arr[i];
        combinations(arr, k, i + 1, idx + 1, current);
      }
    };

    return (arr, k) => {
      res = [];
      combinations(arr, k, 0, 0, []);
      const temp = res;
      res = null;
      return temp;
    };
  })();
}

document.addEventListener("DOMContentLoaded", function () {
  let numPart = document.getElementById("numPart");
  let random = document.getElementById("random");
  let start = document.getElementById("start");

  let getInputNumbers = (input) => {
    return input.value.replace(/\D/g, "");
  };

  let onInput = (e) => {
    let input = e.target;
    let inputValue = getInputNumbers(input);

    if (!inputValue) return (input.value = "");
    else return (input.value = inputValue);
  };

  let lessonInputs = () => {
    let inputs = document.querySelectorAll("input");
    inputs.forEach((el) => {
      el.addEventListener("input", onInput);
    });
  };

  let drowColVote = (masItems) => {
    let colVote = document.getElementById("col-vote");
    let res = 0;
    masItems.forEach((el) => {
      res += Number(el.value);
    });
    colVote.innerHTML = `общее число голосов: ${res}`;
  };

  let onChangeInputs = () => {
    let masItems = document.querySelectorAll(".mas-item");
    masItems.forEach((el) => {
      el.onchange = function () {
        drowColVote(masItems);
      };
    });
  };

  let drowInputs = (col = 0) => {
    let mas = document.getElementById("mas");
    let strEl = "";
    for (let i = 0; i < col; i++) {
      strEl += `<label>${
        i + 1
      })<input min="1" class = "mas-item" type="text" /></label>`;
    }
    mas.innerHTML = strEl;
    onChangeInputs();
    lessonInputs();
  };

  let createMas = (e) => {
    let col = getInputNumbers(e.target);
    if (col) drowInputs(col);
  };

  let randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  let combinationsSum = (arr) => {
    let res = [];
    arr.forEach((coalition) => {
      let sum = 0;
      coalition.forEach((el) => {
        sum += Number(el);
      });
      res.push(sum);
    });
    return res;
  };

  let getCombinations = (arr) => {
    let res = [];
    for (let i = 1; i <= arr.length; i++) {
      let arrC = combinationsSum(Combinatorics.combine(arr, i));
      arrC.forEach((el) => {
        res.push(el);
      });
    }
    return res;
  };

  let getCombinationsIndex = (arr) => {
    let res = [];
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push(i);
    }

    for (let i = 1; i <= arr.length; i++) {
      let arrC = Combinatorics.combine(newArr, i);
      arrC.forEach((el) => {
        res.push(el);
      });
    }

    return res;
  };

  let verification = (arr) => {
    res = true;
    arr.forEach((el) => {
      str = el.value.replace(/\s/g, "");

      if (str === "") {
        res = false;
      }
    });
    return res;
  };

  numPart.addEventListener("input", createMas);
  random.onclick = function () {
    let mas = document.querySelectorAll(".mas-item");
    mas.forEach((el) => {
      el.value = randomInteger(1, 99);
    });
    drowColVote(mas);
  };

  start.onclick = function () {
    let masEl = document.querySelectorAll(".mas-item");
    let mas = [];
    if (verification(masEl)) {
      masEl.forEach((el) => {
        mas.push(el.value);
      });

      let combinations = getCombinations(mas);
      let indexComb = getCombinationsIndex(mas);
      let quota = document.getElementById("quota").value;
      let indexWinCoalic = [];

      for (let i = 0; i < combinations.length; i++) {
        if (combinations[i] >= quota) indexWinCoalic.push(i);
      }

      let keys = [];
      for (let i = 0; i < mas.length; i++) {
        let n = 0;
        indexWinCoalic.forEach((el) => {
          if (combinations[el] - mas[i] < quota && indexComb[el].includes(i)) {
            n++;
          }
        });
        keys.push(n);
      }

      resStr = "";
      keys.forEach((el, index) => {
        resStr += `<p>индекс Банцафа ${index + 1} партии = ${el}/${
          indexWinCoalic.length + mas.length - 1
        }</p>`;
      });

      document.getElementById("result").innerHTML = resStr;
    } else
      document.getElementById("result").innerHTML =
        "Заполните все поля партий !";
  };

  onChangeInputs();
  lessonInputs();
});
