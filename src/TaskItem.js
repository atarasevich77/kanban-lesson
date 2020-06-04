import React, {useState} from 'react';

const TaskItem = (props) => {

    const [task, setTask] = useState(props.task);

    const onPriorityUp = (task) => {
        setTask({...task, priority: --task.priority});
        props.updateTask(task);
    }

    const onPriorityDown = (task) => {
        setTask({...task, priority: ++task.priority});
        props.updateTask(task);
    }

    return (
        <div className="card m-1">
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                    {task.name}
                </p>
                <div className="btn-group-vertical btn-group-sm">
                    Priority: {task.priority}
                    {
                        task.priority > 1 &&
                        <button className="btn btn-secondary" onClick={() => onPriorityUp(task)} type="button">Up</button>
                    }
                    {
                        task.priority < 10 &&
                        <button className="btn btn-secondary" onClick={() => onPriorityDown(task)} type="button">Down</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default TaskItem;