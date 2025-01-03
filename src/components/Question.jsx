import React from 'react';

const Question = ({ question, number, onAdd, onDelete, onUpdate }) => {
  return (
    <div>
      <span>{number} </span>
      <input
        type="text"
        value={question.text}
        onChange={(e) => onUpdate(question.id, 'text', e.target.value)}
        placeholder="Enter question text"
      />
      <select
        value={question.type}
        onChange={(e) => onUpdate(question.id, 'type', e.target.value)}
      >
        <option value="Short Answer">Short Answer</option>
        <option value="True/False">True/False</option>
      </select>
      <button onClick={() => onDelete(question.id)}>Delete</button>
      {question.type === 'True/False' && (
        <button onClick={() => onAdd(question.id)}>Add Child Question</button>
      )}
    </div>
  );
};

export default Question;
