import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const CompleteForm = (props) => {

    const [formsData, setFormsData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [formResults, setFormResults] = useState([]);

    useEffect(() => {
        axios.get(`/form/${props.match.params.title}`)
            .then(res => {
                setFormsData(res.data);
                setIsLoading(false);
            }
        );
    }, []);

    if (isLoading) {
        return( 
            <div className="ui container">
                <h1 className="ui header" style={{textAlign: "center", marginTop: "50%"}} >Loading...</h1>
            </div>
        );
    }

    function sendResults() {
        axios.post("/sendData/", formResults)
                .then(() => console.log("Sent data"))
                .catch((err) => {
                    console.log(err);
                });
    }

    const fields = formsData.fields.map((field) => {

        const inputFields = [];

        for (let input of field) {
            if (input.type === "shortText") {
                inputFields.push(
                    <label>
                        {input.question} 
                        <div className="ui input focus field" style={{display: "block", paddingBottom: "30px"}}><input type="text" onBlur={(e) => setFormResults(formResults.concat(e.target.value))} /></div>
                    </label>
                );
            } else if (input.type === "longText") {
                inputFields.push(
                    <label htmlFor="longAnswer">
                        {input.question}  
                        <div className="ui input focus field" style={{display: "block", paddingBottom: "30px"}}><textarea id="longAnswer" rows="5" cols="50" onBlur={(e) => setFormResults(formResults.concat(e.target.value))} /></div>
                    </label>
                );
            } else {
                inputFields.push(
                    <label>
                        {input.question}  
                        <div className="ui input focus" style={{display: "block"}}>
                            <div className="ui radio checkbox" style={{marginTop: "10px"}}>
                                <input type="radio" id={input.options[0]} />
                                <label htmlFor={input.options[0]}>{input.options[0]}</label>
                            </div>
                            <br></br>
                            <div className="ui radio checkbox">
                                <input type="radio" id={input.options[1]} />
                                <label htmlFor={input.options[1]}>{input.options[1]}</label>
                            </div>
                            <br></br>
                            <div className="ui radio checkbox">
                                <input type="radio" id={input.options[2]} />
                                <label htmlFor={input.options[2]}>{input.options[2]}</label>
                            </div>
                        </div>
                    </label>
                );
            }
        }

        return inputFields;
    });

    return(
        <div className="ui container">
            <h1 className="ui header" style={{marginTop: "100px"}}>{formsData.title}</h1>
            <div className="ui form">
                <form>
                    {fields}
                    <Link to={{pathname: "/"}}>
                        <button onClick={sendResults} className="ui button primary" style={{marginTop: "5%", marginLeft: "50%"}}>Submit</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default CompleteForm;