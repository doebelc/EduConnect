/* Author Ben: This function will find an average grade of all students in a single class
to be displayed at the bottom of each table inside the accordian tabs on the classes page.
 It should be called in the classes.js file after the table is populated. The examples for all
of the functions below are inset slightly on the page to distinguish the from the actual code.
*/
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

/* Author Ben: This function will alphabetize the object students array by the key variable value: lastName.
This function should also be called in the classes.js file after the table is populated.
*/
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

/* Author Ben: This function will convert numerically entered grades into a string value letter
grade equivalent to be displayed inside the tables of each accordian tab for individal students.
It can also be used to convert the numerical value of the average grade of all of the students
to be displayed below that table. This function should also be called in the classes.js file 
after the table is populated. 
*/               
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