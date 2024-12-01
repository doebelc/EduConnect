/* Core Const(s) declared. The beginning section (6-29) is needed to add new student and save to localStorage. Success marker. 
Students can be added and populated with the active code on this page. 
However the code is not currently set to validate the grades input, 
but it should be validated to ensure that it is a number between 0 and 100.
Another functionality that could be added is to validate the absences input to ensure that it is a number.
*/
function addStudent() {
    const lastName = document.getElementById('lastName').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const grades = document.getElementById('grades').value.trim();
    const absences = parseInt(document.getElementById('absences').value, 10);


    if (!lastName || !firstName || !grades || isNaN(absences)) {
        alert('Please complete all fields correctly.');
        return;
    }

    const student = { lastName, firstName, grades, absences };
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    // This required to clear all inputs in and hide modal
    document.getElementById('studentForm').reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('studentModal'));
    modal.hide();

    populateTable();
}

/* code needed to assist with populating the student table from localStorage; 
and listing students alphabetically, by last name, 
and this computes average grade for all students. Success marker. Need to plug in function to convert numbers to letter grade
All of Ben's code is commented out below for potential plug and play herein, or debug to fulfill remaining desired outcomes
*/
function populateTable() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.sort((a, b) => a.lastName.localeCompare(b.lastName));
    const tableBody = document.getElementById('studentTable');
    tableBody.innerHTML = '';

    let totalgrades = 0;

    students.forEach((student) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.lastName}</td>
            <td>${student.firstName}</td>
            <td>${student.grades}</td>
            <td>${student.absences}</td>
        `;
        tableBody.appendChild(row);

        totalgrades += parseInt(student.grades);
    });
    average = totalgrades / students.length;
    document.getElementById('averageGrade').textContent = "average grade " + average.toFixed(2);
}

function clearStudents() {
    localStorage.removeItem('students');
    populateTable();
}

// MS:This will populate the table whenever the page loads, if there are students in localStorage
document.addEventListener('DOMContentLoaded', populateTable);  

// MS: Ben's logic.js is below for convenience. And the file is still in the assets folder
 /*// logic.js author ben

// Author Ben: This function will find an average grade of all students in a single class
// to be displayed at the bottom of each table inside the accordian tabs on the classes page.
// It should be called in the classes.js file after the table is populated. The examples for all
// of the functions below are inset slightly on the page to distinguish the from the actual code.
function calculateAverage(grades) {
    if (grades.length === 0) return 0;

    let sum = 0;
    for (let i = 0; i < grades.length; i++) {
        sum += grades[i];
    }

    return sum / grades.length;
}
                // Example usage:
                const grades = [85, 92, 78, 90, 88];
                const average = calculateAverage(grades);
                console.log(`The average grade is: ${average}`);

// Author Ben: This function will alphabetize the object students array by the key variable value: lastName.
// This function should also be called in the classes.js file after the table is populated.
function alphabetizeStudents(students, lastName) {
    return students.sort((a, b) => {
        if (a[lastName] < b[lastName]) return -1;
        if (a[lastName] > b[lastName]) return 1;
        return 0;
    });
}
                // Example usage:
                const students = [
                    { firstName: 'John', lastName: 'Doe' },
                    { firstName: 'Jane', lastName: 'Smith' },
                    { firstName: 'Mary', lastName: 'Johnson' }
                ];

                const sortedStudents = alphabetizeStudents(students, 'lastName');
                console.log(sortedStudents);

// Author Ben: This function will convert numerically entered grades into a string value letter
// grade equivalent to be displayed inside the tables of each accordian tab for individal students.
// It can also be used to convert the numerical value of the average grade of all of the students
// to be displayed below that table. This function should also be called in the classes.js file 
// after the table is populated.                
function convertGradeToLetter(grade) {
    if (grade >= 97 && grade <= 100) return 'A+';
    if (grade >= 93 && grade <= 96) return 'A-';
    if (grade >= 90 && grade <= 92) return 'A';
    if (grade >= 87 && grade <= 89) return 'B+';
    if (grade >= 83 && grade <= 86) return 'B';
    if (grade >= 80 && grade <= 82) return 'B-';
    if (grade >= 77 && grade <= 79) return 'C+';
    if (grade >= 73 && grade <= 76) return 'C';
    if (grade >= 70 && grade <= 72) return 'C-';
    if (grade >= 67 && grade <= 69) return 'D+';
    if (grade >= 63 && grade <= 66) return 'D';
    if (grade >= 60 && grade <= 62) return 'D-';
    return 'F';
}

                // Example usage:
                const userGrade = 85;
                const letterGrade = convertGradeToLetter(userGrade);
                console.log(`The letter grade is: ${letterGrade}`);
*/ 