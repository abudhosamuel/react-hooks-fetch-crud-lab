import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => onDelete(id));
  }

  function handleCorrectAnswerChange(event) {
    const updatedCorrectIndex = parseInt(event.target.value, 10);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: updatedCorrectIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => onUpdate(updatedQuestion));
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleCorrectAnswerChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
