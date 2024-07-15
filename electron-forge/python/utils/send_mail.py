import os
import smtplib
import pathlib
from datetime import datetime
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from jinja2 import Template

def get_template_email():
    with open(pathlib.Path(__file__).parent / "../templates/email.html", 'r', encoding='UTF-8') as file:
        return file.read()

def build_email_template(path, filename, data, sender_email):
    jinja2_template = Template(get_template_email())
    subject = "PAYSLIP_WTS_" + data['currentTime']['date_time'].strftime('%m.%Y')
    body = jinja2_template.render(**data)
    receiver_email = data['person']['email']

    # Create a multipart message and set headers
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject

    # Add body to email
    message.attach(MIMEText(body, "html"))

    inputFile = '/'.join((path, filename))
    # Open PDF file in binary mode
    with open(inputFile, "rb") as attachment:
        # Add file as application/octet-stream
        # Email client can usually download this automatically as attachment
        part = MIMEBase("application", "octet-stream")
        part.set_payload(attachment.read())

    # Encode file in ASCII characters to send by email    
    encoders.encode_base64(part)

    # Add header as key/value pair to attachment part
    part.add_header(
        "Content-Disposition",
        f"attachment; filename={subject}.pdf",
    )

    # Add attachment to message and convert message to string
    message.attach(part)

    return [message, inputFile]
