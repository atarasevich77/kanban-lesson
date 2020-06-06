import React from 'react';
import TasksItem from "../Tasks/TasksItem";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const StatusesItem = (props) => {

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const newOrderingTasks = props.reorder(
            props.tasks,
            result.source.index,
            result.destination.index
        );

        props.setTasks(newOrderingTasks);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div className="col-sm-3 p-1"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                    <h5 className="card-header text-center">{props.status.name}</h5>
                    {
                        props.tasks
                            // .sort((a, b) => { return a.priority - b.priority} )
                            .map((task, index) => {
                                if(task.statusId === props.status.id)
                                    return (
                                        <TasksItem key={task.id}
                                                   index={index}
                                                   initStatuses={props.initStatuses}
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
        </DragDropContext>
    );
};

export default StatusesItem;