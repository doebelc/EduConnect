let accordionData = JSON.parse(localStorage.getItem('accordions')) || [];
let studentData = JSON.parse(localStorage.getItem('students')) || {};

function saveAccordions() {
    localStorage.setItem('accordions', JSON.stringify(accordionData));
}

function saveStudents() {
    localStorage.setItem('students', JSON.stringify(studentData));
}
/*       // There were two functions with the same name so I commented out both separately to see which one would affect functionality.
         // This one seems to be the offending party.

function populateAccordions() {
    const dynamicAccordions = document.getElementById('dynamicAccordions');
    dynamicAccordions.innerHTML = '';

let currentStudentData = JSON.parse(localStorage.getItem('students')) || {};
  

    studentData.forEach((accordion, index) => {
        const accordionId = `accordion${index}`;
        const collapseId = `collapse${index}`;
        const studentRows = (studentData[accordionId] || [])
            .map(student => `
                <tr>
                    <td>${student.lastName}</td>
                    <td>${student.firstName}</td>
                    <td>${student.grade}</td>
                    <td>${student.absences}</td>
                </tr>
            `).join('');

        const accordionHTML = `
            <div class="accordion-item" id="${accordionId}">
                <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
                        ${accordion.subject} - ${accordion.timePeriod}
                    </button>
                </h2>
                <div id="${collapseId}" class="accordion-collapse collapse" data-bs-parent="#dynamicAccordions">
                    <div class="accordion-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Last Name</th>
                                    <th>First Name</th>
                                    <th>Grade</th>
                                    <th>Absences</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${studentRows}
                            </tbody>
                        </table>
                        <button class="btn btn-secondary mt-2" onclick="openStudentModal('${accordionId}')">Add Student</button>
                        <button class="btn btn-danger mt-2" onclick="clearAccordion('${accordionId}')">Clear Info</button>
                    </div>
                </div>
            </div>
        `;

        dynamicAccordions.innerHTML += accordionHTML;
    });
}
*/
function openStudentModal(accordionId) {
    document.getElementById('studentModal').dataset.accordionId = accordionId;
    const modal = new bootstrap.Modal(document.getElementById('studentModal'));
    modal.show();    
}

function populateAccordions() {
    const dynamicAccordions = document.getElementById('dynamicAccordions');
    dynamicAccordions.innerHTML = '';

    // If no accordions exist, do not display anything
    if (accordionData.length === 0) return;
    
    accordionData.forEach((accordion, index) => {
        const accordionId = `accordion${index}`;
        const collapseId = `collapse${index}`;
        const averageGrade = calculateAverageGrade(studentData[accordionId] || []);
        const averageLetterGrade = convertAverageGradeToLetter(averageGrade);
        const studentRows = (studentData[accordionId] || [])
        .sort((a, b) => a.lastName.localeCompare(b.lastName)) //This line will sort the students by last name alphabetically.
            .map(student => `
            <tr>
                <td>${student.lastName}</td>
                <td>${student.firstName}</td>
                <td>${student.grade} (${student.letterGrade})</td> 
                <td>${student.absences}</td>
            </tr>
            `).join('');

        const accordionHTML = `
            <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
                ${accordion.subject} - ${accordion.timePeriod}
                </button>
            </h2>
            <div id="${collapseId}" class="accordion-collapse collapse" data-bs-parent="#dynamicAccordions">
                <div class="accordion-body">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Grade</th>
                        <th>Absences</th>
                    </tr>
                    </thead>
                    <tbody>
                    ${studentRows}
                        <tr>
                            <td colspan="4">Average grade for the class: ${averageGrade} ${averageLetterGrade}</td>
                        </tr>
                    </tbody>
                </table>
                <button class="btn btn-secondary mt-2" onclick="openStudentModal('${accordionId}')">Add Student</button>
                <button class="btn btn-danger mt-2" onclick="clearAccordion('${accordionId}')">Clear Info</button>
                </div>
            </div>
            </div>
        `;
        dynamicAccordions.innerHTML += accordionHTML;
    });
}


