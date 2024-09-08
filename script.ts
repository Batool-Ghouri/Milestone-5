let resumeGenerated = false;
let resumeURL = '';

// Function to update and generate the resume HTML
function updateResume(): void {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value.split('\n');
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;

    const resumeHTML = `
        <div class="resume">
            <h1 contenteditable="true">${name}</h1>
            <p contenteditable="true">Email: ${email} | Phone: ${phone}</p>
            <p contenteditable="true">Address: ${address}</p>
            <h2>Education</h2>
            <p contenteditable="true">${education.replace(/\n/g, '<br>')}</p>
            <h2>Skills</h2>
            <ul contenteditable="true">
                ${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}
            </ul>
            <h2>Experience</h2>
            <p contenteditable="true">${experience.replace(/\n/g, '<br>')}</p>
        </div>
    `;

    const resumeContainer = document.getElementById('resume-container') as HTMLDivElement;
    resumeContainer.innerHTML = resumeHTML;
}

// Generate the resume when the 'Generate' button is clicked
document.getElementById('generate')?.addEventListener('click', function(event) {
    event.preventDefault();
    updateResume();
    resumeGenerated = true;

    // Enable the share link and download buttons
    (document.getElementById('share-link') as HTMLButtonElement).disabled = false;
    (document.getElementById('download-pdf') as HTMLButtonElement).disabled = false;
});

// Create a shareable URL when the 'Share Link' button is clicked
document.getElementById('share-link')?.addEventListener('click', () => {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    if (name) {
        resumeURL = `${window.location.origin}/${name}/resume`;
        (document.getElementById('resume-url') as HTMLInputElement).value = resumeURL;
        navigator.clipboard.writeText(resumeURL).then(() => {
            alert('Resume link copied to clipboard');
        });
    } else {
        alert('Please enter your name');
    }
});

// Download the resume as a PDF using jsPDF when the 'Download PDF' button is clicked
document.getElementById('download-pdf')?.addEventListener('click', () => {
    if (resumeGenerated) {
        // Ensure jsPDF is loaded properly
        const jsPDF = (window as any).jspdf.jsPDF;
        if (!jsPDF) {
            alert('jsPDF library not loaded!');
            return;
        }

        // Create a new jsPDF document
        const doc = new jsPDF();

        // Get the content of the resume
        const resumeContent = (document.getElementById('resume-container') as HTMLDivElement).innerText;

        // Add the content to the PDF
        doc.text(resumeContent, 10, 10);

        // Save the generated PDF
        doc.save('resume.pdf');
    } else {
        alert('Please generate the resume first.');
    }
});
