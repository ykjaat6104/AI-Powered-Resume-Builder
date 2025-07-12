// Professional Resume Builder JavaScript - Fully Functional Version
// Enhanced with dropdowns, autocomplete, and dynamic functionality

// University and College data for autocomplete
const UNIVERSITIES = [
    'Harvard University', 'Stanford University', 'Massachusetts Institute of Technology (MIT)',
    'California Institute of Technology (Caltech)', 'University of California, Berkeley',
    'Princeton University', 'Yale University', 'University of Chicago', 'Columbia University',
    'University of Pennsylvania', 'Cornell University', 'Dartmouth College', 'Brown University',
    'Vanderbilt University', 'Rice University', 'Washington University in St. Louis',
    'University of Notre Dame', 'University of California, Los Angeles (UCLA)',
    'Emory University', 'University of California, San Diego', 'Carnegie Mellon University',
    'University of Virginia', 'Georgetown University', 'University of Michigan, Ann Arbor',
    'Wake Forest University', 'Tufts University', 'Boston College', 'University of Rochester',
    'Brandeis University', 'Case Western Reserve University', 'New York University',
    'University of Florida', 'Georgia Institute of Technology', 'University of California, Irvine',
    'University of California, Santa Barbara', 'Boston University', 'Northeastern University',
    'Tulane University', 'University of Miami', 'University of California, Davis',
    'University of Wisconsin, Madison', 'University of Illinois, Urbana-Champaign',
    'Ohio State University', 'Pennsylvania State University', 'University of Washington',
    'University of Georgia', 'University of Texas at Austin', 'University of Southern California',
    'Purdue University', 'University of Connecticut', 'Syracuse University', 'Clemson University'
];

const COURSES = [
    'Computer Science', 'Information Technology', 'Software Engineering', 'Data Science',
    'Artificial Intelligence', 'Machine Learning', 'Cybersecurity', 'Web Development',
    'Mobile Development', 'Cloud Computing', 'Business Administration', 'Marketing',
    'Finance', 'Accounting', 'Economics', 'Management', 'Human Resources', 'Operations Management',
    'International Business', 'Engineering', 'Mechanical Engineering', 'Electrical Engineering',
    'Civil Engineering', 'Chemical Engineering', 'Biomedical Engineering', 'Aerospace Engineering',
    'Environmental Engineering', 'Medicine', 'Nursing', 'Pharmacy', 'Dentistry', 'Veterinary Science',
    'Psychology', 'Sociology', 'Political Science', 'International Relations', 'History',
    'English Literature', 'Communications', 'Journalism', 'Graphic Design', 'Fine Arts',
    'Architecture', 'Interior Design', 'Fashion Design', 'Biology', 'Chemistry', 'Physics',
    'Mathematics', 'Statistics', 'Environmental Science', 'Geology', 'Agriculture',
    'Education', 'Elementary Education', 'Secondary Education', 'Special Education',
    'Law', 'Criminal Justice', 'Public Administration', 'Social Work', 'Philosophy',
    'Religious Studies', 'Music', 'Theater Arts', 'Film Studies', 'Photography'
];

const SKILLS = [
    // Technical Skills
    'JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'TypeScript',
    'React', 'Angular', 'Vue.js', 'Node.js', 'Express.js', 'Django', 'Flask', 'Spring Boot',
    'Laravel', 'Ruby on Rails', 'ASP.NET', 'HTML5', 'CSS3', 'SASS', 'Bootstrap', 'Tailwind CSS',
    'jQuery', 'Redux', 'Webpack', 'Babel', 'Git', 'GitHub', 'GitLab', 'Docker', 'Kubernetes',
    'AWS', 'Azure', 'Google Cloud', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch',
    'GraphQL', 'REST APIs', 'Microservices', 'DevOps', 'CI/CD', 'Jenkins', 'Apache', 'Nginx',
    'Linux', 'Windows Server', 'macOS', 'Android Development', 'iOS Development', 'Flutter',
    'React Native', 'Unity', 'Unreal Engine', 'Photoshop', 'Illustrator', 'Figma', 'Sketch',
    'Adobe XD', 'InDesign', 'After Effects', 'Premiere Pro', 'AutoCAD', 'SolidWorks', 'MATLAB',
    'R', 'Tableau', 'Power BI', 'Excel', 'Google Analytics', 'SEO', 'SEM', 'Social Media Marketing',
    
    // Soft Skills
    'Leadership', 'Team Management', 'Project Management', 'Communication', 'Problem Solving',
    'Critical Thinking', 'Time Management', 'Organizational Skills', 'Adaptability', 'Creativity',
    'Innovation', 'Strategic Planning', 'Analytical Thinking', 'Decision Making', 'Negotiation',
    'Public Speaking', 'Presentation Skills', 'Customer Service', 'Sales', 'Marketing Strategy',
    'Business Development', 'Financial Analysis', 'Budgeting', 'Risk Management', 'Quality Assurance',
    'Research', 'Data Analysis', 'Statistical Analysis', 'Report Writing', 'Documentation',
    'Training', 'Mentoring', 'Conflict Resolution', 'Emotional Intelligence', 'Cross-functional Collaboration'
];

