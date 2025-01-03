import React from 'react';
import Question from './Question';

const QuestionList = ({ questions, onAdd, onDelete, onUpdate }) => {
  const renderQuestions = (items, prefix = '') =>
    items.map((item, index) => {
      const questionNumber = prefix ? `${prefix}.${index + 1}` : `Q${index + 1}`;

      return (
        <div key={item.id} style={{ marginLeft: prefix ? '20px' : '0' }}>
          <Question
            question={item}
            number={questionNumber}
            onAdd={onAdd}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
          {item.children.length > 0 && renderQuestions(item.children, questionNumber)}
        </div>
      );
    });

  return <div>{renderQuestions(questions)}</div>;
};

export default QuestionList;
