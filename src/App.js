import React, { useState, useEffect } from "react";
import Typography from '@material-ui/core/Typography';
import './App.css';
import { FormControl, MenuItem, Select} from '@material-ui/core';
import SubjectField from "./SubjectField";
import {branch, r18, r16, Regulation, semester} from "./data";


function App() {

  let dept = r18.find(o => o.dept === 'CSE');

  const [Branch, setBranch] = useState('CSE');
  const [Semester, setSemester] = useState('sem1');
  const [regulation, setRegulation] = useState('r18');
  const [subject, setSubject] = useState(dept);

  useEffect(() => {
    let dept = r18.find(o => o.dept === 'CSE');
    setBranch('CSE');
    setSemester('sem1')
    setRegulation('r18')
    setSubject(dept);
  }, [])

  const onRegulationChange = async (event) => {
    const Reg = event.target.value;
    setRegulation(Reg);
    const reg = (regulation === 'r18')? r16 : r18;
    let dept = reg.find(o => o.dept === Branch);
    setSubject(dept)
    setSemester(Semester);
  }

  const onBranchChange = async (event) => {
    const Branchlabel = event.target.value;
    const reg = (regulation === 'r18')? r18 : r16;
    let dept = reg.find(o => o.dept === Branchlabel);
    setBranch(Branchlabel);
    setSubject(dept);
  }

  const onSemChange = async (event) => {
    const SemLabel = event.target.value;
    setSemester(SemLabel);
  }

  return (
    <div className="App">
      <div className="App__container">
        <div className="App__header">
          <div className="App__header__cont">
          <Typography variant="subtitle1">Regulation</Typography>
          {/* Regulation Dropdown */}
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onRegulationChange}
              value={regulation}
              >
              {Regulation.map((r) => (
                <MenuItem value={r.reg} key={r.reg}>{r.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          </div>
          <div className="App__header__cont">
          <Typography variant="subtitle1">Branch</Typography>
          {/* Branch Dropdown */}
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onBranchChange}
              value={Branch}
              >
              {branch.map((depts) => (
                <MenuItem value={depts.value} key={depts.value}>{depts.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          </div>
          <div className="App__header__cont">
          <Typography variant="subtitle1">Semester</Typography>
          {/* Semester Dropdown */}
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onSemChange}
              value={Semester}
              >
              {semester.map((sem) => (
                <MenuItem value={sem.sem} key={sem.sem}>{sem.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          </div>
        </div>
        <div className='App__main'>
          <SubjectField prop={subject} sem={Semester}></SubjectField>
        </div>
      </div>
    </div>
  );
}

export default App;
