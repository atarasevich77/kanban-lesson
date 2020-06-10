import React, {useState} from 'react';
import {Draggable} from 'react-beautiful-dnd';
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const TasksItem = (props) => {

    const priorityString = props.priorities.find(el => el.id === props.task.priorityId).priority;

    const getItemStyle = (isDragging, draggableStyle) => ({
        // change background colour if dragging
        background: isDragging ? "lightgrey" : "",
        // styles we need to apply on draggables
        ...draggableStyle
    });

    return (
        <Draggable draggableId={props.task.id.toString()} index={props.index}>
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
                                {priorityString === 'High Priority' &&
                                    <span className="badge badge-danger">{priorityString}</span>
                                }
                                {priorityString === 'Medium Priority' &&
                                    <span className="badge badge-warning">{priorityString}</span>
                                }
                                {priorityString === 'Low Priority' &&
                                    <span className="badge badge-success">{priorityString}</span>
                                }
                            </div>
                        </div>
                        <div className="card-body p-2">
                            <div className="card-text p-1">
                                {props.task.name}
                            </div>
                        </div>
                        <div className="card-footer d-flex">
                            <EditModal task={props.task}
                                       priorities={props.priorities}
                                       updateTask={props.updateTask}
                            />
                            <DeleteModal task={props.task}
                                         deleteTask={props.deleteTask}
                            />
                        </div>
                    </div>
            )}
        </Draggable>
    );
};

export default TasksItem;