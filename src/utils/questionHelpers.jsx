export const addNewQuestion = (questions, parentId = null) => {
  const newQuestion = {
    id: Date.now(),
    text: '',
    type: 'Short Answer',
    children: [],
    parentId,
  };

  if (parentId === null) {
    return [...questions, newQuestion];
  }

  return updateNestedQuestions(questions, parentId, newQuestion);
};

const updateNestedQuestions = (items, parentId, newChild) =>
items.map((item) => {
  if (item.id === parentId) {
    return {
      ...item,
      children: [...item.children, newChild],
    };
  }
  return {
    ...item,
    children: updateNestedQuestions(item.children, parentId, newChild),
  };
});

export const deleteQuestionById = (items, id) =>
items
  .filter((item) => item.id !== id)
  .map((item) => ({
    ...item,
    children: deleteQuestionById(item.children, id),
  }));

export const updateQuestionField = (items, id, field, value) =>
items.map((item) => {
  if (item.id === id) {
    return { ...item, [field]: value };
  }
  return {
    ...item,
    children: updateQuestionField(item.children, id, field, value),
  };
});
