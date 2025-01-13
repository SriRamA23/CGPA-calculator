const semesterSubjects = {
    1: [
        { label: "Communicative English (credits: 3)", credits: 3 },
        { label: "Matrices and Calculus (credits: 4)", credits: 4 },
        { label: "Engineering Chemistry (credits: 3)", credits: 3 },
        { label: "Engineering Physics (credits: 3)", credits: 3 },
        { label: "Problem Solving and Python Programming (credits: 3)", credits: 3 },
        { label: "Heritage of Tamil (credits: 1)", credits: 1 },
        { label: "Communicative English Laboratory (credits: 1)", credits: 1 },
        { label: "Physics and Chemistry Laboratory (credits: 2)", credits: 2 },
        { label: "Problem Solving and Python Programming Lab (credits: 2)", credits: 2 }
    ],
    2: [
        { label: "Technical English (credits: 3)", credits: 3 },
        { label: "Statistics and Numerical Methods (credits: 4)", credits: 4 },
        { label: "Physics for Computer Science Students (credits: 3)", credits: 3 },
        { label: "Engineering Graphics (credits: 4 )", credits: 4 },
        { label: "Programming in C (credits: 3)", credits: 3 },
        { label: "Tamils and Technology (credits: 1)" , credits: 1 },
        { label: "Environmental Science and Sustainability (credits: 2)", credits: 2 },
        { label: "Technical English Laboratory (credits: 1)", credits: 1 },
        { label: "Programming in C Laboratory (credits: 2)", credits: 2 },
        { label: "Engineering Practices Laboratory (credits: 2)", credits: 2 }
    ],
    3: [
        { label: "Digital Principles and Computer Organisation (credits: 4 )", credits: 4 },
        { label: "Foundation of Data Science (credits: 3 )", credits: 3 },
        { label: "Data Structure (credits: 3)", credits: 3 },
        { label: "Object Oriented Programming (credits: 3)", credits: 3 },
        { label: "Operating System (credits: 4)", credits: 4 },
        { label: "Data Structure Laboratory (credits: 2)", credits: 2 },
        { label: "Object Oriented Programming Laboratory (credits: 2)", credits: 2 },
        { label: "Data Science Laboratory (credits: 2)", credits: 2 },
        { label: "Quantitative Aptitude and Verbal Reasoning (credits: 2)", credits: 2 }
    ],
    4: [
        { label: "Software Engineering (credits: 3)", credits: 3 },
        { label: "Design and Analysis of algorithm (credits: 4)", credits: 4 },
        { label: "Discrete Mathematics (credits: 4)", credits: 4 },
        { label: "Database Management Systems (credits: 3)", credits: 3 },
        { label: "Java Programming (credits: 3)", credits: 3 },
        { label: "Database Management System Laboratory (credits: 2)", credits: 2 },
        { label: "Java Programming Laboratory (credits: 2)", credits: 2 },
        { label: "Quantitative Aptitude and Behavioural Skills (credits: 1)", credits: 1 }
    ],
    5: [
        { label: "Compiler Design (credits: 4)", credits: 4 },
        { label: "Open Elective-1 (credits: 3)", credits: 3 },
        { label: "Mandatory Course-1 (credits: 0)", credits: 0 },
        { label: "Computer Networks (credits: 4)", credits: 4 },
        { label: "Full Stack Programming (credits: 4)", credits: 4 },
        { label: "Professional Elective-I (credits: 3)", credits: 3 },
        { label: "Professional Elective-II (credits: 3)", credits: 3 },
        { label: "Quantitative Aptitude and Communication Skills (credits: 1)", credits: 1 }
    ],
    6: [
        { label: "Mobile Computing (credits: 3)", credits: 3 },
        { label: "Open Elective-II (credits: 3)", credits: 3 },
        { label: "Mandatory Course-II (credits: 0)", credits: 0 },
        { label: "Cryptography and Cyber Security (credits: 4)", credits: 4 },
        { label: "Artificial Intelligence and Machine Learning (credits: 4)", credits: 4 },
        { label: "Professional Elective-III (credits: 3)", credits: 3 },
        { label: "Professional Elective-IV (credits: 3)", credits: 3 },
        { label: "Mobile Application Development Lab (credits: 2)", credits: 2 },
        { label: "Mini Project (credits: 2)", credits: 2 },
        { label: "Quantitative Aptitude and Soft Skills  (credits: 1) ", credits: 1 }
    ],
    7: [
        { label: "Human Values and Ethics (credits: 2)", credits: 2 },
        { label: "Elective-Management (credits: 3)", credits: 3 },
        { label: "Open Elective-III ( credits: 0)", credits: 0 },
        { label: "Professional Elective-V (credits: 3)", credits: 3 },
        { label: "Professional Elective-VI (credits: 3)", credits: 3 },
        { label: "Internship (credits: 1 )", credits: 1 }
    ],
    8: [
        { label: "Project Work (credits: 10)", credits: 10 }
    ]
};

function generateInputFields() {
    const semester = parseInt(document.getElementById('semester').value);

    const semesterSections = document.getElementById('semester-sections');
    semesterSections.innerHTML = '';

    for (let sem = 1; sem <= semester; sem++) {
        if (semesterSubjects[sem]) {
            const header = document.createElement('h3');
            header.innerText = `Enter the Semester ${sem} Marks:`;
            semesterSections.appendChild(header);

            semesterSubjects[sem].forEach((subject, index) => {
                const label = document.createElement('label');
                label.innerText = `${subject.label}:`;
                const select = document.createElement('select');
                select.id = `subject${sem}_${index}`;
                ["O-10", "A+-9", "A-8", "B+-7", "B-6", "C-5","U-0"].forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.split('-')[1];
                    optionElement.text = option.split('-')[0];
                    select.appendChild(optionElement);
                });
                semesterSections.appendChild(label);
                semesterSections.appendChild(select);
            });
        }
    }
    document.getElementById('year-semester-selection').style.display = 'none';
    document.getElementById('marks-entry').style.display = 'block';
}

function calculateCGPA() {
    let totalCredits = 0;
    let weightedSum = 0;
    const semester = parseInt(document.getElementById('semester').value);
    for (let sem = 1; sem <= semester; sem++) {
        if (semesterSubjects[sem]) {
            semesterSubjects[sem].forEach((subject, index) => {
                const gradePoints = parseFloat(document.getElementById(`subject${sem}_${index}`).value) || 0;
                weightedSum += gradePoints * subject.credits;
                totalCredits += subject.credits;
            });
        }
    }

    const cgpa = totalCredits === 0 ? 0 : weightedSum / totalCredits;
    document.getElementById('result').innerText = `Your CGPA is: ${cgpa.toFixed(2)}\ntotal credits earned: ${totalCredits}`;
    console.log("By Team DEVS - Sri Ram A , Sugan , Akhil);
}
