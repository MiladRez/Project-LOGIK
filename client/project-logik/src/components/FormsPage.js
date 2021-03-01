import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const FormsPage = (props) => {
    return(
        <div className="column">
            <div className="ui segment">
                <h1>{props.formTitle}</h1>
                <Link to={{pathname: `/completeForm/${props.formTitle}`}}>
                    <div className="ui segment" style={{marginBottom: "20px"}}>
                        <p>Status: Live (Click to start survey)</p>
                    </div>
                </Link>
                
                <Button>Preview</Button><Button>Unpublish</Button><Button>Edit</Button>
            </div>
        </div>
    );
}

export default FormsPage;