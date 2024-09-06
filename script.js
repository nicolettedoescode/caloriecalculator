document.getElementById('calorie-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Get values from form
    const gender = document.getElementById('gender').value;
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;

    // Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Calculate Total Daily Energy Expenditure (TDEE)
    let tdee = bmr * activity;

    // Adjust TDEE based on the selected goal
    switch(goal) {
        case 'weightLoss':
            tdee -= 500; // Deficit for weight loss
            break;
        case 'muscleGain':
            tdee += 250; // Moderate surplus for muscle gain
            break;
        case 'weightGain':
            tdee += 500; // Higher surplus for weight gain
            break;
        case 'muscleMaintain':
            // Maintain muscle: No change to TDEE, similar to maintenance
            break;
        case 'maintain':
        default:
            // No adjustment needed for maintenance
            break;
    }

    // Calculate protein needs based on the goal
    let protein;
    switch(goal) {
        case 'weightLoss':
            protein = 1.5 * weight; // 1.5 grams per kg for weight loss
            break;
        case 'muscleGain':
            protein = 2.0 * weight; // 2.0 grams per kg for muscle gain
            break;
        case 'weightGain':
            protein = 1.5 * weight; // 1.5 grams per kg for weight gain
            break;
        case 'muscleMaintain':
            protein = 1.6 * weight; // 1.6 grams per kg for muscle maintenance
            break;
        case 'maintain':
        default:
            protein = 1.4 * weight; // 1.4 grams per kg for general maintenance
            break;
    }

    // Display result
    document.getElementById('result').innerText = `To ${goal.replace(/([A-Z])/g, ' $1').toLowerCase()} you need approximately ${Math.round(tdee)} calories per day.`;
    document.getElementById('protein').innerText = `For your goal, you should aim for approximately ${Math.round(protein)} grams of protein per day.`;
});