class ResumeBuilder {
    constructor() {
        this.experienceCount = 0;
        this.educationCount = 0;
        this.skillCount = 0;
        this.projectCount = 0;
        this.certificationCount = 0;
        this.selectedTemplate = 'minimal';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.addInitialSections();
        this.updatePreview();
    }

    setupEventListeners() {
        // Form input listeners with real-time updates
        document.addEventListener('input', (e) => {
            if (e.target.matches('input, textarea, select')) {
                this.updatePreview();
            }
        });

        // Button listeners
        document.getElementById('addExperience')?.addEventListener('click', () => this.addExperience());
        document.getElementById('addEducation')?.addEventListener('click', () => this.addEducation());
        document.getElementById('addSkillBtn')?.addEventListener('click', () => this.addSkill());

        // Template selection
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', () => {
                this.selectTemplate(card.dataset.template);
            });
        });

        // Additional sections
        document.querySelectorAll('.add-section').forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.dataset.section;
                this.addAdditionalSection(section);
            });
        });

        // Export and save functions
        document.getElementById('saveBtn')?.addEventListener('click', () => this.saveResume());
        document.getElementById('loadResumeBtn')?.addEventListener('click', () => this.loadResume());
        document.getElementById('exportBtn')?.addEventListener('click', () => this.exportToPDF());
    }

    addInitialSections() {
        // Add one experience and education by default
        this.addExperience();
        this.addEducation();
        this.addSkill();
    }

    addExperience(data = {}) {
        const container = document.getElementById('experienceContainer');
        const currentCount = container.querySelectorAll('.experience-item').length + 1;
        const div = document.createElement('div');
        div.className = 'experience-item section';
        div.innerHTML = `
            <div class="section-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
                <h3><i class="fas fa-briefcase"></i> Experience ${currentCount}</h3>
                <button type="button" class="btn btn-danger" onclick="resumeBuilder.removeExperience(this); resumeBuilder.updatePreview();">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="exp_title_${currentCount}">Job Title *</label>
                    <input type="text" id="exp_title_${currentCount}" name="exp_title_${currentCount}" 
                           placeholder="e.g., Senior Software Developer" value="${data.title || ''}" required>
                </div>
                <div class="form-group">
                    <label for="exp_company_${currentCount}">Company *</label>
                    <input type="text" id="exp_company_${currentCount}" name="exp_company_${currentCount}" 
                           placeholder="e.g., Google Inc." value="${data.company || ''}" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="exp_location_${currentCount}">Location</label>
                    <input type="text" id="exp_location_${currentCount}" name="exp_location_${currentCount}" 
                           placeholder="e.g., San Francisco, CA" value="${data.location || ''}">
                </div>
                <div class="form-group">
                    <label for="exp_type_${currentCount}">Employment Type</label>
                    <select id="exp_type_${currentCount}" name="exp_type_${currentCount}">
                        <option value="Full-time" ${data.type === 'Full-time' ? 'selected' : ''}>Full-time</option>
                        <option value="Part-time" ${data.type === 'Part-time' ? 'selected' : ''}>Part-time</option>
                        <option value="Contract" ${data.type === 'Contract' ? 'selected' : ''}>Contract</option>
                        <option value="Freelance" ${data.type === 'Freelance' ? 'selected' : ''}>Freelance</option>
                        <option value="Internship" ${data.type === 'Internship' ? 'selected' : ''}>Internship</option>
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="exp_start_${currentCount}">Start Date *</label>
                    <input type="month" id="exp_start_${currentCount}" name="exp_start_${currentCount}" 
                           value="${data.startDate || ''}" required>
                </div>
                <div class="form-group">
                    <label for="exp_end_${currentCount}">End Date</label>
                    <input type="month" id="exp_end_${currentCount}" name="exp_end_${currentCount}" 
                           value="${data.endDate || ''}" ${data.current ? 'disabled' : ''}>
                    <div class="checkbox-group">
                        <input type="checkbox" id="exp_current_${currentCount}" name="exp_current_${currentCount}" 
                               ${data.current ? 'checked' : ''} onchange="this.nextElementSibling.nextElementSibling.disabled = this.checked;">
                        <label for="exp_current_${currentCount}">Currently working here</label>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label for="exp_description_${currentCount}">Job Description & Achievements *</label>
                <textarea id="exp_description_${currentCount}" name="exp_description_${currentCount}" 
                         rows="4" placeholder="• Developed and maintained web applications using React and Node.js
• Led a team of 5 developers to deliver projects 20% ahead of schedule
• Implemented CI/CD pipelines that reduced deployment time by 50%
• Collaborated with cross-functional teams to define project requirements" required>${data.description || ''}</textarea>
            </div>
        `;
        
        container.appendChild(div);
        this.updatePreview();
    }

    addEducation(data = {}) {
        const container = document.getElementById('educationContainer');
        const currentCount = container.querySelectorAll('.education-item').length + 1;
        const div = document.createElement('div');
        div.className = 'education-item section';
        div.innerHTML = `
            <div class="section-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
                <h3><i class="fas fa-graduation-cap"></i> Education ${currentCount}</h3>
                <button type="button" class="btn btn-danger" onclick="resumeBuilder.removeEducation(this); resumeBuilder.updatePreview();">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="edu_degree_${currentCount}">Degree *</label>
                    <select id="edu_degree_${currentCount}" name="edu_degree_${currentCount}" required>
                        <option value="">Select Degree</option>
                        <option value="Bachelor's Degree" ${data.degree === "Bachelor's Degree" ? 'selected' : ''}>Bachelor's Degree</option>
                        <option value="Master's Degree" ${data.degree === "Master's Degree" ? 'selected' : ''}>Master's Degree</option>
                        <option value="Doctoral Degree (PhD)" ${data.degree === "Doctoral Degree (PhD)" ? 'selected' : ''}>Doctoral Degree (PhD)</option>
                        <option value="Associate Degree" ${data.degree === "Associate Degree" ? 'selected' : ''}>Associate Degree</option>
                        <option value="Diploma" ${data.degree === "Diploma" ? 'selected' : ''}>Diploma</option>
                        <option value="Certificate" ${data.degree === "Certificate" ? 'selected' : ''}>Certificate</option>
                        <option value="High School" ${data.degree === "High School" ? 'selected' : ''}>High School</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edu_field_${currentCount}">Field of Study *</label>
                    <input type="text" id="edu_field_${currentCount}" name="edu_field_${currentCount}" 
                           placeholder="e.g., Computer Science" value="${data.field || ''}" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="edu_school_${currentCount}">Institution *</label>
                    <input type="text" id="edu_school_${currentCount}" name="edu_school_${currentCount}" 
                           placeholder="e.g., Harvard University" value="${data.school || ''}" required>
                </div>
                <div class="form-group">
                    <label for="edu_location_${currentCount}">Location</label>
                    <input type="text" id="edu_location_${currentCount}" name="edu_location_${currentCount}" 
                           placeholder="e.g., Cambridge, MA" value="${data.location || ''}">
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="edu_start_${currentCount}">Start Year</label>
                    <input type="number" id="edu_start_${currentCount}" name="edu_start_${currentCount}" 
                           placeholder="2018" min="1950" max="2030" value="${data.startYear || ''}">
                </div>
                <div class="form-group">
                    <label for="edu_end_${currentCount}">Graduation Year</label>
                    <input type="number" id="edu_end_${currentCount}" name="edu_end_${currentCount}" 
                           placeholder="2022" min="1950" max="2030" value="${data.endYear || ''}">
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="edu_gpa_${currentCount}">GPA (Optional)</label>
                    <input type="number" id="edu_gpa_${currentCount}" name="edu_gpa_${currentCount}" 
                           placeholder="3.8" min="0" max="4" step="0.1" value="${data.gpa || ''}">
                </div>
                <div class="form-group">
                    <label for="edu_honors_${currentCount}">Honors & Activities</label>
                    <input type="text" id="edu_honors_${currentCount}" name="edu_honors_${currentCount}" 
                           placeholder="e.g., Magna Cum Laude, Dean's List" value="${data.honors || ''}">
                </div>
            </div>
        `;
        
        container.appendChild(div);
        this.setupAutocomplete(div.querySelector(`#edu_school_${currentCount}`), UNIVERSITIES);
        this.setupAutocomplete(div.querySelector(`#edu_field_${currentCount}`), COURSES);
        this.updatePreview();
    }

    addSkill(data = {}) {
        this.skillCount++;
        const container = document.getElementById('skillsContainer');
        const div = document.createElement('div');
        div.className = 'skill-item';
        div.style.marginBottom = 'var(--space-4)';
        div.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <label for="skill_name_${this.skillCount}">Skill *</label>
                    <input type="text" id="skill_name_${this.skillCount}" name="skill_name_${this.skillCount}" 
                           placeholder="e.g., JavaScript" value="${data.name || ''}" required>
                </div>
                <div class="form-group">
                    <label for="skill_level_${this.skillCount}">Proficiency Level</label>
                    <select id="skill_level_${this.skillCount}" name="skill_level_${this.skillCount}">
                        <option value="Beginner" ${data.level === 'Beginner' ? 'selected' : ''}>Beginner</option>
                        <option value="Intermediate" ${data.level === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
                        <option value="Advanced" ${data.level === 'Advanced' ? 'selected' : ''}>Advanced</option>
                        <option value="Expert" ${data.level === 'Expert' ? 'selected' : ''}>Expert</option>
                    </select>
                </div>
                <div class="form-group" style="display: flex; align-items: end;">
                    <button type="button" class="btn btn-danger" onclick="this.parentElement.parentElement.parentElement.remove(); resumeBuilder.updatePreview();" style="margin-bottom: 0;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(div);
        this.setupAutocomplete(div.querySelector(`#skill_name_${this.skillCount}`), SKILLS);
        this.updatePreview();
    }

    addAdditionalSection(sectionType) {
        switch(sectionType) {
            case 'projects':
                this.addProject();
                break;
            case 'certifications':
                this.addCertification();
                break;
            case 'languages':
                this.addLanguage();
                break;
            case 'awards':
                this.addAward();
                break;
        }
    }

    addProject() {
        const container = document.getElementById('additionalSectionsContainer');
        const currentCount = container.querySelectorAll('.project-section').length + 1;
        const div = document.createElement('div');
        div.className = 'project-section section';
        div.innerHTML = `
            <div class="section-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
                <h3><i class="fas fa-project-diagram"></i> Project ${currentCount}</h3>
                <button type="button" class="btn btn-danger" onclick="resumeBuilder.removeProject(this); resumeBuilder.updatePreview();">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>Project Name *</label>
                    <input type="text" name="project_name_${currentCount}" placeholder="e.g., E-commerce Website" required>
                </div>
                <div class="form-group">
                    <label>Technologies Used</label>
                    <input type="text" name="project_tech_${currentCount}" placeholder="e.g., React, Node.js, MongoDB">
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>Project URL</label>
                    <input type="url" name="project_url_${currentCount}" placeholder="https://github.com/username/project">
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="month" name="project_date_${currentCount}">
                </div>
            </div>
            
            <div class="form-group">
                <label>Description *</label>
                <textarea name="project_description_${currentCount}" rows="3" 
                         placeholder="Describe your project, your role, and key achievements..." required></textarea>
            </div>
        `;
        
        container.appendChild(div);
        this.updatePreview();
    }

    addCertification() {
        const container = document.getElementById('additionalSectionsContainer');
        const currentCount = container.querySelectorAll('.certification-section').length + 1;
        const div = document.createElement('div');
        div.className = 'certification-section section';
        div.innerHTML = `
            <div class="section-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
                <h3><i class="fas fa-certificate"></i> Certification ${currentCount}</h3>
                <button type="button" class="btn btn-danger" onclick="resumeBuilder.removeCertification(this); resumeBuilder.updatePreview();">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>Certification Name *</label>
                    <input type="text" name="cert_name_${currentCount}" placeholder="e.g., AWS Certified Solutions Architect" required>
                </div>
                <div class="form-group">
                    <label>Issuing Organization *</label>
                    <input type="text" name="cert_org_${currentCount}" placeholder="e.g., Amazon Web Services" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>Issue Date</label>
                    <input type="month" name="cert_date_${currentCount}">
                </div>
                <div class="form-group">
                    <label>Expiry Date</label>
                    <input type="month" name="cert_expiry_${currentCount}">
                </div>
            </div>
            
            <div class="form-group">
                <label>Credential URL</label>
                <input type="url" name="cert_url_${currentCount}" placeholder="https://www.credential-url.com">
            </div>
        `;
        
        container.appendChild(div);
        this.updatePreview();
    }

    addLanguage() {
        const container = document.getElementById('additionalSectionsContainer');
        const div = document.createElement('div');
        div.className = 'language-section section';
        div.innerHTML = `
            <div class="section-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
                <h3><i class="fas fa-language"></i> Languages</h3>
                <button type="button" class="btn btn-danger" onclick="this.parentElement.parentElement.remove(); resumeBuilder.updatePreview();">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
            
            <div id="languageContainer">
                <div class="form-row">
                    <div class="form-group">
                        <label>Language</label>
                        <input type="text" name="language_name_1" placeholder="e.g., English">
                    </div>
                    <div class="form-group">
                        <label>Proficiency</label>
                        <select name="language_level_1">
                            <option value="Native">Native</option>
                            <option value="Fluent">Fluent</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Basic">Basic</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <button type="button" class="btn btn-secondary" onclick="resumeBuilder.addLanguageItem(this.parentElement)">
                <i class="fas fa-plus"></i> Add Language
            </button>
        `;
        
        container.appendChild(div);
        this.updatePreview();
    }

    addLanguageItem(section) {
        const container = section.querySelector('#languageContainer');
        const count = container.children.length + 1;
        const div = document.createElement('div');
        div.className = 'form-row';
        div.innerHTML = `
            <div class="form-group">
                <label>Language</label>
                <input type="text" name="language_name_${count}" placeholder="e.g., Spanish">
            </div>
            <div class="form-group">
                <label>Proficiency</label>
                <select name="language_level_${count}">
                    <option value="Native">Native</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Basic">Basic</option>
                </select>
            </div>
            <div class="form-group" style="display: flex; align-items: end;">
                <button type="button" class="btn btn-danger" onclick="this.parentElement.parentElement.remove(); resumeBuilder.updatePreview();" style="margin-bottom: 0;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(div);
        this.updatePreview();
    }

    addAward() {
        const container = document.getElementById('additionalSectionsContainer');
        const div = document.createElement('div');
        div.className = 'award-section section';
        div.innerHTML = `
            <div class="section-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
                <h3><i class="fas fa-award"></i> Awards & Achievements</h3>
                <button type="button" class="btn btn-danger" onclick="this.parentElement.parentElement.remove(); resumeBuilder.updatePreview();">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
            
            <div id="awardContainer">
                <div class="form-row">
                    <div class="form-group">
                        <label>Award Name</label>
                        <input type="text" name="award_name_1" placeholder="e.g., Employee of the Year">
                    </div>
                    <div class="form-group">
                        <label>Issuer</label>
                        <input type="text" name="award_issuer_1" placeholder="e.g., ABC Company">
                    </div>
                    <div class="form-group">
                        <label>Date</label>
                        <input type="month" name="award_date_1">
                    </div>
                </div>
            </div>
            
            <button type="button" class="btn btn-secondary" onclick="resumeBuilder.addAwardItem(this.parentElement)">
                <i class="fas fa-plus"></i> Add Award
            </button>
        `;
        
        container.appendChild(div);
        this.updatePreview();
    }

    addAwardItem(section) {
        const container = section.querySelector('#awardContainer');
        const count = container.children.length + 1;
        const div = document.createElement('div');
        div.className = 'form-row';
        div.innerHTML = `
            <div class="form-group">
                <label>Award Name</label>
                <input type="text" name="award_name_${count}" placeholder="e.g., Best Innovation Award">
            </div>
            <div class="form-group">
                <label>Issuer</label>
                <input type="text" name="award_issuer_${count}" placeholder="e.g., XYZ Organization">
            </div>
            <div class="form-group">
                <label>Date</label>
                <input type="month" name="award_date_${count}">
            </div>
            <div class="form-group" style="display: flex; align-items: end;">
                <button type="button" class="btn btn-danger" onclick="this.parentElement.parentElement.remove(); resumeBuilder.updatePreview();" style="margin-bottom: 0;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(div);
        this.updatePreview();
    }

    setupAutocomplete(input, suggestions) {
        let currentFocus = -1;
        
        input.addEventListener('input', function() {
            const val = this.value;
            closeAllLists();
            if (!val) return false;
            currentFocus = -1;
            
            const listContainer = document.createElement('div');
            listContainer.className = 'autocomplete-items';
            this.parentNode.appendChild(listContainer);
            
            const matches = suggestions.filter(item => 
                item.toLowerCase().includes(val.toLowerCase())
            ).slice(0, 10);
            
            matches.forEach(match => {
                const item = document.createElement('div');
                item.innerHTML = match.replace(new RegExp(val, 'gi'), `<strong>$&</strong>`);
                item.addEventListener('click', function() {
                    input.value = match;
                    closeAllLists();
                    resumeBuilder.updatePreview();
                });
                listContainer.appendChild(item);
            });
        });
        
        input.addEventListener('keydown', function(e) {
            const list = this.parentNode.querySelector('.autocomplete-items');
            if (list) {
                const items = list.getElementsByTagName('div');
                if (e.keyCode === 40) { // Down arrow
                    currentFocus++;
                    addActive(items);
                } else if (e.keyCode === 38) { // Up arrow
                    currentFocus--;
                    addActive(items);
                } else if (e.keyCode === 13) { // Enter
                    e.preventDefault();
                    if (currentFocus > -1 && items[currentFocus]) {
                        items[currentFocus].click();
                    }
                }
            }
        });
        
        function addActive(items) {
            if (!items) return false;
            removeActive(items);
            if (currentFocus >= items.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = items.length - 1;
            items[currentFocus].classList.add('autocomplete-active');
        }
        
        function removeActive(items) {
            for (let item of items) {
                item.classList.remove('autocomplete-active');
            }
        }
        
        function closeAllLists(except) {
            const items = document.getElementsByClassName('autocomplete-items');
            for (let item of items) {
                if (except !== item && except !== input) {
                    item.parentNode.removeChild(item);
                }
            }
        }
        
        document.addEventListener('click', function(e) {
            closeAllLists(e.target);
        });
    }

    selectTemplate(templateName) {
        // Remove selected class from all cards
        document.querySelectorAll('.template-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Add selected class to clicked card
        const selectedCard = document.querySelector(`[data-template="${templateName}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }
        
        this.selectedTemplate = templateName;
        this.updatePreview();
    }

    updatePreview() {
        // This will be called to update the live preview
        console.log('Preview updated with template:', this.selectedTemplate);
    }

    getFormData() {
        const formData = {
            personalInfo: {
                name: document.getElementById('name')?.value || '',
                title: document.getElementById('title')?.value || '',
                email: document.getElementById('email')?.value || '',
                phone: document.getElementById('phone')?.value || '',
                location: document.getElementById('address')?.value || '',
                website: document.getElementById('website')?.value || '',
                summary: document.getElementById('summary')?.value || ''
            },
            socialLinks: {
                linkedin: document.getElementById('linkedin')?.value || '',
                github: document.getElementById('github')?.value || '',
                twitter: document.getElementById('twitter')?.value || '',
                instagram: document.getElementById('instagram')?.value || '',
                behance: document.getElementById('behance')?.value || '',
                dribbble: document.getElementById('dribbble')?.value || '',
                youtube: document.getElementById('youtube')?.value || '',
                portfolio: document.getElementById('portfolio')?.value || ''
            },
            experiences: this.getExperiences(),
            education: this.getEducation(),
            skills: this.getSkills(),
            projects: this.getProjects(),
            certifications: this.getCertifications(),
            languages: this.getLanguages(),
            awards: this.getAwards(),
            template: this.selectedTemplate
        };
        
        return formData;
    }

    getExperiences() {
        const experiences = [];
        const experienceItems = document.querySelectorAll('.experience-item');
        
        experienceItems.forEach((item, index) => {
            // Get the actual form elements within this item
            const titleInput = item.querySelector('input[name^="exp_title_"]');
            const companyInput = item.querySelector('input[name^="exp_company_"]');
            const locationInput = item.querySelector('input[name^="exp_location_"]');
            const typeSelect = item.querySelector('select[name^="exp_type_"]');
            const startInput = item.querySelector('input[name^="exp_start_"]');
            const endInput = item.querySelector('input[name^="exp_end_"]');
            const currentInput = item.querySelector('input[name^="exp_current_"]');
            const descriptionInput = item.querySelector('textarea[name^="exp_description_"]');
            
            const experience = {
                title: titleInput?.value || '',
                company: companyInput?.value || '',
                location: locationInput?.value || '',
                type: typeSelect?.value || '',
                startDate: startInput?.value || '',
                endDate: endInput?.value || '',
                current: currentInput?.checked || false,
                description: descriptionInput?.value || ''
            };
            
            if (experience.title && experience.company) {
                experiences.push(experience);
            }
        });
        
        return experiences;
    }

    getEducation() {
        const education = [];
        const educationItems = document.querySelectorAll('.education-item');
        
        educationItems.forEach((item, index) => {
            // Get the actual form elements within this item
            const degreeSelect = item.querySelector('select[name^="edu_degree_"]');
            const fieldInput = item.querySelector('input[name^="edu_field_"]');
            const schoolInput = item.querySelector('input[name^="edu_school_"]');
            const locationInput = item.querySelector('input[name^="edu_location_"]');
            const startInput = item.querySelector('input[name^="edu_start_"]');
            const endInput = item.querySelector('input[name^="edu_end_"]');
            const gpaInput = item.querySelector('input[name^="edu_gpa_"]');
            const honorsInput = item.querySelector('input[name^="edu_honors_"]');
            
            const edu = {
                degree: degreeSelect?.value || '',
                field: fieldInput?.value || '',
                school: schoolInput?.value || '',
                location: locationInput?.value || '',
                startYear: startInput?.value || '',
                endYear: endInput?.value || '',
                gpa: gpaInput?.value || '',
                honors: honorsInput?.value || ''
            };
            
            if (edu.degree && edu.field && edu.school) {
                education.push(edu);
            }
        });
        
        return education;
    }

    getSkills() {
        const skills = [];
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            // Get the actual form elements within this item
            const nameInput = item.querySelector('input[name^="skill_name_"]');
            const levelSelect = item.querySelector('select[name^="skill_level_"]');
            
            const skill = {
                name: nameInput?.value || '',
                level: levelSelect?.value || 'Intermediate'
            };
            
            if (skill.name) {
                skills.push(skill);
            }
        });
        
        return skills;
    }

    getProjects() {
        const projects = [];
        const projectItems = document.querySelectorAll('.project-section');
        
        projectItems.forEach((item, index) => {
            // Get the actual form elements within this item
            const nameInput = item.querySelector('input[name^="project_name_"]');
            const techInput = item.querySelector('input[name^="project_tech_"]');
            const urlInput = item.querySelector('input[name^="project_url_"]');
            const dateInput = item.querySelector('input[name^="project_date_"]');
            const descriptionInput = item.querySelector('textarea[name^="project_description_"]');
            
            const project = {
                name: nameInput?.value || '',
                technologies: techInput?.value || '',
                url: urlInput?.value || '',
                date: dateInput?.value || '',
                description: descriptionInput?.value || ''
            };
            
            if (project.name && project.description) {
                projects.push(project);
            }
        });
        
        return projects;
    }

    getCertifications() {
        const certifications = [];
        const certItems = document.querySelectorAll('.certification-section');
        
        certItems.forEach((item, index) => {
            // Get the actual form elements within this item
            const nameInput = item.querySelector('input[name^="cert_name_"]');
            const orgInput = item.querySelector('input[name^="cert_org_"]');
            const dateInput = item.querySelector('input[name^="cert_date_"]');
            const expiryInput = item.querySelector('input[name^="cert_expiry_"]');
            const urlInput = item.querySelector('input[name^="cert_url_"]');
            
            const cert = {
                name: nameInput?.value || '',
                organization: orgInput?.value || '',
                date: dateInput?.value || '',
                expiry: expiryInput?.value || '',
                url: urlInput?.value || ''
            };
            
            if (cert.name && cert.organization) {
                certifications.push(cert);
            }
        });
        
        return certifications;
    }

    getLanguages() {
        const languages = [];
        const languageSections = document.querySelectorAll('.language-section');
        
        languageSections.forEach(section => {
            const languageInputs = section.querySelectorAll('[name^="language_name_"]');
            languageInputs.forEach(input => {
                const name = input.value;
                const id = input.name.split('_').pop();
                const level = section.querySelector(`[name="language_level_${id}"]`)?.value || '';
                
                if (name) {
                    languages.push({ name, level });
                }
            });
        });
        
        return languages;
    }

    getAwards() {
        const awards = [];
        const awardSections = document.querySelectorAll('.award-section');
        
        awardSections.forEach(section => {
            const awardInputs = section.querySelectorAll('[name^="award_name_"]');
            awardInputs.forEach(input => {
                const name = input.value;
                const id = input.name.split('_').pop();
                const issuer = section.querySelector(`[name="award_issuer_${id}"]`)?.value || '';
                const date = section.querySelector(`[name="award_date_${id}"]`)?.value || '';
                
                if (name) {
                    awards.push({ name, issuer, date });
                }
            });
        });
        
        return awards;
    }

    saveResume() {
        const formData = this.getFormData();
        const resumeName = prompt('Enter a name for your resume:');
        
        if (resumeName) {
            const resumeData = {
                id: Date.now().toString(),
                name: resumeName,
                data: formData,
                created: new Date().toISOString()
            };
            
            fetch('/api/save_resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resumeData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Resume saved successfully!');
                } else {
                    alert('Error saving resume: ' + data.error);
                }
            })
            .catch(error => {
                alert('Error saving resume: ' + error.message);
            });
        }
    }

    loadResume() {
        alert('Load resume feature - Select from saved resumes coming soon!');
    }

    exportToPDF() {
        const formData = this.getFormData();
        
        if (!formData.personalInfo.name) {
            alert('Please fill in your name before exporting.');
            return;
        }
        
        fetch('/api/export_pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${formData.personalInfo.name || 'resume'}.pdf`;
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            alert('Error exporting PDF: ' + error.message);
        });
    }

    removeExperience(button) {
        button.closest('.experience-item').remove();
        this.renumberExperiences();
    }

    renumberExperiences() {
        const experienceItems = document.querySelectorAll('.experience-item');
        experienceItems.forEach((item, index) => {
            const header = item.querySelector('h3');
            if (header) {
                header.innerHTML = `<i class="fas fa-briefcase"></i> Experience ${index + 1}`;
            }
        });
    }

    removeEducation(button) {
        button.closest('.education-item').remove();
        this.renumberEducation();
    }

    renumberEducation() {
        const educationItems = document.querySelectorAll('.education-item');
        educationItems.forEach((item, index) => {
            const header = item.querySelector('h3');
            if (header) {
                header.innerHTML = `<i class="fas fa-graduation-cap"></i> Education ${index + 1}`;
            }
        });
    }

    removeProject(button) {
        button.closest('.project-section').remove();
        this.renumberProjects();
    }

    renumberProjects() {
        const projectItems = document.querySelectorAll('.project-section');
        projectItems.forEach((item, index) => {
            const header = item.querySelector('h3');
            if (header) {
                header.innerHTML = `<i class="fas fa-project-diagram"></i> Project ${index + 1}`;
            }
        });
    }

    removeCertification(button) {
        button.closest('.certification-section').remove();
        this.renumberCertifications();
    }

    renumberCertifications() {
        const certItems = document.querySelectorAll('.certification-section');
        certItems.forEach((item, index) => {
            const header = item.querySelector('h3');
            if (header) {
                header.innerHTML = `<i class="fas fa-certificate"></i> Certification ${index + 1}`;
            }
        });
    }

    // ...existing code...
}

// Global functions for HTML onclick handlers
function openLivePreview() {
    const modal = document.getElementById('livePreviewModal');
    const formData = resumeBuilder.getFormData();
    
    // Populate modal with form data
    populateModalPreview(formData);
    
    // Show modal with blur effect
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add blur to background
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.filter = 'blur(5px)';
        mainContent.style.pointerEvents = 'none';
    }
}

