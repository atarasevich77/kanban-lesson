import React from 'react';
import TasksItem from "../Tasks/TasksItem";
import { Droppable } from 'react-beautiful-dnd';

const StatusesItem = (props) => {

    const getStatusStyle = (isDraggingOver) => ({
        background: isDraggingOver ? '#f7f7f7' : '',
    });

    return (
        <Droppable droppableId={props.status.id.toString()}>
            {(provided, snapshot) => (
                <div className="col-sm-3 p-1"
                     ref={provided.innerRef}
                     style={getStatusStyle(snapshot.isDraggingOver)}
                >
                <h5 className="card-header text-center">{props.status.name}</h5>
                {
                    props.status.tasks
                        // .sort((a, b) => { return a.priorityId - b.priorityId} )
                        .map((task, index) => {
                            if(task.statusId === props.status.id)
                                return (
                                    <TasksItem key={task.id}
                                               index={index}
                                               statuses={props.statuses}
                                               priorities={props.priorities}
                                               task={task}
                                               updateTask={props.updateTask}
                                               deleteTask={props.deleteTask}
                                    />
                                );
                        })
                }
                {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default StatusesItem;