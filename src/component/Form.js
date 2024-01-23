import React, { useEffect, useState } from "react";

const Form = () => {
  const [ToggleColor, setToggleColor] = useState(false);
  const [allTodos, setTodoos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodoos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);

    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodoos(reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + "- " + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("completedtodolist", JSON.stringify(updatedCompletedArr));

  };

  const handleDeleteCompletedTodo=(index)=>{
    let reducedCompletedTodo = [...completedTodos];
    reducedCompletedTodo.splice(index,1);

    localStorage.setItem("completedtodolist", JSON.stringify(reducedCompletedTodo));
    setCompletedTodos(reducedCompletedTodo);
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedtodolist"));
    if (savedTodo) {
      setTodoos(savedTodo);
    }

    if(savedCompletedTodo){
        setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div className="col-sm-6">
            <div className="my-3 card p-4 back">
              <h5 style={{ color: "white", fontSize: "26px" }}>
                <b>TODOS</b>
              </h5>
              <form>
                <div className="form-group">
                  <label
                    for="exampleFormControlInput1"
                    style={{ color: "white", fontSize: "18px" }}
                  >
                    Title:
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => {
                      setNewTitle(e.target.value);
                    }}
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="What's the title of your To Do?"
                  />
                </div>
                <div className="form-group">
                  <label
                    for="exampleFormControlTextarea1"
                    style={{ color: "white", fontSize: "18px" }}
                  >
                    Description:
                  </label>
                  <textarea
                    className="form-control"
                    value={newDescription}
                    onChange={(e) => {
                      setNewDescription(e.target.value);
                    }}
                    id="exampleFormControlTextarea1"
                    placeholder="What's the description of your To Do?"
                    rows="6"
                  ></textarea>
                </div>
                <button
                  type="button"
                  onClick={handleAddTodo}
                  className="primaryBtn"
                >
                  Save
                </button>
              </form>
            </div>
          </div>

          <div className="col-sm-6">
            <div className=" p-3 ">
              <form>
                <div
                  className=""
                  style={{ marginBottom: "20px", marginTop: "2px" }}
                >
                  <button
                    type="button"
                    className={`secondaryBtn ${
                      ToggleColor === false ? "active" : null
                    }`}
                    onClick={() => {
                      setToggleColor(false);
                    }}
                  >
                    Todo
                  </button>
                  <button
                    type="button"
                    className={`secondaryBtn ${
                      ToggleColor === true ? "active" : null
                    }`}
                    onClick={() => {
                      setToggleColor(true);
                    }}
                  >
                    Completed
                  </button>
                </div>
              </form>

              {ToggleColor === false &&
                allTodos.map((item, index) => {
                  return (
                    <div className="todo-list my-2" key={index}>
                      <div className="todo-list-item">
                        <div style={{ marginTop: "5px" }}>
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                        </div>
                        <div style={{ marginTop: "18px","display":"flex","flexDirection":"row" }}>
                          <i
                            class="fa icon mx-1"
                            onClick={() => {
                              handleDeleteTodo(index);
                            }}
                            data-toggle="tooltip"
                            title="Delete"
                          >
                            &#xf014;
                          </i>
                          <i
                            class="fa check-icon"
                            data-toggle="tooltip"
                            onClick={() => handleComplete(index)}
                            title="Completed"
                          >
                            &#xf058;
                          </i>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {ToggleColor === true &&
                completedTodos.map((item, index) => {
                  return (
                    <div className="todo-list my-2" key={index}>
                      <div className="todo-list-item">
                        <div style={{ marginTop: "5px" }}>
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                          <p><i>Completed On: {item.completedOn}</i></p>
                        </div>
                        <div style={{ marginTop: "18px" }}>
                          <i
                            class="fa icon mx-1"
                            onClick={() => {
                              handleDeleteCompletedTodo(index);
                            }}
                            data-toggle="tooltip"
                            title="Delete"
                          >
                            &#xf014;
                          </i>
                          
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
