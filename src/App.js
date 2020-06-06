import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import StatusesItem from "./components/Statuses/StatusesItem";

const statuses = [
    {id: 1, queue: 1, name: 'To Do'},
    {id: 2, queue: 2, name: 'In Progress'},
    {id: 3, queue: 3, name: 'Review'},
    {id: 4, queue: 4, name: 'Done'}
]

const priorities = [
    {id: 1, priority: 'High Priority'},
    {id: 2, priority: 'Medium Priority'},
    {id: 3, priority: 'Low Priority'}
]

//Many-to-one relation (many tasks to one status, and many tasks to one priority)
const initTasks = [
    {id: uuidv4(), name: 'Which one?\n' + 'In my opinion, Faker is the best among them. The only time this package won’t solve your needs is when you need fake data in some rare format or data type. Even then, I’d still recommend using Faker and reshaping what it generates, if possible.', priorityId: 1, statusId: 1},
    {id: uuidv4(), name: 'Generating Users\n' + 'Now for the good stuff! Generating 1000 fake user profiles is this easy (in bold is the Faker code, the rest is Pandas).', priorityId: 2, statusId: 2},
    {id: uuidv4(), name: 'Again, there are way more fields available, you can find them all in the documentation. You can even make your own data providers, here’s a few already contributed by the community.', priorityId: 3, statusId: 2},
    {id: uuidv4(), name: 'Faker also supports multiple languages, running via the command line, and seeding the randomizer to get consistent results.', priorityId: 1, statusId: 3},
    {id: uuidv4(), name: 'Hopefully, this saves you some time! I use Faker to generate data for stress tests, speed tests, and even test model pipelines for errors.', priorityId: 2, statusId: 3},
    {id: uuidv4(), name: 'Fill form input fields with fake random data.\n' + 'After installation you will have to reload the tabs that are already open for the extension to work properly inside them', priorityId: 3, statusId: 3},
    {id: uuidv4(), name: 'Generate random names, emails, addresses, phone numbers and many more types of data.', priorityId: 2, statusId: 1},
    {id: uuidv4(), name: 'No configuration or initial setup required, unless you want to. Just right click on any input field and choose what type of data to insert.', priorityId: 3, statusId: 1},
    {id: uuidv4(), name: 'Fill single fields or entire form at once.', priorityId: 1, statusId: 4}
];

function App() {

    const [tasks, setTasks] = useState(initTasks);
    const [lastTaskId, setLastTaskId] = useState(9);
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
            id: lastTaskId + 1,
            name: taskName,
            priorityId: +priority,
            statusId: 1

        };
        setLastTaskId(newTask.id);
        setTasks([...tasks, newTask]);
        taskReset();
    }

    const taskReset = (e) => {
        setTaskName('');
        setPriority(priorities[priorities.length - 1].id);
        setIsOpenCreateTaskForm(false);
        setIsActiveButtonTaskCreate(false);
    }

    const updateTask = (task) => {
        const updatedTasks = tasks.map(obj => {
            if(obj.id === task.id){
                return {...obj, name: task.name, priorityId: task.priority, statusId: task.statusId};
            } else {
                return obj;
            }
        })
        setTasks(updatedTasks);
    }

    const deleteTask = (task) => {
        const newTasks = tasks.filter(obj => obj.id !== task.id);
        setTasks(newTasks);
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

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
                <div className="row">
                {
                    statuses
                        .sort((a, b) => { return a.queue - b.queue} )
                        .map(el =>
                            <StatusesItem key={el.id}
                                          status={el}
                                          statuses={statuses}
                                          priorities={priorities}
                                          tasks={tasks}
                                          updateTask={updateTask}
                                          deleteTask={deleteTask}
                                          reorder={reorder}
                                          setTasks={setTasks}
                            />
                        )
                }
                </div>
            </div>
        </div>
    );
}

export default App;
