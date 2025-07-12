from flask import Flask, render_template, request, jsonify, send_file
import json
import os
from datetime import datetime
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
import io

app = Flask(__name__)

# Ensure the data directory exists
if not os.path.exists('data'):
    os.makedirs('data')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/save_resume', methods=['POST'])
def save_resume():
    try:
        resume_data = request.json
        resume_id = resume_data.get('id', str(datetime.now().timestamp()))
        
        # Save to JSON file
        filename = f"data/resume_{resume_id}.json"
        with open(filename, 'w') as f:
            json.dump(resume_data, f, indent=2)
        
        return jsonify({'success': True, 'id': resume_id})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/api/load_resume/<resume_id>')
def load_resume(resume_id):
    try:
        filename = f"data/resume_{resume_id}.json"
        if os.path.exists(filename):
            with open(filename, 'r') as f:
                resume_data = json.load(f)
            return jsonify({'success': True, 'data': resume_data})
        else:
            return jsonify({'success': False, 'error': 'Resume not found'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/api/list_resumes')
def list_resumes():
    try:
        resumes = []
        for filename in os.listdir('data'):
            if filename.startswith('resume_') and filename.endswith('.json'):
                with open(f"data/{filename}", 'r') as f:
                    data = json.load(f)
                    resumes.append({
                        'id': filename.replace('resume_', '').replace('.json', ''),
                        'name': data.get('personalInfo', {}).get('fullName', 'Unnamed Resume'),
                        'lastModified': os.path.getmtime(f"data/{filename}")
                    })
        
        resumes.sort(key=lambda x: x['lastModified'], reverse=True)
        return jsonify({'success': True, 'resumes': resumes})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/api/export_pdf/<resume_id>')
def export_pdf(resume_id):
    try:
        filename = f"data/resume_{resume_id}.json"
        if not os.path.exists(filename):
            return jsonify({'success': False, 'error': 'Resume not found'})
        
        with open(filename, 'r') as f:
            resume_data = json.load(f)
        
        # Create PDF
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4, rightMargin=72, leftMargin=72,
                               topMargin=72, bottomMargin=18)
        
        # Get styles
        styles = getSampleStyleSheet()
        story = []
        
        # Title
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            spaceAfter=30,
            alignment=1,  # Center
            textColor=colors.darkblue
        )
        
        personal_info = resume_data.get('personalInfo', {})
        story.append(Paragraph(personal_info.get('fullName', 'Resume'), title_style))
        
        # Contact Info
        contact_style = ParagraphStyle(
            'Contact',
            parent=styles['Normal'],
            fontSize=12,
            alignment=1,  # Center
            spaceAfter=20
        )
        
        contact_info = []
        if personal_info.get('email'):
            contact_info.append(personal_info['email'])
        if personal_info.get('phone'):
            contact_info.append(personal_info['phone'])
        if personal_info.get('location'):
            contact_info.append(personal_info['location'])
        
        if contact_info:
            story.append(Paragraph(' | '.join(contact_info), contact_style))
        
        # Summary
        if personal_info.get('summary'):
            story.append(Paragraph('<b>Professional Summary</b>', styles['Heading2']))
            story.append(Paragraph(personal_info['summary'], styles['Normal']))
            story.append(Spacer(1, 12))
        
        # Experience
        if resume_data.get('experience'):
            story.append(Paragraph('<b>Professional Experience</b>', styles['Heading2']))
            for exp in resume_data['experience']:
                # Job title and company
                job_title = f"<b>{exp.get('position', '')}</b> at {exp.get('company', '')}"
                story.append(Paragraph(job_title, styles['Heading3']))
                
                # Duration
                duration = f"{exp.get('startDate', '')} - {exp.get('endDate', 'Present')}"
                story.append(Paragraph(duration, styles['Normal']))
                
                # Description
                if exp.get('description'):
                    story.append(Paragraph(exp['description'], styles['Normal']))
                
                story.append(Spacer(1, 12))
        
        # Education
        if resume_data.get('education'):
            story.append(Paragraph('<b>Education</b>', styles['Heading2']))
            for edu in resume_data['education']:
                edu_title = f"<b>{edu.get('degree', '')}</b> - {edu.get('school', '')}"
                story.append(Paragraph(edu_title, styles['Heading3']))
                
                if edu.get('graduationDate'):
                    story.append(Paragraph(f"Graduated: {edu['graduationDate']}", styles['Normal']))
                
                story.append(Spacer(1, 12))
        
        # Skills
        if resume_data.get('skills'):
            story.append(Paragraph('<b>Skills</b>', styles['Heading2']))
            skills_text = ', '.join([skill.get('name', '') for skill in resume_data['skills']])
            story.append(Paragraph(skills_text, styles['Normal']))
        
        # Build PDF
        doc.build(story)
        buffer.seek(0)
        
        return send_file(
            buffer,
            as_attachment=True,
            download_name=f"resume_{personal_info.get('fullName', 'resume')}.pdf",
            mimetype='application/pdf'
        )
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
