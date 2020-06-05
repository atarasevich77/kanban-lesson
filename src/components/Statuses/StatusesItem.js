import React from 'react';
import TasksItem from "../Tasks/TasksItem";

const StatusesItem = (props) => {
    return (
        <div className="col-sm-3 p-1">
            <h5 className="card-header text-center">{props.status.name}</h5>
            {
                props.tasks
                    .sort((a, b) => { return a.priority - b.priority} )
                    .map(task => {
                        if(task.statusId === props.status.id)
                            return (
                                <TasksItem key={task.id}
                                           initStatuses={props.initStatuses}
                                           task={task}
                                           updateTask={props.updateTask}
                                           deleteTask={props.deleteTask}
                                />
                            );
                    })
            }
        </div>
    );
};

export default StatusesItem;