import React, { useState, useEffect } from 'react';
import {TextField, } from '@material-ui/core';
import {grade} from "./data";
import './SubjectField.css'

function SubjectField(props) {
    const subjects = props.prop;
    const semester = props.sem;
    
    const [Grade, setGrade] = useState('');

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
    }, [subjects, semester])

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

        const Gpa = totalMarks/total;
        return Gpa;
    }

    return (
        <div className='SubjectField'>
            {
                subjects[semester].map((subItem) => 
                    <div className='subjectField__subject' key={subItem.subject}>
                        {/* Subject Field */}
                        <TextField className='subjectField__subject__Name' key={subItem.subject} variant="outlined" color="secondary" label="Subject" value={subItem.subject} />
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
            <button onClick={calculator}>calculate</button>
        </div>
    );
}

export default SubjectField;