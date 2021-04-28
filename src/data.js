export const branch = [
  {
    value: 'CSE',
    label: 'CSE'
  },
  {
    value: 'IT',
    label: 'IT'
  },
];
export const semester = [
  {
    sem: 'sem1',
    label: 'sem1'
  },
  {
    sem: 'sem2',
    label: 'sem2'
  },
];
export const Regulation = [
  {
    reg: 'r18',
    label: 'r18'
  },
  {
    reg: 'r16',
    label: 'r16'
  },
];

export const grade = [
    {
      value : '00',
      label : 'Select Grade' 
    },
    {
      value : 10,
      label : 'O' 
    },
    {
      value : 9,
      label : 'A+' 
    },
    {
      value : 8,
      label : 'A' 
    },
    {
      value : 7,
      label : 'B+' 
    },
    {
      value : 6,
      label : 'B' 
    },
    {
      value : 5,
      label : 'C' 
    },
    {
      value : 0,
      label : 'F' 
    },
]

export const r18 = [
  {
      dept : "CSE",
      sem1: [
          {
              subject: "maths",
              credits: 3
          },
          {
              subject: "English",
              credits: 2,
              lab : {
                lab: "english_lab",
                lab_credits: 1,
              },
          },
          {
              subject: "BEE",
              credits: 3,
              lab : {
                lab: "BEE_lab",
                lab_credits: 2,
              },
          },
          {
              subject: "Graphics",
              credits: 3
          },
          {
              subject: "chemistry",
              credits: 3,
              lab : {
                  lab: "chemistry_lab",
                  lab_credits: 2,
              },
          }
      ],
      sem2: [
          {
              subject: "maths 2",
              credits: 3
          },
          {
              subject: "physics",
              credits: 2
          }
      ],
  },
  {
      dept : "IT",
      sem1: [
          {
              subject: "maths i",
              credits: 3
          },
          {
              subject: "chemistry i",
              credits: 2
          }
      ],
      sem2: [
          {
              subject: "maths 2i",
              credits: 3
          },
          {
              subject: "physics 2i",
              credits: 2
          }
      ],
  },
]
export const r16 = [
  {
      dept : "CSE",
      sem1: [
          {
              subject: "maths r",
              credits: 3
          },
          {
              subject: "chemistry r",
              credits: 2
          }
      ],
      sem2: [
          {
              subject: "maths 2r",
              credits: 3
          },
          {
              subject: "physics r",
              credits: 2
          }
      ],
  },
  {
      dept : "IT",
      sem1: [
          {
              subject: "maths ir",
              credits: 3
          },
          {
              subject: "chemistry ir",
              credits: 2
          }
      ],
      sem2: [
          {
              subject: "maths 2ir",
              credits: 3
          },
          {
              subject: "physics 2ir",
              credits: 2
          }
      ],
  },
]
