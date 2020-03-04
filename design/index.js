// Register handlers for all question divs
document.querySelectorAll(".question").forEach(question => {
  // Question Data
  const hint = question.getAttribute("data-hint");
  const correct = question.getAttribute("data-correct");
  const feedback = {};

  // Question HTML Elements
  const hintBtn = question.querySelector(".toggle-hint");
  const submitBtn = question.querySelector(".submit");
  const choices = question.querySelectorAll("input");
  const choiceContainers = question.querySelectorAll(".answer-choice");

  const getSelectedAnswer = () => {
    for (let choice of choices) {
      if (choice.checked) return choice.value;
    }
    return undefined;
  };

  // Setup container handlers for answer choices
  choiceContainers.forEach(container => {
    container.addEventListener("click", () => {
      submitBtn.removeAttribute("disabled");
      container.querySelector("input").checked = true;
    });
  });

  // Setup click handlers & feedback for choices
  choices.forEach(choice => {
    feedback[choice.value] = choice.getAttribute("data-feedback");
    choice.addEventListener("click", () => {
      submitBtn.removeAttribute("disabled");
    });
  });

  // Add click handler for submit button
  submitBtn.addEventListener("click", () => {
    const choice = getSelectedAnswer();
    if (choice === correct) {
      // display correct
      alert("Correct!");
    } else {
      // display feedback
      alert(
        feedback[choice] || "Incorrect, please select another answer choice."
      );
    }
  });

  // Add click handler for hint button
  hintBtn.addEventListener("click", () => {
    alert(hint);
  });
});
