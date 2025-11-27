
        // Example 3.1: Grade Assigner (if / else if / else)
        const scoreInput = document.getElementById('scoreInput');
        const gradeBtn = document.getElementById('gradeBtn');
        const gradeResult = document.getElementById('gradeResult');
        gradeBtn.addEventListener('click', () => {
            const score = Number(scoreInput.value);
            if (isNaN(score) || score < 0 || score > 100) {
                gradeResult.textContent = 'Please enter a valid score between 0 and 100.';
                gradeResult.style.color = 'crimson';
                return;
            }
            let grade;
            if (score >= 95 && score <= 100) {
                grade = 'Pasado, with High Honors';
                gradeResult.textContent = `Your Grade is ${score}!, NAPAKA LOPET! => ${grade}.`;
                gradeResult.style.color = 'green';
            } else if (score >= 90) {
                grade = 'Pasado, With Honors';
                gradeResult.textContent = `Your Grade is ${score}!, PALONG PALO! => ${grade}.`;
                gradeResult.style.color = 'green';
            }  else if (score >= 80) {
                grade = 'Pasado';
                gradeResult.textContent = `Your Grade is ${score}!, Okay na yan => ${grade}.`;
                gradeResult.style.color = 'Blue';
            } else if (score >= 75) {
                grade = 'Bagsak';
                gradeResult.textContent = `Your Grade is ${score}!, Umabot pa! => ${grade}.`;
                gradeResult.style.color = 'YellowGreen';
            }  else if (score >= 70) {
                grade = 'Bagsak';
                gradeResult.textContent = `Your Grade is ${score}!, Bawi next session => ${grade}.`;
                gradeResult.style.color = 'YellowGreen';
            } else if (score >= 60) {
                grade = 'Soper Bagsak';
                gradeResult.textContent = `Your Grade is ${score}!, Aray mo => ${grade}.`;
                gradeResult.style.color = 'Crimson';
            }
        });