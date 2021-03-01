import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Modal, Button } from 'semantic-ui-react';
import FormsPage from "./FormsPage";

export const App = () => {
    // state variables for Modal
    const [formOpen, setFormOpen] = useState(false);
    const [fieldOpen, setFieldOpen] = useState(false);

    // state variables for new form field
    const [formFieldType, setFormFieldType] = useState("shortText");
    const [formFieldQuestion, setFormFieldQuestion] = useState("");
    const [MC_OptionsList, setMC_OptionsList] = useState([]);

    // state variables for new form
    const [listOfForms, setListOfForms] = useState([]);
    const [listOfFormFields, setListOfFormFields] = useState([]);
    const [formTitle, setFormTitle] = useState("");

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get("/allForms")
            .then(res => {
                console.log(res.data);
                setListOfForms(listOfForms.concat(res.data));
                setIsLoading(false);
        });
    }, []);

    function addToListOfFormFields() {
        setFieldOpen(false);

        if (formFieldQuestion !== "") {
            if (formFieldType === "multipleChoice") {
                if (MC_OptionsList.length > 0) {
                    setListOfFormFields(listOfFormFields.concat({
                        type: formFieldType,
                        question: formFieldQuestion,
                        options: MC_OptionsList
                    }));
                    setMC_OptionsList([]);
                }
            } else {
                setListOfFormFields(listOfFormFields.concat({
                    type: formFieldType,
                    question: formFieldQuestion
                }));
            }
        }
    }

    function addFormFieldsToForm() {
        setFormOpen(false);

        if (listOfFormFields.length > 0) {
            const new_list = [listOfFormFields]

            const postForm = {
                title: formTitle,
                fields: new_list
            }

            axios.post("/addForm/", postForm)
                .then(() => console.log("form added"))
                .catch((err) => {
                    console.log(err);
                });

            setListOfForms(listOfForms.concat(postForm));
            setListOfFormFields([]);
        }
    }

    const formsList = listOfForms.map((formData) => {
        return <FormsPage formTitle={formData.title} ></FormsPage>
    });

    if (isLoading) {
        return( 
            <div className="ui container">
                <h1 className="ui header" style={{textAlign: "center", marginTop: "50%"}} >Loading...</h1>
            </div>
        );
    }

    return(
        <div className="ui container">
            <h1 style={{textAlign: "center", marginTop: "70px"}}>Forms Page</h1>

            <div className="ui container">
                <div className="ui three column grid">
                    {formsList}
                </div>
            </div>

            <div style={{marginTop: "10%", marginLeft: "46%"}}>
                <Modal
                    size={'large'}
                    dimmer={'blurring'}
                    open={formOpen}
                    onClose={() => setFormOpen(false)}
                    onOpen={() => setFormOpen(true)}
                    trigger={<Button>Add Form</Button>}
                >
                    <Modal.Header>Add Form</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>

                            <label style={{padding: "10px"}}>
                                Form Title
                                <input type="text" required onChange={(e) => setFormTitle(e.target.value)} style={{marginLeft: "10px"}}></input>
                            </label>

                            <Modal
                                open={fieldOpen}
                                onClose={() => setFieldOpen(false)}
                                onOpen={() => setFieldOpen(true)}
                                trigger={<Button style={{marginLeft: "20px"}}>Add Field</Button>}
                            >
                                <Modal.Header>Add Form Field</Modal.Header>
                                <Modal.Content>
                                    <Modal.Description>
                                        <form>
                                            <div>
                                            <label>
                                                    Field
                                                    <select style={{marginLeft: "10px", marginBottom: "30px"}} defaultValue={formFieldType} onChange={(e) => setFormFieldType(e.target.value)}>
                                                        <option value="shortText">Short Text Input</option>
                                                        <option value="longText">Long Text Input</option>
                                                        <option value="multipleChoice">Multiple Choice</option>
                                                    </select>
                                                </label> 
                                            </div>
                                            <div>
                                                <label>
                                                    Label
                                                    <div className="ui input focus" style={{display: "block", marginBottom: "30px"}}><input type="text" name="question" onChange={(e) => setFormFieldQuestion(e.target.value)} /></div>
                                                </label>
                                            </div>
                                            <div>
                                                {formFieldType === "multipleChoice" && (
                                                    <label>
                                                        Option(s)
                                                        <div className="ui input focus" style={{display: "block", padding: "10px"}}><input type="text" name="option1" onBlur={(e) => setMC_OptionsList(MC_OptionsList.concat(e.target.value))} /></div>
                                                        <div className="ui input focus" style={{display: "block", padding: "10px"}}><input type="text" name="option2" onBlur={(e) => setMC_OptionsList(MC_OptionsList.concat(e.target.value))} /></div>
                                                        <div className="ui input focus" style={{display: "block", padding: "10px"}}><input type="text" name="option3" onBlur={(e) => setMC_OptionsList(MC_OptionsList.concat(e.target.value))} /></div>
                                                    </label>
                                                )}
                                            </div>
                                        </form>
                                    </Modal.Description>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button onClick={addToListOfFormFields}>OK</Button>
                                </Modal.Actions>
                            </Modal>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={addFormFieldsToForm}>OK</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        </div>
    );
}