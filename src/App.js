import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import StatusesItem from "./components/Statuses/StatusesItem";
import { DragDropContext } from "react-beautiful-dnd";

const statuses = [
    {id: 1, tasks: [], queue: 1, name: 'To Do'},
    {id: 2, tasks: [], queue: 2, name: 'In Progress'},
    {id: 3, tasks: [], queue: 3, name: 'Review'},
    {id: 4, tasks: [], queue: 4, name: 'Done'}
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

statuses.map(status =>
    initTasks.map(task => {
        if(task.statusId === status.id){
            status.tasks.push(task);
        }
    })
);

function App() {

    const [data, setData] = useState(statuses);
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
        data.map(status => {
            if(newTask.statusId === status.id){
                status.tasks.push(newTask);
            }
        });
        taskReset();
    }

    const taskReset = (e) => {
        setTaskName('');
        setPriority(priorities[priorities.length - 1].id);
        setIsOpenCreateTaskForm(false);
        setIsActiveButtonTaskCreate(false);
    }

    const updateTask = (updatedTask) => {
        data.map(status =>
            status.tasks.map(task => {
                if(task.id === updatedTask.id){
                    task.name = updatedTask.name;
                    task.priorityId = updatedTask.priorityId;
                    task.statusId = updatedTask.statusId;
                }
            })
        )
    }

    const deleteTask = (deletedTask) => {
        const updateData = [...data];
        updateData.forEach(obj => {
            const index = obj.tasks.findIndex(idx => idx.id === deletedTask.id);
            if (index !== -1) {
                obj.tasks.splice(index, 1);
            }
        });
        setData(updateData);
    }

    const onDragEnd = (result) => {
        const {source, destination} = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const [removed] = data[source.droppableId - 1].tasks.splice(source.index, 1);
            data[source.droppableId - 1].tasks.splice(destination.index, 0, removed);
        } else {

            const [removed] = data[source.droppableId - 1].tasks.splice(source.index, 1);
            data[destination.droppableId - 1].tasks.splice(destination.index, 0, removed);
            data.map((el, idx) =>
                el.tasks.map(task =>
                    task.id === removed.id ? task.statusId = idx + 1 : ''
                )
            );
        }
        setData(data);
    }

    return (
        <div>
            <div className="container pt-2">
                <h1 className="display-4">Kanban Board</h1>
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
                    <DragDropContext onDragEnd={onDragEnd}>
                    {
                        data
                            .sort((a, b) => { return a.queue - b.queue} )
                            .map(el =>
                                <StatusesItem key={el.id}
                                              status={el}
                                              statuses={statuses}
                                              priorities={priorities}
                                              updateTask={updateTask}
                                              deleteTask={deleteTask}
                                />
                            )
                    }
                    </DragDropContext>
                </div>
            </div>
        </div>
    );
}

export default App;
