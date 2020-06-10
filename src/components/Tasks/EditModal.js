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

    const task = props.task;
    const [name, setName] = useState(task.name);
    let [priorityId, setPriorityId] = useState(task.priorityId);
    const [show, setShow] = useState('show');
    const priorityString = props.priorities.find(el => el.id === priorityId).priority;

    const getModalStyle = {
        paddingRight: '17px',
        display: show ? 'block' : 'none',
        cursor: 'default'
    }

    const onClose = () => {
        setShow('');
        setName('');
        props.setShowEditModal(false);
        document.body.classList.remove('modal-open');
    }

    const onPriorityUp = (e) => {
        e.preventDefault();
        setPriorityId(--priorityId);
    }

    const onPriorityDown = (e) => {
        e.preventDefault();
        setPriorityId(++priorityId);
    }

    const onUpdateTask = () => {
        const updatedTask = {...task, name: name, priorityId: priorityId};
        props.updateTask(updatedTask);
        onClose();
    }

    const stylePlus = {
        pointerEvents: priorityId > 1 ? '' : 'none',
        cursor: priorityId > 1 ? '' : 'not-allowed',
        opacity: priorityId > 1 ? 1 : 0.2
    }
    const styleDash = {
        pointerEvents: priorityId < 3 ? '' : 'none',
        cursor: priorityId < 3 ? '' : 'not-allowed',
        opacity: priorityId < 3 ? 1 : 0.2
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
                            <div className="card-text p-2">
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
                        <div className="d-flex pt-1">
                            <div className="input-group">
                                <textarea className="md-textarea form-control"
                                          rows="3"
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}
                                          placeholder="Describe your task"
                                />
                            </div>
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