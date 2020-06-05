import React, {useState} from 'react';

const TasksItem = (props) => {

    const [task, setTask] = useState(props.task);
    // const [show, setShow] = useState("");

    const onPriorityUp = () => {
        const updatedTask = {...task, priority: --task.priority};
        setTask(updatedTask);
        props.updateTask(updatedTask);
    }

    const onPriorityDown = () => {
        const updatedTask = {...task, priority: ++task.priority}
        setTask(updatedTask);
        props.updateTask(updatedTask);
    }

    const onStatusChange = (e) => {
        // e.preventDefault();
        const updatedTask = {...task, statusId: +e.target.value};
        setTask(updatedTask);
        props.updateTask(updatedTask);
        // setShow("");
    }

    // const onToggleDropdown = (e) => {
    //     e.preventDefault();
    //     setShow(!show ? " show" : "");
    // }

    return (
        <div className="card m-1">
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                    {task.name}
                </p>

                <div className="input-group input-group-sm mb-2 mt-2">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Status:</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect01" defaultValue={task.statusId} onChange={onStatusChange}>
                        {
                            props.initStatuses.map(el => {
                                return <option key={el.id} value={el.id}>{el.name}</option>
                            })
                        }
                    </select>
                </div>

                <div className="btn-group-vertical btn-group-sm" aria-label={"Priority: " + task.priority}>
                    Priority: {task.priority}
                    {
                        task.priority > 1 &&
                        <button className="btn btn-secondary" onClick={onPriorityUp} type="button">Up</button>
                    }
                    {
                        task.priority < 10 &&
                        <button className="btn btn-secondary" onClick={onPriorityDown} type="button">Down</button>
                    }
                </div>


                {/*<div className="dropdown">*/}
                {/*    <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton"*/}
                {/*            data-toggle="dropdown" aria-haspopup={true} aria-expanded={false}*/}
                {/*            onClick={onToggleDropdown}>*/}
                {/*        {props.initStatuses.map(el => {*/}
                {/*            if(el.id === task.statusId)*/}
                {/*                return el.name*/}
                {/*        })}*/}
                {/*    </button>*/}
                {/*    <div className={"dropdown-menu" + show} aria-labelledby="dropdownMenuButton">*/}
                {/*        {*/}
                {/*            props.initStatuses.filter(el =>*/}
                {/*                el.id !== task.statusId*/}
                {/*            ).map(el =>*/}
                {/*                <a className="dropdown-item" key={el.id} id={el.id} onClick={onStatusChange} href="#">{el.name}</a>*/}
                {/*            )*/}
                {/*        }*/}
                {/*    </div>*/}
                {/*</div>*/}

            </div>
        </div>
    );
};

export default TasksItem;