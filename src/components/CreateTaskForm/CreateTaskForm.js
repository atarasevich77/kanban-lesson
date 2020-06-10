import React, {useState} from 'react';
import {v4 as uuidv4} from "uuid";

const CreateTaskForm = (props) => {

    const data = props.data;
    const priorities = props.priorities;
    const [isOpenCreateTaskForm, setIsOpenCreateTaskForm] = useState(false);
    const [isActiveButtonTaskCreate, setIsActiveButtonTaskCreate] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [priority, setPriority] = useState(priorities[priorities.length - 1].id);

    const onTaskChange = (e) => {
        setIsActiveButtonTaskCreate(e.target.value.length > 4);
        setTaskName(e.target.value);
    }

    const taskCreate = (e) => {
        e.preventDefault();
        const newTask = {
            id: uuidv4(),
            name: taskName,
            priorityId: +priority,
            statusId: 1
        };
        const newData = [...data];
        newData.forEach(status => {
            if(newTask.statusId === status.id){
                status.tasks.push(newTask);
            }
        })
        props.taskCreate(newData);
        taskReset();
    }

    const taskReset = (e) => {
        setTaskName('');
        setPriority(priorities[priorities.length - 1].id);
        setIsOpenCreateTaskForm(false);
        setIsActiveButtonTaskCreate(false);
    }

    return (
        <>
            {
                !isOpenCreateTaskForm &&
                <button className="btn btn-primary p-1" onClick={e => setIsOpenCreateTaskForm(true)}>Create task</button>
            }
            {
                isOpenCreateTaskForm &&
                <form>
                    <div className="form-group p-1">
                        <label htmlFor="exampleInputEmail1">Task</label>
                        <input type="text" className="form-control" placeholder="Describe Your Task"
                               value={taskName} onChange={onTaskChange}/>
                    </div>

                    <div className="input-group input-group-sm mb-2 mt-2">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Priority:</label>
                        </div>
                        <select className="custom-select" id="inputGroupSelect01" defaultValue={priority} onChange={(e) => setPriority(e.target.value)}>
                            {
                                priorities.map(el => {
                                    return <option key={el.id} value={el.id}>{el.priority}</option>
                                })
                            }
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary m-1"
                            onClick={taskCreate}
                            disabled={!isActiveButtonTaskCreate}
                    >Submit</button>
                    <button className="btn btn-secondary" onClick={taskReset}>Cancel</button>
                </form>
            }
        </>
    );
};

export default CreateTaskForm;