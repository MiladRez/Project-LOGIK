import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Modal, Button } from 'semantic-ui-react';
// import { v4 as uuidv4 } from 'uuid';

export const App = () => {
    const [initialState, setInitialState] = useState([]);

    // state variables for Modal
    const [formOpen, setFormOpen] = useState(false);
    const [fieldOpen, setFieldOpen] = useState(false);

    // state variables for new form field
    const [formFieldType, setFormFieldType] = useState("shortText");
    const [formFieldQuestion, setFormFieldQuestion] = useState("");
    const [MC_OptionsList, setMC_OptionsList] = useState([]);
    var MCCounter = 0;

    // state variables for new form
    const [listOfForms, setListOfForms] = useState([]);
    const [listOfFormFields, setListOfFormFields] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/")
            .then(res => {
                setInitialState(res.data);
        });
    }, []);

    console.log(initialState);

    function addToListOfFormFields() {
        setFieldOpen(false);

        if (formFieldType === "multipleChoice") {
            setListOfFormFields(listOfFormFields.concat({
                type: formFieldType,
                question: formFieldQuestion,
                options: MC_OptionsList
            }));
        } else {
            setListOfFormFields(listOfFormFields.concat({
                type: formFieldType,
                question: formFieldQuestion
            }));
        }
    }

    console.log("MC_Options: " + MC_OptionsList);
    console.log("List of Form Fields: " + listOfFormFields);

    return(
        <div>
            <h1 style={{textAlign: "center", marginTop: "70px"}}>Forms Page</h1>

            <h2>{formFieldType}</h2>
            <h2>{formFieldQuestion}</h2>
            <h2>{MC_OptionsList}</h2>
        
            <Modal
                size={'fullscreen'}
                dimmer={'blurring'}
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onOpen={() => setFormOpen(true)}
                trigger={<Button>Add Form</Button>}
            >
                <Modal.Header>Add Form</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Modal
                            open={fieldOpen}
                            onClose={() => setFieldOpen(false)}
                            onOpen={() => setFieldOpen(true)}
                            trigger={<Button>Add Field</Button>}
                        >
                            <Modal.Header>Add Form Field</Modal.Header>
                            <Modal.Content>
                                <Modal.Description>
                                    <form>
                                        <label>
                                            Field
                                            <select defaultValue={formFieldType} onChange={(e) => setFormFieldType(e.target.value)}>
                                                <option value="shortText">Short Text Input</option>
                                                <option value="longText">Long Text Input</option>
                                                <option value="multipleChoice">Multiple Choice</option>
                                            </select>
                                        </label>
                                        <label>
                                            Label
                                            <input type="text" name="question" onChange={(e) => setFormFieldQuestion(e.target.value)} />
                                        </label>
                                        {formFieldType === "multipleChoice" && (
                                            <label>
                                            Option(s)
                                            <input type="text" name={`option${MCCounter}`} onBlur={(e) => setMC_OptionsList(MC_OptionsList.concat(e.target.value))} /><Button type="button" className="positive ui button" onClick={() => MCCounter++}>+</Button>
                                            </label>
                                        )}
                                        {MC_OptionsList.map((option) => {
                                            return <div><input type="text" name={`option${MCCounter}`} onBlur={(e) => setMC_OptionsList(MC_OptionsList.concat(e.target.value))} /><button type="button" className="positive ui button" onClick={() => MCCounter++}>+</button><button type="button" className="negative ui button" onClick={() => MCCounter++}>-</button></div>
                                        })}
                                    </form>
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={() => addToListOfFormFields}>OK</Button>
                            </Modal.Actions>
                        </Modal>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setFormOpen(false)}>OK</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}