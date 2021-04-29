import React, { useState, useEffect } from 'react';
import {TextField, Button, IconButton, Tooltip } from '@material-ui/core';
import {grade} from "./data";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import InfoIcon from '@material-ui/icons/Info';
import './SubjectField.css'

const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      '&:hover': {
        backgroundColor: purple[700],
      },
    },
}))(Button);

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    input: {
        background: "rgb(232, 241, 250)"
    }
}));

function SubjectField(props) {
    const subjects = props.prop;
    const semester = props.sem;
    
    const [Grade, setGrade] = useState('');
    const [Gpa, setGpa] = useState('');

    useEffect(() => {
        const change = async () => {
            const subject = subjects[semester].reduce((acc,i) => {
                acc[i.subject] = "";
                if(i.lab){
                    acc[i.lab.lab] = "";
                }
                return acc;
            }, {})
            setGrade(subject);
        };
        change();
        setGpa("")
    }, [subjects, semester])

    const classes = useStyles();

    const handleChange = async (event) => {
        const { name, value } = event.target; 
        setGrade({
            ...Grade,
            [name]: value
        })
    };

    const calculator = async () => {
        const credit = subjects[semester].reduce((acc,i) => {
            acc[i.subject] = i.credits;
            if(i.lab){
                acc[i.lab.lab] = i.lab.lab_credits;
            }
            return acc;
        }, {})

        let totCredits = [];
        subjects[semester].forEach(el => {
            totCredits.push(el.credits)
            if (el.lab) {
              totCredits.push(el.lab.lab_credits);
            }
        })

        var total = totCredits.reduce(function (sum, current) {
            return sum + current;
        }, 0);
        
        console.log(Grade)

        let Marks = [];
        for (var item in Grade){     
            for (var items in credit){
                if(item === items){
                    let pr = Grade[item] * credit[items]
                    Marks.push(pr)
                }
            }
        } 

        var totalMarks = Marks.reduce(function (sum, current) {
            return sum + current;
        }, 0);

        var Gpa = totalMarks/total;
        Gpa = Gpa.toFixed(2);
        setGpa(Gpa);
        for(var ite in Grade){
            if(Grade[ite] === ""){
                console.log("error")
                alert("Select all subject grades")
                setGpa("Select all subject grades")
            }
        }
    }

    return (
        <div className='SubjectField'>
            {
                subjects[semester].map((subItem) => 
                    <div className='subjectField__subject' key={subItem.subject}>
                        {/* Subject Field */}
                        <TextField InputProps={{ className: classes.input }}
 key={subItem.subject} variant="outlined" color="primary" label="Subject" value={subItem.subject} />
                        <div className={subItem.lab? "subjectField__subject__boxL" : "subjectField__subject__box"}>
                            {/* Subject Credits */}
                            <TextField
                                className='subjectField__subject__credits'
                                id="standard-number"
                                label="Credits"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={subItem.credits}
                                key={subItem.credits}
                                variant='outlined'
                            />
                            {/* Subject Grade */}
                            <TextField
                                defaultValue="Select Your Grade"
                                className="subjectField__subject__grade"
                                id="standard-select-grade-native1"
                                select
                                label="Grade"
                                name={subItem.subject}
                                // value={Grade}
                                onChange={handleChange}
                                SelectProps={{
                                    native: true,
                                }}
                                helperText="Select your Grade"
                                variant="filled"
                                >
                                {grade.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                            {/* Displayed when Lab exists */}
                            { subItem.lab? 
                                <div className="subjectField__subject__lab">
                                    {/* Lab Credits */}
                                    <TextField
                                        className="subjectField__subject__grade"
                                        id="standard-number"
                                        label="Lab Credits"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={subItem.lab.lab_credits}
                                        key={subItem.lab.lab_credits}
                                        variant='outlined'
                                    />
                                    {/* Lab Grade */}
                                    <TextField
                                        id="standard-select-grade-native"
                                        select
                                        label="Grade"
                                        name={subItem.lab.lab}
                                        // value={Grade}
                                        onChange={handleChange}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        helperText="Select your Grade"
                                        variant="filled"
                                    >
                                        {grade.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
                                </div>
                                : '' }
                        </div>
                        
                    </div>
                )
            }
            <ColorButton onClick={calculator} variant="contained" color="primary" className={classes.margin} >
                Calculate GPA 
            </ColorButton>
            <Tooltip title="Set to JNTUH University">
                <IconButton color="primary" aria-label="Info">
                    <InfoIcon />
                </IconButton>
            </Tooltip>
            <TextField id="standard-basic" variant="outlined" label="Your Gpa" value={Gpa} />


        </div>
    );
}

export default SubjectField;