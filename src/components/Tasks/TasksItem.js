import React, {useState} from 'react';
import {Draggable} from 'react-beautiful-dnd';
import DeleteModal from "./DeleteModal";

const iconPlus = (
    <svg className="bi bi-caret-up" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M3.204 11L8 5.519 12.796 11H3.204zm-.753-.659l4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"/>
    </svg>
);

const iconDash = (
    <svg className="bi bi-caret-down" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M3.204 5L8 10.481 12.796 5H3.204zm-.753.659l4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
    </svg>
);

const TasksItem = (props) => {

    const [task, setTask] = useState(props.task);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const priorityString = props.priorities.find(el => el.id === task.priorityId).priority;

    const onPriorityUp = (e) => {
        e.preventDefault();
        const updatedTask = {...task, priorityId: --task.priorityId};
        setTask(updatedTask);
        props.updateTask(updatedTask);
    }

    const onPriorityDown = (e) => {
        e.preventDefault();
        const updatedTask = {...task, priorityId: ++task.priorityId}
        setTask(updatedTask);
        props.updateTask(updatedTask);
    }

    const getItemStyle = (isDragging, draggableStyle) => ({
        // change background colour if dragging
        background: isDragging ? "lightgrey" : "",
        // styles we need to apply on draggables
        ...draggableStyle
    });

    const showDeleteMode = (e) => {
        e.preventDefault();
        setShowDeleteModal(true);
        document.body.classList.add('modal-open');
    }

    const showEditMode = (e) => {
        e.preventDefault();
        setShowEditModal(true);
    }

    // const stylePlus = {
    //     pointerEvents: task.priorityId > 1 ? '' : 'none',
    //     cursor: task.priorityId > 1 ? '' : 'not-allowed',
    //     opacity: task.priorityId > 1 ? 1 : 0.2
    // }
    // const styleDash = {
    //     pointerEvents: task.priorityId < 3 ? '' : 'none',
    //     cursor: task.priorityId < 3 ? '' : 'not-allowed',
    //     opacity: task.priorityId < 3 ? 1 : 0.2
    // }


    return (
        <Draggable draggableId={task.id.toString()} index={props.index}>
            {
                (provided, snapshot)  => (
                    <div className="card m-1"
                         ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}
                    >
                        <div className="d-flex ml-auto">
                            <div className="card-text p-1">
                                {/*<a className="mr-1" href="#" onClick={onPriorityDown} style={styleDash}>{iconDash}</a>*/}
                                {priorityString === 'High Priority' &&
                                    <span className="badge badge-danger">{priorityString}</span>
                                }
                                {priorityString === 'Medium Priority' &&
                                    <span className="badge badge-warning">{priorityString}</span>
                                }
                                {priorityString === 'Low Priority' &&
                                    <span className="badge badge-success">{priorityString}</span>
                                }
                                {/*<a className="ml-1" href="#" onClick={onPriorityUp} style={stylePlus}>{iconPlus}</a>*/}
                            </div>
                        </div>
                        <div className="card-body p-2">
                            <div className="card-text p-1">
                                {task.name}
                            </div>
                        </div>
                        <div className="card-footer d-flex">
                            <a className="card-link" href="#" onClick={showEditMode}>Edit</a>
                            <a className="card-link ml-auto" href="#" onClick={showDeleteMode} data-toggle="modal" data-target="#deleteModal">Delete</a>
                        </div>
                        {showDeleteModal &&
                            <DeleteModal task={task}
                                         deleteTask={props.deleteTask}
                                         setShowDeleteModal={setShowDeleteModal}/>
                        }

                    </div>
            )}
        </Draggable>
    );
};

export default TasksItem;