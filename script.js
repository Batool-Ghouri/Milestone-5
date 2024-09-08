var _a, _b, _c;
var resumeGenerated = false;
var resumeURL = '';
// Function to update and generate the resume HTML
function updateResume() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var education = document.getElementById('education').value;
    var skills = document.getElementById('skills').value.split('\n');
    var experience = document.getElementById('experience').value;
    var resumeHTML = "\n        <div class=\"resume\">\n            <h1 contenteditable=\"true\">".concat(name, "</h1>\n            <p contenteditable=\"true\">Email: ").concat(email, " | Phone: ").concat(phone, "</p>\n            <p contenteditable=\"true\">Address: ").concat(address, "</p>\n            <h2>Education</h2>\n            <p contenteditable=\"true\">").concat(education.replace(/\n/g, '<br>'), "</p>\n            <h2>Skills</h2>\n            <ul contenteditable=\"true\">\n                ").concat(skills.map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join(''), "\n            </ul>\n            <h2>Experience</h2>\n            <p contenteditable=\"true\">").concat(experience.replace(/\n/g, '<br>'), "</p>\n        </div>\n    ");
    var resumeContainer = document.getElementById('resume-container');
    resumeContainer.innerHTML = resumeHTML;
}
// Generate the resume when the 'Generate' button is clicked
(_a = document.getElementById('generate')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (event) {
    event.preventDefault();
    updateResume();
    resumeGenerated = true;
    // Enable the share link and download buttons
    document.getElementById('share-link').disabled = false;
    document.getElementById('download-pdf').disabled = false;
});
// Create a shareable URL when the 'Share Link' button is clicked
(_b = document.getElementById('share-link')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    var name = document.getElementById('name').value;
    if (name) {
        resumeURL = "".concat(window.location.origin, "/").concat(name, "/resume");
        document.getElementById('resume-url').value = resumeURL;
        navigator.clipboard.writeText(resumeURL).then(function () {
            alert('Resume link copied to clipboard');
        });
    }
    else {
        alert('Please enter your name');
    }
});
// Download the resume as a PDF using jsPDF when the 'Download PDF' button is clicked
(_c = document.getElementById('download-pdf')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
    if (resumeGenerated) {
        // Ensure jsPDF is loaded properly
        var jsPDF = window.jspdf.jsPDF;
        if (!jsPDF) {
            alert('jsPDF library not loaded!');
            return;
        }
        // Create a new jsPDF document
        var doc = new jsPDF();
        // Get the content of the resume
        var resumeContent = document.getElementById('resume-container').innerText;
        // Add the content to the PDF
        doc.text(resumeContent, 10, 10);
        // Save the generated PDF
        doc.save('resume.pdf');
    }
    else {
        alert('Please generate the resume first.');
    }
});
