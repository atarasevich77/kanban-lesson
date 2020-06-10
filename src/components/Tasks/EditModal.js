import React, {useState} from 'react';

const iconPlus = (
    <svg className="bi bi-caret-up" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M3.204 11L8 5.519 12.796 11H3.204zm-.753-.659l4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"/>
    </svg>
);
const iconDash = (
    <svg className="bi bi-caret-down" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M3.204 5L8 10.481 12.796 5H3.204zm-.753.659l4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
    </svg>
);

const EditModal = (props) => {

    const [task, setTask] = useState(props.task);
    const [show, setShow] = useState('show');
    const priorityString = props.priorities.find(el => el.id === task.priorityId).priority;

    const getModalStyle = {
        paddingRight: '17px',
        display: show ? 'block' : 'none',
        cursor: 'default'
    }

    const onClose = () => {
        setShow('');
        props.setShowEditModal(false);
        document.body.classList.remove('modal-open');
    }

    const onPriorityUp = (e) => {
        e.preventDefault();
        const updatedTask = {...task, priorityId: --task.priorityId};
        setTask(updatedTask);
        props.updateTask(updatedTask);
    }

    const onPriorityDown = (e) => {
        e.preventDefault();
        const updatedTask = {...task, priorityId: ++task.priorityId}
        setTask(updatedTask);
        props.updateTask(updatedTask);
    }

    const onUpdateTask = () => {
        props.updateTask(task);
        onClose();
    }

    const stylePlus = {
        pointerEvents: task.priorityId > 1 ? '' : 'none',
        cursor: task.priorityId > 1 ? '' : 'not-allowed',
        opacity: task.priorityId > 1 ? 1 : 0.2
    }
    const styleDash = {
        pointerEvents: task.priorityId < 3 ? '' : 'none',
        cursor: task.priorityId < 3 ? '' : 'not-allowed',
        opacity: task.priorityId < 3 ? 1 : 0.2
    }

    return (
        <div className={"modal fade " + show} id="editModal" tabIndex="-1" role="dialog" aria-hidden={true} style={getModalStyle}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit task</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                            <span aria-hidden={true}>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex ml-auto">
                            <div className="card-text p-1">
                                <a className="mr-1" href="#" onClick={onPriorityDown} style={styleDash}>{iconDash}</a>
                                {priorityString === 'High Priority' &&
                                <span className="badge badge-danger">{priorityString}</span>
                                }
                                {priorityString === 'Medium Priority' &&
                                <span className="badge badge-warning">{priorityString}</span>
                                }
                                {priorityString === 'Low Priority' &&
                                <span className="badge badge-success">{priorityString}</span>
                                }
                                <a className="ml-1" href="#" onClick={onPriorityUp} style={stylePlus}>{iconPlus}</a>
                            </div>
                        </div>
                        <div className="d-flex p-2">

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={onUpdateTask}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModal;