import os
import pathlib
import pdfkit
import utils
from jinja2 import Template
from PyPDF2 import PdfReader, PdfWriter

def get_template_pdf():
    with open(pathlib.Path(__file__).parent / "../templates/payslip.html", 'r', encoding='UTF-8') as file:
        return file.read()

def generate(path, filename, data):
    inputFile = '/'.join((path, filename))
    pathFile = pathlib.Path(inputFile)
    pathFile.parent.mkdir(parents=True, exist_ok=True)

    jinja2_template = Template(get_template_pdf())
    rendered = jinja2_template.render(**data)

    config = pdfkit.configuration()
    if os.name == 'posix':
        config = pdfkit.configuration(wkhtmltopdf='/usr/local/bin/wkhtmltopdf')
    pdf = pdfkit.from_string(rendered, pathFile, configuration=config)
    if pdf:
        return inputFile
    else:
        return ''

def set_password(path, filename, filenameTmp, data):
    inputFile = '/'.join((path, filename))
    outputFile = '/'.join((path, filenameTmp))
    with open(inputFile, "rb") as in_file:
        input_pdf = PdfReader(in_file)

        output_pdf = PdfWriter()
        output_pdf.append_pages_from_reader(input_pdf)
        output_pdf.encrypt(data['person']['password'])

        with open(outputFile, "wb") as out_file:
            output_pdf.write(out_file)
