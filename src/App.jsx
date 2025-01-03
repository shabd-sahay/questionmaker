import React, { useState, useEffect } from 'react';
import QuestionList from './components/QuestionList';
import { addNewQuestion, deleteQuestionById, updateQuestionField } from './utils/questionHelpers';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const LOCAL_STORAGE_KEY = 'dynamicFormQuestions';

const App = () => {
  const [questions, setQuestions] = useState([]);

  // Load questions from local storage on component mount
  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (savedQuestions) {
      setQuestions(savedQuestions);
    }
  }, []);

  // Save questions to local storage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(questions));
  }, [questions]);

  const handleAddQuestion = (parentId = null) => {
    setQuestions((prevQuestions) => addNewQuestion(prevQuestions, parentId));
  };

  const handleDeleteQuestion = (id) => {
    setQuestions((prevQuestions) => deleteQuestionById(prevQuestions, id));
  };

  const handleUpdateQuestion = (id, field, value) => {
    setQuestions((prevQuestions) => updateQuestionField(prevQuestions, id, field, value));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedQuestions = Array.from(questions);
    const [movedQuestion] = reorderedQuestions.splice(result.source.index, 1);
    reorderedQuestions.splice(result.destination.index, 0, movedQuestion);

    setQuestions(reorderedQuestions);
  };

  const handleSubmit = () => {
    console.log('Submitted Questions:', questions);
    alert('Check the console for the submitted questions!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dynamic Question Form</h1>
      <button onClick={() => handleAddQuestion()}>Add New Question</button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="questions">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {questions.map((question, index) => (
                <Draggable key={question.id} draggableId={String(question.id)} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        marginBottom: '10px',
                        border: '1px solid #ccc',
                        padding: '10px',
                        borderRadius: '5px',
                      }}
                    >
                      <QuestionList
                        questions={[question]}
                        onAdd={handleAddQuestion}
                        onDelete={handleDeleteQuestion}
                        onUpdate={handleUpdateQuestion}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default App;
