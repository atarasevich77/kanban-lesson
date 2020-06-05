import React, {useState} from 'react';
import StatusesItem from "./components/Statuses/StatusesItem";

//not so good variant
// const tasks1 = {
//     todo: [
//         {name: 'Create F1', priority: 1},
//         {name: 'Create F2', priority: 1}
//         ],
//     progress: [],
//     review: [],
//     done: []
// };

//good variant
// const statuses = {
//     s1: {name: 'To Do'},
//     s2: {name: 'In Progress'},
//     s3: {name: 'Review'},
//     s4: {name: 'Done'},
// }

const initStatuses = [
    {id: 1, queue: 1, name: 'To Do'},
    {id: 2, queue: 2, name: 'In Progress'},
    {id: 3, queue: 3, name: 'Review'},
    {id: 4, queue: 4, name: 'Done'}
]
//Many-to-one relation (many tasks to one status)
const initTasks = [
    {id: 1, name: 'Aaa aaa aaa', priority: 1, statusId: 1},
    {id: 2, name: 'Bbb bbb bbb', priority: 1, statusId: 2},
    {id: 3, name: 'Ccc ccc ccc', priority: 2, statusId: 2},
    {id: 4, name: 'Ddd ddd ddd', priority: 3, statusId: 3},
    {id: 5, name: 'Eee eee eee', priority: 2, statusId: 3},
    {id: 6, name: 'Fff fff fff', priority: 1, statusId: 3},
    {id: 7, name: 'Ggg ggg ggd', priority: 3, statusId: 1},
    {id: 8, name: 'Iii iii iii', priority: 2, statusId: 1},
    {id: 9, name: 'Kkk kkk kkk', priority: 1, statusId: 4}
];

function App() {

    const [tasks, setTasks] = useState(initTasks);
    const [lastTaskId, setLastTaskId] = useState(9);
    const [isOpenCreateTaskForm, setIsOpenCreateTaskForm] = useState(false);
    const [isActiveButtonTaskCreate, setIsActiveButtonTaskCreate] = useState(false);
    const [taskName, setTaskName] = useState('');

    const onTaskChange = (e) => {
        setIsActiveButtonTaskCreate(e.target.value.length > 4);
        setTaskName(e.target.value);
    }

    const taskCreate = (e) => {
        e.preventDefault();
        const newTask = {
            id: lastTaskId + 1,
            name: taskName,
            priority: 1,
            statusId: 1

        };
        setLastTaskId(newTask.id);
        setTasks([...tasks, newTask]);
        taskReset();
    }

    const taskReset = (e) => {
        setTaskName('');
        setIsOpenCreateTaskForm(false);
        setIsActiveButtonTaskCreate(false);
    }

    const updateTask = (task) => {
        const updatedTasks = tasks.map(obj => {
            if(obj.id === task.id){
                return {...obj, name: task.name, priority: task.priority, statusId: task.statusId};
            } else {
                return obj;
            }
        })
        setTasks(updatedTasks);
    }

    return (
        <div>

            <div className="container">
                <h1>Kanban</h1>
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
                        <button type="submit" className="btn btn-primary m-1"
                                onClick={taskCreate}
                                disabled={!isActiveButtonTaskCreate}
                        >Submit</button>
                        <button className="btn btn-secondary" onClick={taskReset}>Cancel</button>
                    </form>
                }
                <div className="row">
                {
                    initStatuses
                        .sort((a, b) => { return a.queue - b.queue} )
                        .map(el =>
                            <StatusesItem key={el.id}
                                          status={el}
                                          initStatuses={initStatuses}
                                          tasks={tasks}
                                          updateTask={updateTask}
                            />
                        )
                }
                </div>
            </div>
        </div>
    );
}

export default App;