function addAccordion() {
    const subject = document.getElementById('subject').value.trim();
    const timePeriod = document.getElementById('timePeriod').value.trim();

    if (!subject || !timePeriod) {
        alert('Please fill out all fields.');
        return;
    }

    // Adds new accordion to the array
    accordionData.push({ subject, timePeriod });
    saveAccordions();

    // Clear form, close modal
    document.getElementById('accordionForm').reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('accordionModal'));
    modal.hide();

    populateAccordions();
}

function addStudent(){
    console.log('addStudent');
    const accordionId = document.getElementById('studentModal').dataset.accordionId;
    const lastName = document.getElementById('lastName').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const grade = document.getElementById('grade').value.trim();
    const absences = parseInt(document.getElementById('absences').value, 10);

    if (!lastName || !firstName || !grade || isNaN(absences)) {
        alert('Complete all fields to submit.');
        return;
    }

    if (!studentData[accordionId]) {
        studentData[accordionId] = [];
    }
    let letterGrade = convertGradeToLetter(grade);
    studentData[accordionId].push({ lastName, firstName, grade, letterGrade, absences });
    saveStudents();

    document.getElementById('studentForm').reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('studentModal'));
    modal.hide();

    populateAccordions();
}

function clearAccordion(accordionId) {
    if (confirm('Are you sure you want to clear all students in this section?')) {
        delete studentData[accordionId];
        saveStudents();
        populateAccordions();
    }
}

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

function convertAverageGradeToLetter(averageGrade, studentData) {
    if (averageGrade >= 97 && averageGrade <= 100 && studentData != 0) return '(A+)'; // fixed the studentData conditional argument from !studentData === 0 to studentData != 0
    if (averageGrade >= 93 && averageGrade <= 96 && studentData != 0) return '(A-)';
    if (averageGrade >= 90 && averageGrade <= 92 && studentData != 0) return '(A)';
    if (averageGrade >= 87 && averageGrade <= 89 && studentData != 0) return '(B+)';
    if (averageGrade >= 83 && averageGrade <= 86 && studentData != 0) return '(B)';
    if (averageGrade >= 80 && averageGrade <= 82 && studentData != 0) return '(B-)';
    if (averageGrade >= 77 && averageGrade <= 79 && studentData != 0) return '(C+)';
    if (averageGrade >= 73 && averageGrade <= 76 && studentData != 0) return '(C)';
    if (averageGrade >= 70 && averageGrade <= 72 && studentData != 0) return '(C-)';
    if (averageGrade >= 67 && averageGrade <= 69 && studentData != 0) return '(D+)';
    if (averageGrade >= 63 && averageGrade <= 66 && studentData != 0) return '(D)';
    if (averageGrade >= 60 && averageGrade <= 62 && studentData != 0) return '(D-)';
    if (averageGrade >= 1 && averageGrade <= 59 && studentData != 0) return '(F)'; //needed to make the averageGarde >= 1 as opposed to 0 otherwise a letter grade of (F) will show up when no students are entered yet.
    return '';
}

function calculateAverageGrade(students) {
    if (students.length === 0) return '';
    const total = students.reduce((sum, student) => sum + parseFloat(student.grade), 0);
    return (total / students.length).toFixed(2);
}

document.addEventListener('DOMContentLoaded', populateAccordions);

/* Ben: -added convertGradeToLetter function to convert the numerical grade to a letter grade and then include both in the final output to the table.
        -added convertAverageGradeToLetter function to convert the average numerical grade to a letter grade to include below the table.
        -placed the convertGradeToLetter function inside the addStudent function on line 165 to allow iit to become part of the student object for later use.
        -changed all instances of the variable grades to grade for cleaner code in both students.js and student.html files.
        -added studentLetterGrade to line 89 to include the letter grade in the final output to the table.
        -added the variable letterGrade to line 89 inside the populateAccordions function to include the letter grade in the final output to the table.
        -added calculateAverageGrade function to calculate the average grade of all students in a given class.
        -added lines 84 and 85 to establish the averageGrade and averageLetterGrade variables to be used in the final output to the table.
        -added lines 117-119 to get the average grade of all students in a given class to priint out below the table.
        -had difficulty making the average letter grade not appear below the table with the current time constraints so i added an additional conditional statement to
        the convertAverageGradeToLetter function to only display a letter grade if there are students in the class. The number average doesn't show until there are students in the class.
*/