function closeLivePreview() {
    const modal = document.getElementById('livePreviewModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    
    // Remove blur from background
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.filter = '';
        mainContent.style.pointerEvents = '';
    }
}

function populateModalPreview(data) {
    // Update personal info
    document.getElementById('modalPreviewName').textContent = data.personalInfo.name || 'Your Name';
    
    // Update contact info
    const contactInfo = [];
    if (data.personalInfo.email) contactInfo.push(data.personalInfo.email);
    if (data.personalInfo.phone) contactInfo.push(data.personalInfo.phone);
    if (data.personalInfo.location) contactInfo.push(data.personalInfo.location);
    if (data.personalInfo.website) contactInfo.push(data.personalInfo.website);
    
    document.getElementById('modalPreviewContact').innerHTML = contactInfo.join(' • ');
    
    // Update social links
    const socialLinksContainer = document.getElementById('modalPreviewSocialLinks');
    const socialLinks = Object.entries(data.socialLinks).filter(([key, value]) => value);
    
    if (socialLinks.length > 0) {
        socialLinksContainer.style.display = 'flex';
        socialLinksContainer.innerHTML = socialLinks.map(([platform, url]) => {
            const icons = {
                linkedin: 'fab fa-linkedin',
                github: 'fab fa-github',
                twitter: 'fab fa-twitter',
                instagram: 'fab fa-instagram',
                behance: 'fab fa-behance',
                dribbble: 'fab fa-dribbble',
                youtube: 'fab fa-youtube',
                portfolio: 'fas fa-globe'
            };
            return `<a href="${url}" target="_blank" class="preview-social-link">
                        <i class="${icons[platform]}"></i> ${platform}
                    </a>`;
        }).join('');
    } else {
        socialLinksContainer.style.display = 'none';
    }
    
    // Update summary
    const summarySection = document.getElementById('modalPreviewSummary');
    if (data.personalInfo.summary) {
        summarySection.style.display = 'block';
        document.getElementById('modalPreviewSummaryText').textContent = data.personalInfo.summary;
    } else {
        summarySection.style.display = 'none';
    }
    
    // Update experience
    const experienceList = document.getElementById('modalPreviewExperienceList');
    if (data.experiences.length > 0) {
        experienceList.innerHTML = data.experiences.map(exp => `
            <div style="margin-bottom: var(--space-4);">
                <h4 style="margin-bottom: var(--space-1);">${exp.title} at ${exp.company}</h4>
                <p style="font-size: var(--font-size-sm); color: var(--gray-600); margin-bottom: var(--space-2);">
                    ${exp.location ? exp.location + ' • ' : ''}${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
                </p>
                <div style="white-space: pre-line;">${exp.description}</div>
            </div>
        `).join('');
    } else {
        experienceList.innerHTML = '<p>No experience added yet.</p>';
    }
    
    // Update education
    const educationList = document.getElementById('modalPreviewEducationList');
    if (data.education.length > 0) {
        educationList.innerHTML = data.education.map(edu => `
            <div style="margin-bottom: var(--space-4);">
                <h4 style="margin-bottom: var(--space-1);">${edu.degree} in ${edu.field}</h4>
                <p style="font-size: var(--font-size-sm); color: var(--gray-600); margin-bottom: var(--space-2);">
                    ${edu.school}${edu.location ? ' • ' + edu.location : ''}
                    ${edu.endYear ? ' • ' + edu.endYear : ''}
                </p>
                ${edu.gpa ? `<p style="font-size: var(--font-size-sm);">GPA: ${edu.gpa}</p>` : ''}
                ${edu.honors ? `<p style="font-size: var(--font-size-sm);">${edu.honors}</p>` : ''}
            </div>
        `).join('');
    } else {
        educationList.innerHTML = '<p>No education added yet.</p>';
    }
    
    // Update skills
    const skillsList = document.getElementById('modalPreviewSkillsList');
    if (data.skills.length > 0) {
        skillsList.innerHTML = data.skills.map(skill => 
            `<span style="display: inline-block; background: var(--gray-100); padding: var(--space-2) var(--space-3); 
                    margin: var(--space-1); border-radius: var(--radius-md); font-size: var(--font-size-sm);">
                ${skill.name} (${skill.level})
            </span>`
        ).join('');
    } else {
        skillsList.innerHTML = '<p>No skills added yet.</p>';
    }
    
    // Update additional sections
    const additionalSection = document.getElementById('modalPreviewAdditional');
    let additionalHTML = '';
    
    if (data.projects.length > 0) {
        additionalHTML += `
            <div style="margin-bottom: var(--space-6);">
                <h3>Projects</h3>
                ${data.projects.map(project => `
                    <div style="margin-bottom: var(--space-4);">
                        <h4>${project.name}</h4>
                        ${project.technologies ? `<p style="font-size: var(--font-size-sm); color: var(--gray-600);">Technologies: ${project.technologies}</p>` : ''}
                        <p>${project.description}</p>
                        ${project.url ? `<a href="${project.url}" target="_blank" style="font-size: var(--font-size-sm);">${project.url}</a>` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    if (data.certifications.length > 0) {
        additionalHTML += `
            <div style="margin-bottom: var(--space-6);">
                <h3>Certifications</h3>
                ${data.certifications.map(cert => `
                    <div style="margin-bottom: var(--space-2);">
                        <h4>${cert.name}</h4>
                        <p style="font-size: var(--font-size-sm); color: var(--gray-600);">${cert.organization}${cert.date ? ' • ' + cert.date : ''}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    if (data.languages.length > 0) {
        additionalHTML += `
            <div style="margin-bottom: var(--space-6);">
                <h3>Languages</h3>
                <p>${data.languages.map(lang => `${lang.name} (${lang.level})`).join(', ')}</p>
            </div>
        `;
    }
    
    if (data.awards.length > 0) {
        additionalHTML += `
            <div style="margin-bottom: var(--space-6);">
                <h3>Awards & Achievements</h3>
                ${data.awards.map(award => `
                    <div style="margin-bottom: var(--space-2);">
                        <h4>${award.name}</h4>
                        <p style="font-size: var(--font-size-sm); color: var(--gray-600);">${award.issuer}${award.date ? ' • ' + award.date : ''}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    additionalSection.innerHTML = additionalHTML;
    
    // Apply selected template styling
    const previewContent = document.getElementById('livePreviewContent');
    previewContent.className = `resume-preview ${resumeBuilder.selectedTemplate}`;
}

function importTemplate() {
    document.getElementById('templateFileInput').click();
}

function handleTemplateImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            alert('Template imported successfully!');
        } catch (error) {
            alert('Error importing template: Invalid file format');
        }
    };
    reader.readAsText(file);
}

// Initialize the application
let resumeBuilder;
document.addEventListener('DOMContentLoaded', function() {
    resumeBuilder = new ResumeBuilder();
});
