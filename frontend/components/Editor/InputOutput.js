import {useState} from "react";
import axios from 'axios';
import {Button, TextField, Snackbar} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {

    "& > *": {
      margin: theme.spacing(2),

    }
  }
}));

export default function InputOuput(props) {
  const classes = useStyles();

  const [runInput, setRunInput]=useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [message, setMessage] = useState('');

  const handleRunCode= async ()=>{

    setLoading(true);
    console.info('submitting', props.mode, props.code, runInput);
    const data = await axios.post(process.env.BACKEND_URL+"code/run",
    {
      source:props.code,
      compiler:props.mode,
      input:runInput,
    })
      .then(response=>response.data)
      .catch(error=>console.log(error));

      if(typeof(data) === 'object'){
        setLoading(false);
        setMessage(data.message);
        return;
      }

      setOutput(data);
      setLoading(false);


  }

  const handleSubmitCode = async ()=>{
    setLoading(true);
    const data = await axios.post(process.env.BACKEND_URL+"code/submit",
    {
      source:props.code,
      compiler:props.mode,
      useremail:props.user.email,
      qid:props.qid
    })
      .then(response=>response.data)
      .catch(error=>console.log(error));

      if(typeof(data) === 'object'){
        setLoading(false);
        setMessage(data.message);
        return;
      }

      setOutput(data);
      setLoading(false);
  }

  return (
    <div className={classes.root}>

      <Button style={{marginLeft:'6.5rem'}} variant="contained" color="primary" onClick={handleRunCode} disabled={loading}>
        RUN CODE
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmitCode} disabled={loading}>
        SUBMIT
      </Button>
      <hr/>
      <TextField label='Input for Code' variant='outlined' multiline rows={5} onChange={e=>setRunInput(e.target.value)} value={runInput} style={{width:'75rem'}}/>
      <br/>
      <div style={{marginBottom:'10rem'}}>
        <h3>Showing the Ouput here</h3>
        <p style={{'whiteSpace':'pre-line'}}>{loading?"Loading the Output":output}</p>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        autoHideDuration={4000}
        message={message}
        open={Boolean(message)}
        onClose={()=>setMessage('')}
        style={{'whiteSpace':'pre-line'}}
      />
    </div>
  );
}
